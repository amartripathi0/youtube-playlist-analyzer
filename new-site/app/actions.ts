"use server";

/**
 * YouTube Playlist Analyzer - Server Actions
 * Security: These actions run exclusively on the server.
 * Secrets: YT_API_KEY is isolated here and never exposed to the client.
 */

import { YoutubeTranscript } from "youtube-transcript";

const API_KEY = process.env.YT_API_KEY;

// Strict Regex for YouTube IDs to prevent injection/malformed requests
const YOUTUBE_ID_REGEX = /^[a-zA-Z0-9_-]+$/;

function isValidId(id: string): boolean {
    return YOUTUBE_ID_REGEX.test(id);
}

export async function getPlaylistVideosAction(playlistId: string) {
    try {
        // 1. Strict Input Validation
        if (!playlistId || !isValidId(playlistId)) {
            throw new Error("Invalid Playlist ID format");
        }

        let playlistAllVideosIdArray: string[] = [];
        let nextPageToken: string | undefined = undefined;
        let channelTitle = "";

        // 2. Controlled Loop (Max 5 pages)
        while (playlistAllVideosIdArray.length < 250) {
            const url: string = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${API_KEY}&maxResults=50${nextPageToken ? `&pageToken=${nextPageToken}` : ""}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log("[YT_RAW_DATA][PLAYLIST_ITEMS]", JSON.stringify(data, null, 2));


            if (!response.ok) {
                // Internal logging for the developer
                console.error(`[SECURITY][YT_API_ERROR] ${data?.error?.message || "Unknown error"}`);
                // Mask specific error details for the client
                throw new Error("Unable to fetch playlist data from YouTube at this time.");
            }

            const items = data?.items || [];
            if (items.length === 0) break;

            if (!channelTitle && items[0]?.snippet?.channelTitle) {
                channelTitle = items[0].snippet.channelTitle;
            }

            items.forEach((vid: { snippet: { resourceId: { videoId: string } } }) => {
                const vidId = vid.snippet.resourceId.videoId;
                // 3. Output Sanitization
                if (playlistAllVideosIdArray.length < 250 && isValidId(vidId)) {
                    playlistAllVideosIdArray.push(vidId.toString());
                }
            });

            nextPageToken = data?.nextPageToken;
            if (!nextPageToken) break;
        }

        return { playlistAllVideosIdArray, channelTitle };
    } catch (error: any) {
        // Prevent sensitive info leakage by returning a generic message to the client
        // unless it's a validation error we threw ourselves.
        const isValidationError = error.message === "Invalid Playlist ID format";
        throw new Error(isValidationError ? error.message : "Internal Server Security Boundary: Request Failed");
    }
}

export async function getVideoMetadataAction(playlistAllVideosIdArray: string[]) {
    try {
        if (!playlistAllVideosIdArray || !Array.isArray(playlistAllVideosIdArray)) {
            throw new Error("Invalid Input: Array expected");
        }

        const safeIds = playlistAllVideosIdArray.filter(id => typeof id === 'string' && isValidId(id));
        const limitedIds = safeIds.slice(0, 250);

        const batches: string[][] = [];
        for (let i = 0; i < limitedIds.length; i += 50) {
            batches.push(limitedIds.slice(i, i + 50));
        }

        const fetchMetadata = async (idBatch: string[]) => {
            const ids = idBatch.join(",");
            // Added snippet to part for thumbnails and titles
            const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${ids}&key=${API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();

            console.log("[YT_RAW_DATA][VIDEO_DETAILS]", JSON.stringify(data, null, 2));

            if (!response.ok) {
                console.error(`[SECURITY][YT_API_ERROR] ${data?.error?.message || "Unknown error"}`);
                throw new Error("YouTube API communication failure.");
            }

            return data.items.map((item: any) => ({
                id: item.id,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails?.maxres?.url ||
                    item.snippet.thumbnails?.standard?.url ||
                    item.snippet.thumbnails?.high?.url ||
                    item.snippet.thumbnails?.medium?.url ||
                    item.snippet.thumbnails?.default?.url,
                duration: item.contentDetails.duration,
                definition: item.contentDetails.definition,
                caption: item.contentDetails.caption === "true" || item.contentDetails.caption === true,
            }));
        };

        const results = await Promise.all(batches.map(fetchMetadata));
        return results.flat();
    } catch (error: any) {
        console.error("[SECURITY][INTERNAL_ERROR]", error.message);
        throw new Error("Security check failed: Data processing stopped.");
    }
}

export async function getTranscriptAction(videoId: string) {
    try {
        const transcript = await YoutubeTranscript.fetchTranscript(videoId);
        return transcript;
    } catch (error: any) {
        console.error("[SECURITY][TRANSCRIPT_ERROR]", error.message);
        // If transcript is disabled or not found, return null so the UI can handle it gracefully.
        return null;
    }
}

export async function getBulkTranscriptsAction(videoIds: { id: string, title: string }[]) {
    try {
        console.log(`[BULK_TRANSCRIPT] Starting fetch for ${videoIds.length} videos`);

        const results: { title: string, transcript: string }[] = [];

        // Processing in batches of 5 to avoid triggering YouTube's anti-bot protections/rate limits
        const BATCH_SIZE = 5;
        for (let i = 0; i < videoIds.length; i += BATCH_SIZE) {
            const batch = videoIds.slice(i, i + BATCH_SIZE);
            console.log(`[BULK_TRANSCRIPT] Processing batch ${i / BATCH_SIZE + 1} (${batch.length} videos)`);

            const batchResults = await Promise.all(batch.map(async (video) => {
                try {
                    const transcript = await YoutubeTranscript.fetchTranscript(video.id);

                    if (!transcript || transcript.length === 0) {
                        return { title: video.title, transcript: "Transcript empty or not provided by YouTube." };
                    }

                    return {
                        title: video.title,
                        transcript: transcript.map(t => `[${Math.floor(t.offset / 1000)}s] ${t.text}`).join("\n")
                    };
                } catch (error: any) {
                    console.error(`[BULK_TRANSCRIPT][ERROR] Video: ${video.id} (${video.title})`, error.message);
                    return { title: video.title, transcript: `Transcript not available. (${error.message || "Unknown error"})` };
                }
            }));

            results.push(...batchResults);

            // Subtle delay between batches if it's a large playlist
            if (i + BATCH_SIZE < videoIds.length) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }

        return results;
    } catch (error: any) {
        console.error("[SECURITY][BULK_TRANSCRIPT_ERROR]", error.message);
        throw new Error("Failed to fetch bulk transcripts.");
    }
}

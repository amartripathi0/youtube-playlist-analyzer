"use server";

/**
 * YouTube Playlist Analyzer - Server Actions
 * Security: These actions run exclusively on the server.
 * Secrets: YT_API_KEY is isolated here and never exposed to the client.
 */

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

export async function getVideoDurationsAction(playlistAllVideosIdArray: string[]) {
    try {
        // 1. Strict Input Validation
        if (!playlistAllVideosIdArray || !Array.isArray(playlistAllVideosIdArray)) {
            throw new Error("Invalid Input: Array expected");
        }

        // 2. Deep Sanitization of IDs
        const safeIds = playlistAllVideosIdArray.filter(id => typeof id === 'string' && isValidId(id));

        // 3. Enforcement of Limits (Server-side)
        const limitedIds = safeIds.slice(0, 250);

        const batches: string[][] = [];
        for (let i = 0; i < limitedIds.length; i += 50) {
            batches.push(limitedIds.slice(i, i + 50));
        }

        const fetchDurations = async (idBatch: string[]) => {
            const ids = idBatch.join(",");
            const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ids}&key=${API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                console.error(`[SECURITY][YT_API_ERROR] ${data?.error?.message || "Unknown error"}`);
                throw new Error("YouTube API communication failure.");
            }

            return data.items.map(
                ({ contentDetails: { duration } }: { contentDetails: { duration: string } }) => duration
            );
        };

        const results = await Promise.all(batches.map(fetchDurations));
        return results.flat();
    } catch (error: any) {
        console.error("[SECURITY][INTERNAL_ERROR]", error.message);
        throw new Error("Security check failed: Data processing stopped.");
    }
}

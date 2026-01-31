import React, { useState, useMemo } from "react";
import { VideoMetadata, TranscriptItem, SortOrder } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { BsSearch, BsSortDown, BsShieldCheck, BsCcSquare, BsDownload, BsFileEarmarkArrowDown, BsFileText } from "react-icons/bs";
import { getTranscriptAction, getBulkTranscriptsAction } from "@/app/actions";
import { toast } from "sonner";
import { BeatLoader } from "react-spinners";
import Image from "next/image";
import AdUnit from "./AdUnit";

interface VideoExplorerProps {
    videos: VideoMetadata[];
    sortOrder: SortOrder;
    onSortChange: (order: SortOrder) => void;
}

export default function VideoExplorer({ videos, sortOrder, onSortChange }: VideoExplorerProps) {
    const [search, setSearch] = useState("");
    const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());

    const filteredAndSortedVideos = useMemo(() => {
        let result = [...videos];

        // Search filter
        if (search) {
            result = result.filter((v) =>
                v.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Sort logic
        const durationToSec = (dur: string) => {
            const match = dur.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
            if (!match) return 0;
            const h = parseInt(match[1] || "0", 10);
            const m = parseInt(match[2] || "0", 10);
            const s = parseInt(match[3] || "0", 10);
            return h * 3600 + m * 60 + s;
        };

        switch (sortOrder) {
            case "shortest":
                result.sort((a, b) => durationToSec(a.duration) - durationToSec(b.duration));
                break;
            case "longest":
                result.sort((a, b) => durationToSec(b.duration) - durationToSec(a.duration));
                break;
            case "az":
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "za":
                result.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                // Already in playlist order
                break;
        }

        return result;
    }, [videos, search, sortOrder]);

    const handleDownloadThumbnail = async (url: string, title: string) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_thumbnail.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Failed to download thumbnail:", error);
        }
    };

    const handleDownloadTranscript = async (videoId: string, title: string) => {
        if (loadingIds.has(videoId)) return;

        setLoadingIds(prev => new Set(prev).add(videoId));
        const loadingToast = toast.loading(`Fetching transcript for "${title}"...`);
        try {
            const transcript = await getTranscriptAction(videoId);
            if (!transcript || transcript.length === 0) {
                toast.error("Captions are disabled or not available for this video.", { id: loadingToast });
                return;
            }

            const transcriptText = (transcript as TranscriptItem[])
                .map((t) => `[${Math.floor(t.offset / 1000)}s] ${t.text}`)
                .join("\n");

            const blob = new Blob([transcriptText], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_transcript.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            toast.success("Transcript downloaded successfully!", { id: loadingToast });
        } catch (error) {
            console.error("Failed to download transcript:", error);
            toast.error("An error occurred while fetching the transcript.", { id: loadingToast });
        } finally {
            setLoadingIds(prev => {
                const next = new Set(prev);
                next.delete(videoId);
                return next;
            });
        }
    };

    const handleBulkDownloadTranscripts = async () => {
        const videosWithCaptions = filteredAndSortedVideos.filter(v => v.caption);
        if (videosWithCaptions.length === 0) {
            toast.error("No videos in the current view have captions available.");
            return;
        }

        const loadingToast = toast.loading(`Fetching scripts for ${videosWithCaptions.length} videos...`);
        try {
            const videoData = videosWithCaptions.map(v => ({ id: v.id, title: v.title }));
            const results = await getBulkTranscriptsAction(videoData);

            if (!results || results.length === 0) {
                toast.error("Failed to fetch transcripts.", { id: loadingToast });
                return;
            }

            const combinedText = results
                .map(res => `========================================\nVIDEO: ${res.title}\n========================================\n\n${res.transcript}\n\n`)
                .join("\n");

            const blob = new Blob([combinedText], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `bulk_transcripts_${new Date().getTime()}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            toast.success("All transcripts downloaded!", { id: loadingToast });
        } catch (error) {
            console.error("Bulk download failed:", error);
            toast.error("An error occurred during bulk download.", { id: loadingToast });
        }
    };

    const handleExportCSV = () => {
        const headers = ["ID", "Title", "Duration", "Quality", "Captions", "Thumbnail URL", "YouTube URL"];
        const rows = filteredAndSortedVideos.map((v: VideoMetadata) => [
            v.id,
            `"${v.title.replace(/"/g, '""')}"`,
            v.duration.replace("PT", ""),
            v.definition.toUpperCase(),
            v.caption ? "Yes" : "No",
            v.thumbnail,
            `https://youtube.com/watch?v=${v.id}`
        ]);

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `playlist_analysis_${new Date().getTime()}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col md:flex-row flex-wrap gap-4 items-center justify-between bg-secondary/10 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                <div className="flex flex-1 flex-wrap gap-4 items-center min-w-0 w-full">
                    <div className="relative w-full md:flex-grow lg:max-w-md min-w-[200px]">
                        <BsSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search videos..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-secondary/30 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-inter"
                        />
                    </div>

                    <button
                        onClick={handleExportCSV}
                        className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl border border-primary/20 transition-all text-sm font-bold group"
                    >
                        <BsFileEarmarkArrowDown className="group-hover:scale-110 transition-transform" />
                        <span>EXPORT CSV</span>
                    </button>

                    <button
                        onClick={handleBulkDownloadTranscripts}
                        className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-xl border border-green-500/20 transition-all text-sm font-bold group"
                    >
                        <BsFileText className="group-hover:scale-110 transition-transform" />
                        <span>DOWNLOAD ALL SCRIPTS</span>
                    </button>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <BsSortDown className="text-muted-foreground" />
                    <select
                        value={sortOrder}
                        onChange={(e) => onSortChange(e.target.value as SortOrder)}
                        className="bg-secondary/30 border border-white/10 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer pr-10 relative w-full"
                    >
                        <option value="default">Default Order</option>
                        <option value="shortest">Shortest First</option>
                        <option value="longest">Longest First</option>
                        <option value="az">Title A-Z</option>
                        <option value="za">Title Z-A</option>
                    </select>
                </div>

                <div className="flex flex-col gap-3 w-full md:hidden">
                    <button
                        onClick={handleExportCSV}
                        className="flex w-full items-center justify-center gap-2 px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl border border-primary/20 transition-all text-sm font-bold"
                    >
                        <BsFileEarmarkArrowDown />
                        <span>EXPORT CSV</span>
                    </button>
                    <button
                        onClick={handleBulkDownloadTranscripts}
                        className="flex w-full items-center justify-center gap-2 px-4 py-2.5 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-xl border border-green-500/20 transition-all text-sm font-bold"
                    >
                        <BsFileText />
                        <span>DOWNLOAD ALL SCRIPTS</span>
                    </button>
                </div>
            </div>

            <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredAndSortedVideos.map((video: VideoMetadata, index: number) => (
                            <React.Fragment key={video.id}>
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: Math.min(index * 0.05, 0.5), duration: 0.4 }}
                                    className="group flex flex-col bg-secondary/20 rounded-2xl border border-white/5 overflow-hidden hover:border-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/5 relative"
                                >
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image
                                            src={video.thumbnail}
                                            alt={video.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-2 right-2 flex gap-2 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            <button
                                                onClick={() => handleDownloadThumbnail(video.thumbnail, video.title)}
                                                className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white hover:bg-primary transition-colors hover:scale-110 active:scale-95"
                                                title="Download Thumbnail"
                                            >
                                                <BsDownload size={14} />
                                            </button>
                                            {video.caption && (
                                                <button
                                                    onClick={() => handleDownloadTranscript(video.id, video.title)}
                                                    className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white hover:bg-green-500 transition-colors hover:scale-110 active:scale-95"
                                                    title="Download Transcript"
                                                >
                                                    <BsFileText size={14} />
                                                </button>
                                            )}
                                        </div>
                                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 backdrop-blur-md rounded text-[10px] font-black text-white uppercase tracking-tighter">
                                            {video.duration.replace("PT", "").replace("H", "H ").replace("M", "M ").replace("S", "S")}
                                        </div>
                                    </div>

                                    <div className="p-4 flex flex-col gap-3 flex-1">
                                        <h3 className="text-xs font-bold line-clamp-2 min-h-[2.5rem] leading-relaxed group-hover:text-primary transition-colors">
                                            {video.title}
                                        </h3>

                                        <div className="flex items-center gap-4 mt-auto">
                                            <div className={`flex items-center gap-1.5 ${video.definition === 'hd' ? 'text-blue-400' : 'text-muted-foreground/40'}`}>
                                                <BsShieldCheck size={12} />
                                                <span className="text-[9px] font-black uppercase tracking-widest">{video.definition}</span>
                                            </div>
                                            {video.caption && (
                                                <div className="flex items-center gap-1.5 text-green-400">
                                                    <BsCcSquare size={12} />
                                                    <span className="text-[9px] font-black uppercase tracking-widest">CC</span>
                                                </div>
                                            )}
                                        </div>

                                        {video.caption ? (
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleDownloadTranscript(video.id, video.title);
                                                }}
                                                disabled={loadingIds.has(video.id)}
                                                className="mt-2 w-full flex items-center justify-center gap-2 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-lg border border-green-500/20 transition-all text-[10px] font-black uppercase tracking-widest group/dl-btn"
                                            >
                                                {loadingIds.has(video.id) ? (
                                                    <BeatLoader size={4} color="currentColor" />
                                                ) : (
                                                    <>
                                                        <BsFileText size={12} className="group-hover/dl-btn:scale-110 transition-transform" />
                                                        DOWNLOAD SCRIPT
                                                    </>
                                                )}
                                            </button>
                                        ) : (
                                            <div className="mt-2 w-full flex items-center justify-center gap-2 py-2 bg-secondary/10 text-muted-foreground/40 rounded-lg border border-white/5 text-[9px] font-black uppercase tracking-widest cursor-default">
                                                <BsFileText size={12} className="opacity-20" />
                                                Captions not available
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                                {(index + 1) % 8 === 0 && (
                                    <div className="md:col-span-1 border border-white/5 bg-white/[0.02] rounded-3xl p-4 flex flex-col items-center justify-center min-h-[150px] sm:min-h-[250px]">
                                        <AdUnit
                                            slot="1122334455"
                                            format="fluid"
                                            minHeight="150px"
                                            className="my-0"
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {filteredAndSortedVideos.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
                    <p className="text-sm font-medium">No videos found matching your search.</p>
                </div>
            )}
        </div>
    );
}

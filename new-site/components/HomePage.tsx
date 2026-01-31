"use client";
import { ChangeEvent, useEffect, useState, useRef, useCallback } from "react";
import {
  checkPlaylistLinkValidity,
  getAllVideosIdInPlaylist,
  getEachVideoMetadataArray,
  getPlaylistId,
  getPlaylistInsights,
  getTotalTimeDuration,
  getVideoDurationInDiffSpeed,
} from "@/utils";
import { PiVideoLight } from "react-icons/pi";
import { BsArrowRight, BsYoutube, BsLightningCharge, BsShieldCheck, BsCcSquare, BsGrid3X3Gap } from "react-icons/bs";
import PlaybackSpeedWatchtime from "./playback-speed-watchtime";
import VideoRangeInput from "./video-range-input";
import VideoExplorer from "./VideoExplorer";
import AdUnit from "./AdUnit";
import { toast } from "sonner";
import { ScaleLoader } from "react-spinners";
import { TotalTimeDurationType, VidPlaybackTimeInDiffSpeedType, VideoMetadata, PlaylistInsights, SortOrder } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

function HomePage() {
  const [playlistLink, setPlaylistLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [channelName, setChannelName] = useState<string>("");
  const [allVideosId, setAllVideosId] = useState<string[]>([]);
  const [allVideosMetadata, setAllVideosMetadata] = useState<VideoMetadata[]>([]);
  const [startVideoNumber, setStartVideoNumber] = useState<number>(1);
  const [endVideoNumber, setEndVideoNumber] = useState<number>(1);
  const [totalVideosInPlaylist, setTotalVideosInPlaylist] = useState<number>(0);
  const [totalTimeDurationOfPlaylist, setTotalTimeDurationOfPlaylist] =
    useState<TotalTimeDurationType>({ hr: 0, min: 0, sec: 0 });
  const [vidPlaybackTimeInDiffSpeed, setVidPlaybackTimeInDiffSpeed] =
    useState<VidPlaybackTimeInDiffSpeedType>({});
  const [playlistInsights, setPlaylistInsights] = useState<PlaylistInsights | null>(null);
  const [showVideoPlaybackDuration, setShowVideoPlaybackDuration] =
    useState<boolean>(false);
  const [playlistInputChanged, setPlaylistInputChanged] =
    useState<boolean>(false);
  const [endVideoInputChanged, setEndVideoInputChanged] =
    useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showVideoPlaybackDuration && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [showVideoPlaybackDuration]);

  const handlePlaylistDataProcessing = useCallback(async (
    totalVideosUnits: number,
    startOverride?: number,
    endOverride?: number
  ) => {
    try {
      const metadataArray = await getEachVideoMetadataArray(allVideosId);
      setAllVideosMetadata(metadataArray);

      const start = startOverride ?? startVideoNumber;
      const end = endOverride ?? endVideoNumber;

      const totalTimeDuration = getTotalTimeDuration(
        metadataArray,
        start,
        end,
        totalVideosUnits
      );
      setTotalTimeDurationOfPlaylist(totalTimeDuration);

      const insights = getPlaylistInsights(
        metadataArray,
        start,
        end,
        totalVideosUnits
      );
      setPlaylistInsights(insights);

      const playbackTimeInDiffSpeed =
        getVideoDurationInDiffSpeed(totalTimeDuration);
      setVidPlaybackTimeInDiffSpeed(playbackTimeInDiffSpeed);
      setShowVideoPlaybackDuration(true);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : "Error processing playlist data.";
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  }, [allVideosId, startVideoNumber, endVideoNumber]);

  const handleFetchAndStoreVideoId = useCallback(async () => {
    setIsLoading(true);
    const isPlayListLinkValid = checkPlaylistLinkValidity(playlistLink);
    if (!isPlayListLinkValid) {
      toast.error("Please enter a valid youtube playlist link.");
      setIsLoading(false);
      return;
    }

    if (startVideoNumber > endVideoNumber) {
      toast.error("From Video Number cannot be greater than To Video Number.");
      setIsLoading(false);
      return;
    }

    const playlistId = getPlaylistId(playlistLink);

    if (allVideosId.length === 0 || playlistInputChanged) {
      try {
        const { playlistAllVideosIdArray, channelTitle } =
          await getAllVideosIdInPlaylist(playlistId);

        if (playlistAllVideosIdArray.length === 250) {
          toast.info("Limit reached: Analyzing the first 250 videos.");
        }

        setAllVideosId(playlistAllVideosIdArray);
        setChannelName(channelTitle);
        setPlaylistInputChanged(false);
      } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : "Error fetching video IDs. Please try again.";
        toast.error(errMsg);
        setIsLoading(false);
      }
    } else {
      handlePlaylistDataProcessing(allVideosId.length);
    }
  }, [playlistLink, startVideoNumber, endVideoNumber, allVideosId.length, playlistInputChanged, handlePlaylistDataProcessing]);

  useEffect(() => {
    if (allVideosId.length !== 0) {
      setTotalVideosInPlaylist(allVideosId.length);
      const total = allVideosId.length;
      if (!endVideoInputChanged) {
        setEndVideoNumber(total);
      }
      if (total > 0) {
        handlePlaylistDataProcessing(total, 1, total);
      }
    }
  }, [allVideosId, endVideoInputChanged, handlePlaylistDataProcessing]);

  function handlePlaylistLinkInputChange(e: ChangeEvent<HTMLInputElement>) {
    setPlaylistLink(e.target.value);
    setPlaylistInputChanged(true);
    setStartVideoNumber(1);
    setEndVideoNumber(1);
    setEndVideoInputChanged(false);
  }

  function handleLowerRangeFromInput(e: ChangeEvent<HTMLInputElement>) {
    const val = parseInt(e.target.value, 10);
    if (val <= 0) {
      toast.error("Please enter a valid lower limit.");
    } else if (val > 250) {
      toast.error("Maximum video limit is 250 :(");
      setStartVideoNumber(250);
    } else {
      setStartVideoNumber(val);
    }
  }

  function handleUpperRangeToInput(e: ChangeEvent<HTMLInputElement>) {
    const val = parseInt(e.target.value, 10);
    if (val <= 0) {
      // ignore
    } else if (val > 250) {
      toast.error("Maximum video limit is 250 :(");
      setEndVideoNumber(250);
    } else {
      setEndVideoNumber(val);
      setEndVideoInputChanged(true);
    }
  }

  return (
    <div className="flex flex-col gap-20 max-w-5xl mx-auto px-6 lg:px-8 mt-24 md:mt-40">
      {/* Centered Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center gap-12"
      >
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tightest leading-[0.9] text-foreground">
            YouTube Playlist <br />
            <span className="text-primary italic">Analyzer.</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-muted-foreground font-semibold opacity-70">
            Professional watch-time analytics for any playlist.
            <br className="hidden md:block" />
            No login. No tracking. Pure speed.
          </p>
        </div>

        {/* Focused Input Area */}
        <div className="w-full max-w-3xl relative">
          <div className="absolute inset-x-0 -top-20 -bottom-20 bg-primary/5 blur-[100px] -z-10" />

          <div className="relative group p-1.5 rounded-[2.5rem] bg-border/40 dark:bg-white/5 transition-all duration-700">
            <div className="flex flex-col md:flex-row items-center gap-3 p-2.5 bg-background/95 backdrop-blur-3xl rounded-[2.2rem] shadow-premium">
              <div className="relative flex-grow w-full flex items-center px-6">
                <BsYoutube className="absolute left-6 text-[#FF0000]" size={24} />
                <input
                  type="text"
                  onChange={handlePlaylistLinkInputChange}
                  aria-label="YouTube playlist URL"
                  className="w-full h-16 pl-12 pr-4 text-lg font-bold bg-transparent outline-none text-foreground placeholder:text-muted-foreground/20 transition-all font-inter"
                  placeholder="Paste YouTube playlist URL..."
                  onKeyUp={(e) => e.key === "Enter" && handleFetchAndStoreVideoId()}
                />
              </div>
              <button
                type="button"
                onClick={handleFetchAndStoreVideoId}
                disabled={isLoading}
                aria-label="Analyze YouTube playlist"
                className="w-full md:w-auto px-12 h-16 flex items-center justify-center gap-3 text-sm font-black bg-foreground text-background rounded-full hover:scale-[1.03] active:scale-[0.98] transition-all duration-500 shadow-xl disabled:opacity-50 group/btn"
              >
                {isLoading ? (
                  <ScaleLoader color="currentColor" height={15} width={2} radius={2} margin={1} />
                ) : (
                  <>
                    ANALYZE
                    <BsArrowRight size={22} className="group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Minimal Controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-8 mt-10"
          >
            <div className="flex flex-col items-center gap-1 group/range">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">From</span>
              <VideoRangeInput
                id="from"
                placeholder="1"
                onChange={handleLowerRangeFromInput}
                min={1}
                max={250}
              />
            </div>

            <div className="w-px h-6 bg-border/50" />

            <div className="flex flex-col items-center gap-1 group/range">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">To</span>
              <VideoRangeInput
                id="to"
                min={1}
                max={250}
                placeholder={totalVideosInPlaylist ? totalVideosInPlaylist.toString() : "250"}
                onChange={handleUpperRangeToInput}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Dynamic Results Display */}
      <AnimatePresence mode="wait">
        {showVideoPlaybackDuration ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="pb-32"
          >
            <div ref={resultsRef} className="glass rounded-[3.5rem] p-10 md:p-20 relative overflow-hidden">
              <div className="relative z-10 flex flex-col gap-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div className="flex flex-col gap-4">
                    <p className="text-xs font-black text-primary tracking-[0.4em] uppercase">Results Generated</p>
                    <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tightest leading-tight">{channelName || "Playlist Analyzer"}</h2>
                  </div>
                  <div className="px-8 py-4 rounded-3xl bg-secondary/50 border border-border/40 text-xs font-black text-muted-foreground tracking-widest uppercase">
                    {totalVideosInPlaylist} VIDEOS
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <p className="text-xs font-black text-muted-foreground/50 uppercase tracking-[0.4em]">Total Runtime</p>
                  <div className="flex flex-wrap items-baseline gap-x-12 gap-y-6 text-foreground tracking-tight">
                    <div className="flex items-baseline gap-3">
                      <span className="text-6xl md:text-8xl font-black">{totalTimeDurationOfPlaylist.hr}</span>
                      <span className="text-xs font-black text-muted-foreground/40 uppercase tracking-widest">HR</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-6xl md:text-8xl font-black">{totalTimeDurationOfPlaylist.min}</span>
                      <span className="text-xs font-black text-muted-foreground/40 uppercase tracking-widest">MIN</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-6xl md:text-8xl font-black">{totalTimeDurationOfPlaylist.sec}</span>
                      <span className="text-xs font-black text-muted-foreground/40 uppercase tracking-widest">SEC</span>
                    </div>
                  </div>
                </div>

                {playlistInsights && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/5">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex flex-col gap-2"
                    >
                      <div className="flex items-center gap-2 text-primary">
                        <BsLightningCharge size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Average Length</span>
                      </div>
                      <p className="text-xl font-bold">
                        {playlistInsights.avgDuration.hr > 0 && `${playlistInsights.avgDuration.hr}h `}
                        {playlistInsights.avgDuration.min}m {playlistInsights.avgDuration.sec}s
                      </p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex flex-col gap-2"
                    >
                      <div className="flex items-center gap-2 text-blue-400">
                        <BsShieldCheck size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">HD CONTENT</span>
                      </div>
                      <p className="text-xl font-bold">{Math.round(playlistInsights.hdPercentage)}%</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex flex-col gap-2"
                    >
                      <div className="flex items-center gap-2 text-green-400">
                        <BsCcSquare size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">CAPTIONS</span>
                      </div>
                      <p className="text-xl font-bold">{Math.round(playlistInsights.captionPercentage)}%</p>
                    </motion.div>
                  </div>
                )}

                <AdUnit
                  slot="1234567890"
                  className="mt-4"
                  minHeight="100px"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <PlaybackSpeedWatchtime speed="1.25" vidPlaybackTimeInDiffSpeed={vidPlaybackTimeInDiffSpeed} />
                  <PlaybackSpeedWatchtime speed="1.5" vidPlaybackTimeInDiffSpeed={vidPlaybackTimeInDiffSpeed} />
                  <PlaybackSpeedWatchtime speed="1.75" vidPlaybackTimeInDiffSpeed={vidPlaybackTimeInDiffSpeed} />
                  <PlaybackSpeedWatchtime speed="2" vidPlaybackTimeInDiffSpeed={vidPlaybackTimeInDiffSpeed} />
                </div>

                {allVideosMetadata.length > 0 && (
                  <div className="flex flex-col gap-8 pt-12 mt-12 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                        <BsGrid3X3Gap size={20} />
                      </div>
                      <div className="flex flex-col">
                        <h2 className="text-xl font-black tracking-tight">Video Explorer</h2>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Browse and sort playlist content</p>
                      </div>
                    </div>
                    <VideoExplorer
                      videos={allVideosMetadata}
                      sortOrder={sortOrder}
                      onSortChange={setSortOrder}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[300px] pb-24"
          >
            {isLoading ? (
              <div className="flex flex-col items-center gap-8">
                <ScaleLoader color="var(--primary)" height={50} width={4} />
                <p className="text-[10px] font-black text-primary tracking-[0.6em] uppercase animate-pulse">Processing metadata</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                <PiVideoLight size={100} strokeWidth={1} />
                <p className="text-xs font-black tracking-widest uppercase">Ready to crunch numbers</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HomePage;

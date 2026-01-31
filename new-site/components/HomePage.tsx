"use client";
import { ChangeEvent, useEffect, useState } from "react";
import {
  checkPlaylistLinkValidity,
  getAllVideosIdInPlaylist,
  getEachVideoDurationArray,
  getPlaylistId,
  getTotalTimeDuration,
  getVideoDurationInDiffSpeed,
} from "@/utils";
import { IoMdTime } from "react-icons/io";
import { PiVideoLight } from "react-icons/pi";
import PlaybackSpeedWatchtime from "./playback-speed-watchtime";
import SemiboldSpanContainer from "./Container";
import VideoRangeInput from "./video-range-input";
import { toast } from "sonner";
import { ScaleLoader } from "react-spinners";
import { TotalTimeDurationType, VidPlaybackTimeInDiffSpeedType } from "@/types";

function HomePage() {
  const [playlistLink, setPlaylistLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [channelName, setChannelName] = useState<string>("");
  const [allVideosId, setAllVideosId] = useState<string[]>([]);
  const [startVideoNumber, setStartVideoNumber] = useState(1);
  const [endVideoNumber, setEndVideoNumber] = useState(1);
  const [totalVideosInPlaylist, setTotalVideosInPlaylist] = useState(0);
  const [totalTimeDurationOfPlaylist, setTotalTimeDurationOfPlaylist] =
    useState<TotalTimeDurationType>({ hr: 0, min: 0, sec: 0 });
  const [vidPlaybackTimeInDiffSpeed, setVidPlaybackTimeInDiffSpeed] =
    useState<VidPlaybackTimeInDiffSpeedType>({});
  const [showVideoPlaybackDuration, setShowVideoPlaybackDuration] =
    useState<boolean>(false);
  const [playlistInputChanged, setPlaylistInputChanged] =
    useState<boolean>(false);
  const [endVideoInputChanged, setEndVideoInputChanged] =
    useState<boolean>(false);

  async function handleFetchAndStoreVideoId() {
    setIsLoading(true);
    // check for invalid playlist link
    const isPlayListLinkValid = checkPlaylistLinkValidity(playlistLink);
    if (!isPlayListLinkValid) {
      toast.error("Please enter a valid youtube playlist link.");
      setIsLoading(false);
      return;
    }

    // check for : lower and upper limit video number
    if (startVideoNumber > endVideoNumber) {
      toast.error("From Video Number cannot be greater than To Video Number.");
      setIsLoading(false);
      return;
    }

    // extract playlistID from input playlist link by user
    const playlistId = getPlaylistId(playlistLink);

    // check if the data is fetched for the 1st time or is there any new input to playlist link
    if (allVideosId.length === 0 || playlistInputChanged) {
      // storing array having videoId of all videos in the playlist
      try {
        const { playlistAllVideosIdArray, channelTitle } =
          await getAllVideosIdInPlaylist(playlistId);

        if (playlistAllVideosIdArray.length === 250) {
          toast.info("Limit reached: Analyzing the first 250 videos.");
        }

        setAllVideosId(playlistAllVideosIdArray);
        setChannelName(channelTitle);
        setPlaylistInputChanged(false);
      } catch (error: any) {
        toast.error(error.message || "Error fetching video IDs. Please try again.");
        setIsLoading(false);
      }
    } else {
      handlePlaylistDataProcessing();
    }
  }

  useEffect(() => {
    if (allVideosId.length !== 0) {
      setTotalVideosInPlaylist(allVideosId.length);

      if (!endVideoInputChanged) {
        // default case : no user input for (upper range / to range) of video
        setEndVideoNumber(allVideosId.length);
      }

      if (allVideosId.length > 0) {
        handlePlaylistDataProcessing();
      }
    }
  }, [allVideosId]);

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

  async function handlePlaylistDataProcessing() {
    try {
      const eachVideoDurationArray = await getEachVideoDurationArray(allVideosId);
      const totalTimeDuration = getTotalTimeDuration(
        eachVideoDurationArray,
        startVideoNumber,
        endVideoNumber,
        totalVideosInPlaylist
      );
      setTotalTimeDurationOfPlaylist(totalTimeDuration);

      const playbackTimeInDiffSpeed =
        getVideoDurationInDiffSpeed(totalTimeDuration);
      setVidPlaybackTimeInDiffSpeed(playbackTimeInDiffSpeed);
      setShowVideoPlaybackDuration(true);
    } catch (error: any) {
      toast.error(error.message || "Error processing playlist data.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="mt-4 md:mt-6 lg:mt-10 text-black  mx-6 md:mx-28 lg:mx-64 font-medium flex flex-col gap-4 sm:gap-5 ">
      <div className="flex flex-col gap-2">
        {/* Input Heading:Enter a YouTube playlist link below :-  */}
        <h1 className=" text-base sm:text-lg font-semibold">
          YouTube Playlist Duration Analyzer
        </h1>
        <p className="text-sm font-normal opacity-80">
          Enter a YouTube playlist link below to calculate total watch time (up to 250 videos):
        </p>

        {/* Input field and Analyze button */}
        <div className="flex items-center justify-between rounded border-neutral-400 focus-within:border-purple-800 border-2 overflow-hidden shadow-sm">
          <input
            type="text"
            onChange={handlePlaylistLinkInputChange}
            className="outline-none w-full h-10 sm:h-12 text-xs sm:text-sm px-4 rounded-l-md font-normal text-clip bg-neutral-100"
            placeholder="https://www.youtube.com/playlist?list=..."
          />
          <button
            type="button"
            className="px-6 sm:px-8 flex items-center gap-2 h-full text-sm font-bold bg-gradient-to-b from-purple-500 to-pink-400 hover:from-purple-600 hover:to-pink-500 transition-all duration-300 text-white"
            onKeyUp={(e) => e.key === "Enter" && handleFetchAndStoreVideoId()}
            onClick={handleFetchAndStoreVideoId}
          >
            ANALYZE{" "}
            <span className="flex gap-1">
              <IoMdTime size={20} />
            </span>
          </button>
        </div>
      </div>

      <div className="flex items-center text-sm sm:text-base gap-10">
        <div className="flex gap-6 max-sm:justify-between max-sm:w-full pr-5">
          <div className=" flex items-center gap-2 sm:gap-3 ">
            <label htmlFor="from" className="whitespace-nowrap cursor-pointer">From Video:</label>
            <VideoRangeInput
              id="from"
              placeholder="1"
              onChange={handleLowerRangeFromInput}
              min={1}
              max={250}
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <label htmlFor="to" className="whitespace-nowrap cursor-pointer">To Video:</label>
            <VideoRangeInput
              id="to"
              min={1}
              max={250}
              placeholder={totalVideosInPlaylist ? totalVideosInPlaylist.toString() : "250"}
              onChange={handleUpperRangeToInput}
            />
          </div>
        </div>
      </div>

      {showVideoPlaybackDuration ? (
        <div className="font-normal flex flex-col gap-4 sm:gap-5 text-sm sm:text-base min-h-64">
          <div className="flex flex-col gap-1 md:gap-2">
            <h2 className="text-base sm:text-lg">
              Channel Name: <SemiboldSpanContainer text={`${channelName}`} />
            </h2>
            <h2 className="text-base sm:text-lg">
              Total videos analyzed:{" "}
              <SemiboldSpanContainer text={`${totalVideosInPlaylist} videos`} />
            </h2>

            <h2 className="text-base sm:text-lg">
              Length of segment ({startVideoNumber} to {endVideoNumber}):{" "}
              <SemiboldSpanContainer
                text={`${totalTimeDurationOfPlaylist.hr} hours, ${totalTimeDurationOfPlaylist.min} minutes, ${totalTimeDurationOfPlaylist.sec} seconds.`}
              />
            </h2>
          </div>

          {/*Watchtime at various Playback Speeds */}
          <div className="flex flex-col gap-2 pt-2">
            <h3 className="font-semibold opacity-70">Watch time at different speeds:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <PlaybackSpeedWatchtime
                speed="1.25"
                vidPlaybackTimeInDiffSpeed={vidPlaybackTimeInDiffSpeed}
              />
              <PlaybackSpeedWatchtime
                speed="1.5"
                vidPlaybackTimeInDiffSpeed={vidPlaybackTimeInDiffSpeed}
              />
              <PlaybackSpeedWatchtime
                speed="1.75"
                vidPlaybackTimeInDiffSpeed={vidPlaybackTimeInDiffSpeed}
              />
              <PlaybackSpeedWatchtime
                speed="2"
                vidPlaybackTimeInDiffSpeed={vidPlaybackTimeInDiffSpeed}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-64 flex justify-center items-center">
          {isLoading ? (
            <div className="opacity-70 flex flex-col items-center">
              <ScaleLoader color="#6b21a8" />
              <p className="text-purple-900 mt-2 font-medium">Analyzing playlist...</p>
            </div>
          ) : (
            <div className="text-center text-neutral-500 max-w-sm">
              <p>Ready to analyze. Paste a link above to get started.</p>
            </div>
          )}
        </div>
      )}
      {/* NEW: SEO/GEO Optimization Section */}
      <section className="mt-16 mb-24 border-t border-neutral-200 pt-12 text-neutral-800">
        <div className="flex flex-col gap-10">
          {/* How it Works - Targeted for AI 'How-to' summaries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-purple-900">How to Calculate YouTube Playlist Duration?</h2>
              <ol className="list-decimal list-inside flex flex-col gap-2 opacity-90 leading-relaxed font-normal">
                <li>Copy the URL of any public YouTube playlist.</li>
                <li>Paste the link into the analyzer input above.</li>
                <li>Click <strong>ANALYZE</strong> to fetch all video durations.</li>
                <li>Adjust the <strong>From</strong> and <strong>To</strong> range if you only need to analyze a segment.</li>
                <li>Instantly see the total time and adjusted watch times for different playback speeds.</li>
              </ol>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-purple-900">Why use this Analyzer?</h2>
              <ul className="list-disc list-inside flex flex-col gap-2 opacity-90 leading-relaxed font-normal">
                <li><strong>250 Video Support:</strong> Most tools are limited to 50 videos; we process up to 250 in seconds.</li>
                <li><strong>Speed Savings:</strong> See exactly how much time you save by watching at 1.5x or 2x speed.</li>
                <li><strong>Precision:</strong> Uses batch-processed YouTube API calls for the most accurate data.</li>
                <li><strong>Privacy:</strong> No login or data collection required.</li>
              </ul>
            </div>
          </div>

          {/* FAQ Section - Targeted for Google 'People Also Ask' and chatbot answers */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-center text-purple-900">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white rounded-lg shadow-sm border border-neutral-100">
                <h3 className="font-bold text-lg mb-2">Can I analyze private playlists?</h3>
                <p className="font-normal opacity-80 text-sm">No, the analyzer only works with public or unlisted playlists that are accessible via the YouTube API.</p>
              </div>
              <div className="p-5 bg-white rounded-lg shadow-sm border border-neutral-100">
                <h3 className="font-bold text-lg mb-2">Does it count the length of "Shorts"?</h3>
                <p className="font-normal opacity-80 text-sm">Yes, if a Short is part of the playlist, its full duration is included in the total calculation.</p>
              </div>
              <div className="p-5 bg-white rounded-lg shadow-sm border border-neutral-100">
                <h3 className="font-bold text-lg mb-2">Is there an API limit?</h3>
                <p className="font-normal opacity-80 text-sm">The free tool supports up to 250 videos per analysis to ensure fast responses and API quota efficiency.</p>
              </div>
              <div className="p-5 bg-white rounded-lg shadow-sm border border-neutral-100">
                <h3 className="font-bold text-lg mb-2">How do speed calculations work?</h3>
                <p className="font-normal opacity-80 text-sm">We divide the total seconds by the speed multiplier (e.g., 1.5) to give you the exact minutes you'll spend watching.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

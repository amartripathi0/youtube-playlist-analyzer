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
    if (!isPlayListLinkValid)
      toast.error("Please enter a valid youtube playlist link.");
    // check for : lower and upper limit video number
    else if (startVideoNumber > endVideoNumber) {
      toast.error("From Video Number cannot be greater than To Video Number.");
    } else {
      // extract playlistID from input playlist link by user
      const playlistId = getPlaylistId(playlistLink);

      // check if the data is fetched for the 1st time or is there any new input to playlist link
      if (allVideosId.length === 0 || playlistInputChanged) {
        // storing array having videoId of all videos in the playlist
        try {
          const { playlistAllVideosIdArray, channelTitle } =
            await getAllVideosIdInPlaylist(playlistId);

          setAllVideosId(playlistAllVideosIdArray);
          setChannelName(channelTitle);
        } catch {
          toast.error("Error fetching video IDs. Please try again.");
        }
      } else {
        /*if there is already playlist data stored in the state then there is no need to 
          fetch again, this reduces number of api calls
        */
        handlePlaylistDataProcessing();
      }
    }
  }

  useEffect(() => {
    if (allVideosId.length !== 0) {
      setTotalVideosInPlaylist(allVideosId.length);

      if (!endVideoInputChanged) {
        // default case : no user input for (upper range / to range) of video
        setEndVideoNumber(allVideosId.length);
      }

      if (totalVideosInPlaylist > 0) {
        handlePlaylistDataProcessing();
        // console.log("from" , startVideoNumber , endVideoNumber);
      }
    }
  }, [allVideosId, totalVideosInPlaylist]);

  function handlePlaylistLinkInputChange(e: ChangeEvent<HTMLInputElement>) {
    setPlaylistLink(e.target.value);
    setPlaylistInputChanged(true);
    setStartVideoNumber(1);
    setEndVideoNumber(1);
    setEndVideoInputChanged(false);
  }
  function handleLowerRangeFromInput(e: ChangeEvent<HTMLInputElement>) {
    if (parseInt(e.target.value) <= 0) {
      toast.error("Please enter a valid lower limit.");
    } else if (parseInt(e.target.value) > 50) {
      toast.error("Maximum video limit is 50 :(");
      setStartVideoNumber(50);
    } else {
      setStartVideoNumber(parseInt(e.target.value, 10));
    }
  }
  function handleUpperRangeToInput(e: ChangeEvent<HTMLInputElement>) {
    if (parseInt(e.target.value) <= 0) {
      // toast.error("Please enter a valid upper limit.", {});
    } else if (parseInt(e.target.value) > 50) {
      // toast.error("Maximum video limit is 50 :(", {});
      setEndVideoNumber(50);
    } else {
      setEndVideoNumber(parseInt(e.target.value, 10));
      setEndVideoInputChanged(true);
    }
  }

  async function handlePlaylistDataProcessing() {
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
    setIsLoading(false);
    // console.log(showVideoPlaybackDuration);
    // console.log(endVideoNumber);
    // console.log(setTotalTimeDurationOfPlaylist);
  }
  return (
    <div className="mt-4 md:mt-6 lg:mt-10 text-black  mx-6 md:mx-28 lg:mx-64 font-medium flex flex-col gap-4 sm:gap-5 ">
      <div className="flex flex-col gap-2">
        {/* Input Heading:Enter a YouTube playlist link below :-  */}
        <h1 className=" text-sm sm:text-base">
          Enter a YouTube playlist link below:-
        </h1>

        {/* Input field and Analyze button */}
        <div className="flex items-center justify-between  rounded border-neutral-400 focus-within:border-purple-800 border-2">
          <input
            type="text"
            onChange={handlePlaylistLinkInputChange}
            className="outline-none w-full h-8 sm:h-10 text-xs sm:text-sm px-2 sm:px-3 rounded-md font-normal text-clip bg-neutral-100"
            placeholder="https://www.youtube.com/playlist?list=PL3Y15344T8045DroPBjkYJQCz9tndR17tSSmG"
          />
          <button
            className="p-2.5 sm:px-4 flex items-center gap-1 sm:gap-2 h-full text-sm bg-gradient-to-b from-purple-400 to-pink-300 hover:from-purple-500 hover:to-pink-400 transition-all duration-300 text-neutral-800 hover-text-neutral-950"
            onKeyUp={(e) => e.key === "Enter" && handleFetchAndStoreVideoId()}
            onClick={handleFetchAndStoreVideoId}
          >
            Analyze{" "}
            <span className="flex gap-1">
              <PiVideoLight size={20} className="max-sm:hidden" />{" "}
              <IoMdTime size={18} />
            </span>
          </button>
        </div>
      </div>

      <div className="flex items-center text-sm sm:text-base gap-10">
        <div className="flex gap-6 max-sm:justify-between max-sm:w-full pr-5">
          <div className=" flex items-center gap-2 sm:gap-3 ">
            <label htmlFor="from">From : </label>
            <VideoRangeInput
              placeholder="1"
              onChange={handleLowerRangeFromInput}
              min={1}
              max={50}
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <label htmlFor="to">To : </label>
            <VideoRangeInput
              min={1}
              max={50}
              placeholder={totalVideosInPlaylist.toString() || "50"}
              onChange={handleUpperRangeToInput}
            />
          </div>
        </div>
      </div>

      {showVideoPlaybackDuration ? (
        <div className="font-normal flex flex-col gap-4 sm:gap-5  text-sm sm:text-base h-64 md:h-80">
          <div className="flex flex-col gap-1 md:gap-2">
            <h1>
              Channel Name : <SemiboldSpanContainer text={`${channelName}`} />
            </h1>
            <h1>
              Total videos in the playlist :{" "}
              <SemiboldSpanContainer text={`${totalVideosInPlaylist} videos`} />
            </h1>

            <h1>
              Length of playlist from video no.{" "}
              <SemiboldSpanContainer text={startVideoNumber.toString()} /> to{" "}
              <SemiboldSpanContainer text={endVideoNumber.toString()} /> is :{" "}
              <SemiboldSpanContainer
                text={`${totalTimeDurationOfPlaylist.hr} hours, ${totalTimeDurationOfPlaylist.min} minutes, ${totalTimeDurationOfPlaylist.sec} seconds.`}
              />
            </h1>
          </div>

          {/*Watchtime at various Playback Speeds */}
          <div className="flex flex-col gap-1 sm:gap-2">
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

          {/* mob screen about */}
          {/* <p className="p-2 rounded-md bg-slate-200 font-normal text-sm sm:text-base text-neutral-950 mb-14 sm:mb-16 xl:hidden">
            YouTube Playlist Analyzer evaluates your playlist&apos;s total
            duration, then breaks down viewing times at speeds of 1.25x, 1.5x,
            1.75x, and 2x. Streamline your viewing experience and optimize your
            binge-watching sessions with precise insights!
          </p> */}
        </div>
      ) : (
        <div className="h-80 flex justify-center pt-16">
          {isLoading &&
          <div className="opacity-70 flex flex-col">
            <ScaleLoader className="mx-auto w-fit" />
            <p className="text-purple-900">Fetching data..</p>
          </div>
          }
        </div>
      )}
    </div>
  );
}

export default HomePage;

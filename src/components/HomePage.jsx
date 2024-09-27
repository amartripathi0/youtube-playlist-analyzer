import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getAllVideosIdInPlaylist,
  getEachVideoDurationArray,
  getPlaylistId,
  getTotalTimeDuration,
  getVideoDurationInDiffSpeed,
} from "../utils";
import { IoMdTime } from "react-icons/io";
import { PiVideoLight } from "react-icons/pi";
import PlaybackSpeedWatchtime from "./playback-speed-watchtime";
import SemiboldSpanContainer from "./Container";
import VideoRangeInput from "./video-range-input";

function HomePage() {
  const [playlistLink, setPlaylistLink] = useState("");
  const [channelName, setChannelName] = useState("");
  const [allVideosId, setAllVideosId] = useState([]);
  const [startVideoNumber, setStartVideoNumber] = useState(1);
  const [endVideoNumber, setEndVideoNumber] = useState(1);
  const [totalVideosInPlaylist, setTotalVideosInPlaylist] = useState(0);
  const [totalTimeDurationOfPlaylist, setTotalTimeDurationOfPlaylist] =
    useState({});
  const [vidPlaybackTimeInDiffSpeed, setVidPlaybackTimeInDiffSpeed] = useState(
    {}
  );
  const [showVideoPlaybackDuration, setShowVideoPlaybackDuration] =
    useState(false);
  const [playlistInputChanged, setPlaylistInputChanged] = useState(false);
  const [endVideoInputChanged, setEndVideoInputChanged] = useState(false);
  const API_KEY = import.meta.env.VITE_YT_API_KEY;

  async function handleFetchAndStoreVideoId() {
    // check for : invalid playlist link
    if (
      playlistLink.length === 0 ||
      !/https?:\/\/(www\.)?youtube\.com\/playlist\?list=[a-zA-Z0-9_-]+/.test(
        playlistLink
      )
    ) {
      toast.error("Please enter a valid youtube playlist link.", {});
    }
    // check for : lower and upper limit video number
    else if (startVideoNumber > endVideoNumber) {
      toast.error(
        "From Video Number cannot be greater than To Video Number.",
        {}
      );
    } else {
      // extract playlistID from input playlist link by user
      const playlistId = getPlaylistId(playlistLink);

      // if there is new input to playlist link
      if (allVideosId.length === 0 || playlistInputChanged) {
        // storing array having videoId of all videos in the playlist
        try {
          const { playlistAllVideosIdArray, channelTitle } =
            await getAllVideosIdInPlaylist(playlistId, API_KEY);

          setAllVideosId(playlistAllVideosIdArray);
          setChannelName(channelTitle);
        } catch (error) {
          toast.error("Error fetching video IDs. Please try again.", {});
        }
      } else {
        /*if there is already playlist data stored in the state then there is no need to 
          fetch again, this reduces number of api calls, just process the data
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
        setEndVideoNumber(parseInt(allVideosId.length));
      }

      if (totalVideosInPlaylist > 0) {
        handlePlaylistDataProcessing();
        // console.log("from" , startVideoNumber , endVideoNumber);
      }
    }
  }, [allVideosId, totalVideosInPlaylist]);

  function handlePlaylistLinkInputChange(e) {
    setPlaylistLink(e.target.value);
    setPlaylistInputChanged(true);
    setStartVideoNumber(1);
    setEndVideoNumber(1);
    setEndVideoInputChanged(false);
  }
  function handleLowerRangeFromInput(e) {
    if (e.target.value <= 0) {
      toast.error("Please enter a valid lower limit.", {});
    } else if (e.target.value > 50) {
      toast.error("Maximum video limit is 50 :(", {});
      setStartVideoNumber(50);
    } else {
      setStartVideoNumber(parseInt(e.target.value, 10));
    }
  }
  function handleUpperRangeToInput(e) {
    if (e.target.value <= 0) {
      toast.error("Please enter a valid upper limit.", {});
    } else if (e.target.value > 50) {
      toast.error("Maximum video limit is 50 :(", {});
      setEndVideoNumber(50);
    } else {
      setEndVideoNumber(parseInt(e.target.value, 10));
      setEndVideoInputChanged(true);
    }
  }

  async function handlePlaylistDataProcessing() {
    const eachVideoDurationArray = await getEachVideoDurationArray(
      allVideosId,
      API_KEY
    );
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
    // console.log(showVideoPlaybackDuration);
    // console.log(endVideoNumber);
    // console.log(setTotalTimeDurationOfPlaylist);
  }
  return (
    <div className="mt-24 text-black mx-64 font-medium max-sm:px-5 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        {/* Input Heading:Enter a YouTube playlist link below :-  */}
        <h1 className=" text-lg max-sm:text-base">
          Enter a YouTube playlist link below:-
        </h1>

        {/* Input field and Analyze button */}
        <div className="flex items-center justify-between  rounded border-neutral-400 focus-within:border-purple-800 border-2">
          <input
            type="text"
            onChange={handlePlaylistLinkInputChange}
            className="outline-none w-full h-10  text-sm pl-3 rounded-md max-sm:text-sm font-normal text-clip bg-neutral-100"
            placeholder="https://www.youtube.com/playlist?list=PL3Y15344T8045DroPBjkYJQCz9tndR17tSSmG"
          />
          <button
            className="p-2 px-4 flex items-center gap-2 h-full text-sm bg-gradient-to-b to-purple-950 via-neutral-800 border-neutral-400 hover:rounded-r from-black hover:scale-105  duration-150 text-neutral-100"
            onKeyUp={(e) => e.key === "Enter" && handleFetchAndStoreVideoId()}
            onClick={handleFetchAndStoreVideoId}
          >
            Analyze{" "}
            <span className="flex gap-1">
              <PiVideoLight size={20} /> <IoMdTime size={18} />
            </span>
          </button>
        </div>
      </div>

      <div className="flex items-center  text-md gap-10">
        <div className="flex gap-6 max-sm:text-base max-sm:justify-between max-sm:w-full pr-5">
          <div className=" flex items-center  gap-3 ">
            <label htmlFor="from">From : </label>
            <VideoRangeInput
              placeholder="1"
              onChange={handleLowerRangeFromInput}
              min={1}
              max={50}
            />
          </div>

          <div className="flex items-center  gap-3">
            <label htmlFor="from">To : </label>
            <VideoRangeInput
              min={1}
              max={50}
              placeholder={totalVideosInPlaylist ? totalVideosInPlaylist : "50"}
              onChange={handleUpperRangeToInput}
            />
          </div>
        </div>
      </div>

      {showVideoPlaybackDuration && (
        <div className="font-normal flex flex-col gap-5 text-base">
          <div className="flex flex-col gap-2">
            <h1>
              Channel Name :{" "}
              <SemiboldSpanContainer text={`${channelName}`} />
            </h1>
            <h1>
              Total videos in the playlist :{" "}
              <SemiboldSpanContainer text={`${totalVideosInPlaylist} videos`} />
            </h1>

            <h1>
              Length of playlist from video no.{" "}
              <SemiboldSpanContainer text={startVideoNumber} /> to{" "}
              <SemiboldSpanContainer text={endVideoNumber} /> is :{" "}
              <SemiboldSpanContainer
                text={`${totalTimeDurationOfPlaylist.hr} hours, ${totalTimeDurationOfPlaylist.min} minutes, ${totalTimeDurationOfPlaylist.sec} seconds.`}
              />
            </h1>
          </div>

          {/*Watchtime at various Playback Speeds */}
          <div className="flex flex-col gap-2">
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
      )}
    </div>
  );
}

export default HomePage;

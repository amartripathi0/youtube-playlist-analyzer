import { useEffect, useState } from "react";
import Container from "./Container";
import { toast } from "react-toastify";

import {
  getAllVideosIdInPlaylist,
  getEachVideoDurationArray,
  getPlaylistId,
  getTotalTimeDuration,
  getVideoDurationInDiffSpeed,
} from "../utils";
import {  IoMdTime } from "react-icons/io";
import { PiVideoLight } from "react-icons/pi";

function HomePage() {
  const [playlistLink, setPlaylistLink] = useState("");
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
      toast.error("Please enter a valid youtube playlist link.", {
      });
    }
    // check for : lower and upper limit video number
    else if (startVideoNumber > endVideoNumber) {
      toast.error("From Video Number cannot be greater than To Video Number.", {
      });
    } else {
      // extract playlistID from input playlist link by user
      const playlistId = getPlaylistId(playlistLink);

      // if there is new input to playlist link
      if (allVideosId.length === 0 || playlistInputChanged) {
        // storing array having videoId of all videos in the playlist
        try {
          const playlistAllVideosIdArray = await getAllVideosIdInPlaylist(
            playlistId,
            API_KEY
          );

          setAllVideosId(playlistAllVideosIdArray);
        } catch (error) {
          toast.error("Error fetching video IDs. Please try again.", {
              });
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
      toast.error("Please enter a valid lower limit.", {
      });
    }
     else if (e.target.value > 50) {
       toast.error("Maximum video limit is 50 :(", {
        });
       setStartVideoNumber(50);
    } 
     else {
      setStartVideoNumber(parseInt(e.target.value, 10));
    }
  }
  function handleUpperRangeToInput(e) {
    if (e.target.value <= 0) {
      toast.error("Please enter a valid upper limit.", {
      });
    } 
    else if (e.target.value > 50) {
       toast.error("Maximum video limit is 50 :(", {
        });
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
  }
  return (
    <div className="mt-24 text-black font-semibold mx-48 max-sm:px-5 flex flex-col gap-4">
      {/* Input Heading:Enter YouTube playlist link below :-  */}
      <h1 className=" text-xl max-sm:text-base">
        Enter a YouTube playlist link below-
      </h1>

      {/* Input field and Analyze button */}
      <div className="flex items-center justify-between  rounded border border-red-900">
        <input
          type="text"
          onChange={handlePlaylistLinkInputChange}
          className="outline-none w-full h-10  text-sm pl-3 rounded-md max-sm:text-sm  text-clip "
          placeholder="https://www.youtube.com/playlist?list=PL3Y15344T8045DroPBjkYJQCz9tndR17tSSmG"
        />
        <button
          className="p-2 px-4 flex items-center gap-2 h-full text-sm bg-gradient-to-b to-purple-900 via-neutral-800 border-neutral-400 rounded-r from-black hover:scale-105  duration-150 text-neutral-100"
          onKeyUp={(e) => e.key === "Enter" && handleFetchAndStoreVideoId()}
          onClick={handleFetchAndStoreVideoId}
        >
          Analyze{" "}
          <span className="flex gap-1">
            <PiVideoLight size={20} /> <IoMdTime size={18} />
          </span>
        </button>
      </div>

      <div className="flex items-center  text-md gap-10">
        <div className="flex gap-6 max-sm:text-base max-sm:justify-between max-sm:w-full pr-5">
          <div className=" flex items-center  gap-3 ">
            <label htmlFor="from">From : </label>
            <input
              type="number"
              className="border-2  border-black w-16 h-9   pl-3 rounded-md  flex  text-md max-sm:text-sm"
              placeholder="1"
              onChange={handleLowerRangeFromInput}
              min={1}
              max={50}
            />
          </div>

          <div className="flex items-center  gap-3">
            <label htmlFor="from">To : </label>
            <input
              min={1}
              max={50}
              type="number"
              className="border-2  border-black w-16 h-9   pl-3 rounded-md  flex  text-md max-sm:text-sm"
              placeholder={totalVideosInPlaylist ? totalVideosInPlaylist : "50"}
              onChange={handleUpperRangeToInput}
            />
          </div>
        </div>
      </div>

      {showVideoPlaybackDuration && (
        <div className=" w-[100%]  mr-10 font-medium flex flex-col gap-3 text-md max-sm:text-base">
          <h1>
            Total videos in the playlist :{" "}
            <Container text={totalVideosInPlaylist} />{" "}
          </h1>

          <h1>
            Length of playlist from video no.{" "}
            <Container
              additionalStyles="underline font-base"
              text={startVideoNumber}
            />{" "}
            to{" "}
            <Container
              additionalStyles="underline font-base"
              text={endVideoNumber}
            />{" "}
            is :{" "}
            <Container
              text={`${totalTimeDurationOfPlaylist.hr} hours, ${totalTimeDurationOfPlaylist.min} minutes, ${totalTimeDurationOfPlaylist.sec} seconds`}
            />
          </h1>

          <h2 className="flex p-1 px-3 w-1/4 hover:bg-slate-200 transition-all gap-10 bg-slate-100 max-sm:w-full justify-between">
            At 1.25x :{" "}
            <span className=" font-semibold">
              {vidPlaybackTimeInDiffSpeed["1.25"]?.hr} hrs,{" "}
              {vidPlaybackTimeInDiffSpeed["1.25"]?.min} min,{" "}
              {vidPlaybackTimeInDiffSpeed["1.25"]?.sec} sec
            </span>
          </h2>

          <h2 className="flex p-1 px-3 w-1/4 hover:bg-slate-200 transition-all gap-10 bg-slate-100 max-sm:w-full justify-between">
            At 1.50x :{" "}
            <span className=" font-semibold">
              {vidPlaybackTimeInDiffSpeed["1.5"]?.hr} hrs,{" "}
              {vidPlaybackTimeInDiffSpeed["1.5"]?.min} min,{" "}
              {vidPlaybackTimeInDiffSpeed["1.5"]?.sec} sec
            </span>
          </h2>

          <h2 className="flex p-1 px-3 w-1/4 hover:bg-slate-200 transition-all gap-10 bg-slate-100 max-sm:w-full justify-between">
            At 1.75x :{" "}
            <span className=" font-semibold">
              {" "}
              {vidPlaybackTimeInDiffSpeed["1.75"]?.hr} hrs,{" "}
              {vidPlaybackTimeInDiffSpeed["1.75"]?.min} min,{" "}
              {vidPlaybackTimeInDiffSpeed["1.75"]?.sec} sec
            </span>
          </h2>

          <h2 className="flex p-1 px-3 w-1/4 hover:bg-slate-200 transition-all gap-10 bg-slate-100 max-sm:w-full justify-between">
            At 2.00x :{" "}
            <span className=" font-semibold">
              {vidPlaybackTimeInDiffSpeed["2"]?.hr} hrs,{" "}
              {vidPlaybackTimeInDiffSpeed["2"]?.min} min,{" "}
              {vidPlaybackTimeInDiffSpeed["2"]?.sec} sec{" "}
            </span>
          </h2>
        </div>
      )}

    </div>
  );
}

export default HomePage;

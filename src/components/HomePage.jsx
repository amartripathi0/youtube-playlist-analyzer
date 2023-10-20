import React, { useState } from "react";
import "./home.css";
import axios from "axios";
function HomePage() {
  const [playlistLink, setPlaylistLink] = useState("");
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [vidLen, setVidLen] = useState(0);
  const [playListDetail, setPlaylistDetail] = useState({});
  const [vidTimeInDiffSpeed, setVidTimeInDiffSpeed] = useState({});
  const [showVidSpeedDur , setShowVidSpeedDur] = useState(false)
  const [showInputError , setShowInputError] = useState(false)
  const API_KEY = "AIzaSyACK3PCRm1qZDFiL39HZjFyxCB5UE1rWug";

  async function handleGetData() {
    // extracting playlist - ID form playlist link
    if(playlistLink.length === 0 ){
      setShowInputError(true)
      setShowVidSpeedDur(false)
    }
    else{
      setShowInputError(false)

    const playlistIDIndex = playlistLink.indexOf("list=") + 5;
    const playlistID = playlistLink.slice(playlistIDIndex);

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistID}&key=${API_KEY}&maxResults=50`
    );

    const ytPlaylistDetailArray = [];
    ytPlaylistDetailArray.push(response.data.items);

    //Extracting VideoID from ytPlaylistDetailArray and pushing it in VidIDArray
    const VidIDArray = [];
    ytPlaylistDetailArray[0].forEach((vid) => {
      VidIDArray.push(vid.snippet.resourceId.videoId);
    });

    // Calling getVideoDurationArray to get each video time duration in an array
    const videosDurationArr = await getVideoDurationArray(VidIDArray);
    // console.log(videosDurationArr);

    const totalTimeDurationOfPlaylst = getTotalTimeDuration(videosDurationArr);
    setPlaylistDetail(totalTimeDurationOfPlaylst)

    const timeInDiffSpeed = getVideoDurationInDiifSpeed(totalTimeDurationOfPlaylst)
    setVidTimeInDiffSpeed(timeInDiffSpeed)
    setShowVidSpeedDur(prev => !prev)
  }
  }
  function getTotalTimeDuration(videosDurationArr) {
    let hr = 0,
      min = 0,
      sec = 0;
    let upperIndxTo = videosDurationArr.length - 1;
    setVidLen(upperIndxTo + 1)
    if (to !== 0) {
      upperIndxTo = to - 1;
    }
    let lowerIndxFrom = 0 ;
    if(from !==0){
      lowerIndxFrom = from - 1
    }
    console.log(from , to);
    console.log(lowerIndxFrom , upperIndxTo);
    for (let i = lowerIndxFrom; i <= upperIndxTo ; i++) {
      let time = videosDurationArr[i];
      let hrsidx = time.indexOf("H");
      let mindx = time.indexOf("M");
      let secidx = time.indexOf("S");
      let tidx = time.indexOf("T");
    // console.log(tidx , hrsidx , mindx , secidx);

      if (hrsidx === -1 && mindx!==-1) {
        min += parseInt(time.slice(tidx + 1, mindx));
      } else {
        hr += parseInt(time.slice(tidx + 1, hrsidx));
        if(mindx !==-1){
          min += parseInt(time.slice(hrsidx + 1, mindx));
        }
      }
      
      if (secidx !== -1) {
        if (mindx === -1) {
          sec += parseInt(time.slice(hrsidx+ 1, secidx));
        } else {
          sec += parseInt(time.slice(mindx + 1, secidx));
        }

        if (sec >= 60) {
          min += 1;
          sec = sec - 60;
        }
      }

      if (min >= 60) {
        hr += 1;
        min = min - 60;
      }
    }

    return { hr, min, sec  };
  }

function getVideoDurationInDiifSpeed(nrmlTimeObj){
    const {hr , min ,sec} = nrmlTimeObj;

    const totalSec = (hr * 3600) + (min * 60) + sec ;

    const onePointTwoFIve = totalSec / 1.25 
    const onePointFIve = totalSec / 1.5 
    const onePointSevenFIve = totalSec / 1.75 
    const twoX = totalSec /  2

    return {
      "1.25" : {
          hr : Math.floor(onePointTwoFIve / 3600), 
          min : Math.floor( (( onePointTwoFIve / 3600 ) - Math.floor(onePointTwoFIve / 3600) ) * 60 ) , 
          sec : Math.floor((((( onePointTwoFIve / 3600 ) - Math.floor(onePointTwoFIve / 3600) ) * 60  -  Math.floor( (( onePointTwoFIve / 3600 ) - Math.floor(onePointTwoFIve / 3600) ) * 60 ) )* 60 ))
      },
      "1.5" : {
          hr : Math.floor(onePointFIve / 3600), 
          min : Math.floor( (( onePointFIve / 3600 ) - Math.floor(onePointFIve / 3600) ) * 60 ) , 
          sec : Math.floor((((( onePointFIve / 3600 ) - Math.floor(onePointFIve / 3600) ) * 60  -  Math.floor( (( onePointFIve / 3600 ) - Math.floor(onePointFIve / 3600) ) * 60 ) )* 60 ))
      },
      "1.75" : {
          hr : Math.floor(onePointSevenFIve / 3600), 
          min : Math.floor( (( onePointSevenFIve / 3600 ) - Math.floor(onePointSevenFIve / 3600) ) * 60 ) , 
          sec : Math.floor((((( onePointSevenFIve / 3600 ) - Math.floor(onePointSevenFIve / 3600) ) * 60  -  Math.floor( (( onePointSevenFIve / 3600 ) - Math.floor(onePointSevenFIve / 3600) ) * 60 ) )* 60 ))
      },
      "2" : {
          hr : Math.floor(twoX / 3600), 
          min : Math.floor( (( twoX / 3600 ) - Math.floor(twoX / 3600) ) * 60 ) , 
          sec : Math.floor((((( twoX / 3600 ) - Math.floor(twoX / 3600) ) * 60  -  Math.floor( (( twoX / 3600 ) - Math.floor(twoX / 3600) ) * 60 ) )* 60 ))
      }
    }
}
  async function getVideoDurationArray(VidIDArray) {
    const promises = VidIDArray.map((id) =>
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${id}&key=${API_KEY}`
        )
        .then((res) => res.data.items[0].contentDetails.duration)
    );

    const durations = await Promise.all(promises);
    return durations;
  }

  return (
    <div className="text-black  font-semibold pl-16  flex flex-col mt-4 ">
      <label htmlFor="playlistIN" className=" text-2xl">
        Enter YouTube playlist link below :
      </label>
      <br />
      <div className="flex items-center  mb-5">
        <input
          type="text"
          id="playlistIN"
          onChange={(e) => setPlaylistLink(e.target.value)}
          className="border-2  border-black w-[75%] h-10  text-md pl-3 rounded-md "
          placeholder="https://www.youtube.com/playlist?list=PL3Y14T80kDroPBjkYJQCz9tndR17tSSmG"
        />

        <button
          className="border-2  border-black rounded-md  ml-10 h-10  p-2 flex - items-center justify-center hover:underline
        
          "
          onKeyUp={(e) => e.key === 'Enter' && handleGetData}
          onClick={handleGetData}
        >
          Analyze
        </button>

      </div>

      

      <div className="flex items-center  mb-5 text-xl gap-10">
        <div className=" flex items-center  gap-3">
          <label htmlFor="from">From : </label>
          <input
            type="number"
            className="border-2  border-black w-16 h-9   pl-3 rounded-md  flex  text-lg"
            placeholder="1"
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        <div className="flex items-center  gap-3">
          <label htmlFor="from">To : </label>
          <input
            type="number"
            className="border-2  border-black w-16 h-9   pl-3 rounded-md  flex  text-lg"
            placeholder="50"
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        {
        showInputError && <p className="text-red-600">Enter a valid playlist link</p>
    }
      </div>

    {
      showVidSpeedDur &&
    
      <div className="mt-6 w-[100%]  mr-10  font-medium flex flex-col gap-3 text-lg">
        <h2>Total videos in the playlist : <span className=" font-semibold">{vidLen} </span></h2>
    {console.log(vidTimeInDiffSpeed["1.25"])}
        <h2> 
          Length of playlist from Video No. {from} to {to} is : {playListDetail.hr} Hours, {playListDetail.min} Minutes, {playListDetail.sec} seconds
        </h2>
        <h2>At 1.25x  : <span className=" font-semibold">{vidTimeInDiffSpeed["1.25"]?.hr} Hours, {vidTimeInDiffSpeed["1.25"]?.min} Minutes, {vidTimeInDiffSpeed["1.25"]?.sec} seconds</span></h2>

        <h2>At 1.50x : <span className=" font-semibold">{vidTimeInDiffSpeed["1.5"]?.hr} Hours, {vidTimeInDiffSpeed["1.5"]?.min} Minutes,  {vidTimeInDiffSpeed["1.5"]?.sec} seconds</span></h2>

        <h2>At 1.75x : <span className=" font-semibold"> {vidTimeInDiffSpeed["1.75"]?.hr} Hours, {vidTimeInDiffSpeed["1.75"]?.min} Minutes, {vidTimeInDiffSpeed["1.75"]?.sec}  seconds</span></h2>

        <h2>At 2.00x : <span className=" font-semibold">{vidTimeInDiffSpeed["2"]?.hr} Hours, {vidTimeInDiffSpeed["2"]?.min} Minutes, {vidTimeInDiffSpeed["2"]?.sec} seconds </span></h2>
        
        <p className=" mr-44  p-3 rounded-md mt-10 bg-slate-200 font-light  text-[1.2vw]">
        YouTube Playlist Analyzer evaluates your playlist's total duration, then breaks down viewing times at speeds of 1.25x, 1.5x, 1.75x, and 2x. Streamline your viewing experience and optimize your binge-watching sessions with precise insights!
        </p>
      </div>
}
    </div>
  );
}

export default HomePage;

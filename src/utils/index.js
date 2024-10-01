import axios, { all } from "axios";
import { toast } from "react-toastify";

export function getPlaylistId(playlistLink) {
  const playlistIDIndex = playlistLink.indexOf("list=") + 5;
  return playlistLink.slice(playlistIDIndex);
}
export async function getAllVideosIdInPlaylist(playlistId, API_KEY) {
  // fetching playlist detail using api , playlistID and key
  const response = await axios
    .get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${API_KEY}&maxResults=50`
    )
    .catch(() =>
      toast.error("Server Error", {
        position: "top-center",
      })
    );
  //return an array containing Id of all the videos present in the playlist
  const playlistAllVideosIdArray = [];
  response.data.items.forEach((vid) => {
    playlistAllVideosIdArray.push(vid.snippet.resourceId.videoId);
  });
  const channelTitle = response.data?.items[0].snippet.channelTitle;
  return { playlistAllVideosIdArray, channelTitle };
}
export async function getEachVideoDurationArray(
  playlistAllVideosIdArray,
  API_KEY
) {
  let allVideosIdStrings = "";

  playlistAllVideosIdArray.map((eachVidId, index) => {
    if (index === playlistAllVideosIdArray.length - 1) {
      allVideosIdStrings += eachVidId;
    } else {
      allVideosIdStrings += eachVidId + ",";
    }
  });

  // const promises = playlistAllVideosIdArray.map((id) =>
  //   axios
  //     .get(
  //       `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${id}&key=${API_KEY}`
  //     )
  //     .then((res) => res.data.items[0]?.contentDetails?.duration)
  // );

  const response = await axios
    .get(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${allVideosIdStrings}&key=${API_KEY}`
    )

  // const allVideosTimeDurationArray = await Promise.all(promises);

  const allVideosTimeDurationArray = response.data?.items.map(({ contentDetails }) => contentDetails?.duration);
  // console.log(allVideosTimeDurationArray);
  return allVideosTimeDurationArray;
}

export function getTotalTimeDuration(
  eachVideoDurationArray,
  fromVidNum,
  toVidNum,
  totalVideosInPlaylist
) {
  let hr = 0,
    min = 0,
    sec = 0;
  let upperIndexTo = totalVideosInPlaylist - 1; // Default case: last video
  let lowerIndxFrom = 0; // Default case: first video

  // Adjusting for user-defined range
  if (toVidNum !== 0 && toVidNum <= totalVideosInPlaylist && toVidNum > 0) {
    upperIndexTo = toVidNum - 1;
  }

  if (
    fromVidNum !== 0 &&
    fromVidNum <= totalVideosInPlaylist &&
    fromVidNum > 0
  ) {
    lowerIndxFrom = fromVidNum - 1;
  }

  for (let i = lowerIndxFrom; i <= upperIndexTo; i++) {
    const time = eachVideoDurationArray[i];
    if (time !== undefined) {
      const hrsidx = time.indexOf("H");
      const mindx = time.indexOf("M");
      const secidx = time.indexOf("S");
      const tidx = time.indexOf("T");

      if (hrsidx !== -1) {
        hr += parseInt(time.slice(tidx + 1, hrsidx), 10);
      }

      if (mindx !== -1) {
        min += parseInt(
          time.slice(hrsidx !== -1 ? hrsidx + 1 : tidx + 1, mindx),
          10
        );
      }

      if (secidx !== -1) {
        sec += parseInt(
          time.slice(
            mindx !== -1 ? mindx + 1 : hrsidx !== -1 ? hrsidx + 1 : tidx + 1,
            secidx
          ),
          10
        );
      }
      // Converting excess seconds to minutes and excess minutes to hours
      min += Math.floor(sec / 60);
      sec = sec % 60;

      hr += Math.floor(min / 60);
      min = min % 60;
    } else continue;
  }
  console.log("hr", hr, min, sec);
  return { hr, min, sec };
}

export function getVideoDurationInDiffSpeed(nrmlTimeObj) {
  const { hr, min, sec } = nrmlTimeObj;

  const totalSec = hr * 3600 + min * 60 + sec;

  const onePointTwoFIve = totalSec / 1.25;
  const onePointFIve = totalSec / 1.5;
  const onePointSevenFIve = totalSec / 1.75;
  const twoX = totalSec / 2;

  return {
    1.25: {
      hr: Math.floor(onePointTwoFIve / 3600),
      min: Math.floor(
        (onePointTwoFIve / 3600 - Math.floor(onePointTwoFIve / 3600)) * 60
      ),
      sec: Math.floor(
        ((onePointTwoFIve / 3600 - Math.floor(onePointTwoFIve / 3600)) * 60 -
          Math.floor(
            (onePointTwoFIve / 3600 - Math.floor(onePointTwoFIve / 3600)) * 60
          )) *
          60
      ),
    },
    1.5: {
      hr: Math.floor(onePointFIve / 3600),
      min: Math.floor(
        (onePointFIve / 3600 - Math.floor(onePointFIve / 3600)) * 60
      ),
      sec: Math.floor(
        ((onePointFIve / 3600 - Math.floor(onePointFIve / 3600)) * 60 -
          Math.floor(
            (onePointFIve / 3600 - Math.floor(onePointFIve / 3600)) * 60
          )) *
          60
      ),
    },
    1.75: {
      hr: Math.floor(onePointSevenFIve / 3600),
      min: Math.floor(
        (onePointSevenFIve / 3600 - Math.floor(onePointSevenFIve / 3600)) * 60
      ),
      sec: Math.floor(
        ((onePointSevenFIve / 3600 - Math.floor(onePointSevenFIve / 3600)) *
          60 -
          Math.floor(
            (onePointSevenFIve / 3600 - Math.floor(onePointSevenFIve / 3600)) *
              60
          )) *
          60
      ),
    },
    2: {
      hr: Math.floor(twoX / 3600),
      min: Math.floor((twoX / 3600 - Math.floor(twoX / 3600)) * 60),
      sec: Math.floor(
        ((twoX / 3600 - Math.floor(twoX / 3600)) * 60 -
          Math.floor((twoX / 3600 - Math.floor(twoX / 3600)) * 60)) *
          60
      ),
    },
  };
}

import { TotalTimeDurationType, VidPlaybackTimeInDiffSpeedType } from "@/types";
import axios from "axios";

export function getPlaylistId(playlistLink: string): string {
  const playlistIDIndex = playlistLink.indexOf("list=") + 5;
  return playlistLink.slice(playlistIDIndex);
}

export async function getAllVideosIdInPlaylist(
  playlistId: string
): Promise<{ playlistAllVideosIdArray: string[]; channelTitle: string }> {
  const response = await axios.post(`/api/playlistData`, { playlistId });

  //return an array containing Id of all the videos present in the playlist
  const playlistAllVideosIdArray: string[] =
    response.data?.playlistAllVideosIdArray;
  const channelTitle: string = response.data?.channelTitle;
  return { playlistAllVideosIdArray, channelTitle };
}

export async function getEachVideoDurationArray(
  playlistAllVideosIdArray: string[]
): Promise<string[]> {
  const response = await axios.post(`/api/videoData`, {
    playlistAllVideosIdArray,
  });

  const { allVideosTimeDurationArray } = await response.data;
  return allVideosTimeDurationArray;
}

export function getTotalTimeDuration(
  eachVideoDurationArray: string[],
  fromVidNum: number,
  toVidNum: number,
  totalVideosInPlaylist: number
): TotalTimeDurationType {
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
  return { hr, min, sec };
}

export function getVideoDurationInDiffSpeed(timeObj: {
  hr: number;
  min: number;
  sec: number;
}): VidPlaybackTimeInDiffSpeedType {
  const { hr, min, sec } = timeObj;

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

export function checkPlaylistLinkValidity(playlistLink: string): boolean {
  if (
    playlistLink.length === 0 ||
    !/https?:\/\/(www\.)?youtube\.com\/playlist\?list=[a-zA-Z0-9_-]+/.test(
      playlistLink
    )
  )
    return false;
  return true;
}

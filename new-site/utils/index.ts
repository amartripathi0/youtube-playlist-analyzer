import { TotalTimeDurationType, VidPlaybackTimeInDiffSpeedType } from "@/types";
import { getPlaylistVideosAction, getVideoDurationsAction } from "@/app/actions";

export function getPlaylistId(playlistLink: string): string {
  const playlistIDIndex = playlistLink.indexOf("list=") + 5;
  return playlistLink.slice(playlistIDIndex);
}

export async function getAllVideosIdInPlaylist(
  playlistId: string
): Promise<{ playlistAllVideosIdArray: string[]; channelTitle: string }> {
  return await getPlaylistVideosAction(playlistId);
}

export async function getEachVideoDurationArray(
  playlistAllVideosIdArray: string[]
): Promise<string[]> {
  return await getVideoDurationsAction(playlistAllVideosIdArray);
}

export function getTotalTimeDuration(
  eachVideoDurationArray: string[],
  fromVidNum: number,
  toVidNum: number,
  totalVideosInPlaylist: number
): TotalTimeDurationType {
  let totalHr = 0,
    totalMin = 0,
    totalSec = 0;

  const upperIndexTo = (toVidNum > 0 && toVidNum <= totalVideosInPlaylist) ? toVidNum - 1 : totalVideosInPlaylist - 1;
  const lowerIndxFrom = (fromVidNum > 0 && fromVidNum <= totalVideosInPlaylist) ? fromVidNum - 1 : 0;

  const durationRegex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;

  for (let i = lowerIndxFrom; i <= upperIndexTo; i++) {
    const time = eachVideoDurationArray[i];
    if (!time) continue;

    const matches = time.match(durationRegex);
    if (!matches) continue;

    const hours = parseInt(matches[1] || "0", 10);
    const minutes = parseInt(matches[2] || "0", 10);
    const seconds = parseInt(matches[3] || "0", 10);

    totalHr += hours;
    totalMin += minutes;
    totalSec += seconds;

    // Normalize on each iteration to prevent large number overflow (though unlikely here)
    totalMin += Math.floor(totalSec / 60);
    totalSec %= 60;
    totalHr += Math.floor(totalMin / 60);
    totalMin %= 60;
  }

  return { hr: totalHr, min: totalMin, sec: totalSec };
}

export function getVideoDurationInDiffSpeed(timeObj: {
  hr: number;
  min: number;
  sec: number;
}): VidPlaybackTimeInDiffSpeedType {
  const { hr, min, sec } = timeObj;

  const totalSec = hr * 3600 + min * 60 + sec;

  const calculateForSpeed = (multiplier: number) => {
    const adjustedSecs = totalSec / multiplier;
    return {
      hr: Math.floor(adjustedSecs / 3600),
      min: Math.floor((adjustedSecs % 3600) / 60),
      sec: Math.floor(adjustedSecs % 60),
    };
  };

  return {
    1.25: calculateForSpeed(1.25),
    1.5: calculateForSpeed(1.5),
    1.75: calculateForSpeed(1.75),
    2: calculateForSpeed(2),
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

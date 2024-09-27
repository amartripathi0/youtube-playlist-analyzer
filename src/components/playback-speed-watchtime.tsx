import React from 'react';

function PlaybackSpeedWatchtime({
  speed,
  vidPlaybackTimeInDiffSpeed,
}: {
  speed: "1.25" | "1.5" | "1.75" | "2";
  vidPlaybackTimeInDiffSpeed: any;
}) {
  return (
    <div className="flex py-1.5 px-3 sm:w-1/4 font-medium hover:font-semibold hover:bg-slate-300 transition-all rounded bg-slate-200 w-full justify-between hover:scale-105 duration-200">
      <h3>At {speed}x :</h3>
      <span>
        {vidPlaybackTimeInDiffSpeed[speed]?.hr} hrs,{" "}
        {vidPlaybackTimeInDiffSpeed[speed]?.min} min,{" "}
        {vidPlaybackTimeInDiffSpeed[speed]?.sec} sec
      </span>
    </div>
  );
}

export default PlaybackSpeedWatchtime;

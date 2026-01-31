import { VidPlaybackTimeInDiffSpeedType } from '@/types';
import React from 'react';

function PlaybackSpeedWatchtime({
  speed,
  vidPlaybackTimeInDiffSpeed,
}: {
  speed: "1.25" | "1.5" | "1.75" | "2";
  vidPlaybackTimeInDiffSpeed: VidPlaybackTimeInDiffSpeedType;
}) {
  return (
    <div className="flex p-6 rounded-3xl bg-secondary/20 border border-border/40 hover:border-primary/40 hover:bg-secondary/40 transition-all duration-500 group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <span className="text-4xl font-black">{speed}X</span>
      </div>
      <div className="flex flex-col gap-3 w-full relative z-10">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
          <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
            {speed}X SPEED
          </h3>
        </div>
        <div className="flex items-baseline gap-1.5 text-foreground leading-none">
          <span className="text-2xl font-black">{vidPlaybackTimeInDiffSpeed[speed]?.hr}</span>
          <span className="text-[10px] font-black text-muted-foreground/50 mr-1">H</span>
          <span className="text-2xl font-black">{vidPlaybackTimeInDiffSpeed[speed]?.min}</span>
          <span className="text-[10px] font-black text-muted-foreground/50 mr-1">M</span>
          <span className="text-2xl font-black">{vidPlaybackTimeInDiffSpeed[speed]?.sec}</span>
          <span className="text-[10px] font-black text-muted-foreground/50">S</span>
        </div>
      </div>
    </div>
  );
}

export default PlaybackSpeedWatchtime;

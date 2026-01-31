export interface VidPlaybackTimeInDiffSpeedType {
  [key: number]: { hr: number; min: number; sec: number };
}

export interface TotalTimeDurationType {
  hr: number;
  min: number;
  sec: number;
}

export interface VideoMetadata {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  definition: "hd" | "sd";
  caption: boolean;
}

export interface PlaylistInsights {
  totalSec: number;
  avgDuration: { hr: number; min: number; sec: number };
  hdPercentage: number;
  captionPercentage: number;
}

export interface TranscriptItem {
  text: string;
  duration: number;
  offset: number;
}

export type SortOrder = "default" | "shortest" | "longest" | "az" | "za";

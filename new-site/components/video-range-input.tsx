import React from "react";

interface VideoRangeInputProps {
  id?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  placeholder: string;
}

function VideoRangeInput({ id, onChange, min, max, placeholder }: VideoRangeInputProps) {
  return (
    <input
      id={id}
      type="number"
      className="border border-border outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-16 h-9 px-2 text-center rounded-xl bg-secondary/50 flex text-sm font-semibold transition-all"
      placeholder={placeholder}
      onChange={onChange}
      min={min}
      max={max}
    />
  );
}

export default VideoRangeInput;

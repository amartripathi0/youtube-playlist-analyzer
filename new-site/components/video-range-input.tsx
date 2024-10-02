import React from "react";

interface VideoRangeInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  placeholder: string;
}

function VideoRangeInput({ onChange, min, max, placeholder }: VideoRangeInputProps) {
  return (
    <input
      type="number"
      className="border border-neutral-400 outline-neutral-500 w-12 h-7 pl-3 justify-center items-center  rounded-sm bg-neutral-100 flex text-sm"
      placeholder={placeholder}
      onChange={onChange}
      min={min}
      max={max}
    />
  );
}

export default VideoRangeInput;

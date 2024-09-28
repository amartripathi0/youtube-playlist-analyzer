import React from "react";

function VideoRangeInput({ onChange, min, max, placeholder }) {
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

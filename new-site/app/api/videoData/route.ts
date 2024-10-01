import type { NextApiResponse } from "next";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
const API_KEY = process.env.YT_API_KEY;

export async function POST(req: NextRequest) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json({ message: "Method Not Allowed" });
    }

    const { playlistAllVideosIdArray } = await req.json();
    
    if (!playlistAllVideosIdArray || !Array.isArray(playlistAllVideosIdArray)) {
      return NextResponse.json({
        message: "Internal Server Error",
      }, { status: 500 });
    }

    let allVideosIdStrings = "";

    playlistAllVideosIdArray.forEach((eachVidId, index) => {
      if (index === playlistAllVideosIdArray.length - 1) {
        allVideosIdStrings += eachVidId;
      } else {
        allVideosIdStrings += eachVidId + ",";
      }
    });
    
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${allVideosIdStrings}&key=${API_KEY}`
    );
    console.log(response);

    const allVideosTimeDurationArray = response.data?.items.map(
      ({
        contentDetails: { duration },
      }: {
        contentDetails: { duration: string };
      }) => duration
    );
    
    return NextResponse.json({ allVideosTimeDurationArray });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

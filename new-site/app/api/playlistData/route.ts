import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
const API_KEY = process.env.YT_API_KEY;

export async function POST(req: NextRequest) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json({
        message: "Method Not Allowed",
      }, { status: 405 });
    }

    const { playlistId } = await req.json();
    
    if (!playlistId) {
      return NextResponse.json({
        message: "Playlist ID is required",
      }, { status: 400 });
    }
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${API_KEY}&maxResults=50`
    );

    const playlistAllVideosIdArray: string[] = [];
    response?.data.items.forEach(
      (vid: { snippet: { resourceId: { videoId: string } } }) => {
        playlistAllVideosIdArray.push(vid.snippet.resourceId.videoId.toString());
      }
    );
    const channelTitle:string = response?.data?.items[0].snippet.channelTitle;
    return NextResponse.json({
      "playlistAllVideosIdArray": playlistAllVideosIdArray, channelTitle
    }, { status: 200 });
  } catch (error) {
    
    return NextResponse.json({
      message: "Internal Server Error",
    }, { status: 500 });
  }
}

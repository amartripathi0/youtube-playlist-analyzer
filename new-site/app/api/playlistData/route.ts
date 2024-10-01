import type { NextApiResponse } from "next";
import axios from "axios";
import { NextRequest } from "next/server";
const API_KEY = process.env.NEXT_PUBLIC_YT_API_KEY;

export default async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { playlistId } = await req.json();

    if (!playlistId) {
      return res.status(400).json({ message: "Playlist ID is required" });
    }
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${API_KEY}&maxResults=50`
    );

    const playlistAllVideosIdArray: string[] = [];
    response?.data.items.forEach(
      (vid: { snippet: { resourceId: { videoId: string } } }) => {
        playlistAllVideosIdArray.push(vid.snippet.resourceId.videoId);
      }
    );
    const channelTitle = response?.data?.items[0].snippet.channelTitle;
    return res.status(500).json({ playlistAllVideosIdArray, channelTitle });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

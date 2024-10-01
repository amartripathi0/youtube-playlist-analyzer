import type { NextApiResponse } from "next";
import axios from "axios";
import { NextRequest } from "next/server";
const API_KEY = process.env.NEXT_PUBLIC_YT_API_KEY;

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { playlistAllVideosIdArray } = await req.json();

    if (!playlistAllVideosIdArray || !Array.isArray(playlistAllVideosIdArray)) {
      return res.status(400).json({ message: "Internal Server Error" });
    }

    let allVideosIdStrings = "";

    playlistAllVideosIdArray.map((eachVidId, index) => {
      if (index === playlistAllVideosIdArray.length - 1) {
        allVideosIdStrings += eachVidId;
      } else {
        allVideosIdStrings += eachVidId + ",";
      }
    });

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${allVideosIdStrings}&key=${API_KEY}`
    );
    const allVideosTimeDurationArray = response.data?.items.map(
      ({
        contentDetails: { duration },
      }: {
        contentDetails: { duration: string };
      }) => duration
    );

    return res.json({ allVideosTimeDurationArray });
  } catch (error) {
    return res.status(400).json({ message: "Internal Server Error" });
  }
}

# YouTube Playlist Analyzer

A web application to calculate the total watch time of YouTube playlists at various playback speeds, developed to explore React, Vite, Tailwind CSS, Google Youtube API data fetching, and deployment with Vercel.

## Project Background

As a regular YouTube viewer, I've always been curious about the total time required to watch all the videos in my favorite playlists which led me to conceive this project. Beyond its practical utility, my primary motivation was to learn and apply new skills in a real-world scenario, specifically:

React, Vite, Tailwind CSS, GitHub Pages, API Data Fetching.

## Features

- The YouTube Playlist Analyzer simplifies playlist consumption by calculating the total duration of videos within a given YouTube playlist.

- Additionally, users can preview the time required to watch the playlist at various YouTube playback speeds, offering flexibility and convenience in managing viewing preferences.

## Getting Started

1. **Setup**:

   ```bash
   git clone https://github.com/amartripathi0/youtube-playlist-analyzer.git
   cd youtube-playlist-analyzer

   npm install
   ```

2. **API Key Configuration**:

   - Obtain a YouTube Data API key.
   - Create a `.env` file in the root directory.
   - Add `VITE_YT_API_KEY=your_api_key_here`.

3. **Launch**:
   ```bash
   npm run dev
   ```

Navigate to `http://localhost:5173` to explore the application.

## Limitations

- Minor UI issues with input fields.
- Optimized for playlists with up to 50 videos.

## Contributing

Feel free to fork the project, make improvements, and submit a pull request. We appreciate your contributions to enhance the application further.

## Deployment

Check out the live application [here](https://youtube-playlist-analyzer-teal.vercel.app/).

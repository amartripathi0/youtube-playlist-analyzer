# YouTube Playlist Analyzer

A web application to calculate the total watch time of YouTube playlists at various playback speeds, developed using Nextjs, Typescript, React, Vite, Tailwind CSS, Google Youtube API data fetching, Framer Motion and deployment with Vercel.

## Project Background

As a regular YouTube viewer, I've always been curious about the total time required to watch all the videos in my favorite playlists which led me to conceive this project. Beyond its practical utility, my primary motivation was to learn and apply new skills in a real-world scenario, specifically:

React, Vite, Tailwind CSS, GitHub Pages, API Data Fetching.

#### Update (Vite to Nextjs):

- As it's bad practice to expose private API keys, I decided to rewrite the codebase using Next.js, which I had recently learned.

By leveraging Next.js, I was able to handle the YouTube API requests on the server side instead of the client side, effectively protecting my API key from exposure. This transition not only enhanced security but also allowed me to improve the frontend with better structure and added type safety.

- #### new-site: NEXTJS codebase(deplopyed)
- #### old-site: React VITE codebase
## Features

- The YouTube Playlist Analyzer simplifies playlist consumption by calculating the total duration of videos within a given YouTube playlist.

- Additionally, users can preview the time required to watch the playlist at various YouTube playback speeds, offering flexibility and convenience in managing viewing preferences.

## Getting Started

1. **Setup**:

   ```bash
   git clone https://github.com/amartripathi0/youtube-playlist-analyzer.git

   cd youtube-playlist-analyzer

   # for Nextjs Codebase
   cd new-site

   or

   # for Vite Codebase
   cd old-site

   npm install
   ```

2. **API Key Configuration**:

   - Obtain a YouTube Data API key.
   - Create a `.env` file in the root directory.

      - new-site
         - Add `YT_API_KEY=your_api_key_here`.
      - old-site
         - Add `VITE_YT_API_KEY=your_api_key_here`.

3. **Launch**:
   ```bash
   npm run dev
   ```

Navigate to to explore the application.
 - new-site:
 `http://localhost:3000`
- old-site:  `http://localhost:5173`

  

## Limitations

- Minor UI issues with input fields.
- Optimized for playlists with up to 50 videos.

## Contributing

Feel free to fork the project, make improvements, and submit a pull request. We appreciate your contributions to enhance the application further.

## Deployment

Check out the live application [here](https://yt-playlist-analyzer.vercel.app/).

import { BsLightningCharge, BsShieldCheck, BsGraphUp, BsDownload, BsClockHistory, BsRobot } from "react-icons/bs";

export const SITE_DATA = {
    features: [
        {
            title: "Instant Analysis",
            description: "Get total duration, average video length, and speed savings in milliseconds.",
            icon: BsLightningCharge,
        },
        {
            title: "Privacy First",
            description: "No login required. We don't track your watch history or store your personal data.",
            icon: BsShieldCheck,
        },
        {
            title: "Smart Insights",
            description: "Visualize quality distribution (HD/SD) and caption availability across the playlist.",
            icon: BsGraphUp,
        },
        {
            title: "Transcript Export",
            description: "Download subtitles for individual videos or the entire playlist in one click.",
            icon: BsDownload,
        },
        {
            title: "Time Management",
            description: "Plan your study sessions better by knowing exactly how long a course will take.",
            icon: BsClockHistory,
        },
        {
            title: "AI-Ready Data",
            description: "Clean, structured data exports perfect for AI summarization and analysis.",
            icon: BsRobot,
        },
    ],
    howItWorks: [
        {
            step: 1,
            title: "Paste URL",
            description: "Copy any YouTube playlist link and paste it into our smart analyzer input.",
        },
        {
            step: 2,
            title: "Analyze",
            description: "Our engine fetches metadata for up to 250 videos instantly.",
        },
        {
            step: 3,
            title: "Optimize",
            description: "See total watch time, download transcripts, and plan your learning schedule.",
        },
    ],
    faqs: [
        {
            question: "How do I calculate the total duration of a YouTube playlist?",
            answer: "Simply paste the YouTube playlist URL into our analyzer tool. It will instantly calculate the total length and show you how much time you save at different playback speeds like 1.5x or 2x.",
        },
        {
            question: "Can I download transcripts from a YouTube playlist?",
            answer: "Yes, our tool allows you to download individual video transcripts or bulk download all captions from a playlist for easy studying and reference.",
        },
        {
            question: "What is the maximum number of videos this tool can analyze?",
            answer: "This tool can analyze up to 250 videos per YouTube playlist in a single batch to ensure optimal performance.",
        },
        {
            question: "Is this YouTube Playlist Analyzer free?",
            answer: "Yes, this tool is 100% free to use. We support the maintenance costs through unobtrusive display ads.",
        },
        {
            question: "Does this tool work on mobile devices?",
            answer: "Absolutely. Our YouTube Playlist Analyzer is fully responsive and works perfectly on smartphones, tablets, and desktop computers.",
        },
    ]
};

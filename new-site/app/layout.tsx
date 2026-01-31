import type { Metadata, Viewport } from "next";
import { Montserrat, Raleway, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import AdUnit from "@/components/AdUnit";
import { siteKeywordsArray } from "@/constants";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-raleway",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "YouTube Playlist Analyzer | Calculate Total Watch Time",
  description:
    "Analyze YouTube playlist duration instantly. Calculate total watch time at 1.25x, 1.5x, 1.75x, and 2x speeds. Optimize your learning and binge-watching with precise insights.",
  authors: [{ name: "Amar Tripathi" }],
  keywords: siteKeywordsArray,
  metadataBase: new URL("https://youtube-playlist-analyzer.amartripathi.com/"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "YouTube Playlist Analyzer",
    description: "Calculate total watch time and speed savings for any YouTube playlist.",
    url: "https://youtube-playlist-analyzer.amartripathi.com/",
    siteName: "YouTube Playlist Analyzer",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Playlist Analyzer",
    description: "Calculate total watch time and speed savings for any YouTube playlist.",
    creator: "@amartripathi_",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "YouTube Playlist Analyzer",
        "operatingSystem": "All",
        "applicationCategory": "MultimediaApplication",
        "description": "The best tool to calculate total length and watch time for YouTube playlists up to 250 videos at various speeds (1.25x - 2x).",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Analyze up to 250 videos per playlist",
          "Calculate duration at multiple playback speeds",
          "Custom video range selection",
          "No login required"
        ],
        "author": {
          "@type": "Person",
          "name": "Amar Tripathi",
          "url": "https://amartripathi.com"
        }
      },
      {
        "@type": "HowTo",
        "name": "How to Analyze YouTube Playlist Duration",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Paste your YouTube playlist URL into the input field."
          },
          {
            "@type": "HowToStep",
            "text": "Click ANALYZE to fetch all video data."
          },
          {
            "@type": "HowToStep",
            "text": "Review total durations and speed-adjusted watch times."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the maximum number of videos this tool can analyze?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This tool can analyze up to 250 videos per YouTube playlist."
            }
          },
          {
            "@type": "Question",
            "name": "Can I calculate the duration for a specific range of videos in a playlist?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can use the 'From' and 'To' video range inputs to analyze a specific segment of any playlist."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${raleway.variable} ${inter.variable} font-inter antialiased border-none outline-none`}
      >
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8927401111255619"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
          <Toaster richColors closeButton />
          <Analytics />
        </ThemeProvider>

        {/* Sticky Anchor Ad Unit (Mobile/Tablet) */}
        <div className="xl:hidden fixed bottom-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-md border-t border-white/5 h-24 flex items-center justify-center pointer-events-auto">
          <AdUnit
            slot="0987654321"
            format="rectangle"
            minHeight="90px"
            className="my-0 px-4 max-w-4xl"
          />
        </div>

        {/* Sticky Skyscraper Sidebars (Wide Screens Only) */}
        <aside className="hidden xl:flex fixed left-4 top-1/2 -translate-y-1/2 z-[100] w-[160px] h-[600px] pointer-events-auto">
          <AdUnit
            slot="1111111111"
            format="auto"
            minHeight="600px"
            className="my-0"
          />
        </aside>

        <aside className="hidden xl:flex fixed right-4 top-1/2 -translate-y-1/2 z-[100] w-[160px] h-[600px] pointer-events-auto">
          <AdUnit
            slot="2222222222"
            format="auto"
            minHeight="600px"
            className="my-0"
          />
        </aside>
      </body>
    </html>
  );
}

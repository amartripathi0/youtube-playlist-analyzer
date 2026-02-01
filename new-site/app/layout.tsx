import type { Metadata, Viewport } from "next";
import { Montserrat, Raleway, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import AdUnit from "@/components/AdUnit";
import { siteKeywordsArray } from "@/constants";
import { SITE_DATA } from "@/constants/site-data";

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
  title: "YouTube Playlist Analyzer | Watch Time & Length Calculator (2026)",
  description:
    "Free YouTube playlist duration calculator. Check total watch time at 1.25x, 1.5x, 1.75x, and 2x speeds. Get professional playlist insights, download transcripts, and optimize your study sessions instantly.",
  authors: [{ name: "Amar Tripathi" }],
  keywords: siteKeywordsArray,
  metadataBase: new URL("https://youtube-analyzer.amartripathi.com/"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "YouTube Playlist Analyzer | Professional Watch Time Insights",
    description: "Calculate total watch time and optimize your learning speed with our free YouTube playlist duration tool.",
    url: "https://youtube-analyzer.amartripathi.com/",
    siteName: "YouTube Playlist Analyzer",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Playlist Analyzer | Watch Time Calculator",
    description: "Calculate total watch time and speed savings for any YouTube playlist instantly.",
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
        "applicationCategory": "UtilitiesApplication, EducationalApplication",
        "description": "A professional tool to calculate the total duration and watch time of any YouTube playlist at various playback speeds.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "author": {
          "@type": "Person",
          "name": "Amar Tripathi"
        }
      },
      {
        "@type": "WebSite",
        "name": "YouTube Playlist Analyzer",
        "url": "https://youtube-analyzer.amartripathi.com/",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://youtube-analyzer.amartripathi.com/?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": SITE_DATA.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
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

        {/* Sticky Skyscraper Sidebars (Wide Screens) */}
        <aside className="hidden 2xl:flex fixed left-4 top-1/2 -translate-y-1/2 z-[100] w-[160px] h-[600px] pointer-events-auto">
          <AdUnit
            slot="6315446429"
            format="auto"
            minHeight="600px"
            className="my-0"
          />
        </aside>

        <aside className="hidden 2xl:flex fixed right-4 top-1/2 -translate-y-1/2 z-[100] w-[160px] h-[600px] pointer-events-auto">
          <AdUnit
            slot="1239213715"
            format="auto"
            minHeight="600px"
            className="my-0"
          />
        </aside>
      </body>
    </html>
  );
}

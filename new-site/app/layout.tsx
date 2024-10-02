import type { Metadata } from "next";
import { Montserrat, Raleway } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import Head from "next/head";
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
export const metadata: Metadata = {
  title: "YouTube Playlist Analyzer",
  description:
    "YouTube Playlist Length Analyzer evaluates your playlist's total duration, then breaks down viewing times at speeds of 1.25x, 1.5x, 1.75x, and 2x. Streamline your viewing experience and optimize your binge-watching sessions with precise insights!",
  authors: [{ name: "Amar Tripathi" }],
  keywords: siteKeywordsArray,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />;
      </Head>
      <body
        className={`${montserrat.variable} ${raleway.variable} font-montserrat antialiased`}
      >
        {children}
        <Toaster richColors closeButton theme="dark" />
        <Analytics />
      </body>
    </html>
  );
}

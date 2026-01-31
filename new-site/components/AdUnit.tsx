"use client";

import { useEffect } from "react";

interface AdUnitProps {
    slot: string;
    style?: React.CSSProperties;
    format?: "auto" | "fluid" | "rectangle";
    responsive?: "true" | "false";
    className?: string;
    minHeight?: string;
}

export default function AdUnit({
    slot,
    style = { display: "block" },
    format = "auto",
    responsive = "true",
    className = "",
    minHeight = "280px",
}: AdUnitProps) {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error("AdSense error:", err);
        }
    }, []);

    return (
        <div
            className={`ad-container w-full overflow-hidden flex flex-col items-center justify-center my-8 ${className}`}
            style={{ minHeight }}
        >
            <div className="w-full h-full relative">
                {/* Placeholder / Border for the ad unit to prevent Cumulative Layout Shift */}
                <div className="absolute inset-0 -z-10 border border-white/5 bg-white/[0.02] rounded-2xl flex items-center justify-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10 select-none">Advertisement</span>
                </div>

                <ins
                    className="adsbygoogle"
                    style={style}
                    data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
                    data-ad-slot={slot}
                    data-ad-format={format}
                    data-full-width-responsive={responsive}
                />
            </div>
        </div>
    );
}

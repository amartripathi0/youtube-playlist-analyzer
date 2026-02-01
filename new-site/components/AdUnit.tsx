"use client";

import { useEffect, useRef } from "react";

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
    const adRef = useRef<HTMLDivElement>(null);
    const shouldDisplayAds = process.env.NEXT_PUBLIC_DISPLAY_ADS === 'true';

    useEffect(() => {
        // Only push if the component is mounted and the parent container is visible (width > 0)
        // And if ads are enabled
        if (shouldDisplayAds && adRef.current && adRef.current.offsetWidth > 0) {
            try {
                // @ts-expect-error adsbygoogle is not defined on window
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (err) {
                console.error("AdSense error:", err);
            }
        }
    }, [shouldDisplayAds]);

    if (!shouldDisplayAds) return null;


    return (
        <div
            ref={adRef}
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
                    data-ad-client="ca-pub-8927401111255619"
                    data-ad-slot={slot}
                    data-ad-format={format}
                    data-full-width-responsive={responsive}
                />
            </div>
        </div>
    );
}

"use client";

import { usePathname } from "next/navigation";
import AdUnit from "./AdUnit";

export default function AdVisibilityWrapper() {
    const pathname = usePathname();

    // Logic to determine if sidebars should be shown
    const isExcludedPath = pathname === '/privacy-policy' || pathname === '/terms-of-service';
    const shouldDisplayAds = process.env.NEXT_PUBLIC_DISPLAY_ADS === 'true';
    const showSidebars = shouldDisplayAds && !isExcludedPath;

    if (!showSidebars) return null;

    return (
        <div className="hidden 2xl:block">
            <aside className="fixed left-4 top-1/2 -translate-y-1/2 z-[100] w-[160px] h-[600px] pointer-events-auto">
                <AdUnit
                    slot="6315446429"
                    format="auto"
                    minHeight="600px"
                    className="my-0"
                />
            </aside>

            <aside className="fixed right-4 top-1/2 -translate-y-1/2 z-[100] w-[160px] h-[600px] pointer-events-auto">
                <AdUnit
                    slot="1239213715"
                    format="auto"
                    minHeight="600px"
                    className="my-0"
                />
            </aside>
        </div>
    );
}

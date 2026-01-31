"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowLeft, BsFileText } from "react-icons/bs";

export default function TermsOfService() {
    return (
        <div className="flex flex-col gap-12 max-w-4xl mx-auto px-6 lg:px-8 mt-32 mb-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-6"
            >
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors w-fit"
                >
                    <BsArrowLeft size={16} />
                    Back to Home
                </Link>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-primary">
                        <BsFileText size={24} />
                        <span className="text-xs font-black uppercase tracking-[0.4em]">Governance</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tightest leading-none text-foreground">
                        Terms of <span className="text-primary italic">Service.</span>
                    </h1>
                    <p className="text-muted-foreground font-semibold">Last Updated: January 31, 2026</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-[2.5rem] p-8 md:p-12 prose prose-invert max-w-none"
            >
                <section className="flex flex-col gap-6">
                    <h2 className="text-2xl font-black tracking-tight text-foreground">1. Acceptance of Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        By accessing or using the YouTube Playlist Analyzer (amartripathi.com), you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our service.
                    </p>

                    <h2 className="text-2xl font-black tracking-tight text-foreground">2. Description of Service</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        YouTube Playlist Analyzer provides tools for analyzing metadata and watch-time statistics for public YouTube playlists. This service is provided &quot;as is&quot; and &quot;as available.&quot;
                    </p>

                    <h2 className="text-2xl font-black tracking-tight text-foreground">3. User Conduct</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        You agree to use this tool only for lawful purposes. You shall not attempt to bypass any security features, scrape data excessively, or use the tool in any way that violates the <a href="https://www.youtube.com/t/terms" target="_blank" rel="noreferrer" className="text-primary hover:underline">YouTube Terms of Service</a>.
                    </p>

                    <h2 className="text-2xl font-black tracking-tight text-foreground">4. Intellectual Property</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        All content, layout, and visual design elements on this site are the property of Amar Tripathi. YouTube, its logo, and playlist data are properties of Google/YouTube.
                    </p>

                    <h2 className="text-2xl font-black tracking-tight text-foreground">5. Limitation of Liability</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        In no event shall YouTube Playlist Analyzer or its creator be liable for any damages arising out of the use or inability to use the services on this website.
                    </p>

                    <h2 className="text-2xl font-black tracking-tight text-foreground">6. Changes to Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We reserve the right to modify these terms at any time. Your continued use of the site following any changes constitutes your acceptance of the new Terms of Service.
                    </p>
                </section>
            </motion.div>
        </div>
    );
}

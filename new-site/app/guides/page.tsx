"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsJournalText, BsLightbulb, BsClockHistory } from "react-icons/bs";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

const GUIDES = [
    {
        title: "YouTube Playlist Duration Calculator: The Ultimate Guide",
        slug: "youtube-playlist-duration-calculator",
        description: "Learn how to use our tool to calculate total watch time, average video length, and optimize your learning schedule.",
        icon: BsJournalText,
        date: "Feb 2026",
        category: "Productivity"
    },
    {
        title: "How to Optimize Study Sessions with Duration Analytics",
        slug: "optimize-study-sessions",
        description: "Discover techniques for better time management and course planning using playlist analytics.",
        icon: BsLightbulb,
        date: "Feb 2026",
        category: "Education"
    }
];

export default function GuidesPage() {
    return (
        <main className="relative min-h-screen w-full overflow-hidden bg-background">
            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden select-none">
                <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-[120px] dark:opacity-30" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-indigo-500/10 to-transparent blur-[120px] dark:opacity-30" />
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <NavBar />

                <div className="flex-grow pt-32 pb-24 px-6">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <header className="text-center space-y-4">
                            <div className="inline-block p-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 mb-4">
                                <div className="px-4 py-1 rounded-full bg-background text-[10px] font-black uppercase tracking-[0.2em] text-primary">Knowledge Hub</div>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                                Insights & <span className="text-primary italic">Guides.</span>
                            </h1>
                            <p className="text-lg text-muted-foreground font-medium max-w-xl mx-auto">
                                Resources to help you master your digital learning and optimize every minute of your study time.
                            </p>
                        </header>

                        <div className="grid grid-cols-1 gap-6">
                            {GUIDES.map((guide, i) => (
                                <motion.div
                                    key={guide.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={`/guides/${guide.slug}`}
                                        className="group block glass p-8 rounded-[2rem] border border-white/5 hover:border-primary/20 transition-all duration-300"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center gap-8">
                                            <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 shrink-0">
                                                <guide.icon size={32} />
                                            </div>
                                            <div className="flex-grow space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">{guide.category}</span>
                                                    <span className="w-1 h-1 rounded-full bg-border" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">{guide.date}</span>
                                                </div>
                                                <h2 className="text-2xl font-black group-hover:text-primary transition-colors leading-tight">
                                                    {guide.title}
                                                </h2>
                                                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                                    {guide.description}
                                                </p>
                                            </div>
                                            <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/10 group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                                                <BsArrowRight size={20} />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Quick Stats Sidebar-style section for value */}
                        <div className="pt-12 border-t border-white/5">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                <div className="text-center space-y-2">
                                    <p className="text-3xl font-black text-primary">100%</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Free to Use</p>
                                </div>
                                <div className="text-center space-y-2">
                                    <p className="text-3xl font-black text-primary">250+</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Videos Analyzed</p>
                                </div>
                                <div className="text-center space-y-2">
                                    <p className="text-3xl font-black text-primary">∞</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Time Saved</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </main>
    );
}

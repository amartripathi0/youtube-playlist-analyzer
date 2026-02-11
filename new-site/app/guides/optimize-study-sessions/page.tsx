"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowLeft, BsGraphUp, BsHourglassSplit, BsCheck2Circle, BsBook } from "react-icons/bs";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

export default function StudyGuide() {
    return (
        <main className="relative min-h-screen w-full bg-background">
            <NavBar />

            <div className="relative pt-32 pb-24 px-6 max-w-4xl mx-auto">
                <Link
                    href="/guides"
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-12"
                >
                    <BsArrowLeft size={14} /> Back to Guides
                </Link>

                <article className="space-y-12">
                    {/* Header */}
                    <header className="space-y-6">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                            How to <span className="text-primary italic">Optimize Study Sessions</span> with Duration Analytics
                        </h1>
                        <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-muted-foreground/50">
                            <span>Published Feb 11, 2026</span>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span>8 Min Read</span>
                        </div>
                    </header>

                    {/* Intro */}
                    <section className="prose prose-invert max-w-none text-muted-foreground leading-loose text-lg">
                        <p>
                            Studying from YouTube courses can be a double-edged sword. While the quality of free education is at an all-time high, the lack of structure can often lead to "tutorial hell"—a state where you consume content without actually retaining it. To break free, you need a data-driven approach to your study sessions.
                        </p>
                    </section>

                    {/* Strategies */}
                    <section className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                                    <BsGraphUp size={24} />
                                </div>
                                <h3 className="text-xl font-black">Use the 1.5x Speed Rule</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Most people can process speech up to 1.5x speed without losing comprehension. By using our calculator, you can see that a 10-hour course only takes 6.6 hours at 1.5x. This allows you to spend the saved time on practical application and coding exercises.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400">
                                    <BsHourglassSplit size={24} />
                                </div>
                                <h3 className="text-xl font-black">Plan Your Pomodoros</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Compare the average video length to your Pomodoro timer (e.g., 25 mins). If the average video is 12 minutes, aim to finish two videos per study block. This creates clear, manageable milestones.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Deep Dive */}
                    <section className="glass p-10 md:p-16 rounded-[3rem] border border-white/5 space-y-8">
                        <h2 className="text-3xl font-black">The "Active Recall" Workflow</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <BsCheck2Circle className="text-primary shrink-0 mt-1" size={20} />
                                <p className="text-muted-foreground"><span className="text-foreground font-bold">Audit:</span> Use the Playlist Analyzer to see total time.</p>
                            </div>
                            <div className="flex gap-4">
                                <BsCheck2Circle className="text-primary shrink-0 mt-1" size={20} />
                                <p className="text-muted-foreground"><span className="text-foreground font-bold">Export:</span> Download the transcripts for the session.</p>
                            </div>
                            <div className="flex gap-4">
                                <BsCheck2Circle className="text-primary shrink-0 mt-1" size={20} />
                                <p className="text-muted-foreground"><span className="text-foreground font-bold">Watch & Speed:</span> Watch at 1.5x-1.75x to capture the big picture.</p>
                            </div>
                            <div className="flex gap-4">
                                <BsCheck2Circle className="text-primary shrink-0 mt-1" size={20} />
                                <p className="text-muted-foreground"><span className="text-foreground font-bold">Apply:</span> Use the saved time to build a project based on the transcript notes.</p>
                            </div>
                        </div>
                    </section>

                    {/* SEO Content */}
                    <section className="prose prose-invert max-w-none text-muted-foreground leading-loose space-y-6">
                        <h3 className="text-foreground font-black text-xl">Conclusion: Data Beats Guesswork</h3>
                        <p>
                            Educational psychology proves that students who set specific goals are 2.5x more likely to complete a course. "I will study for 2 hours" is a weak goal. "I will complete the first 6 videos of this playlist (Totaling 1 hour 45 mins at 1.25x speed)" is a powerful, data-backed commitment.
                        </p>
                        <p>
                            Our tool isn't just a calculator; it's a strategic partner in your education. By quantifying the invisible parts of YouTube playlists, we give you the control you need to succeed in the digital-first world.
                        </p>
                    </section>

                    {/* Related Content (Bounce Rate Reduction) */}
                    <section className="pt-20 border-t border-white/5 text-left">
                        <h3 className="text-xl font-black uppercase tracking-tightest mb-8">Related <span className="text-primary italic">Guides</span></h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Link href="/guides/youtube-playlist-duration-calculator" className="group glass p-8 rounded-[2rem] border border-white/5 hover:border-primary/20 transition-all">
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary/40 block mb-2">The Basics</span>
                                <h4 className="text-lg font-bold group-hover:text-primary transition-colors text-left">YouTube Playlist Duration Calculator: The Ultimate Guide</h4>
                            </Link>
                            <Link href="/" className="group glass p-8 rounded-[2rem] border border-white/5 hover:border-primary/20 transition-all flex flex-col justify-center">
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary/40 block mb-2">Back to Action</span>
                                <h4 className="text-lg font-bold group-hover:text-primary transition-colors text-left">Analyze Your Next Playlist</h4>
                            </Link>
                        </div>
                    </section>
                </article>
            </div>

            <Footer />
        </main>
    );
}

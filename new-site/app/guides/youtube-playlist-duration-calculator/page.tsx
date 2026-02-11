"use client";

import Link from "next/link";
import { BsArrowLeft, BsClock, BsLightning } from "react-icons/bs";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

export default function CalculatorGuide() {
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
                            YouTube Playlist <span className="text-primary italic">Duration Calculator:</span> The Ultimate Guide
                        </h1>
                        <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-muted-foreground/50">
                            <span>Published Feb 11, 2026</span>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span>10 Min Read</span>
                        </div>
                    </header>

                    {/* Intro */}
                    <section className="prose prose-invert max-w-none text-muted-foreground leading-loose text-lg">
                        <p>
                            In an era of endless digital learning, time management is the most critical skill. Whether you&apos;re working through a 40-hour coding bootcamp on YouTube or revising for final exams, knowing exactly how much time you need to commit is essential. Our <strong>YouTube Playlist Duration Calculator</strong> is designed to provide those insights instantly.
                        </p>
                    </section>

                    {/* Key Features */}
                    <section className="space-y-8">
                        <h2 className="text-2xl font-black uppercase tracking-widest border-l-4 border-primary pl-4">Core Functionality</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="glass p-6 rounded-2xl border border-white/5">
                                <div className="text-primary mb-4 flex items-center gap-2">
                                    <BsClock size={20} />
                                    <span className="font-black uppercase tracking-tighter italic">Total Runtime</span>
                                </div>
                                <p className="text-sm leading-relaxed">Get the combined length of all videos in a playlist, broken down into hours, minutes, and seconds.</p>
                            </div>
                            <div className="glass p-6 rounded-2xl border border-white/5">
                                <div className="text-primary mb-4 flex items-center gap-2">
                                    <BsLightning size={20} />
                                    <span className="font-black uppercase tracking-tighter italic">Speed Analytics</span>
                                </div>
                                <p className="text-sm leading-relaxed">Instantly see how much time you save by watching at 1.25x, 1.5x, 1.75x, or 2x playback speeds.</p>
                            </div>
                        </div>
                    </section>

                    {/* Step-by-Step */}
                    <section className="space-y-8">
                        <h2 className="text-2xl font-black uppercase tracking-widest border-l-4 border-primary pl-4">How to Use the Tool</h2>
                        <div className="space-y-6">
                            {[
                                {
                                    step: "01",
                                    title: "Locate Your Playlist URL",
                                    content: "Copy the full URL from your browser's address bar. Make sure it contains 'list=' in the link."
                                },
                                {
                                    step: "02",
                                    title: "Paste & Analyze",
                                    content: "Paste the link into the analyzer input. Our system will securely fetch metadata for up to 250 videos."
                                },
                                {
                                    step: "03",
                                    title: "Analyze Results",
                                    content: "View total runtime, average video length, and quality metrics like HD availability and captions."
                                },
                                {
                                    step: "04",
                                    title: "Export & Plan",
                                    content: "Use the bulk transcript download feature to save study notes or analyze video content offline."
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <span className="text-4xl font-black text-primary/20 group-hover:text-primary/100 transition-colors duration-500 tabular-nums">
                                        {item.step}
                                    </span>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-black">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* SEO Filler / Educational Content */}
                    <section className="prose prose-invert max-w-none text-muted-foreground leading-loose py-8 border-y border-white/5 space-y-6">
                        <h3 className="text-foreground font-black text-xl">Why Knowing Playlist Length Matters</h3>
                        <p>
                            Research shows that &quot;batch learning&quot; or &quot;time-blocking&quot; is significantly more effective when the learner has clear expectations of the time commitment. By using a YouTube length calculator, you can effectively schedule your learning blocks. For example, if you know a playlist is 4 hours long, you can plan to finish it in a single afternoon at 1.5x speed (approx. 2 hours 40 mins) with periodic breaks.
                        </p>
                        <p>
                            Additionally, our tool provides <strong>Average Video Length</strong>. This is a crucial metric for micro-learners who only have 10-15 minutes between tasks. If the average video is 8 minutes, you know you can reliably clear at least one video during your commute.
                        </p>
                    </section>

                    {/* Related Content (Bounce Rate Reduction) */}
                    <section className="pt-20 border-t border-white/5">
                        <h3 className="text-xl font-black uppercase tracking-tightest mb-8">Related <span className="text-primary italic">Guides</span></h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Link href="/guides/optimize-study-sessions" className="group glass p-8 rounded-[2rem] border border-white/5 hover:border-primary/20 transition-all">
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary/40 block mb-2">Next Read</span>
                                <h4 className="text-lg font-bold group-hover:text-primary transition-colors">How to Optimize Your Study Sessions with Analytics</h4>
                            </Link>
                            <Link href="/" className="group glass p-8 rounded-[2rem] border border-white/5 hover:border-primary/20 transition-all flex flex-col justify-center">
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary/40 block mb-2">Back to Action</span>
                                <h4 className="text-lg font-bold group-hover:text-primary transition-colors">Start a new Playlist Analysis</h4>
                            </Link>
                        </div>
                    </section>
                </article>
            </div>

            <Footer />
        </main>
    );
}

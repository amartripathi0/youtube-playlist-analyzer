"use client";

import { motion } from "framer-motion";
import { BsClockHistory, BsShieldCheck, BsLightningCharge, BsCodeSquare } from "react-icons/bs";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AboutPage() {
    return (
        <main className="relative min-h-screen w-full overflow-hidden bg-background">
            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden select-none">
                <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-[120px] dark:opacity-30" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-indigo-500/10 to-transparent blur-[120px] dark:opacity-30" />
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <NavBar />

                <div className="flex-grow pt-32 pb-24 px-6">
                    <div className="max-w-4xl mx-auto space-y-20">
                        {/* Hero Section */}
                        <motion.header
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center space-y-6"
                        >
                            <div className="inline-block p-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 mb-4">
                                <div className="px-4 py-1 rounded-full bg-background text-[10px] font-black uppercase tracking-[0.2em] text-primary">Our Mission</div>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                                Mastering Content Through <br />
                                <span className="text-primary italic">Time-Optimized Learning.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
                                We build tools that help students, creators, and lifelong learners navigate the vast sea of digital content with precision and speed.
                            </p>
                        </motion.header>

                        {/* Philosophy Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                {
                                    icon: BsClockHistory,
                                    title: "Time is Currency",
                                    desc: "Every minute spent learning should be maximized. We provide the duration data you need to plan your education effectively."
                                },
                                {
                                    icon: BsShieldCheck,
                                    title: "Radical Privacy",
                                    desc: "Your learning path belongs to you. We don't store your history, require logins, or track your personal browsing habits."
                                },
                                {
                                    icon: BsLightningCharge,
                                    title: "Speed for Mastery",
                                    desc: "Variable speed learning is a superpower. Our analyzer quantifies exactly how much time you save by optimizing playback."
                                },
                                {
                                    icon: BsCodeSquare,
                                    title: "Open & Accurate",
                                    desc: "Data integrity matters. We leverage official YouTube APIs to ensure your playlist analytics are always precise and up-to-date."
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass p-8 rounded-3xl border border-white/5 space-y-4"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                        <item.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-black tracking-tight">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Story Section */}
                        <motion.section
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="space-y-8 py-12"
                        >
                            <div className="space-y-4">
                                <h2 className="text-2xl font-black uppercase tracking-widest text-primary/60">The Story Behind the Tool</h2>
                                <div className="prose prose-invert max-w-none text-muted-foreground leading-loose space-y-6">
                                    <p>
                                        YouTube Playlist Analyzer was born out of a simple frustration: the inability to see the total duration of a course or playlist without manually adding up dozens of videos. For students tackling complex certifications or developers learning new frameworks, knowing the time commitment is crucial for effective planning.
                                    </p>
                                    <p>
                                        Developed by <strong>Amar Tripathi</strong>, this platform focuses on high-performance analytics with a "no-fluff" approach. We believe that tools should stay out of your way and provide value instantly. By calculating playback durations at speeds up to 2x, we empower users to fit more learning into their busy schedules.
                                    </p>
                                    <p>
                                        Today, the tool serves thousands of users who want to optimize their digital consumption. Whether you're a student planning a revision weekend or a creator auditing your own content, we're here to provide the insights you need to succeed.
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="glass p-12 rounded-[2.5rem] text-center space-y-6 border border-primary/20"
                        >
                            <h2 className="text-3xl font-black">Ready to Crunch Some Numbers?</h2>
                            <p className="text-muted-foreground max-w-lg mx-auto">
                                Join the thousands of learners who use our tool daily to optimize their study schedules.
                            </p>
                            <a
                                href="/"
                                className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform"
                            >
                                Start Analyzing Now
                            </a>
                        </motion.div>
                    </div>
                </div>

                <Footer />
            </div>
        </main>
    );
}

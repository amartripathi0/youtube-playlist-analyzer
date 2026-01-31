"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowLeft, BsShieldCheck } from "react-icons/bs";

export default function PrivacyPolicy() {
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
                        <BsShieldCheck size={24} />
                        <span className="text-xs font-black uppercase tracking-[0.4em]">Compliance</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tightest leading-none text-foreground">
                        Privacy <span className="text-primary italic">Policy.</span>
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
                    <h2 className="text-2xl font-black tracking-tight text-foreground">Introduction</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Your privacy is important to us. This Privacy Policy explains how YouTube Playlist Analyzer collects, uses, and protects your information when you use our service at amartripathi.com.
                    </p>

                    <h2 className="text-2xl font-black tracking-tight text-foreground">Data Collection</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We do not require users to log in or provide personal information such as names or email addresses to use our basic analysis tools. However, we may collect technical data such as IP addresses and browser types for security and analytical purposes.
                    </p>

                    <h2 className="text-2xl font-black tracking-tight text-foreground">YouTube API Usage</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Our tool uses YouTube API Services to retrieve public playlist and video data. By using this tool, you are also bound by the <a href="https://www.youtube.com/t/terms" target="_blank" rel="noreferrer" className="text-primary hover:underline">YouTube Terms of Service</a> and the <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google Privacy Policy</a>. We do not store any video or playlist data on our servers beyond the duration of your current session.
                    </p>

                    <h2 className="text-2xl font-black tracking-tight text-foreground">Advertising and Cookies</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We use Google AdSense to serve advertisements. Google uses cookies to serve ads based on your prior visits to our website or other websites on the Internet. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-primary hover:underline">Ads Settings</a>.
                    </p>

                    <h2 className="text-2xl font-black tracking-tight text-foreground">Contact Us</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        If you have any questions about this Privacy Policy, please reach out via my portfolio at <a href="https://amartripathi.com" className="text-primary hover:underline">amartripathi.com</a>.
                    </p>
                </section>
            </motion.div>
        </div>
    );
}

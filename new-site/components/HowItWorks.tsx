"use client";

import { motion } from "framer-motion";
import { SITE_DATA } from "@/constants/site-data";

export default function HowItWorks() {
    return (
        <section className="py-12 relative border-t border-white/5">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-10 space-y-2">
                    <p className="text-[10px] font-black text-primary tracking-[0.3em] uppercase opacity-60">
                        Workflow
                    </p>
                    <h2 className="text-2xl font-black tracking-tight opacity-80">
                        3 steps to insights
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-start">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-[20px] left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

                    {SITE_DATA.howItWorks.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative flex flex-col items-center text-center gap-3"
                        >
                            <div className="relative z-10 w-10 h-10 rounded-full glass flex items-center justify-center p-1 mb-2 group">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
                                <div className="w-full h-full rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                                    <span className="text-sm font-black text-foreground/40 group-hover:text-primary transition-colors select-none">
                                        {step.step}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1 px-4">
                                <h3 className="text-sm font-bold">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed text-xs">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

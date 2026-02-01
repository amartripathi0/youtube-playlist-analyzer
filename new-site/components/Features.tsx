"use client";

import { motion } from "framer-motion";
import { SITE_DATA } from "@/constants/site-data";

export default function Features() {
    return (
        <section className="py-8 relative overflow-hidden bg-secondary/5 border-t border-white/5">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-8 space-y-2">
                    <p className="text-[10px] font-black text-primary tracking-[0.3em] uppercase opacity-60">
                        Top features
                    </p>
                    <h2 className="text-2xl font-black tracking-tight opacity-80">
                        Why creators choose us
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {SITE_DATA.features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="p-6 rounded-2xl bg-background/50 border border-border/40 hover:border-primary/20 transition-all duration-300 flex flex-col gap-3 group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <feature.icon size={14} />
                                </div>
                                <h3 className="text-sm font-bold">{feature.title}</h3>
                            </div>
                            <p className="text-muted-foreground leading-relaxed text-xs">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

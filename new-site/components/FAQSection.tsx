"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsPlus, BsDash } from "react-icons/bs";
import { SITE_DATA } from "@/constants/site-data";

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className="py-12 relative overflow-hidden border-t border-white/5 bg-secondary/2">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-10 space-y-2">
                    <p className="text-[10px] font-black text-primary tracking-[0.3em] uppercase opacity-60">
                        FAQ
                    </p>
                    <h2 className="text-2xl font-black tracking-tight opacity-80">
                        Common Questions
                    </h2>
                </div>

                <div className="grid gap-3">
                    {SITE_DATA.faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${activeIndex === index
                                ? "bg-secondary/20 border-primary/10"
                                : "bg-transparent border-white/5 hover:bg-secondary/10"
                                }`}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="flex items-center justify-between w-full p-4 text-left outline-none"
                            >
                                <span className={`text-sm font-bold transition-colors ${activeIndex === index ? "text-primary" : "text-foreground/80 group-hover:text-foreground"
                                    }`}>
                                    {faq.question}
                                </span>
                                <span className={`flex-shrink-0 p-1.5 rounded-full transition-all duration-300 ${activeIndex === index
                                    ? "bg-primary/20 text-primary rotate-180"
                                    : "text-muted-foreground/50 group-hover:text-foreground"
                                    }`}>
                                    {activeIndex === index ? <BsDash size={18} /> : <BsPlus size={18} />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="px-4 pb-4 text-muted-foreground leading-relaxed text-xs">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import { useRef } from "react";
import Hero from "./components/Hero";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./context/LanguageContext";

export default function Home() {
    const { language, t } = useLanguage();
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Smooth Parallax vertical transition mapping scroll progress to coordinates
    const yText = useTransform(scrollYProgress, [0, 1], [60, -60]);

    const strokes = [
        {
            tag: t.about.stroke1.tag,
            headline: t.about.stroke1.title,
            description: t.about.stroke1.desc
        },
        {
            tag: t.about.stroke2.tag,
            headline: t.about.stroke2.title,
            description: t.about.stroke2.desc
        },
        {
            tag: t.about.stroke3.tag,
            headline: t.about.stroke3.title,
            description: t.about.stroke3.desc
        },
        {
            tag: t.about.stroke4.tag,
            headline: t.about.stroke4.title,
            description: t.about.stroke4.desc
        }
    ];

    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#863ecc] selection:text-black relative overflow-hidden">
            {/* 1. Existing Hero Section (Keep Intact) */}
            <Hero />

            {/* Ambient Background Glows */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[40%] right-[-10%] w-[60vh] h-[60vh] rounded-full bg-[#863ecc]/5 blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-15%] w-[80vh] h-[80vh] rounded-full bg-[#863ecc]/7 blur-[160px]" />
            </div>

            {/* 2. New Section: The Full-Width Statement Track */}
            <motion.section
                ref={sectionRef}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full bg-white/[0.02] border-t border-b border-white/10 py-16 mt-0 mb-0 backdrop-blur-md relative overflow-hidden shadow-2xl z-10"
            >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                <motion.div
                    style={{ y: yText }}
                    className="relative z-10 max-w-xl mx-auto px-6 text-center flex flex-col items-center gap-3"
                >
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#863ecc]">
                        [ {t.hero.statement} ]
                    </span>
                    <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                        {t.statement.line1} {t.statement.line2}
                    </p>
                </motion.div>
            </motion.section>

            <div className="container relative z-10 mx-auto px-6 max-w-6xl flex flex-col items-center pb-24">

                {/* 3. New Section: "Four Strokes About Me" */}
                <section id="about" className="w-full flex flex-col md:flex-row gap-16 md:gap-12 items-center pt-16 pb-24 mt-0 mb-0 max-w-6xl mx-auto">
                    {/* Left Column: Portrait */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full md:w-[40%] aspect-[3/4] relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900 group"
                    >
                        <Image
                            src="/testpage/about_portrait.png"
                            alt="Toni Camacho - Visual Creator"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            sizes="(max-w-768px) 100vw, 40vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                    </motion.div>

                    {/* Right Column: 4 Strokes highlights */}
                    <div className="w-full md:w-[60%] flex flex-col gap-8 md:pl-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex flex-col gap-2 mb-4"
                        >
                            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#863ecc]">
                                [ {language === "en" ? "ABOUT ME" : "SOBRE MI"} ]
                            </span>
                            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                                {language === "en" ? "WHO'S BEHIND?" : "QUI HI HA DARRERE?"}
                            </h3>
                        </motion.div>

                        <div className="flex flex-col gap-6 md:gap-8">
                            {strokes.map((stroke, index) => (
                                <motion.div
                                    key={stroke.tag}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                                    className="flex flex-col gap-1 border-l border-[#863ecc]/30 pl-6 hover:border-[#863ecc] transition-colors duration-300"
                                >
                                    <span className="text-[10px] font-mono tracking-widest text-[#863ecc] uppercase mb-1">
                                        {stroke.tag}
                                    </span>
                                    <h4 className="text-lg md:text-xl font-bold uppercase text-white tracking-tight">
                                        {stroke.headline}
                                    </h4>
                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                        {stroke.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. New Section: Contact Call to Action */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-4xl mx-auto py-20 text-center border-t border-white/10 mt-16 flex flex-col items-center justify-center gap-8 bg-gradient-to-b from-transparent to-white/[0.01] rounded-b-3xl"
                >
                    <div className="flex flex-col items-center justify-center gap-3 text-center">
                        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#863ecc] text-center">
                            [ {t.about.title} ]
                        </span>
                        <h3 className="text-2xl md:text-3xl font-light text-gray-300 tracking-wide text-center">
                            {t.cta.text}
                        </h3>
                    </div>

                    <Link href="/contact" className="relative group inline-flex items-center justify-center">
                        <div className="absolute inset-0 bg-[#863ecc] rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

                        <div className="relative px-10 py-5 bg-[#863ecc] text-white font-extrabold uppercase tracking-widest text-xs rounded-full transition-all duration-300 transform group-hover:scale-[1.03] group-hover:bg-white group-hover:text-black shadow-[0_4px_20px_rgba(134,62,204,0.25)] hover:shadow-[0_0_30px_rgba(134,62,204,0.4)] cursor-pointer">
                            {t.cta.button}
                        </div>
                    </Link>
                </motion.section>

            </div>
        </main>
    );
}

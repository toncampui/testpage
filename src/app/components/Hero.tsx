"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
    const { language } = useLanguage();
    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
            {/* Background Animated Elements */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/testpage/_DSC5222.jpg"
                    alt="Background Texture"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-violet/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[150px] animate-pulse delay-700" />
            </div>

            <div className="container relative z-10 px-6 text-center">
                <div className="animate-hero-title">
                    <h2 className="text-[#863ecc] uppercase tracking-[0.3em] text-sm font-semibold mb-6">
                        {language === "en" ? "Visual Creator" : "Creador Visual"}
                    </h2>
                    <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">
                        TONI CAMACHO
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 font-light tracking-wide">
                        {language === "en" ? "Photography | Video | 3D" : "Fotografia | Vídeo | 3D"}
                    </p>
                </div>

                <div className="animate-hero-btn flex flex-col items-center gap-6">
                    <Link
                        href="/services"
                        className="group relative inline-block px-8 py-4 bg-[#863ecc] text-white font-bold uppercase tracking-widest text-xs transition-all hover:bg-white hover:text-black overflow-hidden cursor-pointer"
                    >
                        <span className="relative z-10 block transition-colors group-hover:text-black">
                            {language === "en" ? "Discover my services" : "Descobreix els meus serveis"}
                        </span>
                        <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    </Link>
                </div>
            </div>

            {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
                onClick={() => {
                    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                }}
            >
                <span className="text-[10px] uppercase tracking-[0.4em] text-white transition-colors group-hover:text-[#863ecc]">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <ArrowDown size={14} className="text-white transition-colors group-hover:text-[#863ecc]" />
                </motion.div>
            </motion.div> */}
        </section>
    );
}

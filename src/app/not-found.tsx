"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-black text-white px-6 overflow-hidden select-none">
            {/* Ambient Purple Atmospheric Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#863ecc]/10 rounded-full blur-[140px] pointer-events-none" />

            {/* Centered Minimalist Content with 1s Fade-In Animation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto"
            >
                {/* Brand Logo Accent */}
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#863ecc] mb-6">
                    TONICAMACHO.PRO
                </span>

                {/* Big, bold, white, sans-serif heading saying "404" */}
                <h1 className="text-8xl sm:text-9xl md:text-[13rem] font-black tracking-tighter text-white leading-none mb-4">
                    404
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-xl text-gray-400 font-light tracking-wide mb-10 max-w-md">
                    Aquest enfocament no existeix.
                </p>

                {/* Minimal, outline-only button with hover color inversion */}
                <Link
                    href="/"
                    className="inline-block px-8 py-4 border border-white/30 text-white font-bold text-xs uppercase tracking-[0.25em] transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] cursor-pointer"
                >
                    Tornar a l&apos;inici
                </Link>
            </motion.div>
        </div>
    );
}

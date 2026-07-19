"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
    const [visible, setVisible] = useState(true);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let cleanupTimer: any;

        const handleLoad = () => {
            setFade(true);
            cleanupTimer = setTimeout(() => {
                setVisible(false);
            }, 500);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => {
                window.removeEventListener("load", handleLoad);
                if (cleanupTimer) clearTimeout(cleanupTimer);
            };
        }

        return () => {
            if (cleanupTimer) clearTimeout(cleanupTimer);
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            id="splash-screen"
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-500 ease-out ${
                fade ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
        >
            <div className="flex flex-col items-center gap-6">
                {/* Minimal CSS Animated Logo */}
                <h1 className="text-3xl md:text-4xl font-black tracking-[0.2em] text-white uppercase select-none animate-logo-pulse">
                    TONI CAMACHO
                </h1>
                {/* CSS Animated Progress Bar */}
                <div className="w-24 h-[2px] bg-neutral-800 rounded-full overflow-hidden relative">
                    <div className="absolute top-0 left-0 bottom-0 right-0 bg-[#863ecc] rounded-full animate-loader-bar" />
                </div>
            </div>
        </div>
    );
}

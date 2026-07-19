"use client";

import { useEffect, useState, ReactNode } from "react";
import styles from "./SplashScreen.module.css";

export default function SplashScreen({ children }: { children: ReactNode }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showOverlay, setShowOverlay] = useState(true);
    const [fadeOverlay, setFadeOverlay] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let cleanupTimer: any;
        let loaded = false;

        const handleLoad = () => {
            if (loaded) return;
            loaded = true;
            setIsLoaded(true);
            setFadeOverlay(true);
            cleanupTimer = setTimeout(() => {
                setShowOverlay(false);
            }, 500);
        };

        // Fallback: force trigger load transition after 2.5s if onload is delayed
        const fallbackTimer = setTimeout(handleLoad, 2500);

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => {
                window.removeEventListener("load", handleLoad);
                if (cleanupTimer) clearTimeout(cleanupTimer);
                if (fallbackTimer) clearTimeout(fallbackTimer);
            };
        }

        return () => {
            if (cleanupTimer) clearTimeout(cleanupTimer);
            if (fallbackTimer) clearTimeout(fallbackTimer);
        };
    }, []);

    return (
        <>
            {showOverlay && (
                <div
                    id="splash-screen"
                    className={`${styles.splashScreen} ${fadeOverlay ? styles.fade : ""}`}
                >
                    <div className="flex flex-col items-center gap-6">
                        {/* Logo Text Styling replicating Navbar */}
                        <h1 className={styles.logo}>
                            TONICAMACHO<span className={styles.proExtension}>.PRO</span>
                        </h1>
                        {/* Progress bar loader */}
                        <div className={styles.loaderTrack}>
                            <div className={styles.loaderBar} />
                        </div>
                    </div>
                </div>
            )}
            <div className={`${styles.contentWrapper} ${isLoaded ? styles.contentReady : ""}`}>
                {children}
            </div>
        </>
    );
}

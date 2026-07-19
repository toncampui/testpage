"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect, useState } from "react";

function LenisWindowBridge() {
    const lenis = useLenis();
    useEffect(() => {
        if (lenis) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).lenis = lenis;
        }
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (window as any).lenis;
        };
    }, [lenis]);
    return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // SSR: render children bare until hydrated
    if (!mounted) return <>{children}</>;

    // MOBILE: zero JS overhead — native iOS Safari scroll handles everything.
    // No Lenis, no touch listeners, no preventDefault. The browser momentum
    // scroll and -webkit-overflow-scrolling:touch in globals.css take over.
    if (isMobile) return <>{children}</>;

    // DESKTOP only: Lenis smooth-scroll wrapper
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            <LenisWindowBridge />
            {children}
        </ReactLenis>
    );
}

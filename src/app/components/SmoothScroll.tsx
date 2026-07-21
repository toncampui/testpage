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
    const [shouldEnableLenis, setShouldEnableLenis] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        window.addEventListener("resize", check);

        // Defer Lenis initialization until idle / main thread clears FCP
        let idleCallbackId: number;
        let timeoutId: ReturnType<typeof setTimeout>;

        if ("requestIdleCallback" in window) {
            idleCallbackId = window.requestIdleCallback(() => setShouldEnableLenis(true), { timeout: 2000 });
        } else {
            timeoutId = setTimeout(() => setShouldEnableLenis(true), 200);
        }

        return () => {
            window.removeEventListener("resize", check);
            if (idleCallbackId && "cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleCallbackId);
            }
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    // SSR or before idle deferral or Mobile: render bare children until deferred activation
    if (!mounted || isMobile || !shouldEnableLenis) return <>{children}</>;

    // DESKTOP only: Lenis smooth-scroll wrapper
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            <LenisWindowBridge />
            {children}
        </ReactLenis>
    );
}

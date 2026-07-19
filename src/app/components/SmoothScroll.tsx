"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";

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
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
                duration: 1.5,
                smoothWheel: true,
                syncTouch: false,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ...({ smoothTouch: false } as any),
            }}
        >
            <LenisWindowBridge />
            {children}
        </ReactLenis>
    );
}

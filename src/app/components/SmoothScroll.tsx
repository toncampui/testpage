"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const [disableLenis, setDisableLenis] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);

        const checkMobile = () => {
            setDisableLenis(window.innerWidth < 768 && pathname === "/services");
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, [pathname]);

    if (!mounted || disableLenis) {
        return <>{children}</>;
    }

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

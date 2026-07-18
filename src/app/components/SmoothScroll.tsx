"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
                duration: 1.5,
                smoothWheel: true,
                smoothTouch: false, // DESACTIVA el smooth scroll de Lenis en mòbil
                syncTouch: false    // Evita conflictes amb el scroll natiu
            }}
        >
            {children}
        </ReactLenis>
    );
}

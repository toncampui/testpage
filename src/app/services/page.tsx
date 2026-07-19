"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

// Global scrollbar-hiding CSS (scroll-snap removed — mobile uses its own
// isolated inner scroll container with its own snap context)
const HIDE_SCROLLBAR_CSS = `
    html::-webkit-scrollbar,
    body::-webkit-scrollbar,
    main::-webkit-scrollbar {
        display: none !important;
    }
    html, body, main {
        -ms-overflow-style: none !important;
        scrollbar-width: none !important;
    }
    html, body {
        scroll-behavior: smooth;
    }
`;

export default function ServicesPage() {
    const { language, t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const techContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activeTechIndex, setActiveTechIndex] = useState(0);
    // Mobile: which accordion card is expanded (0 = first item open by default)
    const [openIndex, setOpenIndex] = useState<number>(0);
    const mobileSectionRef = useRef<HTMLDivElement>(null);
    const isClickLockedRef = useRef(false);
    const isScrollingRef = useRef(false);
    const prevDeltaYRef = useRef(0);
    const resetDeltaTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [desktopParallaxY, setDesktopParallaxY] = useState(0);


    const SERVICES = t.services.list.map((item, idx) => {
        const images = [
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
            "/testpage/lloret.jpg",
            "/testpage/sagrera.jpg",
            "/testpage/xerif.jpg",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
        ];
        return {
            ...item,
            image: images[idx]
        };
    });

    const TECHNICAL_SERVICES = [
        {
            id: "foto",
            title: t.services.foto.title,
            description: t.services.foto.desc,
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
        },
        {
            id: "video",
            title: t.services.video.title,
            description: t.services.video.desc,
            image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
        },
        {
            id: "dron",
            title: t.services.dron.title,
            description: t.services.dron.desc,
            image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=1200&auto=format&fit=crop",
        },
        {
            id: "fpv-gopro",
            title: t.services.fpv.title,
            description: t.services.fpv.desc,
            image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop",
        },
        {
            id: "render-3d",
            title: t.services.render.title,
            description: t.services.render.desc,
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window === "undefined") return;

            const scrollY = window.scrollY;
            const viewportH = window.innerHeight;

            // 1. Showcase active index and parallax progress listener
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const offsetTop = scrollY + rect.top;
                const totalHeight = containerRef.current.offsetHeight;
                const scrollable = totalHeight - viewportH;
                const relativeScroll = Math.max(Math.min(scrollY - offsetTop, scrollable), 0);
                const progress = scrollable > 0 ? relativeScroll / scrollable : 0;

                // Map progress (0 to 1) to translateY (24px to -24px)
                // Scrolling down (progress increases) -> translateY goes negative (slides up)
                // Scrolling up (progress decreases) -> translateY goes positive (slides down)
                const parallaxY = 24 - progress * 48;
                setDesktopParallaxY(parallaxY);
            }

            const showIndex = Math.min(
                Math.max(Math.round(scrollY / viewportH), 0),
                SERVICES.length - 1
            );
            setActiveIndex(showIndex);

            // 3. Technical Capabilities active index listener
            const elements = document.querySelectorAll("[data-tech-item]");
            let closestIndex = 0;
            let closestDist = Infinity;
            const centerY = window.innerHeight / 2;

            elements.forEach((el, index) => {
                const rect = el.getBoundingClientRect();
                const elCenter = rect.top + rect.height / 2;
                const dist = Math.abs(elCenter - centerY);
                if (dist < closestDist) {
                    closestDist = dist;
                    closestIndex = index;
                }
            });

            setActiveTechIndex(closestIndex);
        };

        window.addEventListener("scroll", handleScroll);
        const timer = setTimeout(handleScroll, 100);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timer);
        };
    }, [SERVICES.length]);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const handleWheel = (e: WheelEvent) => {
            if (typeof window === "undefined") return;

            const scrollY = window.scrollY;
            const viewportH = window.innerHeight;
            const showcaseEnd = (SERVICES.length - 1) * viewportH;

            // If we are below the showcase, behave normally
            if (scrollY > showcaseEnd + 50) {
                return;
            }

            // Calculate current index
            const currentIndex = Math.min(
                Math.max(Math.round(scrollY / viewportH), 0),
                SERVICES.length - 1
            );

            // If we are at the last item and scrolling down, let normal scroll pass
            if (currentIndex === SERVICES.length - 1 && e.deltaY > 0) {
                return;
            }

            // If we are at the first item and scrolling up, let normal scroll pass
            if (currentIndex === 0 && e.deltaY < 0) {
                return;
            }

            // Intercept wheel event
            e.preventDefault();

            const absDeltaY = Math.abs(e.deltaY);
            const prevDeltaY = prevDeltaYRef.current;
            prevDeltaYRef.current = absDeltaY;

            // Debounced reset of prevDeltaY after wheel events stop
            if (resetDeltaTimerRef.current) {
                clearTimeout(resetDeltaTimerRef.current);
            }
            resetDeltaTimerRef.current = setTimeout(() => {
                prevDeltaYRef.current = 0;
            }, 150);

            // If a transition is already in progress, ignore
            if (isScrollingRef.current) return;

            // Trackpad momentum decay filtering:
            // Only allow transition if current deltaY is significantly higher than previous,
            // signaling the start of a new intentional swipe.
            const isIntentionalNewGesture =
                (prevDeltaY === 0 && absDeltaY > 2) ||
                (absDeltaY > prevDeltaY + 5);
            if (!isIntentionalNewGesture) {
                return;
            }

            let targetIndex = currentIndex;
            if (e.deltaY > 0) {
                targetIndex = Math.min(currentIndex + 1, SERVICES.length - 1);
            } else if (e.deltaY < 0) {
                targetIndex = Math.max(currentIndex - 1, 0);
            }

            if (targetIndex !== currentIndex) {
                isScrollingRef.current = true;

                window.scrollTo({
                    top: targetIndex * viewportH,
                    behavior: "smooth"
                });

                if (timer) clearTimeout(timer);

                timer = setTimeout(() => {
                    isScrollingRef.current = false;
                }, 1200); // 1200ms hard lock cooldown
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            if (timer) clearTimeout(timer);
            if (resetDeltaTimerRef.current) {
                clearTimeout(resetDeltaTimerRef.current);
            }
        };
    }, [SERVICES.length]);

    const handleDotClick = (index: number) => {
        if (typeof window !== "undefined") {
            const scrollDistance = index * window.innerHeight;
            window.scrollTo({
                top: scrollDistance,
                behavior: "smooth"
            });
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleTechClick = (index: number) => {
        const elements = document.querySelectorAll("[data-tech-item]");
        const targetEl = elements[index];
        if (typeof window !== "undefined" && targetEl) {
            const scrollTop = window.scrollY;
            const rect = targetEl.getBoundingClientRect();
            const elementCenter = scrollTop + rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const scrollTarget = elementCenter - viewportCenter;

            window.scrollTo({
                top: scrollTarget,
                behavior: "smooth"
            });
        }
    };

    // Toggle open card; click-locks for 700ms so scroll can't immediately override
    const handleCardToggle = (index: number) => {
        setOpenIndex(prev => prev === index ? -1 : index);
        isClickLockedRef.current = true;
        setTimeout(() => { isClickLockedRef.current = false; }, 700);
    };

    // ── Mobile scroll-driven accordion (passive, no preventDefault) ───────
    useEffect(() => {
        if (typeof window === "undefined") return;
        const handleMobileScroll = () => {
            if (window.innerWidth >= 768) return;
            if (isClickLockedRef.current || !mobileSectionRef.current) return;
            const scrollY = window.scrollY;
            const sectionTop = scrollY + mobileSectionRef.current.getBoundingClientRect().top;
            const relScroll = Math.max(scrollY - sectionTop, 0);
            const totalScrollable = mobileSectionRef.current.offsetHeight - window.innerHeight;
            if (totalScrollable <= 0) return;
            const step = totalScrollable / (SERVICES.length - 1);
            const idx = Math.min(
                Math.max(Math.round(relScroll / step), 0),
                SERVICES.length - 1
            );
            setOpenIndex(idx);
        };
        window.addEventListener("scroll", handleMobileScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleMobileScroll);
    }, [SERVICES.length]);

    return (
        <main className="min-h-screen relative bg-black text-white selection:bg-[#863ecc] selection:text-black">
            {/* Atmospheric Background Ambient Glows */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[50vh] h-[50vh] rounded-full bg-[#863ecc]/5 blur-[120px]" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[70vh] h-[70vh] rounded-full bg-[#863ecc]/8 blur-[160px]" />
            </div>

            {/* ── MOBILE-ONLY: Scroll-Driven Sticky-Stack Accordion ────────────────
                 • Section has scroll room (≈ N*120vh) so sticky cards can stack
                 • Passive scroll listener maps scrollY → openIndex (no preventDefault)
                 • Click toggles instantly, locks scroll-override for 700ms
                 • Image crossfades on every openIndex change                   */}
            <section
                ref={mobileSectionRef}
                className="md:hidden w-full bg-black relative"
                style={{ minHeight: `${SERVICES.length * 120}vh` }}
            >
                {/* ① Sticky image — stays locked at top while cards scroll beneath */}
                <div
                    className="sticky top-[64px] w-full z-40 overflow-hidden bg-black"
                    style={{ aspectRatio: "16/9" }}
                >
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={`mob-img-${openIndex}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={SERVICES[Math.max(openIndex, 0)].image}
                                alt={SERVICES[Math.max(openIndex, 0)].title}
                                fill
                                className="object-cover"
                                sizes="100vw"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent pointer-events-none" />
                        </motion.div>
                    </AnimatePresence>

                    {/* Counter badge */}
                    <span className="absolute bottom-3 left-4 z-10 text-[9px] font-mono uppercase tracking-[0.3em] text-[#863ecc]">
                        0{Math.max(openIndex, 0) + 1} / 0{SERVICES.length}
                        {" — "}{SERVICES[Math.max(openIndex, 0)].title}
                    </span>
                </div>

                {/* ② Sticky accordion cards — each stacks at a higher top offset */}
                {SERVICES.map((service, index) => {
                    const isOpen = index === openIndex;
                    return (
                        <div
                            key={service.id}
                            style={{
                                position: "sticky",
                                // Stack cards below the image: navbar(64) + image(100vw*9/16) + per-card offset
                                top: `calc(64px + (100vw * 9 / 16) + ${index * 52}px)`,
                                zIndex: 10 + index,
                                willChange: "transform",
                                WebkitBackfaceVisibility: "hidden",
                                backfaceVisibility: "hidden",
                            }}
                            className="w-full bg-black border-t border-white/10"
                        >
                            {/* Title row — tap to toggle, image & badge update instantly */}
                            <button
                                type="button"
                                onClick={() => handleCardToggle(index)}
                                className="w-full px-5 py-4 flex items-center justify-between bg-transparent border-0 cursor-pointer focus:outline-none"
                                style={{ touchAction: "manipulation", pointerEvents: "auto" }}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-mono uppercase tracking-widest w-[60px] text-left transition-colors duration-300 ${isOpen ? "text-[#863ecc]" : "text-white/40"}`}>
                                        [ 0{index + 1} ] -
                                    </span>
                                    <span className={`font-black uppercase tracking-tight leading-tight transition-all duration-300 ${isOpen ? "text-lg text-white" : "text-sm text-white/50"}`}>
                                        {service.title.toUpperCase()}
                                    </span>
                                </div>
                                {/* Chevron */}
                                <span
                                    className="shrink-0 text-[#863ecc] text-lg leading-none transition-transform duration-300"
                                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                                >
                                    ▾
                                </span>
                            </button>

                            {/* Expandable description */}
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        key="desc"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ overflow: "hidden" }}
                                    >
                                        <div className="px-5 pb-6 pl-[calc(60px+1.25rem+0.75rem)]">
                                            <p className="text-[13px] text-gray-400 leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </section>



            {/* ── DESKTOP: Scroll-snap showcase (hidden on mobile) ─────────── */}
            <div
                ref={containerRef}
                className="hidden md:block relative min-h-[500vh] [--item-height:25vh] md:[--item-height:30vh]"
            >
                {/* 100vh CSS Scroll Snap Target Spacers */}
                <div className="absolute inset-0 pointer-events-none flex flex-col z-0">
                    <div className="h-screen w-full scroll-snap-align-center scroll-snap-stop-always" />
                    <div className="h-screen w-full scroll-snap-align-center scroll-snap-stop-always" />
                    <div className="h-screen w-full scroll-snap-align-center scroll-snap-stop-always" />
                    <div className="h-screen w-full scroll-snap-align-center scroll-snap-stop-always" />
                    <div className="h-screen w-full scroll-snap-align-center scroll-snap-stop-always" />
                </div>

                {/* Sticky Wrapper that remains fixed in viewport as user scrolls */}
                <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col md:flex-row z-10">

                    {/* Left Side (40% width) - Sleek Vertical Image Reveal System */}
                    <div className="hidden md:flex relative w-[40%] h-full items-center justify-center overflow-hidden bg-black/40 backdrop-blur-3xl border-r border-white/5">

                        {/* Moody purple glow behind the vertical frame */}
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={`glow-${activeIndex}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: [0.4, 0.7, 0.5],
                                    scale: [0.95, 1.05, 1]
                                }}
                                exit={{ opacity: 0.3 }}
                                transition={{
                                    duration: 1.5,
                                    ease: "easeOut",
                                    opacity: {
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        duration: 3,
                                    }
                                }}
                                className="absolute w-[400px] h-[550px] rounded-full bg-[#863ecc]/20 blur-[100px] pointer-events-none z-0"
                            />
                        </AnimatePresence>

                        {/* Borderless wrapper container for layout positioning with 3D perspective */}
                        <div className="relative w-[280px] sm:w-[320px] md:w-[340px] aspect-[3/4] z-10" style={{ perspective: "1200px" }}>
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ scale: 0.85, y: 150, rotateX: -25, opacity: 0 }}
                                    animate={{ scale: 1, y: 0, rotateX: 0, opacity: 1 }}
                                    exit={{ scale: 0.85, y: -150, rotateX: 25, opacity: 0 }}
                                    transition={{
                                        duration: 0.75,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(134,62,204,0.3)] border border-white/15 bg-neutral-950"
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    <Image
                                        src={SERVICES[activeIndex].image}
                                        alt={SERVICES[activeIndex].title}
                                        fill
                                        className="object-cover w-full h-full scale-[1.12]"
                                        style={{
                                            transform: `translateY(${desktopParallaxY}px)`,
                                            willChange: "transform",
                                        }}
                                        sizes="(max-w-768px) 100vw, 40vw"
                                        priority
                                    />

                                    {/* Vignette overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Side (60% width) - Smooth sliding typography centered vertically */}
                    <div className="relative w-full md:w-[60%] flex-1 h-0 md:h-full flex flex-col justify-center bg-black/20 backdrop-blur-sm">

                        {/* Vertical translation menu */}
                        <div className="w-full h-full flex flex-col justify-center overflow-hidden relative">
                            <div
                                style={{
                                    transform: `translateY(calc(-1 * (var(--item-height) / 2) - (${activeIndex} * var(--item-height))))`,
                                }}
                                className="absolute top-1/2 left-0 right-0 flex flex-col transition-transform duration-700 ease-out"
                            >
                                {SERVICES.map((service, index) => {
                                    const isActive = index === activeIndex;
                                    return (
                                        <div
                                            key={service.id}
                                            className="min-h-[var(--item-height)] flex flex-col justify-center px-6 sm:px-16 md:px-24 shrink-0"
                                        >
                                            <h2
                                                onClick={() => handleDotClick(index)}
                                                className={`text-6xl font-black tracking-tighter transition-all duration-700 cursor-pointer select-none origin-left uppercase ${isActive
                                                    ? "text-white scale-100 opacity-100"
                                                    : "text-white/20 scale-85 opacity-30 hover:opacity-50 hover:scale-90"
                                                    }`}
                                            >
                                                {service.title}
                                            </h2>

                                            <AnimatePresence initial={false}>
                                                {isActive && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                                        animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                                                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                                        className="overflow-hidden max-w-lg hidden md:block pb-2 shrink-0"
                                                    >
                                                        <p className="text-xs sm:text-sm uppercase tracking-widest text-[#863ecc] font-bold mb-2">
                                                            {service.subtitle}
                                                        </p>
                                                        <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed pb-2">
                                                            {service.description}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Scroll Dots indicator */}
                        <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-30">
                            {SERVICES.map((service, index) => (
                                <button
                                    key={service.id}
                                    onClick={() => handleDotClick(index)}
                                    className="group flex items-center justify-end gap-3 focus:outline-none cursor-pointer"
                                    aria-label={`Scroll to ${service.title}`}
                                >
                                    <span className="text-[9px] uppercase tracking-widest text-[#863ecc] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:inline">
                                        {service.title}
                                    </span>
                                    <div
                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${index === activeIndex
                                            ? "bg-[#863ecc] scale-200 shadow-[0_0_12px_#863ecc]"
                                            : "bg-white/20 hover:bg-white/50"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Scroll Hint at bottom right */}
                        <div className="absolute bottom-8 left-8 sm:left-16 md:left-24 text-[9px] uppercase tracking-[0.3em] text-white/40 hidden md:flex items-center gap-2 pointer-events-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#863ecc] animate-ping" />
                            {language === "en" ? "Scroll down to explore" : "Desplaça't per explorar"}
                        </div>
                    </div>

                    {/* Mobile Bottom Image Showcase Container */}
                    <div className="md:hidden w-full px-4 pb-6 flex-shrink-0 z-40" style={{ perspective: "1000px" }}>
                        <div className="relative w-full h-[200px] sm:h-[25vh]">
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key={`mobile-${activeIndex}`}
                                    initial={{ opacity: 0, scale: 0.9, x: -60 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, x: 60 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(134,62,204,0.35)] border border-white/15 bg-neutral-950"
                                >
                                    <Image
                                        src={SERVICES[activeIndex].image}
                                        alt={SERVICES[activeIndex].title}
                                        fill
                                        className="object-cover w-full h-full"
                                        sizes="100vw"
                                        priority
                                    />

                                    {/* Vignette overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Technical Capabilities Stacking Cards Section */}
            <section
                ref={techContainerRef}
                className="relative z-20 w-full bg-black border-t border-white/5 pb-24 md:pb-32"
            >
                {/* Sticky Header */}
                <div className="sticky top-[48px] -mt-[48px] pt-[68px] pb-6 bg-black z-30 text-center px-6 mb-4">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase mb-4 text-white">
                        {t.services.title}
                    </h2>
                    <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
                        {t.services.subtitle}
                    </p>
                </div>

                <div className="w-full max-w-5xl mx-auto flex flex-col px-6 sm:px-12 md:px-16">
                    {TECHNICAL_SERVICES.map((tech, index) => {
                        return (
                            <div
                                key={tech.id}
                                style={{
                                    position: "sticky",
                                    top: `${220 + index * 24}px`,
                                    zIndex: 10 + index,
                                    height: "auto",
                                    marginTop: index === 0 ? "48px" : undefined,
                                }}
                                className={`w-full bg-black flex flex-col justify-start select-none py-6 ${index === 0 ? "pb-24 mb-12" : index === TECHNICAL_SERVICES.length - 1 ? "mb-0" : "mb-12"}`}
                            >
                                {/* Panel Header */}
                                <div className="flex items-center justify-between w-full pb-3 border-b border-white/10">
                                    <div className="flex items-baseline gap-4 md:gap-6">
                                        <span className="text-xs sm:text-sm font-mono tracking-widest text-[#863ecc]">
                                            [ 0{index + 1} ]
                                        </span>
                                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-white tracking-tight">
                                            {tech.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Panel Content — desktop side-by-side, mobile stacked */}
                                <div className="pt-4">
                                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
                                        {/* Text Side */}
                                        <div className="w-full md:w-1/2 flex flex-col justify-center">
                                            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-lg">
                                                {tech.description}
                                            </p>
                                        </div>
                                        {/* Image Side */}
                                        <div className="w-full md:w-1/2 relative aspect-[16/9] rounded-xl overflow-hidden border border-white/5 bg-neutral-900">
                                            <Image
                                                src={tech.image}
                                                alt={tech.title}
                                                fill
                                                className="object-cover object-center"
                                                sizes="(max-width: 768px) 90vw, 40vw"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <style dangerouslySetInnerHTML={{ __html: HIDE_SCROLLBAR_CSS }} />
        </main>
    );
}

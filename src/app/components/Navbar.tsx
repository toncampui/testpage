"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
    const { language, setLanguage, t } = useLanguage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    const [isDesktopLangOpen, setIsDesktopLangOpen] = useState(false);
    const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
    const desktopRef = useRef<HTMLDivElement>(null);
    const mobileRef = useRef<HTMLDivElement>(null);

    // Track scroll position for navbar background transition
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Ensure we only render the portal after hydration
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (desktopRef.current && !desktopRef.current.contains(target)) {
                setIsDesktopLangOpen(false);
            }
            if (mobileRef.current && !mobileRef.current.contains(target)) {
                setIsMobileLangOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Lock body scroll AND stop Lenis when mobile menu is open.
    // Lenis reads its own wrapper's transform — freezing it via the
    // lenis instance is the correct way to prevent it fighting fixed elements.
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
            // Stop Lenis if available on the window object
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).lenis?.stop?.();
        } else {
            document.body.style.overflow = "";
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).lenis?.start?.();
        }
        return () => {
            document.body.style.overflow = "";
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).lenis?.start?.();
        };
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: t.nav.services, href: "/services" },
        { name: t.nav.portfolio, href: "/portfolio" },
        { name: t.nav.contact, href: "/contact" },
    ];

    // Explicit language selections are rendered via maps

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsMobileLangOpen(false);
    };

    // ── Mobile Overlay rendered via Portal so it escapes the <nav>
    // and any Lenis/transform stacking contexts that break position:fixed
    const mobileOverlay = (
        <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div
                    key="mobile-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.32, ease: "easeOut" }}
                    style={{
                        position: "fixed",
                        inset: 0,
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        zIndex: 99999,
                    }}
                    className="md:hidden bg-[#050505] backdrop-blur-xl flex flex-col items-center justify-center"
                >
                    {/* Close button — absolute top-right */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        onClick={closeMobileMenu}
                        style={{ position: "absolute", top: "20px", right: "24px" }}
                        className="text-white/50 hover:text-white transition-colors duration-200"
                        aria-label="Close menu"
                    >
                        <X size={26} />
                    </motion.button>

                    {/* Central content column */}
                    <div className="flex flex-col items-center gap-10">

                        {/* Logo — centrepiece */}
                        <motion.div
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08, duration: 0.4, ease: "easeOut" }}
                            className="flex flex-col items-center gap-2"
                        >
                            <Link
                                href="/"
                                onClick={closeMobileMenu}
                                className="text-3xl font-black tracking-tighter text-white"
                            >
                                TONICAMACHO<span className="text-[#863ecc]">.PRO</span>
                            </Link>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.22, duration: 0.4, ease: "easeOut" }}
                                className="w-8 h-px bg-[#863ecc]/50"
                            />
                        </motion.div>

                        {/* Nav Links */}
                        <nav className="flex flex-col items-center gap-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 12 }}
                                    transition={{ delay: 0.18 + i * 0.07, duration: 0.35, ease: "easeOut" }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={closeMobileMenu}
                                        className="text-2xl font-black uppercase tracking-[0.22em] text-white/70 hover:text-[#863ecc] transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Separator */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.44, duration: 0.35 }}
                            className="w-8 h-px bg-white/10"
                        />

                        {/* Compact language switcher (Mobile) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="relative"
                            ref={mobileRef}
                        >
                            <button
                                onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                                className="text-[10px] font-mono tracking-widest border border-white/15 hover:border-[#863ecc]/50 rounded-full px-5 py-2 text-gray-500 hover:text-[#863ecc] transition-all uppercase flex items-center gap-1.5 cursor-pointer"
                                aria-expanded={isMobileLangOpen}
                                aria-label="Select Language"
                            >
                                {language}
                                <span className={`inline-block text-[8px] transition-transform duration-300 ${isMobileLangOpen ? "rotate-180" : ""}`}>
                                    ▼
                                </span>
                            </button>

                            <AnimatePresence>
                                {isMobileLangOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                        className="absolute left-1/2 -translate-x-1/2 mt-2 w-20 bg-neutral-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col z-50"
                                    >
                                        {(["en", "ca", "es"] as const)
                                            .filter((lang) => lang !== language)
                                            .map((lang) => (
                                                <button
                                                    key={lang}
                                                    onClick={() => {
                                                        setLanguage(lang);
                                                        closeMobileMenu();
                                                    }}
                                                    className="w-full text-center text-[10px] font-mono tracking-widest px-4 py-2.5 text-gray-400 hover:text-[#863ecc] hover:bg-white/5 transition-colors uppercase cursor-pointer"
                                                >
                                                    {lang}
                                                </button>
                                            ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Ambient purple glow */}
                    <div
                        style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }}
                        className="w-[70vw] h-[35vh] rounded-full bg-[#863ecc]/6 blur-[130px]"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );

    const isHomePage = pathname === "/";
    const isTransparent = isHomePage && !isScrolled;

    return (
        <>
            <nav
                style={{
                    zIndex: 10000,
                    transform: "translateZ(0)",
                    WebkitTransform: "translateZ(0)",
                    backgroundColor: isTransparent ? "transparent" : "#000000",
                }}
                className={`fixed top-0 left-0 right-0 h-20 flex items-center border-b transition-all duration-300 ease-in-out ${
                    isTransparent
                        ? "bg-transparent border-transparent shadow-none"
                        : "bg-[#000000] backdrop-blur-md border-white/10 shadow-lg scrolled"
                }`}
            >
                <div className="container px-6 mx-auto flex justify-between items-center h-full">
                    <Link href="/" className="text-xl font-black tracking-tighter">
                        TONICAMACHO<span className="text-[#863ecc]">.PRO</span>
                    </Link>

                    <div className="flex items-center gap-8">
                        {/* Desktop Nav — untouched */}
                        <div className="hidden md:flex gap-12 items-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-[10px] uppercase tracking-[0.3em] transition-colors ${pathname === link.href ? "text-[#863ecc] font-bold" : "text-gray-400 hover:text-[#863ecc]"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Compact language switcher (Desktop) */}
                        <div className="relative" ref={desktopRef}>
                            <button
                                onClick={() => setIsDesktopLangOpen(!isDesktopLangOpen)}
                                className="text-[10px] font-mono tracking-widest border border-white/20 hover:border-white/50 rounded-full px-4 py-1 text-gray-400 hover:text-white transition-all select-none uppercase hover:bg-white/5 flex items-center gap-1.5 cursor-pointer"
                                aria-expanded={isDesktopLangOpen}
                                aria-label="Select Language"
                            >
                                {language}
                                <span className={`inline-block text-[8px] transition-transform duration-300 ${isDesktopLangOpen ? "rotate-180" : ""}`}>
                                    ▼
                                </span>
                            </button>

                            <AnimatePresence>
                                {isDesktopLangOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                        className="absolute right-0 mt-2 w-20 bg-neutral-950/95 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md shadow-2xl flex flex-col z-50"
                                    >
                                        {(["en", "ca", "es"] as const)
                                            .filter((lang) => lang !== language)
                                            .map((lang) => (
                                                <button
                                                    key={lang}
                                                    onClick={() => {
                                                        setLanguage(lang);
                                                        setIsDesktopLangOpen(false);
                                                    }}
                                                    className="w-full text-left text-[10px] font-mono tracking-widest px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 transition-colors uppercase cursor-pointer"
                                                >
                                                    {lang}
                                                </button>
                                            ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mobile Hamburger — high z-index so it stays above the overlay too */}
                        {navLinks.length > 0 && (
                            <button
                                className="md:hidden text-white relative"
                                style={{ zIndex: 100000 }}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Portal: render overlay directly on document.body to escape
                the Lenis transform stacking context that breaks position:fixed */}
            {mounted && createPortal(mobileOverlay, document.body)}
        </>
    );
}

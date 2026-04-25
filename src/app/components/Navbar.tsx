"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks: Array<{ name: string; href: string }> = [
    // { name: "Home", href: "/" },
    // { name: "About", href: "/about" },
    // { name: "Projects", href: "/portfolio" },
    // { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 ${isScrolled
                ? "bg-[#050505]/90 backdrop-blur-md border-b border-white/10 shadow-lg"
                : "bg-transparent border-transparent shadow-none"
                }`}
        >
            <div className="container px-6 mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-black tracking-tighter">
                    TONICAMACHO<span className="text-[#863ecc]">.PRO</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-12">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-[10px] uppercase tracking-[0.3em] transition-colors ${usePathname() === link.href ? "text-[#863ecc] font-bold" : "text-gray-400 hover:text-[#863ecc]"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                {navLinks.length > 0 && (
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                )}
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-black border-b border-white/5 p-8 md:hidden"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-sm uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

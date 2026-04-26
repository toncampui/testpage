"use client";

import { Instagram, Linkedin, Send } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-12 bg-black border-t border-white/5">
            <div className="container px-6 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                    <div className="flex flex-col items-center md:items-start">
                        <p className="text-gray-600 text-[10px] uppercase tracking-[0.4em] mb-2">
                            © 2026 TONICAMACHO.PR
                        </p>
                        <Link href="/legal" className="text-xs text-gray-600 hover:text-[#863ecc] transition-colors">
                            Legal & Privacy Policy
                        </Link>
                    </div>

                    <div className="flex gap-6">
                        <a href="https://www.instagram.com/tonicamacho.pro" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/5 rounded-full hover:bg-white hover:text-black transition-all">
                            <Instagram size={18} />
                        </a>
                        <a href="https://www.linkedin.com/in/toni-camacho" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/5 rounded-full hover:bg-white hover:text-black transition-all">
                            <Linkedin size={18} />
                        </a>
                        <a href="mailto:info@tonicamacho.pro" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/5 rounded-full hover:bg-white hover:text-black transition-all">
                            <Send size={18} />
                        </a>
                    </div>

                    <p className="text-gray-600 text-[9px] uppercase tracking-[0.2em] italic text-center md:text-right">
                        Visual Creator | Photography | 3D | Video
                    </p>
                </div>
            </div>
        </footer>
    );
}

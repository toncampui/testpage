"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Image from "next/image";

const featured = [
    { id: 1, title: "Hivernal Del Bages", category: "Videography", image: "/tonicamacho/hivernal.png" },
    { id: 2, title: "Rally Lloret de Mar", category: "Motorsport", image: "/tonicamacho/lloret.jpg" },
    { id: 3, title: "Hotel La Sagrera", category: "Photography", image: "/tonicamacho/sagrera2.jpg" },
];

export default function FeaturedWork() {
    return (
        <section id="work" className="py-24 bg-black">
            <div className="container px-6 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <h2 className="text-[#863ecc]- uppercase tracking-[0.3em] text-sm font-semibold mb-6">
                            Featured Work
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold">
                            Latest <span className="text-[#863ecc]">Creations</span>.
                        </h3>
                    </div>
                    <Link
                        href="/portfolio"
                        className="group flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                    >
                        Explore All Work
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featured.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative aspect-[4/5] bg-neutral-900 overflow-hidden rounded-3xl"
                        >
                            {/* Background Image & Overlay */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 z-10" />
                            </div>

                            {/* Content */}
                            <div className="relative z-20 h-full flex items-center justify-center border border-white/5 p-6">
                                <div className="text-center">
                                    <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-2">{item.category}</p>
                                    <p className="text-xl font-bold text-white group-hover:text-[#863ecc] transition-colors">{item.title}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

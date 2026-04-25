"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

interface Job {
    id: number;
    company: string;
    role: string;
    description: string;
}

const jobs: Job[] = [
    {
        id: 1,
        company: "Dabuten",
        role: "Audiovisual Technician & Drone Pilot",
        description: "Managed comprehensive race weekend coverage, delivering high-speed photography and edited video reels for international teams."
    },
    {
        id: 2,
        company: "Cymatic",
        role: "Motion Graphics Designer",
        description: "Spearheaded the CGI department, creating hyper-realistic product renders and visual effects for tech campaigns."
    },
    {
        id: 3,
        company: "FGF Produccions",
        role: "Camera Operator",
        description: "Captured high-intensity action sports footage, ensuring dynamic angles and stable shots in fast-paced environments."
    }
];

export default function About() {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    return (
        <section className="pt-32 pb-24 min-h-screen bg-black text-white">
            <div className="container px-6 mx-auto">
                {/* Top Section: Profile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
                    {/* Left: Portrait */}
                    <motion.div
                        className="flex justify-center items-center animate-[fadeIn_1s_ease-out_forwards] md:w-full"
                    >
                        <div className="relative w-64 h-64 md:w-80 md:h-80 group transition-transform duration-300 ease-in-out hover:scale-105">
                            {/* Glow Effect */}
                            <div className="absolute -inset-4 bg-[#863ecc]/20 blur-xl -z-10 rounded-full opacity-50" />

                            {/* Image Container */}
                            <div className="relative w-full h-full rounded-full overflow-hidden border border-[#863ecc]/30">
                                <div className="absolute inset-0 bg-[#863ecc]/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                <Image
                                    src="/tonicamacho/PERFIL.png"
                                    alt="Toni Camacho"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col justify-center"
                    >
                        <h2 className="text-[#863ecc] uppercase tracking-[0.3em] text-sm font-bold mb-6">
                            About Me
                        </h2>
                        <h1 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                            Visual Creator bridging the gap between <span className="text-[#863ecc]">motorsport adrenaline</span> and <span className="text-[#863ecc]">3D precision</span>.
                        </h1>
                    </motion.div>
                </div>

                {/* Bottom Section: Professional Path */}
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[#863ecc] uppercase tracking-[0.3em] text-sm font-bold mb-12"
                    >
                        Professional Path
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {jobs.map((job, index) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedJob(job)}
                                className="group p-8 bg-white/5 border border-white/10 hover:border-[#863ecc]/50 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/10 flex flex-col justify-center gap-1"
                            >
                                <h3 className="text-2xl font-bold text-white group-hover:text-white transition-colors">{job.company}</h3>
                                <p className="text-[#863ecc] font-bold text-lg">{job.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedJob && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedJob(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl shadow-[#863ecc]/20"
                        >
                            <button
                                onClick={() => setSelectedJob(null)}
                                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <h2 className="text-3xl md:text-4xl font-bold mb-2">
                                {selectedJob.company}
                            </h2>
                            <h4 className="text-xl text-[#863ecc] mb-8 font-medium">
                                {selectedJob.role}
                            </h4>

                            <p className="text-gray-400 text-lg leading-relaxed">
                                {selectedJob.description}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

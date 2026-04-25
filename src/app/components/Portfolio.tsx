"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

type Category = "All" | "Motorsport" | "Photography" | "Video" | "3D Art" | "Design";

interface Project {
    id: number;
    title: string;
    category: Category;
    image: string;
    isVideo?: boolean;
}

const allProjects: Project[] = [
    { id: 1, title: "Track Day Silence", category: "Motorsport", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop" },
    { id: 2, title: "Neon City", category: "Photography", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop" },
    { id: 3, title: "Abstract Flow", category: "3D Art", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop" },
    { id: 4, title: "Kinetic Motion", category: "Video", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop", isVideo: true },
    { id: 5, title: "Speed Demon", category: "Motorsport", image: "https://images.unsplash.com/photo-1541348263662-e068662d82af?q=80&w=1887&auto=format&fit=crop" },
    { id: 6, title: "Brand Identity", category: "Design", image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop" },
    { id: 7, title: "Showreel 2025", category: "Video", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop", isVideo: true },
    { id: 8, title: "Portrait Study", category: "Photography", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop" },
    { id: 9, title: "Cyber Sculpture", category: "3D Art", image: "https://images.unsplash.com/photo-1633596683562-4a47eb486d57?q=80&w=2072&auto=format&fit=crop" },
    { id: 10, title: "Editorial Layout", category: "Design", image: "https://images.unsplash.com/photo-1558655146-d09347e0c766?q=80&w=1887&auto=format&fit=crop" },
    { id: 11, title: "Apex Corner", category: "Motorsport", image: "https://images.unsplash.com/photo-1532906619279-a764d262d057?q=80&w=2070&auto=format&fit=crop" },
    { id: 12, title: "Urban Light", category: "Photography", image: "https://images.unsplash.com/photo-1517732306149-e8f129dcb975?q=80&w=1887&auto=format&fit=crop" },
];

const categories: Category[] = ["All", "Motorsport", "Photography", "Video", "3D Art", "Design"];

export default function Portfolio() {
    const [activeCategory, setActiveCategory] = useState<Category>("All");

    const filteredProjects = activeCategory === "All"
        ? allProjects
        : allProjects.filter(project => project.category === activeCategory);

    return (
        <section className="min-h-screen bg-black pt-32 pb-20">
            <div className="container px-6 mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                        SELECTED <span className="text-[#863ecc]">PROJECTS</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A collection of my recent work in photography, video, and design.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300 border ${activeCategory === cat
                                ? "bg-white text-black border-white font-bold"
                                : "bg-transparent text-gray-400 border-white/10 hover:border-white hover:text-white"
                                }`}
                        >
                            {cat === "Motorsport" ? "Motorsport / TCP Racing" : cat}
                        </button>
                    ))}
                </div>

                {/* Grid Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="group relative aspect-square bg-neutral-900 border border-white/5 overflow-hidden cursor-pointer">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />

                            {/* Video Indicator */}
                            {project.isVideo && (
                                <div className="absolute top-4 right-4 z-20">
                                    <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20">
                                        <Play size={12} className="fill-white text-white ml-0.5" />
                                    </div>
                                </div>
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-start z-10">
                                <span className={`text-[10px] uppercase tracking-widest mb-1 ${project.category === 'Motorsport' ? 'text-[#863ecc]' : 'text-[#863ecc]'
                                    }`}>
                                    {project.category}
                                </span>
                                <h3 className="text-white font-bold text-lg tracking-tight">{project.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State Check */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <p>No projects found in this category.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

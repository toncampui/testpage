"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useLanguage } from "../context/LanguageContext";

type Category = "All" | "Motorsport" | "Photography" | "Video" | "3D Art" | "Design";

interface Project {
    id: number;
    title: string;
    category: Category;
    image: string;
    isVideo?: boolean;
    layoutType: 1 | 2 | 3 | 4;
    headline?: { en: string; ca: string; es: string };
    description: { en: string; ca: string; es: string };
    gallery?: string[];
    client?: string;
    assistants?: string[];
}

const allProjects: Project[] = [
    {
        id: 0,
        title: "La Fonda de la Rambla Nova",
        category: "Design",
        image: "/testpage/lafonda_thumbnail.webp",
        layoutType: 4,
        headline: {
            ca: "Disseny web integral i experiència digital a mida per a un nou referent gastronòmic a Tarragona.",
            en: "Comprehensive web design and custom digital experience for a new gastronomic benchmark in Tarragona.",
            es: "Diseño web integral y experiencia digital a medida para un nuevo referente gastronómico en Tarragona."
        },
        description: {
            ca: "Creació des de zero de la nova plataforma web per a La Fonda de la Rambla Nova, dissenyada per reflectir l'essència del restaurant i facilitar la connexió amb els clients. El projecte inclou una presentació visual i cuidada de la carta i els menús, juntament amb un sistema de reserves online intuïtiu que simplifica al màxim el procés per al comensal. Una solució digital funcional i elegant que reforça la presència de marca al sector de la restauració.",
            en: "Creation from scratch of the new web platform for La Fonda de la Rambla Nova, designed to reflect the essence of the restaurant and facilitate connection with customers. The project includes a careful visual presentation of the menu, along with an intuitive online reservation system that simplifies the process for the diner as much as possible. A functional and elegant digital solution that reinforces brand presence in the restaurant sector.",
            es: "Creación desde cero de the nueva plataforma web para La Fonda de la Rambla Nova, diseñada para reflejar la esencia del restaurante y facilitar la conexión con los clientes. El proyecto incluye una presentación visual y cuidada de la carta y los menús, junto con un sistema de reservas online intuitivo que simplifica al máximo el proceso para el comensal. Una solución digital funcional y elegante que refuerza la presencia de marca en el sector de la restauración."
        },
        gallery: [
            "/testpage/lafonda_thumbnail.webp",
            "/testpage/lafonda_detail_1.webp",
            "/testpage/lafonda_detail_2.webp"
        ],
        client: "La Fonda de la Rambla Nova"
    },
    { 
        id: 1, 
        title: "Track Day Silence", 
        category: "Motorsport", 
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop",
        layoutType: 1,
        description: {
            en: "A complete visual documentary showcasing the stillness of race tracks before the engines start. This project explores light patterns and architecture in a minimal format.",
            ca: "Un documental visual complet que mostra la quietud dels circuits de curses abans que s'engeguin els motors. Aquest projecte explora els patrons de llum i l'arquitectura en un format minimalista.",
            es: "Un documental visual completo que muestra la quietud de los circuitos de carreras antes de que arranquen los motores. Este proyecto explora los patrones de luz y la arquitectura en un formato minimalista."
        },
        gallery: [
            "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=600",
            "https://images.unsplash.com/photo-1541348263662-e068662d82af?q=80&w=600",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600",
            "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600"
        ]
    },
    { 
        id: 2, 
        title: "Neon City", 
        category: "Photography", 
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
        layoutType: 2,
        description: {
            en: "Capturing the electric essence of urban nightscapes under intense neon glows. Cyberpunk aesthetics meets real-life city documentation.",
            ca: "Capturant l'essència elèctrica dels paisatges urbans nocturns sota la intensa resplendor del neó. L'estètica cyberpunk es troba amb la documentació de la ciutat real.",
            es: "Capturando la esencia eléctrica de los paisajes urbanos nocturnos bajo el intenso resplandor del neón. La estética cyberpunk se encuentra con la documentación real de la ciudad."
        }
    },
    { 
        id: 3, 
        title: "Abstract Flow", 
        category: "3D Art", 
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=crop",
        layoutType: 3,
        description: {
            en: "An artistic collection of procedural 3D elements mimicking fluid mechanics and light transmission. Developed for standard digital visualizers.",
            ca: "Una col·lecció artística d'elements 3D procedimentals que imiten la mecànica de fluids i la transmissió de la llum. Desenvolupat per a visualitzadors digitals estàndard.",
            es: "Una colección artística de elementos 3D procedimentales que imitan la mecánica de fluidos y la transmisión de la luz. Desarrollado para visualizadores digitales estándar."
        },
        gallery: [
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600",
            "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=600",
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=600"
        ],
        client: "TechArt Labs",
        assistants: ["David Ruiz", "Anna Gual"]
    },
    { 
        id: 4, 
        title: "Kinetic Motion", 
        category: "Video", 
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop", 
        isVideo: true,
        layoutType: 2,
        description: {
            en: "High-speed cinematography project exploring fluid movement of body movements and action choreography under dramatic studio lighting.",
            ca: "Projecte de cinematografia d'alta velocitat que explora el moviment fluid del cos i la coreografia d'acció sota una il·luminació d'estudi dramàtica.",
            es: "Proyecto de cinematografía de alta velocidad que explora el movimiento fluido del cuerpo y la coreografía de acción bajo una iluminación dramática de estudio."
        }
    },
    { 
        id: 5, 
        title: "Speed Demon", 
        category: "Motorsport", 
        image: "https://images.unsplash.com/photo-1541348263662-e068662d82af?q=80&w=1887&auto=format&fit=crop",
        layoutType: 1,
        description: {
            en: "Adrenaline-fueled tracking visual asset package created for international racing tournaments. Highlighting high-speed FPV drone sequences.",
            ca: "Paquet d'actius visuals de seguiment carregats d'adrenalina creat per a tornejos internacionals de curses. Destacant seqüències de drons FPV d'alta velocitat.",
            es: "Paquete de activos visuales de seguimiento cargados de adrenalina creado para torneos internacionales de carreras. Destacando secuencias de drones FPV a alta velocidad."
        },
        gallery: [
            "https://images.unsplash.com/photo-1541348263662-e068662d82af?q=80&w=600",
            "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=600",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600"
        ]
    },
    { 
        id: 6, 
        title: "Brand Identity", 
        category: "Design", 
        image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
        layoutType: 3,
        description: {
            en: "Complete brand visual layout overhaul for high-end real estate and architectural design boutique studio.",
            ca: "Renovació completa de la identitat visual per a un estudi boutique de disseny arquitectònic i immobiliari de gamma alta.",
            es: "Renovación completa de la identidad visual para un estudio boutique de diseño arquitectónico e inmobiliario de gama alta."
        },
        gallery: [
            "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600"
        ],
        client: "Metropolis Arch",
        assistants: ["Marc Soler", "Jordi Beltran"]
    },
    { 
        id: 7, 
        title: "Showreel 2025", 
        category: "Video", 
        image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop", 
        isVideo: true,
        layoutType: 2,
        description: {
            en: "A compilation of dynamic shots, drone captures, and corporate projects from the past fiscal year, presenting premium editorial compositions.",
            ca: "Una compilació de plànols dinàmics, captures de drons i projectes corporatius de l'últim any fiscal, que presenta composicions editorials de gamma alta.",
            es: "Una compilación de planos dinámicos, capturas de drones y proyectos corporativos del último año fiscal, presentando composiciones editoriales de gama alta."
        }
    },
    { 
        id: 8, 
        title: "Portrait Study", 
        category: "Photography", 
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
        layoutType: 1,
        description: {
            en: "Studio portraits exploring high-contrast chiaroscuro lighting styles, mood creation, and raw human expressions.",
            ca: "Retrats d'estudi que exploren estils d'il·luminació clarobscur d'alt contrast, creació d'atmosferes i expressions humanes pures.",
            es: "Retratos de estudio que exploran estilos de iluminación claroscuro de alto contraste, creación de atmósferas y expresiones humanas puras."
        },
        gallery: [
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600",
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600"
        ]
    },
    { 
        id: 9, 
        title: "Cyber Sculpture", 
        category: "3D Art", 
        image: "https://images.unsplash.com/photo-1633596683562-4a47eb486d57?q=80&w=2072&auto=format&fit=crop",
        layoutType: 3,
        description: {
            en: "Futuristic digital art installation involving 3D asset modeling and light projection rendering maps.",
            ca: "Instal·lació d'art digital futurista que implica modelatge d'actius 3D i mapes de renderització de projecció de llum.",
            es: "Instalación de arte digital futurista que implica modelado de activos 3D y mapas de renderización de proyección de luz."
        },
        gallery: [
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600",
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=600"
        ],
        client: "Museu de l'Art Digital",
        assistants: ["Laura Pons"]
    },
    { 
        id: 10, 
        title: "Editorial Layout", 
        category: "Design", 
        image: "https://images.unsplash.com/photo-1558655146-d09347e0c766?q=80&w=1887&auto=format&fit=crop",
        layoutType: 2,
        description: {
            en: "Clean typography and grid design system developed for visual art and lifestyle physical publication editions.",
            ca: "Tipografia neta i sistema de disseny de quadrícula desenvolupat per a edicions de publicacions físiques d'art visual i estil de vida.",
            es: "Tipografía limpia y sistema de diseño de cuadrícula desarrollado para ediciones de publicaciones físicas de arte visual y estilo de vida."
        }
    },
    { 
        id: 11, 
        title: "Apex Corner", 
        category: "Motorsport", 
        image: "https://images.unsplash.com/photo-1532906619279-a764d262d057?q=80&w=2070&auto=format&fit=crop",
        layoutType: 1,
        description: {
            en: "Sleek automotive photography focused on curves, speed angles, and light reflections during sunset track test runs.",
            ca: "Fotografia d'automoció elegant centrada en corbes, angles de velocitat i reflexos de llum durant les proves de pista al capvespre.",
            es: "Fotografía de automoción elegante centrada en curvas, ángulos de velocidad y reflejos de luz durante las pruebas de pista al atardecer."
        },
        gallery: [
            "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=600",
            "https://images.unsplash.com/photo-1541348263662-e068662d82af?q=80&w=600",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600"
        ]
    },
    { 
        id: 12, 
        title: "Urban Light", 
        category: "Photography", 
        image: "https://images.unsplash.com/photo-1517732306149-e8f129dcb975?q=80&w=1887&auto=format&fit=crop",
        layoutType: 3,
        description: {
            en: "Streets photography documenting geometric light patches, morning shadows, and human interactions in modern metropolis.",
            ca: "Fotografia de carrer que documenta zones de llum geomètriques, ombres matinals i interaccions humanes en una metròpoli moderna.",
            es: "Fotografía de calle que documenta zonas de luz geométricas, sombras matinales e interacciones humanas en una metrópolis moderna."
        },
        gallery: [
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600",
            "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=600"
        ],
        client: "Urban Visionary Co",
        assistants: ["Carles Pujol", "Marta Castells"]
    },
];

const categories: Category[] = ["All", "Motorsport", "Photography", "Video", "3D Art", "Design"];

export default function Portfolio() {
    const { language, t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState<Category>("All");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSelectedProject(null);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedProject]);

    const categoryLabels: Record<Category, string> = {
        "All": t.portfolio.all,
        "Motorsport": t.portfolio.motorsport,
        "Photography": t.portfolio.photography,
        "Video": t.portfolio.video,
        "3D Art": t.portfolio.render,
        "Design": t.portfolio.design
    };

    const filteredProjects = activeCategory === "All"
        ? allProjects
        : allProjects.filter(project => project.category === activeCategory);

    return (
        <section className="min-h-screen bg-black pt-32 pb-20">
            <div className="container px-6 mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                        {language === "en" ? (
                            <>SELECTED <span className="text-[#863ecc]">PROJECTS</span></>
                        ) : (
                            <>PROJECTES <span className="text-[#863ecc]">SELECCIONATS</span></>
                        )}
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {t.portfolio.subtitle}
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
                            {categoryLabels[cat]}
                        </button>
                    ))}
                </div>

                {/* Grid Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <div 
                            key={project.id} 
                            onClick={() => setSelectedProject(project)}
                            className="group relative aspect-square bg-neutral-900 border border-white/5 overflow-hidden cursor-pointer"
                        >
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
                                <span className="text-[10px] uppercase tracking-widest mb-1 text-[#863ecc]">
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

            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-10"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            data-lenis-prevent
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-neutral-950 border border-white/10 rounded-3xl p-6 md:p-10 text-white flex flex-col gap-6 shadow-2xl scrollbar-none"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors cursor-pointer bg-white/5 hover:bg-white/10 rounded-full p-2 border border-white/10 z-30"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>

                            {/* Header */}
                            {selectedProject.layoutType !== 4 && (
                                <div className="flex flex-col gap-1 pr-12">
                                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#863ecc]">
                                        {selectedProject.category}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                                        {selectedProject.title}
                                    </h2>
                                </div>
                            )}

                            {/* Layout Content */}
                            <div className="flex flex-col gap-6">
                                {selectedProject.layoutType === 1 && (
                                    /* Type 1: Gallery + Description */
                                    <div className="flex flex-col gap-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                            {selectedProject.gallery?.map((img, idx) => (
                                                <div key={idx} className="relative aspect-video sm:aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 bg-neutral-900 group">
                                                    <Image
                                                        src={img}
                                                        alt={`${selectedProject.title} gallery ${idx + 1}`}
                                                        fill
                                                        className="object-cover transition-transform duration-500 hover:scale-105"
                                                        sizes="(max-w-768px) 100vw, 30vw"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-gray-300 text-base leading-relaxed max-w-3xl">
                                            {selectedProject.description[language]}
                                        </p>
                                    </div>
                                )}

                                {selectedProject.layoutType === 2 && (
                                    /* Type 2: Single Image + Description */
                                    <div className="flex flex-col gap-6">
                                        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/5 bg-neutral-900">
                                            <Image
                                                src={selectedProject.image}
                                                alt={selectedProject.title}
                                                fill
                                                className="object-cover"
                                                sizes="100vw"
                                                priority
                                            />
                                        </div>
                                        <p className="text-gray-300 text-base leading-relaxed max-w-3xl">
                                            {selectedProject.description[language]}
                                        </p>
                                    </div>
                                )}

                                {selectedProject.layoutType === 3 && (
                                    /* Type 3: Full Case Study with Credits */
                                    <div className="flex flex-col gap-8">
                                        {/* Image Gallery */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                            {selectedProject.gallery?.map((img, idx) => (
                                                <div key={idx} className="relative aspect-video sm:aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 bg-neutral-900">
                                                    <Image
                                                        src={img}
                                                        alt={`${selectedProject.title} gallery ${idx + 1}`}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-w-768px) 100vw, 30vw"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Info Split Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-white/10">
                                            {/* Description (2 cols) */}
                                            <div className="md:col-span-2 flex flex-col gap-3">
                                                <h4 className="text-xs uppercase tracking-widest text-[#863ecc] font-bold">
                                                    {language === "en" ? "Overview" : "Resum"}
                                                </h4>
                                                <p className="text-gray-300 text-base leading-relaxed">
                                                    {selectedProject.description[language]}
                                                </p>
                                            </div>

                                            {/* Credits (1 col) */}
                                            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
                                                <h4 className="text-xs uppercase tracking-widest text-[#863ecc] font-bold">
                                                    {language === "en" ? "Project Credits" : "Crèdits del Projecte"}
                                                </h4>
                                                
                                                {selectedProject.client && (
                                                    <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
                                                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                                                            {language === "en" ? "Client" : "Client"}
                                                        </span>
                                                        <span className="text-sm font-semibold text-white">
                                                            {selectedProject.client}
                                                        </span>
                                                    </div>
                                                )}

                                                {selectedProject.assistants && selectedProject.assistants.length > 0 && (
                                                    <div className="flex flex-col gap-1.5">
                                                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                                                            {language === "en" ? "Production Assistants" : "Ajudants de Producció"}
                                                        </span>
                                                        <div className="flex flex-wrap gap-2">
                                                            {selectedProject.assistants.map((assistant, idx) => (
                                                                <span key={idx} className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-gray-300">
                                                                    {assistant}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedProject.layoutType === 4 && (
                                    /* Type 4: Custom Case Study layout (La Fonda de la Rambla Nova) */
                                    <div className="flex flex-col gap-8">
                                        {/* 1. Top Section: Two-Column Split (1:1 Main Image & Project Info) */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                            {/* Left Column: Main Image strictly locked to 1:1 square ratio */}
                                            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl">
                                                <Image
                                                    src={selectedProject.gallery?.[0] || selectedProject.image}
                                                    alt={`${selectedProject.title} main screenshot`}
                                                    fill
                                                    className="object-cover rounded-xl"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    priority
                                                />
                                            </div>

                                            {/* Right Column: Project Info & Title */}
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col gap-1 pr-12">
                                                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#863ecc]">
                                                        [ {selectedProject.category} ]
                                                    </span>
                                                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mt-1">
                                                        {selectedProject.title}
                                                    </h2>
                                                </div>

                                                {selectedProject.headline && (
                                                    <p className="text-base md:text-lg font-medium text-gray-200 leading-snug pt-3 border-t border-white/10">
                                                        {selectedProject.headline[language]}
                                                    </p>
                                                )}

                                                {/* Metadata */}
                                                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 mt-2 flex flex-col gap-3">
                                                    {selectedProject.client && (
                                                        <div className="flex flex-col gap-1 border-b border-white/5 pb-2.5">
                                                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                                                                {language === "en" ? "Client" : "Client"}
                                                            </span>
                                                            <span className="text-sm font-semibold text-white">
                                                                {selectedProject.client}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                                                            {language === "en" ? "Services" : "Serveis"}
                                                        </span>
                                                        <span className="text-xs text-gray-300">
                                                            {language === "en"
                                                                ? "Web Design & Custom Digital Experience"
                                                                : "Disseny Web i Experiència Digital a Mida"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 2. Middle Section: Full-Width Case Study Text */}
                                        <div className="w-full my-4 pt-8 border-t border-white/10 flex flex-col gap-3">
                                            <h4 className="text-xs uppercase tracking-widest text-[#863ecc] font-bold">
                                                {language === "en" ? "Case Study" : "Estudi de Cas"}
                                            </h4>
                                            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-none">
                                                {selectedProject.description[language]}
                                            </p>
                                        </div>

                                        {/* 3. Bottom Section: Secondary Gallery (Equal Proportions Rule) */}
                                        {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                                            <div className="w-full pt-8 border-t border-white/10 flex flex-col gap-4">
                                                <h4 className="text-xs uppercase tracking-widest text-[#863ecc] font-bold">
                                                    {language === "en" ? "Project Details" : "Detalls del Projecte"}
                                                </h4>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center w-full">
                                                    {/* Secondary Image 1 (aspect-square 1:1) */}
                                                    {selectedProject.gallery[1] && (
                                                        <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-lg">
                                                            <Image
                                                                src={selectedProject.gallery[1]}
                                                                alt={`${selectedProject.title} detail 1`}
                                                                fill
                                                                className="object-cover transition-transform duration-500 hover:scale-105"
                                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                            />
                                                        </div>
                                                    )}

                                                    {/* Secondary Image 2 (aspect-square 1:1 for equal proportions) */}
                                                    {selectedProject.gallery[2] && (
                                                        <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-lg">
                                                            <Image
                                                                src={selectedProject.gallery[2]}
                                                                alt={`${selectedProject.title} detail 2`}
                                                                fill
                                                                className="object-cover transition-transform duration-500 hover:scale-105"
                                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

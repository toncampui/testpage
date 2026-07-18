"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ca" | "es";

export const translations = {
  en: {
    nav: { home: "Home", services: "Services", portfolio: "Portfolio", contact: "Contact" },
    hero: { statement: "STATEMENT" },
    statement: {
      line1: "We creative-direct and capture high-end visual content.",
      line2: "We push composition, light, and motion to elevate brands."
    },
    services: {
      title: "TECHNICAL CAPABILITIES",
      subtitle: "State-of-the-art visual equipment and advanced digital production techniques.",
      showcaseTitle: "OUR SERVICES",
      showcaseSubtitle: "Custom tailored visual productions for elite industries.",
      active: "ACTIVE",
      collapsed: "COLLAPSED",
      list: [
        {
          id: 1,
          title: "DIGITAL CONTENT",
          subtitle: "[Video, Photo, Render 3D]",
          description: "Creating high-impact digital experiences for modern brands. From social media campaigns to immersive 3D renders, we design content that captures attention and drives engagement."
        },
        {
          id: 2,
          title: "SPORTS EVENTS",
          subtitle: "[FPV-GoPro, Action Camera, Drone]",
          description: "Capturing the adrenaline of live sports events. Specialized in high-speed FPV drone tracking, action cameras, and aerial photography that puts viewers in the center of the action."
        },
        {
          id: 3,
          title: "REAL ESTATE SECTOR",
          subtitle: "[Drone, FPV, Professional Photo]",
          description: "Showcasing luxury properties with stunning visual assets. Using advanced drone cinematography, indoor FPV flythroughs, and professional lighting to elevate real estate marketing."
        },
        {
          id: 4,
          title: "MUSIC VIDEOCLIPS",
          subtitle: "[Cinema Camera, Dynamic Video, FPV]",
          description: "Bringing music to life through cinematic visual storytelling. Combining professional cinema cameras, dynamic choreography tracking, and creative FPV shots for unique music videos."
        },
        {
          id: 5,
          title: "CORPORATE & INDUSTRIAL",
          subtitle: "[Render 3D, Drone, Video]",
          description: "Elevating corporate communications and industrial showcasing. Delivering pristine 3D product renders, facility flyovers, and compelling narrative videos for enterprise clients."
        }
      ],
      foto: {
        title: "PHOTO",
        desc: "High-impact commercial and editorial photography, capturing the essence of brands and architecture with an obsession for light and composition."
      },
      video: {
        title: "VIDEO",
        desc: "Cutting-edge cinematic production, creating visual stories that connect emotionally through dynamic storytelling, film grading, and fast-paced editing."
      },
      dron: {
        title: "DRONE",
        desc: "Spectacular aerial perspectives and high-precision drone shots, offering a grand, global view of landscapes, events, or architectural structures."
      },
      fpv: {
        title: "FPV-GOPRO",
        desc: "The most immersive visual experience thanks to expert FPV piloting, capturing pure action, impossible lines, and unmatched dynamics with latest-gen GoPro cameras."
      },
      render: {
        title: "3D RENDER",
        desc: "Photorealistic visualization of environments, products, and architecture before they exist, transforming abstract ideas into high-fidelity 3D renders."
      }
    },
    about: {
      title: "COLLABORATION",
      stroke1: { tag: "01 / VISION", title: "Cinematic Eye", desc: "We look at every project through a high-end cinematic lens." },
      stroke2: { tag: "02 / PRECISION", title: "Obsessive Detail", desc: "Every frame, light source, and transition is meticulously crafted." },
      stroke3: { tag: "03 / MOTION", title: "Dynamic Flow", desc: "We capture rhythm, adrenaline, and true motion in every shot." },
      stroke4: { tag: "04 / FUTURE", title: "3D & Tech", desc: "Blending reality with next-generation digital rendering pipelines." }
    },
    portfolio: {
      title: "SELECTED PROJECTS",
      subtitle: "A collection of my recent work in photography, video, and design.",
      all: "All",
      motorsport: "Motorsport",
      photography: "Photography",
      video: "Video",
      render: "3D Art",
      design: "Design"
    },
    cta: {
      text: "Ready to elevate your visual perspective?",
      button: "GET IN TOUCH"
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Let's create something unforgettable.",
      desc: "Available for freelance opportunities and creative collaborations worldwide.",
      labelName: "Name",
      placeholderName: "Your Name",
      labelEmail: "Email",
      placeholderEmail: "your@email.com",
      labelMsg: "Message",
      placeholderMsg: "Tell me about your project",
      error: "Oops! There was a problem. Please try again.",
      successTitle: "Message Sent!",
      successDesc: "Message received! I'll get back to you soon.",
      btnSending: "Sending...",
      btnSend: "Send Message"
    }
  },
  ca: {
    nav: { home: "Inici", services: "Serveis", portfolio: "Portfoli", contact: "Contacte" },
    hero: { statement: "El compromís" },
    statement: {
      line1: "La teva visió és el punt de partida. Ens alineem a les teves necessitats i objectius,",
      line2: "adaptant-nos al format i al ritme de cada idea per crear un contingut visual a mida."
    },
    services: {
      title: "CAPACITATS TÈCNIQUES",
      subtitle: "Equipament visual d'última generació i tècniques de producció digital avançades.",
      showcaseTitle: "ELS NOSTRES SERVEIS",
      showcaseSubtitle: "Produccions visuals a mida per a indústries d'elit.",
      active: "ACTIU",
      collapsed: "PLEGAT",
      list: [
        {
          id: 1,
          title: "CONTINGUT DIGITAL",
          subtitle: "[Vídeo, Foto, Dron, Render 3D]",
          description: "Creant experiències digitals per a marques modernes. Des de campanyes de xarxes socials fins a renders 3D, dissenyant contingut que capta l'atenció i impulsa el compromís."
        },
        {
          id: 2,
          title: "ESDEVENIMENTS ESPORTIUS",
          subtitle: "[Foto, Vídeo, Dron, Càmera d'Acció]",
          description: "Capturant l'adrenalina dels esdeveniments esportius en directe. La nostra especialitat és el seguiment dinàmic amb càmeres d'acció, cinematografia dinàmica i fotografia aèria que situa els espectadors al centre de l'acció."
        },
        {
          id: 3,
          title: "SECTOR IMMOBILIARI",
          subtitle: "[Dron, Foto, Vídeo]",
          description: "Capturant l'essència de qualsevol propietat amb actius visuals de qualitat. Utilitzant cinematografia de dron, recorreguts en vídeo d'interiors i una composició visual adaptada a cada espai."
        },
        {
          id: 4,
          title: "VIDEOCLIPS MUSICALS",
          subtitle: "[Vídeo, Dron]",
          description: "Donant vida a la música a través de la narrativa visual. Una combinació de moviments dinàmics, composició visual expressiva i atmosferes úniques per a vídeos musicals."
        },
        {
          id: 5,
          title: "CORPORATIU I INDUSTRIAL",
          subtitle: "[Render 3D, Dron, Foto, Vídeo]",
          description: "Impulsant la identitat corporativa i industrial. Creant vídeos de presentació corporativa, renders 3D hiperrealistes de processos complexos i perspectives aèries d'instal·lacions per traduir el teu valor en imatges d'alt nivell."
        }
      ],
      foto: {
        title: "FOTO",
        desc: "Fotografia comercial i editorial d'alt impacte, on capturem l'essència de la marca i l'arquitectura amb una cura obsessiva per la llum i la composició."
      },
      video: {
        title: "VÍDEO",
        desc: "Producció cinematogràfica d'avantguarda, creant històries visuals que connecten emocionalment a través d'una narrativa dinàmica, un etalonatge de cine i un muntatge de ritme trepidant."
      },
      dron: {
        title: "DRON",
        desc: "Perspectives aèries espectaculars i plànols de dron de gran precisió tècnica, oferint una visió global i grandiosa de paisatges, esdeveniments o estructures arquitectòniques."
      },
      fpv: {
        title: "FPV-GOPRO",
        desc: "L'experiència visual més immersiva i vertiginosa gràcies a pilots experts d'FPV, capturant plànols d'acció pura, talls impossibles i una dinàmica inigualable amb càmeres GoPro d'última generació."
      },
      render: {
        title: "RENDER 3D",
        desc: "Visualització fotorrealista d'entorns, productes i arquitectura abans que existeixin, transformant idees abstractes en renders 3D d'alta fidelitat amb una qualitat de detall professional."
      }
    },
    about: {
      title: "CONTACTE",
      stroke1: { tag: "01 / LA BASE", title: "Multimèdia i Animum", desc: "Vaig assentar els meus fonaments cursant el Grau en Multimèdia al CITM i, més tard, em vaig especialitzar amb el Màster Superior en Modelat d'Escenaris i Producció 3D a Animum." },
      stroke2: { tag: "02 / LA INDÚSTRIA", title: "Trajectòria professional", desc: "El meu recorregut en el sector es tradueix en rols molt diversos: a Dabuten com a pilot de dron i operador de càmera, gestionant des de la gravació i edició de vídeo o el seguiment d'obres, fins a la realització de directes de televisió i la documentació de vol. També he col·laborat amb Cymatic en la creació de motion graphics per a fires i esdeveniments corporatius, i amb FGF Produccions com a operador de càmera en retransmissions en directe (streamings)." },
      stroke3: { tag: "03 / LA PASSIÓ", title: "Automobilisme", desc: "Anys d'experiència cobrint rallys m'han ensenyat a treballar al límit. És on vaig aprendre a reaccionar en mil·lèsimes de segon, a moure'm ràpid darrere de l'acció i a capturar el moviment pur sota pressió." },
      stroke4: { tag: "04 / EL PRESENT", title: "El meu projecte", desc: "Avui connecto tot aquest bagatge —la base multimèdia, la precisió del 3D, l'exigència de l'agència i l'instint del directe— per oferir solucions visuals potents, flexibles i directament de tu a tu." }
    },
    portfolio: {
      title: "PROJECTES SELECCIONATS",
      subtitle: "Una col·lecció dels meus projectes recents en fotografia, vídeo, 3d i disseny.",
      all: "Tots",
      motorsport: "Motorsport / TCP Racing",
      photography: "Fotografia",
      video: "Vídeo",
      render: "Renders 3D",
      design: "Disseny"
    },
    cta: {
      text: "Tot a punt per fer el salt visual? El teu pròxim projecte comença aquí.",
      button: "COMENCEM"
    },
    contact: {
      title: "Contacte",
      subtitle: "Explica'm el teu projecte!",
      desc: "Disponible per a feines com a freelance, productores i col·laboracions creatives.",
      labelName: "Nom",
      placeholderName: "El teu nom",
      labelEmail: "Correu",
      placeholderEmail: "el-teu@correu.com",
      labelMsg: "Missatge",
      placeholderMsg: "Explica'm el teu projecte",
      error: "Ui! Hi ha hagut un problema. Si us plau, torna-ho a provar.",
      successTitle: "Missatge enviat!",
      successDesc: "Missatge rebut! Et respondré aviat.",
      btnSending: "Enviant...",
      btnSend: "Enviar missatge"
    }
  },
  es: {
    nav: { home: "Inicio", services: "Servicios", portfolio: "Portafolio", contact: "Contacto" },
    hero: { statement: "EL COMPROMISO" },
    statement: {
      line1: "Tu visión es el punto de partida. Nos alineamos con tus necesidades y objetivos,",
      line2: "adaptándonos al formato y al ritmo de cada idea para crear un contenido visual a medida."
    },
    services: {
      title: "CAPACIDADES TÉCNICAS",
      subtitle: "Equipamiento visual de última generación y técnicas avanzadas de producción digital.",
      showcaseTitle: "NUESTROS SERVICIOS",
      showcaseSubtitle: "Producciones visuales a medida para industrias de élite.",
      active: "ACTIVO",
      collapsed: "PLEGADO",
      list: [
        {
          id: 1,
          title: "CONTENIDO DIGITAL",
          subtitle: "[Video, Foto, Render 3D]",
          description: "Creando experiencias digitales para marcas modernas. Desde campañas en redes sociales hasta renders 3D inmersivos, diseñamos contenido que capta la atención e impulsa el compromiso."
        },
        {
          id: 2,
          title: "EVENTOS DEPORTIVOS",
          subtitle: "[Foto, Video, Dron, Cámara de Acción]",
          description: "Capturando la adrenalina de los eventos deportivos en directo. Nuestra especialidad es el seguimiento dinámico con cámaras de acción, cinematografía dinámica y fotografía aérea que sitúa a los espectadores en el centro de la acción."
        },
        {
          id: 3,
          title: "SECTOR INMOBILIARIO",
          subtitle: "[Dron, Foto, Video]",
          description: "Capturando la esencia de cualquier propiedad con activos visuales de calidad. Utilizando cinematografía aérea, recorridos interiores con drones FPV y fotografía profesional para elevar el marketing inmobiliario."
        },
        {
          id: 4,
          title: "VIDEOCLIPS MUSICALES",
          subtitle: "[Video, Dron]",
          description: "Dando vida a la música a través de la narrativa visual cinematográfica. Una combinación de movimientos dinámicos, composición visual expresiva y atmósferas únicas para videos musicales."
        },
        {
          id: 5,
          title: "CORPORATIVO E INDUSTRIAL",
          subtitle: "[Render 3D, Dron, Foto, Video]",
          description: "Impulsando la identidad corporativa e industrial. Creando videos de presentación corporativa, renders 3D hiperrealistes de procesos complejos y perspectivas aéreas de instalaciones para traducir tu valor en imágenes de alto nivel."
        }
      ],
      foto: {
        title: "FOTO",
        desc: "Fotografía comercial y editorial de alto impacto, capturando la esencia de la marca y la arquitectura con una obsesión por la luz y la composición."
      },
      video: {
        title: "VIDEO",
        desc: "Producción cinematográfica de vanguardia, creando historias visuales que conectan emocionalmente a través de una narrativa dinámica, un etalonaje de cine y un montaje de ritmo trepidante."
      },
      dron: {
        title: "DRON",
        desc: "Perspectivas aéreas espectaculares y planos de dron de gran precisión técnica, ofreciendo una visión global y grandiosa de paisajes, eventos o estructuras arquitectónicas."
      },
      fpv: {
        title: "FPV-GOPRO",
        desc: "La experiencia visual más inmersiva y vertiginosa gracias a un pilotaje FPV experto, capturando planos de acción pura, líneas imposibles y una dinámica inigualable con cámaras GoPro de última generación."
      },
      render: {
        title: "RENDER 3D",
        desc: "Visualización fotorrealista de entornos, productos y arquitectura antes de que existan, transformando ideas abstractas en renders 3D de alta fidelidad con nivel de detalle profesional."
      }
    },
    about: {
      title: "CONTACTO",
      stroke1: { tag: "01 / LA BASE", title: "Multimedia y Animum", desc: "Asenté mis cimientos cursando el Grado en Multimedia en el CITM y, más tarde, me especialicé con el Máster Superior en Modelado de Escenarios y Producción 3D en Animum." },
      stroke2: { tag: "02 / LA INDUSTRIA", title: "Trayectoria profesional", desc: "Mi recorrido en el sector se traduce en roles muy diversos: en Dabuten como piloto de dron y operador de cámara, gestionando desde la grabación y edición de video o el seguimiento de obras, hasta la realización de directos de televisión y la documentación de vuelo. También he colaborado con Cymatic en la creación de motion graphics para ferias y eventos corporativos, y con FGF Produccions como operador de cámara en retransmisiones en directo (streamings)." },
      stroke3: { tag: "03 / LA PASIÓN", title: "Automovilismo", desc: "Años de experiencia cobriendo rallies me han enseñado a trabajar al límite. Es donde aprendí a reaccionar en milésimas de segundo, a moverme rápido detrás de la acción y a capturar el movimiento puro bajo presión." },
      stroke4: { tag: "04 / EL PRESENTE", title: "Mi proyecto", desc: "Hoy conecto todo este bagaje —la base multimedia, la precisión del 3D, la exigencia de la agencia y el instinto del directo— para ofrecer soluciones visuales potentes, flexibles y directamente de tú a tú." }
    },
    portfolio: {
      title: "PROYECTOS SELECCIONADOS",
      subtitle: "Una colección de mis proyectos recientes en fotografía, vídeo, 3D y diseño.",
      all: "Todos",
      motorsport: "Motorsport / TCP Racing",
      photography: "Fotografía",
      video: "Vídeo",
      render: "Renders 3D",
      design: "Diseño"
    },
    cta: {
      text: "¿Todo listo para dar el salto visual? Tu próximo proyecto comienza aquí.",
      button: "EMPECEMOS"
    },
    contact: {
      title: "Contacto",
      subtitle: "¡Cuéntame tu proyecto!",
      desc: "Disponible para trabajos como freelance, productoras y colaboraciones creativas.",
      labelName: "Nombre",
      placeholderName: "Tu nombre",
      labelEmail: "Correo",
      placeholderEmail: "tu-correo@correo.com",
      labelMsg: "Mensaje",
      placeholderMsg: "Cuéntame tu proyecto",
      error: "¡Uy! Ha habido un problema. Por favor, inténtalo de nuevo.",
      successTitle: "¡Mensaje enviado!",
      successDesc: "¡Mensaje recibido! Te responderé pronto.",
      btnSending: "Enviando...",
      btnSend: "Enviar mensaje"
    }
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  // Read preferred language on mount
  useEffect(() => {
    const saved = localStorage.getItem("preferred_language") as Language;
    if (saved === "en" || saved === "ca") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferred_language", lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

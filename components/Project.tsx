"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/lib/projects";

interface CarouselItem extends Project {
  instanceId: string;
}

const initialSlides: CarouselItem[] = [
  { ...projects[0], instanceId: "slide-1" },
  { ...projects[1], instanceId: "slide-2" },
  { ...projects[2], instanceId: "slide-3" },
  { ...projects[0], instanceId: "slide-4" },
  { ...projects[1], instanceId: "slide-5" },
  { ...projects[2], instanceId: "slide-6" },
];

const getCaption = (id: string) => {
  switch (id) {
    case "bridgetalk":
      return "BridgeTalk v1.0 - Real-time ASL ↔ English Translation";
    case "decktago":
      return "DeckTago v1.0 - Premium E-commerce Store";
    case "inventory":
      return "DeckTaGo Inventory v1.0 - Smart Sales & Stock Management";
    default:
      return "";
  }
};

export default function Project() {
  const [items, setItems] = useState<CarouselItem[]>(initialSlides);

  const nextSlide = () => {
    setItems((prev) => [...prev.slice(1), prev[0]]);
  };

  const handleCardClick = (idx: number) => {
    if (idx === 2) {
      nextSlide();
    } else if (idx === 3) {
      setItems((prev) => [...prev.slice(2), ...prev.slice(0, 2)]);
    }
  };

  const activeProject = items[1];
  if (!activeProject) return null;

  return (
    <section
      id="projects"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#DCDCDD] px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* ── Background dot pattern with fade ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(54,69,79,.12) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      />

      {/* ── Fading dot grids (Localised clouds) ── */}
      <div
        className="absolute left-[2%] top-[5%] hidden w-[50%] h-[500px] lg:block pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(76, 92, 104, 0.16) 2px, transparent 2.2px)",
          backgroundSize: "21px 19px",
          WebkitMaskImage:
            "radial-gradient(circle at 0% 0%, black 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.1) 60%, transparent 80%)",
          maskImage:
            "radial-gradient(circle at 0% 0%, black 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.1) 60%, transparent 80%)",
        }}
      />
      <div
        className="absolute right-[2%] bottom-[5%] hidden w-[50%] h-[500px] lg:block pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(76, 92, 104, 0.16) 2px, transparent 2.2px)",
          backgroundSize: "21px 19px",
          WebkitMaskImage:
            "radial-gradient(circle at 100% 100%, black 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.1) 60%, transparent 80%)",
          maskImage:
            "radial-gradient(circle at 100% 100%, black 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.1) 60%, transparent 80%)",
        }}
      />

      {/* ── Broken circle outlines (same style as Skills) ── */}
      <div
        className="absolute left-[8%] top-[15%] h-[150px] w-[150px] rounded-full pointer-events-none"
        style={{
          border: "2.5px solid rgba(124,132,140,.28)",
          WebkitMaskImage:
            "conic-gradient(black 0deg, black 110deg, transparent 110deg, transparent 240deg, black 240deg, black 310deg, transparent 310deg)",
          maskImage:
            "conic-gradient(black 0deg, black 110deg, transparent 110deg, transparent 240deg, black 240deg, black 310deg, transparent 310deg)",
        }}
      />
      <div
        className="absolute right-[12%] top-[25%] hidden h-[180px] w-[180px] rounded-full sm:block pointer-events-none"
        style={{
          border: "2px solid rgba(124,132,140,.24)",
          WebkitMaskImage:
            "conic-gradient(transparent 0deg, transparent 40deg, black 40deg, black 160deg, transparent 160deg, transparent 280deg, black 280deg, black 340deg, transparent 340deg)",
          maskImage:
            "conic-gradient(transparent 0deg, transparent 40deg, black 40deg, black 160deg, transparent 160deg, transparent 280deg, black 280deg, black 340deg, transparent 340deg)",
        }}
      />
      <div
        className="absolute left-[22%] bottom-[18%] hidden h-[130px] w-[130px] rounded-full lg:block pointer-events-none"
        style={{
          border: "2px solid rgba(124,132,140,.25)",
          WebkitMaskImage:
            "conic-gradient(transparent 0deg, transparent 30deg, black 30deg, black 130deg, transparent 130deg)",
          maskImage:
            "conic-gradient(transparent 0deg, transparent 30deg, black 30deg, black 130deg, transparent 130deg)",
        }}
      />
      <div
        className="absolute right-[6%] bottom-[15%] h-[160px] w-[160px] rounded-full pointer-events-none"
        style={{
          border: "2.5px solid rgba(124,132,140,.26)",
          WebkitMaskImage:
            "conic-gradient(black 0deg, black 80deg, transparent 80deg, transparent 190deg, black 190deg, black 260deg, transparent 260deg)",
          maskImage:
            "conic-gradient(black 0deg, black 80deg, transparent 80deg, transparent 190deg, black 190deg, black 260deg, transparent 260deg)",
        }}
      />
      <div
        className="absolute left-[45%] top-[8%] h-[80px] w-[80px] rounded-full pointer-events-none"
        style={{
          border: "2px solid rgba(124,132,140,.32)",
          WebkitMaskImage:
            "conic-gradient(transparent 0deg, transparent 60deg, black 60deg, black 180deg, transparent 180deg)",
          maskImage:
            "conic-gradient(transparent 0deg, transparent 60deg, black 60deg, black 180deg, transparent 180deg)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1600px]">
        {/* Outer wrapper — no overflow clip so the last card can stick outside */}
        <div className="relative mx-auto w-full max-w-[1400px]">
          {/* Header Title + View All Link */}
          <div className="flex items-end justify-between w-full mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-extrabold leading-none text-[#36454F] uppercase tracking-tight">
              Featured Projects
            </h2>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#36454F] transition-colors duration-300 hover:text-[#4C5C68] active:scale-95 sm:text-sm translate-y-1.5"
            >
              View All Projects
              <span className="text-base transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </Link>
          </div>

          {/* Main container with clipped corners for background */}
          <div
            className="relative overflow-hidden rounded-[32px] shadow-[0_32px_64px_rgba(0,0,0,0.25)] sm:rounded-[40px] lg:rounded-[48px]"
            style={{ height: "clamp(480px, 50vw, 750px)" }}
          >
            {/* ── Full-bleed background image (active project) ── */}
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={activeProject.instanceId + "-bg"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 z-0"
              >
                <Image
                  src={activeProject.screenshots[0] || activeProject.heroImage}
                  alt={activeProject.title}
                  fill
                  sizes="1400px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20" />
              </motion.div>
            </AnimatePresence>

            {/* ── Text content + navigation ── */}
            <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-12 lg:p-16">
              <div className="my-auto lg:max-w-[40%]">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={activeProject.id + "-text"}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col text-white"
                  >
                    <h2 className="font-sans text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl">
                      {activeProject.title}
                    </h2>

                    <p className="mt-5 max-w-[440px] text-sm leading-relaxed text-white/75 sm:text-base">
                      {activeProject.shortDescription}
                    </p>

                    <div className="mt-8">
                      <Link
                        href={`/projects#${activeProject.id}`}
                        className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-2.5 text-xs font-bold text-black shadow-md transition-all duration-300 hover:bg-[#DCDCDD] active:scale-95 sm:px-8 sm:py-3.5 sm:text-sm lg:text-base lg:rounded-2xl"
                      >
                        View Project
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>


            </div>
          </div>

          {/* ── Preview cards – same vertical center, last card overflows outside ── */}
          <PreviewCards items={items} onCardClick={handleCardClick} />
        </div>
      </div>
    </section>
  );
}

/* ─── Preview Cards Sub-component ─── */

function PreviewCards({
  items,
  onCardClick,
}: {
  items: CarouselItem[];
  onCardClick: (idx: number) => void;
}) {
  const [screen, setScreen] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setScreen("mobile");
      else if (window.innerWidth < 1024) setScreen("tablet");
      else setScreen("desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Card positions per breakpoint — both cards share the same top (50%) for perfect alignment
  const positions = {
    desktop: {
      card2: { right: "16%", width: 340, height: 460, borderRadius: 32 },
      card3: { right: "-6%", width: 340, height: 460, borderRadius: 28 },
    },
    tablet: {
      card2: { right: "10%", width: 260, height: 350, borderRadius: 24 },
      card3: { right: "-7%", width: 240, height: 320, borderRadius: 22 },
    },
    mobile: {
      card2: { right: "3%", width: 165, height: 220, borderRadius: 20 },
      card3: { right: "-9%", width: 150, height: 200, borderRadius: 18 },
    },
  };

  const pos = positions[screen];

  return (
    <>
      {items.map((item, index) => {
        if (index < 2 || index > 3) return null;

        const isFirst = index === 2;
        const cfg = isFirst ? pos.card2 : pos.card3;

        return (
          <motion.div
            key={item.instanceId}
            layout
            transition={{ layout: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }}
            onClick={() => onCardClick(index)}
            className="absolute cursor-pointer"
            style={{
              top: "50%",
              right: cfg.right,
              width: cfg.width,
              height: cfg.height,
              y: "-50%",
              zIndex: isFirst ? 20 : 30,
            }}
          >
            <div
              className="relative h-full w-full overflow-hidden border border-white/15 shadow-[0_24px_50px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.03]"
              style={{ borderRadius: cfg.borderRadius }}
            >
              <Image
                src={item.screenshots[0] || item.heroImage}
                alt={item.title}
                fill
                sizes={`${cfg.width}px`}
                className="object-cover"
              />
            </div>
          </motion.div>
        );
      })}
    </>
  );
}
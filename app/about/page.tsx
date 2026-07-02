"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import About from "@/components/About";
import JourneyTimeline from "@/components/JourneyTimeline";
import Skills from "@/components/Skills";
import AboutStats from "@/components/AboutStats";

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#DCDCDD]">
      {/* ── Page Header ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, #2C3943 0%, #3E4E5A 60%, #899097 88%, #DCDCDD 100%)",
        }}
      >
        {/* Blueprint Grid Lines Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "45px 45px",
            WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 20%, rgba(0,0,0,0.5) 60%, transparent 100%)",
            maskImage: "radial-gradient(circle at 50% 50%, black 20%, rgba(0,0,0,0.5) 60%, transparent 100%)",
          }}
        />

        {/* Glowing abstract background orbs */}
        <div className="absolute right-[8%] top-[-15%] h-[350px] w-[350px] rounded-full bg-[#899097]/22 blur-[90px] pointer-events-none" />
        <div className="absolute left-[3%] bottom-[12%] h-[280px] w-[280px] rounded-full bg-[#4C5C68]/28 blur-[75px] pointer-events-none" />

        {/* Abstract Vector Blueprint Schema Elements (Arcs/Radar styles) */}
        <div
          className="absolute right-[12%] top-[15%] h-[260px] w-[260px] rounded-full border border-white/5 pointer-events-none"
          style={{
            WebkitMaskImage: "conic-gradient(black 0deg, black 110deg, transparent 110deg, transparent 230deg, black 230deg, black 310deg, transparent 310deg)",
            maskImage: "conic-gradient(black 0deg, black 110deg, transparent 110deg, transparent 230deg, black 230deg, black 310deg, transparent 310deg)",
          }}
        />
        <div
          className="absolute right-[12%] top-[15%] h-[300px] w-[300px] rounded-full border border-dashed border-white/5 pointer-events-none"
          style={{
            WebkitMaskImage: "conic-gradient(transparent 0deg, transparent 70deg, black 70deg, black 200deg, transparent 200deg)",
            maskImage: "conic-gradient(transparent 0deg, transparent 70deg, black 70deg, black 200deg, transparent 200deg)",
          }}
        />

        {/* Blueprint coordinate markers (+) */}
        <div className="absolute left-[18%] top-[25%] text-[10px] font-light text-white/12 select-none pointer-events-none">+</div>
        <div className="absolute right-[28%] top-[38%] text-[10px] font-light text-white/12 select-none pointer-events-none">+</div>
        <div className="absolute left-[40%] top-[60%] text-[10px] font-light text-white/12 select-none pointer-events-none">+</div>
        <div className="absolute right-[15%] top-[65%] text-[10px] font-light text-white/12 select-none pointer-events-none">+</div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 pb-20 pt-36 sm:px-8 sm:pb-24 sm:pt-40 lg:px-10 lg:pb-28 lg:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <Link
              href="/#about"
              className="mb-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white/80 cursor-pointer"
            >
              ← Back to Home
            </Link>
            <h1 className="text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              About Me
            </h1>
            <p className="mt-5 max-w-xl text-base leading-[1.85] text-white/65 sm:text-lg sm:mt-6 lg:text-xl">
              A glimpse into my background, CS journey, and the core philosophies guiding my work.
            </p>
          </motion.div>
        </div>
      </div>

      <About isSubpage={true} />
      <JourneyTimeline />
      <Skills />
      
    </div>
  );
}
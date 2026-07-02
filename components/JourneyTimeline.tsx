"use client";

import { useRef } from "react";
import {
  GraduationCap,
  Code,
  Brain,
  BriefcaseBusiness,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/* ─── Data ─── */
interface Milestone {
  year: string;
  title: string;
  company?: string;
  description: string;
  Icon: LucideIcon;
}

const milestones: Milestone[] = [
  {
    year: "2022",
    title: "Started BS Computer Science",
    description:
      "Began my Bachelor of Science in Computer Science at Immaculada Concepcion College. Built a strong foundation in programming, algorithms, databases, and software development while discovering my passion for building technology that solves real-world problems.",
    Icon: GraduationCap,
  },
  {
    year: "2023",
    title: "Built My First Java System",
    description:
      "Developed a Java-based Internet Cafe Booking and Reservation System as one of my earliest software development projects. This experience strengthened my understanding of object-oriented programming, Java application development, database integration, and software design principles.",
    Icon: Code,
  },
  {
    year: "2025",
    title: "BridgeTalk Thesis Development",
    description:
      "Started designing, documenting, and developing my undergraduate thesis, BridgeTalk—an offline AI-powered communication system that translates sign language into text and speech while converting spoken language into sign language through a 3D avatar. Successfully completed the research documentation, system development, testing, and thesis defense.",
    Icon: Brain,
  },
  {
    year: "Feb – Mar 2026",
    title: "Web Developer Intern",
    company: "GC Web Experts – Web Design and Digital Marketing",
    description:
      "Completed my On-the-Job Training (OJT) as a Web Developer at GC Web Experts. Developed and customized responsive WordPress websites, worked with themes and plugins, implemented UI improvements, and collaborated with the team to deliver client-focused web solutions. This internship strengthened my practical experience in web development, teamwork, and professional software workflows.",
    Icon: BriefcaseBusiness,
  },
  {
    year: "Jun 2026",
    title: "Graduated & Building My Career",
    description:
      "Graduated with a Bachelor of Science in Computer Science. Built my personal developer portfolio, developed modern full-stack web applications, and continued expanding my expertise in React, Next.js, TypeScript, Node.js, Python, Artificial Intelligence, and modern web technologies while preparing for a professional software engineering career.",
    Icon: Rocket,
  },
];

/* ─── Animation Constants ─── */
const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

const cardVariants = {
  hidden: (side: "left" | "right") => ({
    opacity: 0,
    x: side === "left" ? -40 : 40,
    y: 20,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: EASE },
  },
};

/* ─── Animated Timeline Line ─── */
function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 20%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 max-lg:left-[22px]"
    >
      {/* Track background */}
      <div className="absolute inset-0 w-px bg-[#C5C3C6]/60" />

      {/* Animated fill */}
      <motion.div
        className="absolute top-0 w-px origin-top bg-gradient-to-b from-[#36454F] via-[#4C5C68] to-[#899097]"
        style={{ scaleY, height: "100%" }}
      />

      {/* Glow effect on the line */}
      <motion.div
        className="absolute top-0 w-[3px] -translate-x-[1px] origin-top bg-gradient-to-b from-[#36454F]/40 via-[#4C5C68]/20 to-transparent blur-[2px]"
        style={{ scaleY, height: "100%" }}
      />
    </div>
  );
}

/* ─── Single Milestone Card ─── */
function MilestoneCard({
  milestone,
  index,
  isLast,
}: {
  milestone: Milestone;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;
  const side = isEven ? "left" : "right";

  return (
    <div
      ref={ref}
      className={`relative grid w-full grid-cols-1 gap-0 lg:grid-cols-[1fr_60px_1fr] lg:gap-0`}
    >
      {/* ── Desktop: Left column ── */}
      <div
        className={`hidden lg:flex ${
          isEven ? "justify-end" : "justify-start"
        } items-start`}
      >
        {isEven ? (
          <motion.article
            custom={side}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
            className={`group relative max-w-[480px] cursor-default rounded-2xl border bg-white/60 p-7 shadow-[0_8px_32px_rgba(54,69,79,0.06)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(54,69,79,0.12)] ${
              isLast
                ? "border-[#36454F]/25 ring-1 ring-[#36454F]/8"
                : "border-[#C5C3C6]/50"
            }`}
          >
            <CardContent milestone={milestone} isLast={isLast} />
          </motion.article>
        ) : (
          <div />
        )}
      </div>

      {/* ── Center dot (desktop) ── */}
      <div className="hidden lg:flex items-start justify-center pt-6">
        <motion.div
          variants={dotVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-full font-extrabold text-[11px] tracking-wide ${
            isLast
              ? "bg-[#36454F] text-white shadow-[0_0_20px_rgba(54,69,79,0.35)]"
              : "bg-white border-2 border-[#C5C3C6] text-[#4C5C68] shadow-[0_4px_16px_rgba(54,69,79,0.08)]"
          }`}
        >
          <milestone.Icon className="h-5 w-5" />
        </motion.div>
      </div>

      {/* ── Desktop: Right column ── */}
      <div
        className={`hidden lg:flex ${
          isEven ? "justify-start" : "justify-end"
        } items-start`}
      >
        {!isEven ? (
          <motion.article
            custom={side}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
            className={`group relative max-w-[480px] cursor-default rounded-2xl border bg-white/60 p-7 shadow-[0_8px_32px_rgba(54,69,79,0.06)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(54,69,79,0.12)] ${
              isLast
                ? "border-[#36454F]/25 ring-1 ring-[#36454F]/8"
                : "border-[#C5C3C6]/50"
            }`}
          >
            <CardContent milestone={milestone} isLast={isLast} />
          </motion.article>
        ) : (
          <div />
        )}
      </div>

      {/* ── Mobile layout ── */}
      <div className="flex items-start gap-5 lg:hidden">
        {/* Mobile dot */}
        <motion.div
          variants={dotVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`relative z-10 mt-1 flex h-[44px] w-[44px] flex-shrink-0 items-center justify-center rounded-full ${
            isLast
              ? "bg-[#36454F] text-white shadow-[0_0_16px_rgba(54,69,79,0.3)]"
              : "bg-white border-2 border-[#C5C3C6] text-[#4C5C68] shadow-[0_4px_12px_rgba(54,69,79,0.08)]"
          }`}
        >
          <milestone.Icon className="h-4 w-4" />
        </motion.div>

        {/* Mobile card */}
        <motion.article
          custom="right"
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`group relative flex-1 cursor-default rounded-2xl border bg-white/60 p-5 shadow-[0_8px_24px_rgba(54,69,79,0.06)] backdrop-blur-sm transition-shadow duration-300 sm:p-6 ${
            isLast
              ? "border-[#36454F]/25 ring-1 ring-[#36454F]/8"
              : "border-[#C5C3C6]/50"
          }`}
        >
          <CardContent milestone={milestone} isLast={isLast} />
        </motion.article>
      </div>
    </div>
  );
}

/* ─── Card Inner Content ─── */
function CardContent({
  milestone,
  isLast,
}: {
  milestone: Milestone;
  isLast: boolean;
}) {
  return (
    <>
      <span
        className={`mb-3 inline-block rounded-full px-3 py-1 text-[11px] font-bold tracking-widest uppercase ${
          isLast
            ? "bg-[#36454F]/10 text-[#36454F]"
            : "bg-[#C5C3C6]/30 text-[#899097]"
        }`}
      >
        {milestone.year}
      </span>

      <h3 className="text-lg font-extrabold leading-snug text-[#36454F] sm:text-xl">
        {milestone.title}
      </h3>

      {milestone.company && (
        <p className="mt-1 text-[13px] font-semibold text-[#4C5C68]/70">
          {milestone.company}
        </p>
      )}

      <p className="mt-3 text-sm leading-[1.8] text-[#4C5C68] sm:text-[15px]">
        {milestone.description}
      </p>
    </>
  );
}

/* ─── Main Export ─── */
export default function JourneyTimeline() {
  return (
    <section
      id="journey"
      className="relative overflow-hidden bg-[#DCDCDD] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
      aria-label="Journey Timeline"
    >
      {/* ── Background Gradient Circle (Bottom Right) ── */}
      <div
        className="absolute -bottom-[34vw] -right-[30vw] h-[78vw] w-[78vw] rounded-full sm:-right-[24vw] lg:-bottom-[36vw] lg:-right-[19.5vw] lg:h-[62vw] lg:w-[62vw] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #DCDCDD 0%, #899097 45%, #36454F 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at 0% 50%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
          maskImage:
            "radial-gradient(circle at 0% 50%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
        }}
      />

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

      {/* ── Localized dot grid clouds – scattered randomly ── */}
      <div
        className="absolute left-[4%] top-[10%] h-[260px] w-[260px] pointer-events-none hidden lg:block"
        style={{
          backgroundImage: "radial-gradient(rgba(124,132,140,.24) 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
          WebkitMaskImage: "radial-gradient(circle, black 0%, rgba(0,0,0,0.6) 45%, transparent 70%)",
          maskImage: "radial-gradient(circle, black 0%, rgba(0,0,0,0.6) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute right-[5%] top-[45%] h-[300px] w-[300px] pointer-events-none hidden sm:block"
        style={{
          backgroundImage: "radial-gradient(rgba(124,132,140,.22) 1.5px, transparent 1.5px)",
          backgroundSize: "20px 20px",
          WebkitMaskImage: "radial-gradient(circle, black 0%, rgba(0,0,0,0.5) 40%, transparent 70%)",
          maskImage: "radial-gradient(circle, black 0%, rgba(0,0,0,0.5) 40%, transparent 70%)",
        }}
      />

      {/* ── Broken circle arcs – scattered randomly ── */}
      <div
        className="absolute right-[10%] top-[8%] h-[160px] w-[160px] rounded-full pointer-events-none"
        style={{
          border: "2px solid rgba(124,132,140,.25)",
          WebkitMaskImage:
            "conic-gradient(black 0deg, black 110deg, transparent 110deg, transparent 230deg, black 230deg, black 310deg, transparent 310deg)",
          maskImage:
            "conic-gradient(black 0deg, black 110deg, transparent 110deg, transparent 230deg, black 230deg, black 310deg, transparent 310deg)",
        }}
      />
      <div
        className="absolute left-[6%] top-[38%] hidden h-[130px] w-[130px] rounded-full lg:block pointer-events-none"
        style={{
          border: "2.5px solid rgba(124,132,140,.24)",
          WebkitMaskImage:
            "conic-gradient(transparent 0deg, transparent 45deg, black 45deg, black 190deg, transparent 190deg)",
          maskImage:
            "conic-gradient(transparent 0deg, transparent 45deg, black 45deg, black 190deg, transparent 190deg)",
        }}
      />
      <div
        className="absolute right-[15%] bottom-[25%] hidden h-[185px] w-[185px] rounded-full sm:block pointer-events-none"
        style={{
          border: "2px solid rgba(124,132,140,.26)",
          WebkitMaskImage:
            "conic-gradient(transparent 0deg, transparent 90deg, black 90deg, black 230deg, transparent 230deg)",
          maskImage:
            "conic-gradient(transparent 0deg, transparent 90deg, black 90deg, black 230deg, transparent 230deg)",
        }}
      />

      {/* Section header */}
      <div className="mx-auto max-w-[1120px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-14 sm:mb-18 lg:mb-20"
        >
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#899097]">
            Timeline
          </p>
          <h2 className="text-3xl font-extrabold leading-tight text-[#36454F] sm:text-4xl lg:text-5xl">
            Journey
          </h2>
          <p className="mt-4 max-w-[560px] text-base leading-[1.85] text-[#4C5C68] sm:text-lg sm:mt-5">
            A timeline of my academic, internship, and professional development
            journey.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <TimelineLine />

          <div className="flex flex-col gap-12 sm:gap-14 lg:gap-16">
            {milestones.map((milestone, i) => (
              <MilestoneCard
                key={milestone.year}
                milestone={milestone}
                index={i}
                isLast={i === milestones.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

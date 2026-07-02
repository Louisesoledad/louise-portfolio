"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/lib/projects";

/* ─── Types ─── */
interface GalleryState {
  index: number;
  dir: number;
}

/* ─── Constants ─── */
const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

/* ─── Variants ─── */
const galleryVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
  }),
};

const galleryTransition = { duration: 0.42, ease: EASE };

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: EASE },
  }),
};

/* ─── Per-Project Gallery Component ─── */
function ProjectGallery({
  project,
  gallery,
  onNavigate,
}: {
  project: Project;
  gallery: GalleryState;
  onNavigate: (dir: number) => void;
}) {
  const total = project.screenshots.length;
  const current = gallery.index;

  return (
    <div className="w-full">
      {/* Image container */}
      <div className="relative overflow-hidden rounded-2xl xl:rounded-3xl">
        <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[16/9]">
          <AnimatePresence initial={false} custom={gallery.dir} mode="popLayout">
            <motion.div
              key={project.id + "-" + current}
              custom={gallery.dir}
              variants={galleryVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={galleryTransition}
              className="absolute inset-0"
            >
              <Image
                src={project.screenshots[current]}
                alt={`${project.title} screenshot ${current + 1}`}
                fill
                sizes="(max-width: 1023px) 100vw, 60vw"
                className="object-cover"
                priority={current === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Gallery controls */}
      <div className="mt-5 flex items-center justify-between gap-4 sm:mt-6">
        <button
          onClick={() => onNavigate(-1)}
          aria-label="Previous image"
          disabled={total <= 1}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C5C3C6] text-[#4C5C68] transition-all duration-200 hover:border-[#36454F] hover:bg-[#36454F] hover:text-white cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed sm:h-11 sm:w-11"
        >
          ←
        </button>

        {/* Dots + counter */}
        <div className="flex flex-col items-center gap-2.5">
          <div className="flex items-center gap-2">
            {project.screenshots.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "h-2 w-5 bg-[#36454F]"
                    : "h-2 w-2 bg-[#C5C3C6]"
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-semibold tabular-nums text-[#899097]">
            {current + 1} / {total}
          </span>
        </div>

        <button
          onClick={() => onNavigate(1)}
          aria-label="Next image"
          disabled={total <= 1}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C5C3C6] text-[#4C5C68] transition-all duration-200 hover:border-[#36454F] hover:bg-[#36454F] hover:text-white cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed sm:h-11 sm:w-11"
        >
          →
        </button>
      </div>
    </div>
  );
}

/* ─── Project Section ─── */
function ProjectSection({
  project,
  isEven,
  gallery,
  onNavigate,
}: {
  project: Project;
  isEven: boolean;
  gallery: GalleryState;
  onNavigate: (dir: number) => void;
}) {
  return (
    <section
      id={project.id}
      className="scroll-mt-24 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Project header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="mb-10 sm:mb-12 lg:mb-14"
        >
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#899097]">
            Project
          </p>
          <h2 className="text-3xl font-extrabold leading-tight text-[#36454F] sm:text-4xl lg:text-5xl">
            {project.title}
          </h2>
          <p className="mt-4 max-w-[640px] text-base leading-[1.85] text-[#4C5C68] sm:text-lg sm:mt-5">
            {project.shortDescription}
          </p>
        </motion.div>

        {/* Main layout: image left/right + features */}
        <div
          className={`flex flex-col gap-10 lg:gap-12 lg:flex-row ${
            isEven ? "lg:flex-row-reverse" : ""
          } lg:items-start`}
        >
          {/* Gallery */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp}
            className="w-full lg:w-[58%] lg:flex-shrink-0"
          >
            <ProjectGallery
              project={project}
              gallery={gallery}
              onNavigate={onNavigate}
            />
          </motion.div>

          {/* Features + Tech Stack */}
          <div className="flex flex-col gap-8 lg:flex-1 lg:pt-2">
            {/* Features */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
            >
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#899097]">
                Features
              </p>
              <ul className="space-y-3">
                {project.features.map((feature, i) => (
                  <motion.li
                    key={feature}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    variants={fadeUp}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#36454F] text-[10px] text-white">
                      ✓
                    </span>
                    <span className="text-sm leading-relaxed text-[#4C5C68] sm:text-base">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
            >
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#899097]">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2.5">
                {project.techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.88 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.3, ease: "easeOut" }}
                    className="rounded-full border border-[#4C5C68]/25 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-[#36454F] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#36454F]/50 hover:shadow-md sm:px-4 sm:py-2 sm:text-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Action buttons (View GitHub / View Website) */}
            {(project.githubUrl || project.websiteUrl) && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                className="mt-6 flex flex-wrap gap-3"
              >
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#36454F] bg-[#36454F] px-5 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:bg-[#4C5C68] hover:border-[#4C5C68] hover:shadow-lg active:scale-95 cursor-pointer sm:px-6 sm:py-3 sm:text-sm"
                  >
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    View GitHub
                  </a>
                )}
                {project.websiteUrl && (
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#36454F]/20 bg-white/80 px-5 py-2.5 text-xs font-bold text-[#36454F] transition-all duration-300 hover:border-[#36454F] hover:bg-white hover:shadow-lg active:scale-95 cursor-pointer sm:px-6 sm:py-3 sm:text-sm"
                  >
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                    View Website
                  </a>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Divider ─── */
function Divider() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="h-px bg-gradient-to-r from-transparent via-[#C5C3C6] to-transparent" />
    </div>
  );
}

/* ─── Main Page ─── */
export default function ProjectsPage() {
  const [galleries, setGalleries] = useState<Record<string, GalleryState>>({});

  function getGallery(id: string): GalleryState {
    return galleries[id] ?? { index: 0, dir: 0 };
  }

  function navigate(id: string, dir: number, total: number) {
    setGalleries((prev) => {
      const current = prev[id]?.index ?? 0;
      const next = (current + dir + total) % total;
      return { ...prev, [id]: { index: next, dir } };
    });
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(180deg, #DCDCDD 0%, #C5C3C6 100%)" }}
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

      {/* ── Fading dot cloud – top left ── */}
      <div
        className="absolute left-0 top-[25%] hidden w-[60%] h-[600px] lg:block pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(76,92,104,0.16) 2px, transparent 2.2px)",
          backgroundSize: "21px 19px",
          WebkitMaskImage:
            "radial-gradient(circle at 0% 0%, black 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.1) 60%, transparent 80%)",
          maskImage:
            "radial-gradient(circle at 0% 0%, black 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.1) 60%, transparent 80%)",
        }}
      />

      {/* ── Fading dot cloud – bottom right ── */}
      <div
        className="absolute right-0 bottom-[10%] hidden w-[60%] h-[600px] lg:block pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(76,92,104,0.16) 2px, transparent 2.2px)",
          backgroundSize: "21px 19px",
          WebkitMaskImage:
            "radial-gradient(circle at 100% 100%, black 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.1) 60%, transparent 80%)",
          maskImage:
            "radial-gradient(circle at 100% 100%, black 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.1) 60%, transparent 80%)",
        }}
      />

      {/* ── Broken circle outlines ── */}
      <div
        className="absolute left-[6%] top-[18%] h-[150px] w-[150px] rounded-full pointer-events-none"
        style={{
          border: "2.5px solid rgba(124,132,140,.28)",
          WebkitMaskImage:
            "conic-gradient(black 0deg, black 110deg, transparent 110deg, transparent 240deg, black 240deg, black 310deg, transparent 310deg)",
          maskImage:
            "conic-gradient(black 0deg, black 110deg, transparent 110deg, transparent 240deg, black 240deg, black 310deg, transparent 310deg)",
        }}
      />
      <div
        className="absolute right-[8%] top-[30%] hidden h-[200px] w-[200px] rounded-full sm:block pointer-events-none"
        style={{
          border: "2px solid rgba(124,132,140,.24)",
          WebkitMaskImage:
            "conic-gradient(transparent 0deg, transparent 40deg, black 40deg, black 160deg, transparent 160deg, transparent 280deg, black 280deg, black 340deg, transparent 340deg)",
          maskImage:
            "conic-gradient(transparent 0deg, transparent 40deg, black 40deg, black 160deg, transparent 160deg, transparent 280deg, black 280deg, black 340deg, transparent 340deg)",
        }}
      />
      <div
        className="absolute left-[15%] top-[50%] hidden h-[180px] w-[180px] rounded-full lg:block pointer-events-none"
        style={{
          border: "2px solid rgba(124,132,140,.25)",
          WebkitMaskImage:
            "conic-gradient(transparent 0deg, transparent 90deg, black 90deg, black 230deg, transparent 230deg)",
          maskImage:
            "conic-gradient(transparent 0deg, transparent 90deg, black 90deg, black 230deg, transparent 230deg)",
        }}
      />
      <div
        className="absolute right-[5%] bottom-[20%] h-[160px] w-[160px] rounded-full pointer-events-none"
        style={{
          border: "2.5px solid rgba(124,132,140,.26)",
          WebkitMaskImage:
            "conic-gradient(black 0deg, black 80deg, transparent 80deg, transparent 190deg, black 190deg, black 260deg, transparent 260deg)",
          maskImage:
            "conic-gradient(black 0deg, black 80deg, transparent 80deg, transparent 190deg, black 190deg, black 260deg, transparent 260deg)",
        }}
      />
      <div
        className="absolute left-[40%] top-[12%] h-[90px] w-[90px] rounded-full pointer-events-none"
        style={{
          border: "2px solid rgba(124,132,140,.3)",
          WebkitMaskImage:
            "conic-gradient(transparent 0deg, transparent 60deg, black 60deg, black 180deg, transparent 180deg)",
          maskImage:
            "conic-gradient(transparent 0deg, transparent 60deg, black 60deg, black 180deg, transparent 180deg)",
        }}
      />
      <div
        className="absolute left-[28%] bottom-[15%] hidden h-[130px] w-[130px] rounded-full lg:block pointer-events-none"
        style={{
          border: "2px solid rgba(124,132,140,.22)",
          WebkitMaskImage:
            "conic-gradient(transparent 0deg, transparent 120deg, black 120deg, black 250deg, transparent 250deg)",
          maskImage:
            "conic-gradient(transparent 0deg, transparent 120deg, black 120deg, black 250deg, transparent 250deg)",
        }}
      />

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
              href="/#projects"
              className="mb-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white/80"
            >
              ← Back to Home
            </Link>
            <h1 className="text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              Projects
            </h1>
            <p className="mt-5 max-w-xl text-base leading-[1.85] text-white/65 sm:text-lg sm:mt-6 lg:text-xl">
              A collection of work that reflects my craft across AI, full-stack development, and systems design.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Projects ── */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-10">
        {projects.map((project, i) => (
          <div key={project.id}>
            <ProjectSection
              project={project}
              isEven={i % 2 !== 0}
              gallery={getGallery(project.id)}
              onNavigate={(dir) =>
                navigate(project.id, dir, project.screenshots.length)
              }
            />
            {i < projects.length - 1 && <Divider />}
          </div>
        ))}
      </div>

      {/* ── Footer CTA ── */}
      <div className="relative z-10 px-4 pb-24 pt-8 sm:px-8 sm:pb-28 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto max-w-[1200px] rounded-2xl border border-[#C5C3C6]/60 bg-white/50 p-8 text-center sm:p-12 xl:rounded-3xl"
        >
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#899097]">
            What&apos;s Next
          </p>
          <h2 className="text-2xl font-extrabold text-[#36454F] sm:text-3xl lg:text-4xl">
            Let&apos;s build something together
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#4C5C68]">
            I&apos;m always open to interesting projects and opportunities.
          </p>
          <div className="mt-8">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#36454F] px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#4C5C68] hover:shadow-lg sm:text-base cursor-pointer"
            >
              Get in Touch →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import Image from "next/image";

const featuredProject = {
  title: "BridgeTalk",
  images: [
  "/projects/bridgetalk/1.png",
  "/projects/bridgetalk/2.png",
  "/projects/bridgetalk/3.png",
  "/projects/bridgetalk/4.png",
  "/projects/bridgetalk/5.png",
  "/projects/bridgetalk/6.png",
  "/projects/bridgetalk/7.png",
],

  description:
    "BridgeTalk is a two-way assistive communication system that helps bridge the communication gap between hearing and Deaf or hard-of-hearing individuals. The platform converts speech and text into sign language animations through a 3D avatar, while computer vision technology recognizes sign language gestures and translates them into readable text in real time.",

  stack: [
    "TensorFlow",
    "MediaPipe",
    "NumPy",
    "Vosk",
    "Python",
  ],

  github: "https://github.com/louiseverse/bridgetalk",
};
const projects = [
 {
  title: "DeckTago",
  images: [
  "/projects/decktago/1.png",
  "/projects/decktago/2.png",
  "/projects/decktago/3.png",
  "/projects/decktago/4.png",
  "/projects/decktago/5.png",
  "/projects/decktago/6.png",
  "/projects/decktago/7.png",
  "/projects/decktago/8.png",
  "/projects/decktago/9.png",
  "/projects/decktago/10.png",
],
  description:
    "A full-stack e-commerce web application designed for ordering meat products online. Customers can browse available products, manage their shopping cart, securely place orders, and enjoy a responsive shopping experience across devices.",

  website: "https://decktago-vert.vercel.app/",

  stack: [
    "Next.js",
    "TypeScript",
    "React",
    "Firebase",
  ],

  features: [
    "Online meat product marketplace",
    "Customer authentication",
    "Cart and checkout system",
    "Product management",
    "Responsive mobile-friendly interface",
    "Firebase-powered backend",
  ],
},
  {
    title: "DeckTaGo Inventory and Sales Management System",
    images: [
  "/projects/inventory/1.png",
  "/projects/inventory/2.png",
  "/projects/inventory/3.png",
  "/projects/inventory/4.png",
  "/projects/inventory/5.png",
  "/projects/inventory/6.png",
  "/projects/inventory/7.png",
  "/projects/inventory/8.png",
  "/projects/inventory/9.png",
  "/projects/inventory/10.png",
  "/projects/inventory/11.png",
  
],
    description:
      "A barcode-based inventory and sales management system for DeckTaGo, built for real-time stock tracking, weight-based product monitoring, role-based dashboards, and FIFO inventory deductions.",
    website:
      "https://deckta-inventory-sales.vercel.app",
    stack: [
      "Next.js",
      "React",
      "Firebase Firestore",
      "Firebase Authentication",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Zustand",
      "Recharts",
      "jsbarcode",
      "react-barcode",
    ],
    features: [
      "Barcode scanning integration",
      "Precise weight-based inventory tracking in kilograms",
      "Role-based dashboards for Owner, Encoder, and Sales users",
      "FIFO deduction logic for oldest-batch stock movement",
      "Comprehensive sales dashboard with transaction analytics",
      "Smart low-stock and expiration notifications",
      "Real-time synchronization across active clients",
    ],
  },
];


export default function Project() {
  const [currentImage, setCurrentImage] = useState(0);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);


  return (
    <section
      id="projects"
      className="relative min-h-screen overflow-hidden bg-[#ececec]"
    >
{/* BACKGROUND */}
<div
  className="absolute inset-0"
  style={{
    background: `
      linear-gradient(
        to bottom,
        #263941 0%,
        #263941 40%,
        #2c424b 55%,
        #30454d 70%,
        #233239 88%,
        #233239 100%
      )
    `,
  }}
/>

{/* DOTS OVERLAY */}
<div
  className="absolute top-[40%] left-0 right-0 bottom-0"
  style={{
    backgroundImage:
      "radial-gradient(rgba(255,255,255,.65) 1px, transparent 1px)",
    backgroundSize: "12px 12px",

    WebkitMaskImage:
      "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.3) 15%, black 35%, black 100%)",

    maskImage:
      "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.3) 15%, black 35%, black 100%)",

    opacity: 0.7,
  }}
/>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex min-h-screen flex-col justify-center pb-12 pt-24 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-32">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
            Featured Projects
          </h2>

          <p className="mt-4 text-base leading-relaxed text-white/72 sm:mt-6 sm:text-lg lg:text-xl">
            Selected work that showcases my design and development skills.
          </p>
        </div>

        {/* FEATURED PROJECT */}
        <div className="mt-10 overflow-hidden rounded-2xl border-2 border-[#9aa8ae] bg-[#edf0f1]/95 shadow-[0_24px_58px_rgba(5,12,16,0.28)] backdrop-blur-sm sm:mt-16 sm:rounded-[32px]">
          <div className="grid lg:grid-cols-2">
  <div className="relative min-h-[300px] overflow-hidden sm:min-h-[420px] lg:min-h-[560px]">
  <Image
  key={featuredProject.images[currentImage]}
  src={featuredProject.images[currentImage]}
  alt={featuredProject.title}
  fill
  className="object-cover transition-all duration-500"
/>

  {/* PREV */}
  <button
    onClick={() =>
      setCurrentImage((prev) =>
        prev === 0
          ? featuredProject.images.length - 1
          : prev - 1
      )
    }
    className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-xl text-white backdrop-blur-sm sm:left-4 sm:h-12 sm:w-12"
  >
    ‹
  </button>

  {/* NEXT */}
  <button
    onClick={() =>
      setCurrentImage((prev) =>
        prev === featuredProject.images.length - 1
          ? 0
          : prev + 1
      )
    }
    className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-xl text-white backdrop-blur-sm sm:right-4 sm:h-12 sm:w-12"
  >
    ›
  </button>

  {/* DOTS */}
  <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-5">
    {featuredProject.images.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentImage(index)}
        className={`h-2.5 w-2.5 rounded-full transition sm:h-3 sm:w-3 ${
          currentImage === index
            ? "bg-white"
            : "bg-white/40"
        }`}
      />
    ))}
  </div>
</div>

            <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-14">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-[#263941] sm:text-sm sm:tracking-[4px]">
                Featured Project
              </p>

              <h3 className="text-3xl font-bold text-[#344754] sm:text-4xl">
                {featuredProject.title}
              </h3>

              <p className="mt-4 text-base leading-relaxed text-[#334650] sm:mt-6 sm:text-lg">
                {featuredProject.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
                {featuredProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[#263941] px-3 py-1.5 text-xs text-[#263941] sm:px-4 sm:py-2 sm:text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex gap-4 sm:mt-10">
  <a
    href={featuredProject.github}
    target="_blank"
    rel="noopener noreferrer"
    className="w-full rounded-full bg-[#263941] px-6 py-3 text-center text-white transition hover:opacity-90 sm:w-auto"
  >
    View on GitHub
  </a>
</div>
            </div>
          </div>
        </div>
        </div>

        {/* SMALL PROJECTS */}
        <div className="grid gap-6 pb-14 pt-8 md:grid-cols-2 sm:pb-20 lg:gap-8 lg:pb-24 lg:pt-10">
          {projects.map((project) => (
            <div
              key={project.title}
              className="overflow-hidden rounded-2xl border-2 border-[#7b8a92] bg-[#edf0f1]/90 shadow-[0_16px_34px_rgba(20,35,45,0.12)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-[24px] sm:hover:-translate-y-2"
            >
              <div className="relative aspect-[16/10] min-h-[190px] sm:h-[240px] sm:aspect-auto">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="bg-[#edf0f1]/95 p-5 sm:p-6">
                <h3 className="text-xl font-bold leading-tight text-[#243641] sm:text-2xl">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#334650] sm:text-base">
  {project.description}
</p>

                <button
  onClick={() => {
  setSelectedProject(project);
  setModalImageIndex(0);
}}
  className="mt-5 w-full rounded-full border border-[#263941] px-5 py-2 text-[#263941] transition hover:bg-[#263941] hover:text-white sm:w-auto"
>
  View Project
</button>

              </div>
            </div>
          ))}
                </div>
      </div>

      {selectedProject && (
        <div
          className="scrollbar-hide fixed inset-0 z-[999] overflow-y-auto bg-black/70 p-3 sm:p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="scrollbar-hide mx-auto my-3 max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-4 sm:my-8 sm:max-h-[calc(100dvh-4rem)] sm:rounded-3xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-bold leading-tight text-[#344754] sm:text-3xl">
                {selectedProject.title}
              </h2>

              <button
                onClick={() => setSelectedProject(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-3xl leading-none text-[#344754] transition hover:bg-[#edf0f1]"
              >
                ×
              </button>
            </div>

            <div className="relative mt-5 aspect-[16/10] min-h-[180px] overflow-hidden rounded-xl sm:mt-6 sm:h-[300px] sm:aspect-auto sm:rounded-2xl">
  <Image
  key={selectedProject.images[modalImageIndex]}
  src={selectedProject.images[modalImageIndex]}
  alt={selectedProject.title}
  fill
  className="object-cover"
/>

  {selectedProject.images.length > 1 && (
    <>
      <button
        onClick={() =>
          setModalImageIndex((prev) =>
            prev === 0
              ? selectedProject.images.length - 1
              : prev - 1
          )
        }
        className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl text-white"
      >
        ‹
      </button>

      <button
        onClick={() =>
          setModalImageIndex((prev) =>
            prev === selectedProject.images.length - 1
              ? 0
              : prev + 1
          )
        }
        className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl text-white"
      >
        ›
      </button>
    </>
  )}

  <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
    {selectedProject.images.map((_, index) => (
      <button
        key={index}
        onClick={() => setModalImageIndex(index)}
        className={`h-2.5 w-2.5 rounded-full ${
          modalImageIndex === index
            ? "bg-white"
            : "bg-white/50"
        }`}
      />
    ))}
  </div>
</div>

            <p className="mt-5 text-sm leading-relaxed text-[#66737b] sm:mt-6 sm:text-base">
              {selectedProject.description}
            </p>
            <div className="mt-6">
  <h4 className="mb-3 font-semibold text-[#344754]">
    Features
  </h4>

  <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#66737b] sm:text-base">
    {selectedProject.features.map((feature) => (
      <li key={feature}>{feature}</li>
    ))}
  </ul>
</div>

            <div className="mt-6 flex flex-wrap gap-2">
              {selectedProject.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[#263941] px-3 py-1 text-xs text-[#263941] sm:text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <a
                href={selectedProject.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-full bg-[#263941] px-5 py-2.5 text-center text-white transition hover:opacity-90 sm:inline-block sm:w-auto"
              >
                View Website
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

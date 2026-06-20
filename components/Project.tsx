"use client";
import { useState } from "react";
import Image from "next/image";

const featuredProject = {
  title: "BridgeTalk",
  images: [
  "/projects/bridgetalk.png",
  "/projects/bridgetalk1.png",
  "/projects/bridgetalk2.png",
  "/projects/bridgetalk3.png",
  "/projects/bridgetalk4.png",
  "/projects/bridgetalk5.png",
  "/projects/bridgetalk6.png",
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
  image: "/projects/decktago.png",
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
    image: "/projects/Barcode-Based-Inventory-and-Sales-Management-System-for-Deckta.png",
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
        #ececec 0%,
        #ececec 40%,
        #d6dcdf 55%,
        #7b8a92 70%,
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

      <div className="relative z-10 mx-auto max-w-[1400px] px-10 pb-20 pt-32">
        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-[#344754] lg:text-6xl">
            Featured Projects
          </h2>

          <p className="mt-6 text-lg text-[#66737b] lg:text-xl">
            Selected work that showcases my design and development skills.
          </p>
        </div>

        {/* FEATURED PROJECT */}
        <div className="mt-16 overflow-hidden rounded-[32px] border-2 border-[#7b8a92] bg-white/20 backdrop-blur-sm">
          <div className="grid lg:grid-cols-2">
  <div className="relative min-h-[560px] overflow-hidden">
  <Image
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
    className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 px-4 py-2 text-xl text-white backdrop-blur-sm"
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
    className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 px-4 py-2 text-xl text-white backdrop-blur-sm"
  >
    ›
  </button>

  {/* DOTS */}
  <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
    {featuredProject.images.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentImage(index)}
        className={`h-3 w-3 rounded-full transition ${
          currentImage === index
            ? "bg-white"
            : "bg-white/40"
        }`}
      />
    ))}
  </div>
</div>

            <div className="flex flex-col justify-center p-10 lg:p-14">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[4px] text-[#263941]">
                Featured Project
              </p>

              <h3 className="text-4xl font-bold text-[#344754]">
                {featuredProject.title}
              </h3>

              <p className="mt-6 text-lg leading-relaxed text-[#66737b]">
                {featuredProject.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {featuredProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[#263941] px-4 py-2 text-sm text-[#263941]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex gap-4">
  <a
    href={featuredProject.github}
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-full bg-[#263941] px-6 py-3 text-white transition hover:opacity-90"
  >
    View on GitHub
  </a>
</div>
            </div>
          </div>
        </div>

        {/* SMALL PROJECTS */}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.title}
              className="overflow-hidden rounded-[24px] border-2 border-[#7b8a92] bg-[#edf0f1]/90 shadow-[0_16px_34px_rgba(20,35,45,0.12)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-[240px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="bg-[#edf0f1]/95 p-6">
                <h3 className="text-2xl font-bold text-[#243641]">
                  {project.title}
                </h3>

                <p className="mt-3 leading-relaxed text-[#334650]">
  {project.description}
</p>

                <button
  onClick={() => setSelectedProject(project)}
  className="mt-5 rounded-full border border-[#263941] px-5 py-2 text-[#263941] transition hover:bg-[#263941] hover:text-white"
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
          className="scrollbar-hide fixed inset-0 z-[999] overflow-y-auto bg-black/70 p-4 sm:p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="scrollbar-hide mx-auto my-6 max-h-[calc(100dvh-3rem)] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-5 sm:my-8 sm:p-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-[#344754]">
                {selectedProject.title}
              </h2>

              <button
                onClick={() => setSelectedProject(null)}
                className="text-3xl"
              >
                ×
              </button>
            </div>

            <div className="relative mt-6 h-[220px] overflow-hidden rounded-2xl sm:h-[300px]">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            <p className="mt-6 text-[#66737b]">
              {selectedProject.description}
            </p>
            <div className="mt-6">
  <h4 className="mb-3 font-semibold text-[#344754]">
    Features
  </h4>

  <ul className="list-disc space-y-2 pl-5 text-[#66737b]">
    {selectedProject.features.map((feature) => (
      <li key={feature}>{feature}</li>
    ))}
  </ul>
</div>

            <div className="mt-6 flex flex-wrap gap-2">
              {selectedProject.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[#263941] px-3 py-1 text-sm text-[#263941]"
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
                className="rounded-full bg-[#263941] px-5 py-2 text-white transition hover:opacity-90"
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

"use client";

import Image from "next/image";

const skillGroups = [
  {
    category: "Frontend",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Vite",
    ],
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "Python",
      "FastAPI",
      "Firebase",
      "MySQL",

    ],
  },
  {
    category: "AI & Machine Learning",
    skills: [
      "TensorFlow",
      "MediaPipe",
      "OpenCV",
      "Transformers",
      "OpenAI",
      "Hugging Face",
      "Claude code",
      "Codex",

    ],
  },
  {
    category: "Developer Tools",
    skills: [
      "Git",
      "GitHub",
      "GitHub Actions",
      "VS Code",
      "Vercel",
      "Adobe Photoshop",
      "Blender",
      "WordPress",
    ],
  },
];

const iconMap: Record<string, string> = {
  JavaScript: "javascript.png",
  TypeScript: "typescript.png",
  React: "react.png",
  "Next.js": "nextjs.png",
  HTML: "html.png",
  CSS: "css.png",
  "Tailwind CSS": "tailwindcss.png",
  Vite: "vite.png",

  "Node.js": "nodejs.png",
  Python: "python.png",
  FastAPI: "fastapi.png",
  Firebase: "firebase.png",
  MySQL: "mysql.png",

  TensorFlow: "tensorflow.png",
  MediaPipe: "mediapipe.png",
  OpenCV: "opencv.png",
  Transformers: "transformers.png",
  OpenAI: "openai.png",
  "Hugging Face": "huggingface.png",
  "Claude code": "claude.png",
  Codex: "codex.png",

  Git: "git.png",
  GitHub: "github.png",
  "GitHub Actions": "githubactions.png",
  "VS Code": "vscode.png",
  Vercel: "vercel.png",
  "Adobe Photoshop": "photoshop.png",
  Blender: "blender.png",
  WordPress: "wordpress.png",
};

/* ─── Reusable Skill Item ─── */

function SkillItem({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="group flex flex-col items-center gap-2.5 sm:gap-3">
      <div className="flex h-16 w-16 items-center justify-center transition-transform duration-[250ms] ease-out group-hover:-translate-y-1 group-hover:scale-[1.08] sm:h-20 sm:w-20 lg:h-24 lg:w-24">
        <Image
          src={`/skills/${icon}`}
          alt={label}
          width={96}
          height={96}
          className="object-contain"
        />
      </div>
      <span className="text-[13px] font-semibold text-[#4C5C68] transition-colors duration-[250ms] ease-out group-hover:text-[#36454F] sm:text-sm lg:text-[15px] text-center">
        {label}
      </span>
    </div>
  );
}

/* ─── Skills Section ─── */

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen overflow-hidden bg-[#DCDCDD] px-4 sm:px-6 lg:px-8"
    >

      {/* ── Dot pattern with vertical fade ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(54,69,79,.2) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, rgba(0,0,0,.5) 30%, rgba(0,0,0,.15) 55%, transparent 75%)",
          maskImage:
            "linear-gradient(to bottom, black 0%, rgba(0,0,0,.5) 30%, rgba(0,0,0,.15) 55%, transparent 75%)",
        }}
      />

      {/* ── Gradient circle – top right ── */}
      <div
        className="absolute -right-[30vw] -top-[36vw] h-[78vw] w-[78vw] rounded-full sm:-right-[24vw] lg:-right-[19.5vw] lg:-top-[26vw] lg:h-[62vw] lg:w-[62vw]"
        style={{
          background:
            "linear-gradient(90deg, #DCDCDD 0%, #899097 45%, #36454F 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at 0% 50%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
          maskImage:
            "radial-gradient(circle at 0% 50%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
        }}
      />

      {/* ── Minimalist line pattern – bottom fade ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-[35%]"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(54,69,79,.06) 1px, transparent 1px)",
          backgroundSize: "100% 28px",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,.5) 0%, rgba(0,0,0,.2) 40%, transparent 100%)",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,.5) 0%, rgba(0,0,0,.2) 40%, transparent 100%)",
        }}
      />

      {/* ── Localized dot grid clouds – scattered randomly ── */}

      {/* Dot Cloud 1 – top left */}
      <div
        className="absolute left-[8%] top-[15%] h-[260px] w-[260px] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(124,132,140,.24) 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
          WebkitMaskImage: "radial-gradient(circle, black 0%, rgba(0,0,0,0.6) 45%, transparent 70%)",
          maskImage: "radial-gradient(circle, black 0%, rgba(0,0,0,0.6) 45%, transparent 70%)",
        }}
      />

      {/* Dot Cloud 2 – bottom right */}
      <div
        className="absolute right-[10%] bottom-[12%] h-[320px] w-[320px] pointer-events-none hidden sm:block"
        style={{
          backgroundImage: "radial-gradient(rgba(124,132,140,.22) 1.5px, transparent 1.5px)",
          backgroundSize: "20px 20px",
          WebkitMaskImage: "radial-gradient(circle, black 0%, rgba(0,0,0,0.5) 40%, transparent 70%)",
          maskImage: "radial-gradient(circle, black 0%, rgba(0,0,0,0.5) 40%, transparent 70%)",
        }}
      />

      {/* Dot Cloud 3 – center left */}
      <div
        className="absolute left-[25%] top-[50%] h-[280px] w-[280px] pointer-events-none hidden lg:block"
        style={{
          backgroundImage: "radial-gradient(rgba(124,132,140,.25) 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
          WebkitMaskImage: "radial-gradient(circle, black 0%, rgba(0,0,0,0.5) 40%, transparent 70%)",
          maskImage: "radial-gradient(circle, black 0%, rgba(0,0,0,0.5) 40%, transparent 70%)",
        }}
      />

      {/* Dot Cloud 4 – bottom right corner */}
      <div
        className="absolute right-[4%] bottom-[4%] h-[240px] w-[240px] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(124,132,140,.26) 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
          WebkitMaskImage: "radial-gradient(circle, black 0%, rgba(0,0,0,0.55) 40%, transparent 70%)",
          maskImage: "radial-gradient(circle, black 0%, rgba(0,0,0,0.55) 40%, transparent 70%)",
        }}
      />

      {/* ── Custom bottom right dot pattern fading inward ── */}
      <div
        className="absolute right-0 bottom-0 hidden w-[70%] h-[700px] lg:block pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(76, 92, 104, 0.22) 2px, transparent 2.2px)",
          backgroundSize: "21px 19px",
          backgroundPosition: "10px 10px",
          WebkitMaskImage:
            "radial-gradient(circle at 100% 100%, black 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.1) 60%, transparent 80%)",
          maskImage:
            "radial-gradient(circle at 100% 100%, black 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.1) 60%, transparent 80%)",
        }}
      />

      {/* ── Broken circle arcs – scattered randomly ── */}

      {/* Arc 11 – bottom center-left */}
      <div
        className="absolute left-[48%] bottom-[25%] hidden h-[160px] w-[160px] rounded-full lg:block"
        style={{
          border: "2px solid rgba(124,132,140,.25)",
          WebkitMaskImage:
            "conic-gradient(transparent 0deg, transparent 120deg, black 120deg, black 250deg, transparent 250deg)",
          maskImage:
            "conic-gradient(transparent 0deg, transparent 120deg, black 120deg, black 250deg, transparent 250deg)",
        }}
      />

      {/* Arc 12 – top center-right */}
      <div
        className="absolute right-[35%] top-[12%] hidden h-[130px] w-[130px] rounded-full sm:block"
        style={{
          border: "2px solid rgba(124,132,140,.22)",
          WebkitMaskImage:
            "conic-gradient(black 0deg, black 80deg, transparent 80deg, transparent 180deg, black 180deg, black 280deg, transparent 280deg)",
          maskImage:
            "conic-gradient(black 0deg, black 80deg, transparent 80deg, transparent 180deg, black 180deg, black 280deg, transparent 280deg)",
        }}
      />

      {/* Arc 13 – left bottom-mid */}
      <div
        className="absolute left-[18%] top-[70%] hidden h-[190px] w-[190px] rounded-full lg:block"
        style={{
          border: "2.5px solid rgba(124,132,140,.24)",
          WebkitMaskImage:
            "conic-gradient(transparent 0deg, transparent 45deg, black 45deg, black 190deg, transparent 190deg)",
          maskImage:
            "conic-gradient(transparent 0deg, transparent 45deg, black 45deg, black 190deg, transparent 190deg)",
        }}
      />

      {/* Arc 8 – mid left */}
      <div
        className="absolute left-[30%] top-[25%] hidden h-[180px] w-[180px] rounded-full lg:block"
        style={{
          border: "2px solid rgba(124,132,140,.26)",
          WebkitMaskImage:
            "conic-gradient(transparent 0deg, transparent 90deg, black 90deg, black 230deg, transparent 230deg)",
          maskImage:
            "conic-gradient(transparent 0deg, transparent 90deg, black 90deg, black 230deg, transparent 230deg)",
        }}
      />

      {/* Arc 9 – bottom center-right */}
      <div
        className="absolute right-[25%] bottom-[28%] hidden h-[150px] w-[150px] rounded-full sm:block"
        style={{
          border: "2.5px solid rgba(124,132,140,.25)",
          WebkitMaskImage:
            "conic-gradient(black 0deg, black 120deg, transparent 120deg, transparent 200deg, black 200deg, black 320deg, transparent 320deg)",
          maskImage:
            "conic-gradient(black 0deg, black 120deg, transparent 120deg, transparent 200deg, black 200deg, black 320deg, transparent 320deg)",
        }}
      />

      {/* Arc 10 – far bottom left */}
      <div
        className="absolute left-[5%] bottom-[5%] h-[220px] w-[220px] rounded-full"
        style={{
          border: "2px solid rgba(124,132,140,.28)",
          WebkitMaskImage:
            "conic-gradient(transparent 0deg, transparent 160deg, black 160deg, black 330deg, transparent 330deg)",
          maskImage:
            "conic-gradient(transparent 0deg, transparent 160deg, black 160deg, black 330deg, transparent 330deg)",
        }}
      />

      {/* Arc 1 – top left area */}
      <div
        className="absolute left-[6%] top-[12%] h-[140px] w-[140px] rounded-full"
        style={{
          border: "2.5px solid rgba(124,132,140,.3)",
          WebkitMaskImage:
            "conic-gradient(black 0deg, black 110deg, transparent 110deg, transparent 240deg, black 240deg, black 310deg, transparent 310deg)",
          maskImage:
            "conic-gradient(black 0deg, black 110deg, transparent 110deg, transparent 240deg, black 240deg, black 310deg, transparent 310deg)",
        }}
      />

      {/* Arc 2 – right side mid */}
      <div
        className="absolute right-[4%] top-[28%] hidden h-[200px] w-[200px] rounded-full sm:block"
        style={{
          border: "2px solid rgba(124,132,140,.25)",
          WebkitMaskImage:
            "conic-gradient(transparent 0deg, transparent 40deg, black 40deg, black 160deg, transparent 160deg, transparent 280deg, black 280deg, black 340deg, transparent 340deg)",
          maskImage:
            "conic-gradient(transparent 0deg, transparent 40deg, black 40deg, black 160deg, transparent 160deg, transparent 280deg, black 280deg, black 340deg, transparent 340deg)",
        }}
      />

      {/* Arc 3 – bottom left */}
      <div
        className="absolute left-[12%] bottom-[18%] hidden h-[100px] w-[100px] rounded-full lg:block"
        style={{
          border: "2.5px solid rgba(124,132,140,.28)",
          WebkitMaskImage:
            "conic-gradient(transparent 0deg, transparent 30deg, black 30deg, black 130deg, transparent 130deg)",
          maskImage:
            "conic-gradient(transparent 0deg, transparent 30deg, black 30deg, black 130deg, transparent 130deg)",
        }}
      />

      {/* Arc 4 – center right, large */}
      <div
        className="absolute right-[10%] top-[55%] hidden h-[260px] w-[260px] rounded-full lg:block"
        style={{
          border: "2px solid rgba(124,132,140,.2)",
          WebkitMaskImage:
            "conic-gradient(black 0deg, black 80deg, transparent 80deg, transparent 190deg, black 190deg, black 260deg, transparent 260deg)",
          maskImage:
            "conic-gradient(black 0deg, black 80deg, transparent 80deg, transparent 190deg, black 190deg, black 260deg, transparent 260deg)",
        }}
      />

      {/* Arc 5 – small, top center */}
      <div
        className="absolute left-[42%] top-[6%] h-[70px] w-[70px] rounded-full"
        style={{
          border: "2px solid rgba(124,132,140,.35)",
          WebkitMaskImage:
            "conic-gradient(transparent 0deg, transparent 60deg, black 60deg, black 180deg, transparent 180deg)",
          maskImage:
            "conic-gradient(transparent 0deg, transparent 60deg, black 60deg, black 180deg, transparent 180deg)",
        }}
      />

      {/* Arc 6 – bottom right */}
      <div
        className="absolute right-[18%] bottom-[8%] hidden h-[120px] w-[120px] rounded-full sm:block"
        style={{
          border: "2.5px solid rgba(124,132,140,.25)",
          WebkitMaskImage:
            "conic-gradient(black 0deg, black 70deg, transparent 70deg, transparent 200deg, black 200deg, black 290deg, transparent 290deg)",
          maskImage:
            "conic-gradient(black 0deg, black 70deg, transparent 70deg, transparent 200deg, black 200deg, black 290deg, transparent 290deg)",
        }}
      />

      {/* Arc 7 – left mid, tiny */}
      <div
        className="absolute left-[22%] top-[45%] hidden h-[55px] w-[55px] rounded-full lg:block"
        style={{
          border: "2px solid rgba(124,132,140,.3)",
          WebkitMaskImage:
            "conic-gradient(transparent 0deg, transparent 100deg, black 100deg, black 220deg, transparent 220deg)",
          maskImage:
            "conic-gradient(transparent 0deg, transparent 100deg, black 100deg, black 220deg, transparent 220deg)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1120px] py-16 sm:py-24 lg:py-28">
        <div className="text-left w-full">
          <h2 className="text-[clamp(2.15rem,8.6vw,4.15rem)] font-extrabold leading-none text-[#36454F]">
            Tech Stack
          </h2>

          <p className="mt-4 max-w-[680px] text-base leading-[1.75] text-[#4C5C68] sm:text-lg lg:text-xl lg:leading-[1.9]">
            Technologies and tools I use to build modern system experiences.
          </p>
        </div>

        <div className="mt-12 space-y-12 sm:mt-16 sm:space-y-14 lg:mt-20 lg:space-y-16 w-full">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="text-left text-sm font-extrabold uppercase tracking-[0.12em] text-[#899097] sm:text-base lg:text-lg">
                {group.category}
              </h3>

              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-10 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12 w-full">
                {group.skills.map((skill) => (
                  <SkillItem
                    key={skill}
                    icon={iconMap[skill] ?? ""}
                    label={skill}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

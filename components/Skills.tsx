import Image from "next/image";

const skills = [
  { name: "TypeScript", icon: "/skills/typescript.webp" },
  { name: "JavaScript", icon: "/skills/javascript.webp" },
  { name: "Python", icon: "/skills/python.webp" },
  { name: "Next.js", icon: "/skills/nextjs.webp" },
  { name: "HTML", icon: "/skills/html.webp" },
  { name: "CSS", icon: "/skills/css.webp" },
  { name: "Firebase", icon: "/skills/firebase.webp" },
  { name: "WordPress", icon: "/skills/wordpress.webp" },
  { name: "Adobe Photoshop", icon: "/skills/photoshop.webp" },
  { name: "Blender", icon: "/skills/blender.webp" },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen overflow-hidden bg-[#ececec] lg:h-screen"
    >
      <div
        className="absolute -left-[34vw] -top-[30vw] hidden h-[76vw] w-[76vw] rounded-full bg-[#c7cdd0] sm:block lg:-left-[23.6vw] lg:-top-[48vw] lg:h-[58vw] lg:w-[58vw]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.85) 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div
        className="absolute -right-[34vw] -top-[12vw] h-[78vw] w-[78vw] rounded-full sm:-right-[28vw] lg:-right-[20vw] lg:-top-[18vw] lg:h-[62vw] lg:w-[62vw]"
        style={{
          background:
            "linear-gradient(90deg, #e4e7e8 0%, #9ba5ab 45%, #263941 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at 0% 50%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
          maskImage:
            "radial-gradient(circle at 0% 50%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-10 sm:px-10 sm:py-24 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[760px] text-center lg:max-w-none">
          <h2 className="text-[clamp(2rem,10vw,3.75rem)] font-extrabold leading-tight text-[#344754] lg:text-6xl">
            Tech stack
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#66737b] sm:mt-6 sm:text-lg lg:text-xl">
            Technologies and tools I use to build modern system experiences.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:mt-16 sm:gap-6 md:grid-cols-3 lg:mt-20 lg:grid-cols-5 lg:gap-8">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="rounded-lg border-2 border-[#7b8a92] bg-[#ececec]/70 p-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-5 lg:rounded-[24px] lg:bg-transparent lg:p-6 lg:hover:-translate-y-2"
            >
              <div className="flex min-h-[86px] flex-col items-center justify-between sm:min-h-[168px] lg:min-h-0">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={96}
                  height={96}
                  className="h-9 w-9 object-contain sm:h-20 sm:w-20 lg:h-24 lg:w-24"
                />

                <div className="my-2 h-px w-full bg-[#7b8a92] sm:my-5" />

                <h3 className="text-center text-xs leading-tight text-[#5b6972] sm:text-lg lg:text-xl lg:leading-normal">
                  {skill.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

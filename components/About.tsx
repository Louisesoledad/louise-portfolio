import Image from "next/image";
import AboutStats from "@/components/AboutStats";

const aboutLinks = [
  { label: "github", href: "https://github.com/Louisesoledad" },
  { label: "linkedin", href: "https://www.linkedin.com/in/louiseangelosoledad" },
  { label: "instagram", href: "https://www.instagram.com/louiseeverse" },
  { label: "facebook", href: "https://www.facebook.com/louise.soledad.7" },
];

export default function About({ isSubpage = false }: { isSubpage?: boolean }) {
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-[#DCDCDD] px-4 sm:px-6 lg:px-8"
    >
      {!isSubpage && (
        <div
          className="absolute left-0 top-0 hidden w-[70%] h-[700px] lg:block pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(76, 92, 104, 0.22) 2px, transparent 2.2px)",
            backgroundSize: "21px 19px",
            backgroundPosition: "10px 10px",
            WebkitMaskImage:
              "radial-gradient(circle at 0% 0%, black 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.1) 60%, transparent 80%)",
            maskImage:
              "radial-gradient(circle at 0% 0%, black 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.1) 60%, transparent 80%)",
          }}
        />
      )}

      {!isSubpage && (
        <div
          className="absolute -bottom-[34vw] -right-[30vw] h-[78vw] w-[78vw] rounded-full sm:-right-[24vw] lg:-bottom-[36vw] lg:-right-[19.5vw] lg:h-[62vw] lg:w-[62vw]"
          style={{
            background:
              "linear-gradient(90deg, #DCDCDD 0%, #899097 45%, #36454F 100%)",
            WebkitMaskImage:
              "radial-gradient(circle at 0% 50%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
            maskImage:
              "radial-gradient(circle at 0% 50%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
          }}
        />
      )}

      <div className={`relative z-10 mx-auto flex max-w-[1120px] flex-col items-center justify-center pb-20 ${
        isSubpage 
          ? "pt-12 sm:pt-16 lg:pt-20" 
          : "min-h-screen pt-32 sm:pt-40 lg:pt-48"
      }`}>
        <div className="grid w-full grid-cols-1 items-end gap-10 md:grid-cols-[minmax(260px,0.9fr)_minmax(320px,1fr)] md:gap-12 lg:gap-16">
          <div className="flex justify-center md:justify-end">
            <div className="relative aspect-[4/5] w-full max-w-[300px] overflow-hidden sm:max-w-[360px] md:max-w-[390px] lg:max-w-[430px]">
              <Image
                src="/me.png"
                alt="Louise"
                fill
                priority
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 390px, 430px"
                className="object-cover object-[center_18%] grayscale"
              />
            </div>
          </div>

          <div className="mx-auto max-w-[520px] pb-2 text-left md:mx-0 md:pb-7 lg:pb-10">
            <h2 className="mb-5 whitespace-nowrap text-[clamp(2.15rem,8.6vw,4.15rem)] font-extrabold leading-none text-[#36454F] md:mb-7">
              Louise Soledad
            </h2>

            <p className="max-w-[500px] text-lg leading-[1.75] text-[#4C5C68] sm:text-xl lg:text-2xl lg:leading-[1.8] font-medium">
              I&apos;m a Computer Science graduate with a passion for building meaningful and impactful technology. 
              I have experience in web development and machine learning-based systems, which helped me strengthen my problem-solving and system design skills.
            </p>

            <div className="mt-8 flex flex-nowrap gap-x-5 text-xs font-bold lowercase tracking-[0.08em] text-[#899097] sm:mt-10">
              {aboutLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="whitespace-nowrap transition-colors hover:text-[#36454F]"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full mt-16 sm:mt-20 lg:mt-24">
          <AboutStats />
        </div>
      </div>
    </section>
  );
}

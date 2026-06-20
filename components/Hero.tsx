import Image from "next/image";

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/louise.soledad.7",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M14.2 8.4V6.7c0-.8.5-1 1-1h1.4V3.2c-.7-.1-1.5-.2-2.2-.2-2.2 0-3.7 1.3-3.7 3.7v1.7H8.2v2.8h2.5V21h3.1v-9.8h2.4l.4-2.8h-2.4Z"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/louiseeverse",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.9"
          d="M7.3 3.8h9.4a3.5 3.5 0 0 1 3.5 3.5v9.4a3.5 3.5 0 0 1-3.5 3.5H7.3a3.5 3.5 0 0 1-3.5-3.5V7.3a3.5 3.5 0 0 1 3.5-3.5Z"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.9"
          d="M15.6 11.4a3.7 3.7 0 1 1-7.3 1.2 3.7 3.7 0 0 1 7.3-1.2Z"
        />
        <path fill="currentColor" d="M17.1 6.9a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/louiseverse",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M12 2.8a9.3 9.3 0 0 0-2.9 18.1c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 2.9.9.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.1-4.7-5a3.9 3.9 0 0 1 1-2.7 3.6 3.6 0 0 1 .1-2.7s.8-.3 2.8 1a9.6 9.6 0 0 1 5.1 0c1.9-1.3 2.7-1 2.7-1 .6 1.5.2 2.5.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.7 5 .4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5A9.3 9.3 0 0 0 12 2.8Z"
        />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M6.8 8.9H3.9V20h2.9V8.9ZM5.3 3.6a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4Zm6.4 5.3H8.9V20h2.9v-5.8c0-1.5.3-3 2.2-3 1.8 0 1.8 1.7 1.8 3.1V20h2.9v-6.4c0-3.1-.7-5-3.9-5-1.5 0-2.6.8-3.1 1.6h-.1V8.9Z"
        />
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate min-h-screen overflow-hidden bg-[#fafaf8] text-[#142635] lg:h-screen lg:min-h-[720px]"
    >
      <div className="absolute bottom-[109px] left-1/2 right-0 top-0 hidden bg-[linear-gradient(90deg,#fbfbfa_0%,#eef1f2_32%,#b9c1c5_100%)] lg:block" />

      <div
        className="absolute bottom-[109px] right-0 top-0 hidden w-1/2 opacity-70 lg:block"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.84) 0 2px, transparent 2.2px)",
          backgroundPosition: "10px 10px",
          backgroundSize: "21px 19px",
        }}
      />

      <div
        className="absolute bottom-[-260px] right-[160px] z-0 hidden h-[980px] w-[980px] overflow-hidden rounded-full bg-[#263941] lg:block"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle at -18% -18%, transparent 0%, transparent 42%, rgba(0,0,0,.15) 46%, rgba(0,0,0,.55) 52%, black 58%)",
          maskImage:
            "radial-gradient(circle at -18% -18%, transparent 0%, transparent 42%, rgba(0,0,0,.15) 46%, rgba(0,0,0,.55) 52%, black 58%)",
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 z-30 h-[109px] bg-[#263941] max-lg:h-[92px]" />

      <div className="relative z-10 grid min-h-screen w-full grid-cols-1 px-5 pb-[120px] pt-[118px] sm:px-10 sm:pt-[138px] lg:h-full lg:min-h-[inherit] lg:grid-cols-2 lg:px-0 lg:py-0">
        <div className="flex min-h-0 min-w-0 flex-col justify-center lg:justify-start lg:pl-[340px] lg:pt-[400px]">
          <p className="sr-only">Louise Portfolio</p>

          <h1 className="max-w-full text-[clamp(2.45rem,13vw,3.5rem)] font-black leading-[0.95] tracking-normal text-[#142635] sm:max-w-[560px] sm:text-[56px] lg:text-[60px]">
            Hi, I&apos;m Louise
          </h1>

          <h2 className="mt-2 max-w-full whitespace-normal text-[clamp(1.2rem,6vw,1.7rem)] font-extrabold leading-tight tracking-normal text-[#2f4452] sm:max-w-[560px] sm:text-[27px] lg:whitespace-nowrap">
            Aspiring Software Developer
          </h2>

          <p className="mt-7 max-w-full text-[17px] font-medium leading-[1.45] tracking-normal text-[#233845] sm:max-w-[545px] sm:text-[21px] lg:mt-12">
            Building digital solutions that combine creativity, technology, and
            problem-solving.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-6 lg:mt-16">
            <a
              href="#projects"
              className="rounded-full border-[3px] border-[#18303d] bg-white/70 px-5 py-2.5 text-[16px] font-medium tracking-normal text-[#142635] shadow-[0_1px_0_rgba(255,255,255,0.8)] transition hover:bg-white sm:px-6 sm:text-[20px]"
            >
              View Projects&nbsp; &gt;
            </a>

            <a
              href="#contact"
              className="rounded-full border border-[#172b36] bg-[#344752] px-7 py-3 text-[16px] font-medium tracking-normal text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] transition hover:bg-[#273a45] sm:px-9 sm:text-[20px]"
            >
              Hire Me
            </a>
          </div>
        </div>

        <div className="relative mt-10 flex min-h-0 items-end justify-center lg:mt-0 lg:block">
          <Image
            src="/profile.png"
            alt="Portrait of Louise"
            width={2048}
            height={2048}
            preload
            sizes="(max-width: 1023px) 82vw, 780px"
            className="pointer-events-none relative z-20 h-auto w-[min(82vw,360px)] select-none object-contain grayscale brightness-90 lg:absolute lg:left-[-130px] lg:top-[110px] lg:h-[900px] lg:w-[950px]"
          />
        </div>
      </div>

      <div className="absolute bottom-[24px] left-1/2 z-40 flex w-full max-w-[1180px] -translate-x-1/2 items-center gap-6 px-6 sm:px-10 lg:bottom-[30px] lg:left-[148px] lg:w-auto lg:max-w-none lg:translate-x-0 lg:px-0">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className="grid h-11 w-11 place-items-center rounded-full border-2 border-white text-white transition hover:bg-white hover:text-[#24333a]"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </section>
  );
}

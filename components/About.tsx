import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-[#ececec] lg:h-screen"
    >
      <div
        className="absolute -left-[30vw] top-8 hidden h-[70vw] w-[70vw] rounded-full bg-[#c7cdd0] sm:block lg:-left-[24vw] lg:top-[2vw] lg:h-[58vw] lg:w-[58vw]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.85) 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div
        className="absolute -bottom-[34vw] -right-[30vw] h-[78vw] w-[78vw] rounded-full sm:-right-[24vw] lg:-bottom-[45vw] lg:-right-[19.5vw] lg:h-[62vw] lg:w-[62vw]"
        style={{
          background:
            "linear-gradient(90deg, #e4e7e8 0%, #9ba5ab 45%, #263941 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at 0% 50%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
          maskImage:
            "radial-gradient(circle at 0% 50%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] items-center justify-center px-5 py-24 sm:px-10 lg:h-full lg:min-h-0 lg:px-10 lg:py-0">
        <div className="grid w-full grid-cols-1 items-center gap-10 md:gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="flex justify-center lg:mt-4">
            <div className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden sm:max-w-[380px] md:max-w-[460px] lg:h-[720px] lg:w-[650px] lg:max-w-none">
              <Image
                src="/me.png"
                alt="Louise"
                fill
                priority
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 460px, 50vw"
                className="object-cover object-[center_18%] grayscale"
              />
            </div>
          </div>

          <div className="mx-auto max-w-[560px] text-center lg:mx-0 lg:max-w-[520px] lg:text-left">
            <h2 className="mb-5 text-[clamp(2.2rem,10vw,3.75rem)] font-extrabold leading-tight text-[#344754] lg:mb-8 lg:text-6xl">
              Meet the Developer
            </h2>

            <p className="text-base leading-[1.75] text-[#66737b] sm:text-lg lg:text-xl lg:leading-[1.9]">
              I&apos;m Louise, a Computer Science graduate with a passion for building meaningful and impactful technology. 
              I have experience in web development and machine learning-based systems, which helped me strengthen my problem-solving and system design skills.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

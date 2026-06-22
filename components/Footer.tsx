import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT ME", href: "/about" },
  { label: "PROJECTS", href: "/projects" },
  { label: "CONTACT", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="relative -mt-px overflow-hidden bg-[#233239] px-6 text-white sm:px-10">
      <div
        className="absolute -left-[1rem] top-[0.5rem] h-[28rem] w-[28rem] rounded-full bg-[#40535d]/58"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle at 100% 0%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
          maskImage:
            "radial-gradient(circle at 100% 0%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
        }}
      />
      <div
        className="absolute right-[-21.1rem] top-[-35rem] hidden h-[44vw] w-[44vw] rounded-full bg-[#40535d]/45 lg:block"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle at 100% 0%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
          maskImage:
            "radial-gradient(circle at 100% 0%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-52 w-80 opacity-16"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.28) 1px, transparent 1.3px)",
          backgroundSize: "12px 12px",
        }}
      />

      <div className="relative mx-auto max-w-[1120px] border-t border-white/55">
        <div className="flex flex-col gap-12 py-12 md:flex-row md:items-start md:justify-between md:py-14">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Link
              href="/#home"
              aria-label="Louise home"
              className="grid h-24 w-24 place-items-center md:ml-14"
            >
              <Image
                src="/aw.png"
                alt="Louise Soledad logo"
                width={96}
                height={96}
                className="h-full w-full object-contain"
              />
            </Link>

            <p className="mt-5 max-w-[280px] text-[15px] font-semibold leading-6 text-white">
              Building Digital Solutions Through Code and Creativity
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-col items-center gap-4 text-[14px] font-semibold tracking-normal text-white md:mr-28 md:items-start"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="pb-4 text-center text-xs text-white/82">
          &copy; 2026 Louise Angelo B. Soledad. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
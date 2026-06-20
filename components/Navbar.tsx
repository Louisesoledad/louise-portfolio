"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { label: "HOME", shortLabel: "HOME", href: "/" },
  { label: "ABOUT ME", shortLabel: "ABOUT", href: "/about" },
  { label: "PROJECTS", shortLabel: "WORK", href: "/projects" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50 flex justify-center px-4 pt-5 sm:pt-6">
      <nav className="pointer-events-auto relative flex h-[58px] w-full max-w-[980px] items-center justify-between rounded-full border border-white/55 bg-[#d8d8d7]/82 px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-2px_0_rgba(19,34,45,0.08),0_16px_38px_rgba(20,35,45,0.16)] backdrop-blur-xl sm:px-4">
        <Link
  href="/#home"
  aria-label="Louise home"
  className="grid h-10 w-10 shrink-0 place-items-center transition hover:-translate-y-0.5"
  onClick={() => setIsMenuOpen(false)}
>
          <Image
            src="/logo2.png"
            alt=""
            width={40}
            height={40}
            className="h-full w-full object-contain"
            priority
          />
        </Link>

        <ul className="mx-2 hidden min-w-0 flex-1 items-center justify-center gap-1 text-[12px] font-semibold tracking-normal text-[#122635] sm:mx-5 sm:gap-2 sm:text-[14px] md:flex md:flex-none md:gap-3 md:text-[15px]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex h-10 items-center overflow-hidden rounded-full px-3 transition duration-300 sm:px-5 ${
                    isActive ? "text-white" : "text-[#172b36] hover:text-[#263941]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full bg-[#263941] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_8px_18px_rgba(38,57,65,0.22)]"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}

                  <span className="relative z-10 hidden whitespace-nowrap sm:inline">
                    {link.label}
                  </span>

                  <span className="relative z-10 whitespace-nowrap sm:hidden">
                    {link.shortLabel}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/#contact"
          className="group relative hidden h-10 shrink-0 items-center overflow-hidden rounded-full border border-[#182a35] bg-[#2f414d] px-6 text-[14px] font-semibold tracking-normal text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_18px_rgba(38,57,65,0.18)] transition hover:-translate-y-0.5 hover:bg-[#243641] md:flex"
        >
          <span className="absolute inset-y-0 left-0 w-8 -translate-x-10 skew-x-[-18deg] bg-white/18 transition duration-500 group-hover:translate-x-32" />
          <span className="relative z-10">CONTACT</span>
        </Link>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#263941] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_8px_18px_rgba(38,57,65,0.22)] transition hover:bg-[#1f313b] md:hidden"
        >
          {isMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>

        {isMenuOpen && (
          <div className="absolute left-0 right-0 top-[68px] overflow-hidden rounded-3xl border border-white/55 bg-[#d8d8d7]/95 p-3 text-[#172b36] shadow-[0_18px_38px_rgba(20,35,45,0.18)] backdrop-blur-xl md:hidden">
            <div className="grid gap-1 text-[14px] font-semibold">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsMenuOpen(false)}
                    className={`rounded-2xl px-4 py-3 transition ${
                      isActive
                        ? "bg-[#263941] text-white"
                        : "text-[#172b36] hover:bg-white/45"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <Link
                href="/#contact"
                onClick={() => setIsMenuOpen(false)}
                className="mt-1 rounded-2xl bg-[#2f414d] px-4 py-3 text-white transition hover:bg-[#243641]"
              >
                CONTACT
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

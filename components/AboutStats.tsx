"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 3, display: "03", label: "Projects Built", padded: true },
  { value: 172, display: "170", label: "Git Commits", padded: false },
  { value: 29, display: "29", label: "Tech Stack", padded: false },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      ease: "easeOut" as const,
    },
  },
};

function CountUp({
  target,
  padded,
  duration = 1800,
  trigger,
}: {
  target: number;
  padded: boolean;
  duration?: number;
  trigger: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTime: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setCount(current);
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target, duration]);

  const display = padded ? String(count).padStart(2, "0") : String(count);
  return <>{display}</>;
}

export default function AboutStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full border-y border-[#4C5C68]/60 py-6 sm:py-8 lg:py-10"
    >
      <div className="flex flex-col sm:flex-row items-stretch justify-between w-full">
        {stats.map((stat, index) => (
          <div key={stat.label} className="flex-1 flex items-center justify-center">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
              className="relative flex items-center justify-center w-full py-4 text-center group cursor-default"
            >
              {/* Huge Background Number */}
              <span className="select-none text-[6.5rem] sm:text-[8rem] lg:text-[10rem] font-black leading-none text-[#C5C3C6]/60 tracking-tighter transition-all duration-300 group-hover:scale-105">
                <CountUp
                  target={stat.value}
                  padded={stat.padded}
                  duration={1800}
                  trigger={isInView}
                />
              </span>

              {/* Foreground Label (Centered overlay) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-base sm:text-lg lg:text-xl font-extrabold tracking-wide text-[#36454F] whitespace-nowrap">
                  {stat.label}
                </span>
              </div>
            </motion.div>

            {index < stats.length - 1 && (
              <div className="hidden sm:block w-[1px] h-20 bg-[#4C5C68]/40 self-center" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

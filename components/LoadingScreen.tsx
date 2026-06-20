"use client";

import { useEffect, useState } from "react";

const loadingDuration = 2800;
const exitDuration = 1350;
const completeHoldDuration = 220;
const loadingText = "Louise";
const waveWidth = 1000;
const waveHeight = 260;
const waveSpeed = 0.18;

type LoaderFrame = {
  progress: number;
  phase: number;
};

function createWavePath(progress: number, phase: number, isComplete: boolean) {
  const waveTop = isComplete ? -44 : waveHeight + 18 - (progress / 100) * (waveHeight + 62);
  const amplitude = isComplete ? 0 : 26;
  const waveLength = 160;
  const offset = (phase % waveLength) - waveLength;
  const startX = -waveLength * 2 + offset;
  let path = `M ${startX} ${waveTop}`;

  for (let x = startX; x <= waveWidth + waveLength * 2; x += waveLength) {
    path += ` C ${x + 40} ${waveTop - amplitude}, ${x + 120} ${waveTop + amplitude}, ${
      x + waveLength
    } ${waveTop}`;
  }

  path += ` L ${waveWidth + waveLength * 2} ${waveHeight + 40} L ${startX} ${waveHeight + 40} Z`;
  return path;
}

export default function LoadingScreen() {
  const [loaderFrame, setLoaderFrame] = useState<LoaderFrame>({ progress: 0, phase: 0 });
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const displayProgress = loaderFrame.progress >= 100 ? 100 : Math.max(1, Math.floor(loaderFrame.progress));
  const wavePath = createWavePath(loaderFrame.progress, loaderFrame.phase, isComplete);

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 700 : loadingDuration;
    let animationFrame = 0;
    let completeTimer = 0;
    let exitTimer = 0;
    const startedAt = performance.now();

    root.classList.add("loading-screen-active");

    const animateProgress = (time: number) => {
      const elapsed = time - startedAt;
      const nextProgress = Math.min(100, (elapsed / duration) * 100);

      setLoaderFrame({
        progress: nextProgress,
        phase: elapsed * waveSpeed,
      });

      if (nextProgress < 100) {
        animationFrame = window.requestAnimationFrame(animateProgress);
        return;
      }

      setLoaderFrame({
        progress: 100,
        phase: elapsed * waveSpeed,
      });

      completeTimer = window.setTimeout(
        () => {
          setIsComplete(true);
          exitTimer = window.setTimeout(() => {
            setIsVisible(false);
            root.classList.remove("loading-screen-active");
          }, reduceMotion ? 240 : exitDuration);
        },
        reduceMotion ? 80 : completeHoldDuration,
      );
    };

    animationFrame = window.requestAnimationFrame(animateProgress);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(completeTimer);
      window.clearTimeout(exitTimer);
      root.classList.remove("loading-screen-active");
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      aria-label="Loading portfolio"
      aria-live="polite"
      className={`loading-screen ${isComplete ? "loading-screen-complete" : ""}`}
      role="status"
    >
      
      <div className="loading-word-wrap">
        <span className="sr-only">{loadingText}</span>

        <svg aria-hidden="true" className="loading-word-svg" viewBox={`0 0 ${waveWidth} ${waveHeight}`}>
          <defs>
            <linearGradient id="loading-fill-gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="28%" stopColor="#e4e7e8" />
              <stop offset="58%" stopColor="#9ba5ab" />
              <stop offset="78%" stopColor="#40535d" />
              <stop offset="100%" stopColor="#263941" />
            </linearGradient>

            <mask id="loading-word-mask" maskUnits="userSpaceOnUse">
              <rect fill="black" height={waveHeight} width={waveWidth} x="0" y="0" />
              <text className="loading-svg-text" fill="white" textAnchor="middle" x="500" y="190">
                {loadingText}
              </text>
            </mask>
          </defs>

          <text className="loading-svg-text loading-svg-base" textAnchor="middle" x="500" y="190">
            {loadingText}
          </text>

          <g mask="url(#loading-word-mask)">
            <path className="loading-svg-fill" d={wavePath} />
          </g>
        </svg>

        {!isComplete && (
          <div className="loading-meta">
            <span>loading...</span>
            <span>{displayProgress} %</span>
          </div>
        )}
      </div>
    </div>
  );
}

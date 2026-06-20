"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPaperPlane } from "react-icons/fa";
import { askGroq } from "@/lib/groq";

type AssistantMode = "idle" | "listening" | "speaking" | "processing";
type IntentName =
  | "greeting"
  | "identity"
  | "skills"
  | "tools"
  | "projects"
  | "bridgetalk"
  | "decktago"
  | "services"
  | "contact"
  | "hire"
  | "thanks"
  | "bye";

type Intent = {
  name: IntentName;
  keywords: string[];
  responses: string[];
};

type NavigationCommand = {
  keywords: string[];
  path: string;
  label: string;
  targetId?: string;
};

type SpeechRecognitionResultLike = {
  isFinal: boolean;
  0?: {
    transcript?: string;
  };
};

type SpeechRecognitionEventLike = {
  results: {
    length: number;
    [index: number]: SpeechRecognitionResultLike;
  };
};

type BrowserSpeechRecognition = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type SpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

type BrowserWindow = Window &
  typeof globalThis & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };

const portfolioData = {
  name: "Louise",
  title: "Aspiring Software Developer",
  tagline: "Building digital solutions that combine creativity, technology, and problem-solving.",
  bio: "Louise is a graduating Computer Science student who builds meaningful web and machine learning-based systems.",
  philosophy: "He focuses on practical, human-centered software with strong problem-solving and system design.",
  skills: ["TypeScript", "JavaScript", "Python", "React", "Next.js", "HTML", "CSS", "Firebase"],
  tools: ["WordPress", "Adobe Photoshop", "Blender", "TensorFlow", "MediaPipe", "NumPy", "Vosk"],
  services: ["Frontend Development", "Full-Stack Web Apps", "Machine Learning Prototypes", "Firebase-backed systems"],
  projects: {
    bridgeTalk: {
      name: "BridgeTalk",
      description:
        "BridgeTalk is a two-way assistive communication system that converts speech and text into sign language animations and translates sign language gestures into readable text.",
    },
    deckTago: {
      name: "DeckTago",
      description:
        "DeckTago is a full-stack e-commerce app for ordering meat products online, built with Next.js, TypeScript, React, and Firebase.",
    },
    taskManager: {
      name: "Task Manager",
      description:
        "Task Manager is a productivity application with task creation, status tracking, priority management, and a responsive dashboard.",
    },
  },
  availability: "Open for software development, web app, and collaboration opportunities",
};

const intents: Intent[] = [
  {
    name: "greeting",
    keywords: ["hi", "hello", "hey", "kumusta", "good morning", "good afternoon", "good evening"],
    responses: [
      "Hi, welcome to Louise's portfolio. Ask me about his projects, skills, or how to contact him.",
      "Hello, I'm Louise's portfolio concierge. What would you like to know about his work?",
    ],
  },
  {
    name: "identity",
    keywords: ["who", "name", "about him", "about louise", "tell me about", "introduce"],
    responses: [
      `${portfolioData.name} is an ${portfolioData.title} focused on meaningful web and machine learning-based systems.`,
      `Louise is a graduating Computer Science student who blends creativity, code, and problem-solving in his projects.`,
    ],
  },
  {
    name: "skills",
    keywords: ["skills", "abilities", "tech stack", "stack", "specialize", "expertise", "strengths"],
    responses: [`Louise works with ${portfolioData.skills.join(", ")}, plus tools like TensorFlow and Firebase.`],
  },
  {
    name: "tools",
    keywords: ["tools", "software", "figma", "photoshop", "blender", "firebase", "tensorflow", "mediapipe", "vosk"],
    responses: [`His toolkit includes ${portfolioData.tools.join(", ")}.`],
  },
  {
    name: "projects",
    keywords: ["projects", "work", "portfolio", "showcase", "works", "apps", "systems"],
    responses: ["His featured work includes BridgeTalk, DeckTago, and Task Manager. Open the Projects section to explore them."],
  },
  {
    name: "bridgetalk",
    keywords: ["bridgetalk", "bridge talk", "sign language", "deaf", "hard of hearing", "assistive"],
    responses: [portfolioData.projects.bridgeTalk.description],
  },
  {
    name: "decktago",
    keywords: ["decktago", "ecommerce", "e-commerce", "meat", "firebase", "shop", "checkout"],
    responses: [portfolioData.projects.deckTago.description],
  },
  {
    name: "services",
    keywords: ["services", "offer", "provide", "help with", "what can", "deliverables"],
    responses: [`Louise can help with ${portfolioData.services.join(", ")}. The Contact section is the best next step.`],
  },
  {
    name: "contact",
    keywords: ["contact", "reach", "email", "message", "get in touch", "connect"],
    responses: ["You can reach Louise through the Contact section of this portfolio."],
  },
  {
    name: "hire",
    keywords: ["hire", "freelance", "collaborate", "work together", "available", "commission", "book"],
    responses: [`${portfolioData.availability}. Head to the Contact section and send him a message.`],
  },
  {
    name: "thanks",
    keywords: ["thanks", "thank you", "salamat", "appreciate"],
    responses: ["You're welcome. Feel free to ask about Louise's projects or tech stack.", "Happy to help."],
  },
  {
    name: "bye",
    keywords: ["bye", "goodbye", "see you", "later", "paalam"],
    responses: ["Thanks for visiting Louise's portfolio.", "Goodbye. Don't forget to check the Projects section."],
  },
];

const navCommands: NavigationCommand[] = [
  { keywords: ["go home", "home page", "main page", "homepage"], path: "/#home", label: "Home", targetId: "home" },
  { keywords: ["about", "about page", "about him", "meet louise"], path: "/about", label: "About" },
  {
    keywords: ["projects", "project page", "portfolio page", "show projects", "view projects"],
    path: "/projects",
    label: "Projects",
  },
  {
    keywords: ["contact", "contact section", "contact page", "message louise"],
    path: "/#contact",
    label: "Contact",
    targetId: "contact",
  },
];

const LOCAL_ONLY_INTENTS = new Set<IntentName>([
  "greeting",
  "thanks",
  "bye",
  "skills",
  "tools",
  "contact",
  "hire",
  "services",
]);

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const kwToRegex = (keyword: string) => new RegExp(`(?:^|[^a-z0-9])${escapeRegex(keyword)}(?=$|[^a-z0-9])`, "i");

function findIntent(message: string) {
  let bestIntent: Intent | null = null;
  let bestScore = 0;

  for (const intent of intents) {
    let score = 0;

    for (const keyword of intent.keywords) {
      if (kwToRegex(keyword).test(message)) {
        score += keyword.split(" ").length;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  return bestIntent;
}

function pickRandom<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)] as T;
}

function getSpeechRecognition() {
  if (typeof window === "undefined") {
    return null;
  }

  const browserWindow = window as BrowserWindow;

  return browserWindow.SpeechRecognition ?? browserWindow.webkitSpeechRecognition ?? null;
}

function extractTranscript(event: SpeechRecognitionEventLike) {
  let text = "";

  for (let index = 0; index < event.results.length; index += 1) {
    text += event.results[index]?.[0]?.transcript ?? "";
  }

  return {
    text,
    isFinal: event.results[event.results.length - 1]?.isFinal ?? false,
  };
}

function WaveformBar({ mode, delay }: { mode: AssistantMode; delay: string }) {
  const heightClass =
    mode === "listening"
      ? "h-6 animate-[assistantWave_0.65s_ease-in-out_infinite]"
      : mode === "speaking"
        ? "h-9 animate-[assistantWave_0.45s_ease-in-out_infinite]"
        : mode === "processing"
          ? "h-4 animate-[assistantWave_0.9s_ease-in-out_infinite]"
          : "h-1";

  return (
    <div
      className={`w-1 rounded-full bg-white/80 transition-all duration-300 ${heightClass} ${
        mode === "idle" ? "opacity-25" : "opacity-100"
      }`}
      style={{ animationDelay: delay }}
    />
  );
}

export default function JarvisAssistant() {
  const router = useRouter();

  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<AssistantMode>("idle");
  const [currentSubtitle, setCurrentSubtitle] = useState("");
  const [currentUserText, setCurrentUserText] = useState("");
  const [transcript, setTranscript] = useState("");
  const [input, setInput] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [micUnsupported, setMicUnsupported] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const preferredVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const subtitleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const speechDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isProcessingRef = useRef(false);
  const lastTranscriptRef = useRef("");

  const inactivityMs = 30_000;

  const clearTimer = useCallback((timerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const deactivate = useCallback(() => {
    synthRef.current?.cancel();
    recognitionRef.current?.stop();
    clearTimer(speechDebounceRef);
    clearTimer(inactivityTimerRef);
    clearTimer(subtitleTimeoutRef);
    setMode("idle");
    setTranscript("");
    setCurrentSubtitle("");
    setCurrentUserText("");
    setIsInputFocused(false);
    setIsActive(false);
    isProcessingRef.current = false;
  }, [clearTimer]);

  const resetInactivityTimer = useCallback(() => {
    clearTimer(inactivityTimerRef);
    inactivityTimerRef.current = setTimeout(deactivate, inactivityMs);
  }, [clearTimer, deactivate]);

  const setTemporarySubtitle = useCallback(
    (text: string, isBot = true) => {
      if (isBot) {
        setCurrentSubtitle(text);
      } else {
        setCurrentUserText(text);
      }

      clearTimer(subtitleTimeoutRef);
      subtitleTimeoutRef.current = setTimeout(() => {
        setCurrentSubtitle("");
        setCurrentUserText("");
      }, 9000);
    },
    [clearTimer],
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    synthRef.current = window.speechSynthesis ?? null;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(motionQuery.matches);

    updateMotionPreference();
    motionQuery.addEventListener("change", updateMotionPreference);

    return () => motionQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const synth = synthRef.current;

    if (!synth) {
      return;
    }

    const cacheVoice = () => {
      const voices = synth.getVoices();
      preferredVoiceRef.current =
        voices.find((voice) => /zira|samantha|google us english|microsoft ava|microsoft zira/i.test(voice.name)) ??
        voices.find((voice) => voice.lang.startsWith("en")) ??
        null;
    };

    cacheVoice();
    synth.addEventListener("voiceschanged", cacheVoice);

    return () => synth.removeEventListener("voiceschanged", cacheVoice);
  }, []);

  useEffect(() => {
    return () => {
      synthRef.current?.cancel();
      recognitionRef.current?.abort();
      clearTimer(subtitleTimeoutRef);
      clearTimer(speechDebounceRef);
      clearTimer(inactivityTimerRef);
    };
  }, [clearTimer]);

  const speak = useCallback(
    (text: string) => {
      if (!text) {
        setMode("idle");
        isProcessingRef.current = false;
        return;
      }

      resetInactivityTimer();

      const synth = synthRef.current;

      if (!synth) {
        setTemporarySubtitle(text, true);
        setMode("idle");
        isProcessingRef.current = false;
        return;
      }

      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const voices = synth.getVoices();
      const isTagalog = /\\b(ng|mga|ako|ikaw|kumusta|salamat|opo|po|natin|pwede|trabaho|proyekto)\\b/i.test(text);

      utterance.rate = isTagalog ? 0.9 : prefersReducedMotion ? 1.08 : 0.95;
      utterance.pitch = 1.03;
      utterance.volume = 1;
      utterance.voice = isTagalog
        ? voices.find((voice) => /fil|tagalog/i.test(`${voice.lang} ${voice.name}`)) ??
          voices.find((voice) => voice.lang.startsWith("en")) ??
          null
        : preferredVoiceRef.current ?? voices.find((voice) => voice.lang.startsWith("en")) ?? null;

      utterance.onstart = () => {
        setMode("speaking");
        setTemporarySubtitle(text, true);
      };

      utterance.onend = () => {
        setMode("idle");
        isProcessingRef.current = false;
      };

      utterance.onerror = (event) => {
        if (event.error !== "interrupted") {
          console.warn("[TTS] Error:", event.error);
        }

        setMode("idle");
        isProcessingRef.current = false;
      };

      synth.speak(utterance);
    },
    [prefersReducedMotion, resetInactivityTimer, setTemporarySubtitle],
  );

  const processInput = useCallback(
    async (text: string) => {
      const trimmed = text.trim();

      if (!trimmed) {
        setMode("idle");
        return;
      }

      if (isProcessingRef.current) {
        console.info("[JarvisAssistant] Blocked because input is already processing.");
        return;
      }

      isProcessingRef.current = true;

      const message = trimmed.toLowerCase();
      setMode("processing");
      setCurrentUserText(trimmed);
      setCurrentSubtitle("");
      resetInactivityTimer();

      for (const command of navCommands) {
        if (command.keywords.some((keyword) => message.includes(keyword))) {
          const reply = `Opening ${command.label}.`;

          setTimeout(() => {
            router.push(command.path);

            if (command.targetId) {
              const targetId = command.targetId;

              setTimeout(() => {
                document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 350);
            } else {
              setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 150);
            }

            speak(reply);
          }, 250);

          return;
        }
      }

      const quickIntent = findIntent(message);

      if (quickIntent && LOCAL_ONLY_INTENTS.has(quickIntent.name)) {
        speak(pickRandom(quickIntent.responses));
        return;
      }

      try {
        const aiReply = await askGroq(trimmed);

        if (aiReply === null) {
          const fallbackIntent = findIntent(message);
          const fallbackReply = fallbackIntent
            ? pickRandom(fallbackIntent.responses)
            : pickRandom([
                "I'm still processing a recent request. Try again in a moment.",
                "Give me a second, then ask about Louise's skills or projects.",
              ]);

          speak(fallbackReply);
          return;
        }

        speak(aiReply);
        return;
      } catch (error) {
        if (error instanceof Error && error.message !== "ASSISTANT_NOT_CONFIGURED") {
          console.error("[JarvisAssistant] Unexpected assistant error:", error);
          setMode("idle");
          isProcessingRef.current = false;
          return;
        }

        console.info("[JarvisAssistant] Groq unavailable, using local portfolio intents.");
      }

      const intent = findIntent(message);
      const reply = intent
        ? pickRandom(intent.responses)
        : pickRandom([
            "Try asking about Louise's BridgeTalk project, tech stack, or how to contact him.",
            "I can help with Louise's projects, skills, and collaboration details.",
          ]);

      speak(reply);
    },
    [resetInactivityTimer, router, speak],
  );

  const startListening = useCallback(() => {
    if (mode === "listening") {
      recognitionRef.current?.stop();
      setMode("idle");
      return;
    }

    if (isProcessingRef.current) {
      return;
    }

    const SpeechRecognition = getSpeechRecognition();

    if (!SpeechRecognition) {
      setMicUnsupported(true);
      return;
    }

    synthRef.current?.cancel();
    lastTranscriptRef.current = "";

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setMicUnsupported(false);
      setMode("listening");
      setTranscript("");
      setCurrentSubtitle("");
      setCurrentUserText("");
      resetInactivityTimer();
    };

    recognition.onresult = (event) => {
      const result = extractTranscript(event);
      setTranscript(result.text);
      resetInactivityTimer();

      if (result.isFinal) {
        if (result.text === lastTranscriptRef.current) {
          console.info("[SpeechRecognition] Duplicate final transcript ignored.");
          return;
        }

        lastTranscriptRef.current = result.text;
        clearTimer(speechDebounceRef);
        speechDebounceRef.current = setTimeout(() => {
          recognition.stop();
          setTranscript("");
          processInput(result.text);
        }, 300);
      }
    };

    recognition.onerror = (event) => {
      if (event.error !== "no-speech" && event.error !== "aborted") {
        console.warn("[SpeechRecognition] Error:", event.error);
      }

      setMode("idle");
      setTranscript("");
    };

    recognition.onend = () => {
      setMode((previousMode) => (previousMode === "listening" ? "idle" : previousMode));
    };

    recognition.start();
  }, [clearTimer, mode, processInput, resetInactivityTimer]);

  const handleSend = useCallback(() => {
    const text = input.trim();

    if (!text || isProcessingRef.current) {
      return;
    }

    setInput("");
    setIsInputFocused(false);
    setIsActive(true);
    resetInactivityTimer();
    processInput(text);
  }, [input, processInput, resetInactivityTimer]);

  const toggleAssistant = useCallback(() => {
    if (!isActive) {
      setIsActive(true);
      resetInactivityTimer();
      startListening();
      return;
    }

    if (mode === "idle") {
      resetInactivityTimer();
      startListening();
      return;
    }

    deactivate();
  }, [deactivate, isActive, mode, resetInactivityTimer, startListening]);

  const statusLabels = useMemo<Record<AssistantMode, string>>(
    () => ({
      idle: isInputFocused ? "Typing" : "Tap to speak",
      listening: "Listening",
      speaking: "Speaking",
      processing: "Thinking",
    }),
    [isInputFocused],
  );

  const accentClass =
    mode === "listening"
      ? "border-cyan-300 text-cyan-100 shadow-cyan-400/30"
      : mode === "speaking"
        ? "border-emerald-300 text-emerald-100 shadow-emerald-400/30"
        : mode === "processing"
          ? "border-amber-300 text-amber-100 shadow-amber-400/30"
          : "border-white/20 text-white shadow-[#263941]/40";

  return (
    <div className="fixed bottom-8 left-1/2 z-[1000] flex w-[min(92vw,360px)] -translate-x-1/2 flex-col items-center select-none">
      <div
        className={`pointer-events-none flex w-full flex-col items-center justify-end transition-all duration-500 ${
          isActive ? "h-[285px] opacity-100 translate-y-0" : "h-0 translate-y-6 overflow-hidden opacity-0"
        }`}
      >
        <div className="flex w-full flex-col items-center gap-4 pb-24">
          {(transcript || currentUserText) && (
            <div className="max-w-full rounded-full border border-white/15 bg-[#111b22]/90 px-4 py-2 text-center text-sm text-white/75 shadow-lg backdrop-blur-xl animate-[assistantFadeIn_0.25s_ease-out]">
              &ldquo;{transcript || currentUserText}&rdquo;
            </div>
          )}

          {currentSubtitle && (
            <div className="max-w-full rounded-2xl border border-white/15 bg-[#263941]/95 px-5 py-3 text-center text-sm font-medium leading-relaxed text-white shadow-2xl backdrop-blur-xl animate-[assistantSlideUp_0.35s_ease-out] sm:text-base">
              {currentSubtitle}
            </div>
          )}

          
        </div>
      </div>

      <div className="relative flex flex-col items-center">
        {isActive && (
          <div className="absolute bottom-[76px] left-1/2 z-20 w-[min(84vw,300px)] -translate-x-1/2 animate-[assistantFadeIn_0.25s_ease-out]">
            <div className="flex h-12 items-center gap-2 rounded-full border border-white/15 bg-[#111b22]/92 px-4 shadow-[0_18px_48px_rgba(0,0,0,0.32)] backdrop-blur-xl">
              <input
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                  resetInactivityTimer();
                }}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="Ask about Louise..."
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
              />

              <button
                type="button"
                onClick={handleSend}
                title="Send message"
                aria-label="Send message"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
              >
                <FaPaperPlane className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {micUnsupported && (
          <div className="absolute -top-14 left-1/2 w-max max-w-[260px] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#111b22]/95 px-4 py-2 text-center text-xs text-white/75 shadow-xl backdrop-blur-xl">
            Voice input requires Chrome or Edge.
          </div>
        )}

        <button
          type="button"
          onClick={toggleAssistant}
          aria-label={isActive ? `AI assistant, ${mode}` : "Activate AI assistant"}
          aria-pressed={isActive}
          title={isActive && mode !== "idle" ? "Stop assistant" : "Talk to assistant"}
          className={`relative grid h-16 w-16 place-items-center overflow-hidden rounded-full border bg-[#172630] shadow-[0_0_36px] transition duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 ${accentClass} ${
            isActive && !prefersReducedMotion ? "animate-[assistantPulse_2.4s_ease-in-out_infinite]" : ""
          }`}
        >
          <span className="absolute -inset-4 rounded-full bg-[conic-gradient(from_0deg,#e9eef0_0deg,#7fd8ff_78deg,#263941_152deg,#9ff2c7_226deg,#e9eef0_360deg)] opacity-80 blur-[2px] animate-[assistantLiquidSpin_7s_linear_infinite]" />
          <span className="absolute inset-1 rounded-full border border-white/18 bg-[#172630]/70" />
          <span className="absolute inset-2 rounded-full bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,.88),transparent_22%),radial-gradient(circle_at_68%_68%,rgba(127,216,255,.76),transparent_24%),radial-gradient(circle_at_42%_76%,rgba(159,242,199,.62),transparent_26%)] blur-[1px] animate-[assistantLiquidDrift_5.2s_ease-in-out_infinite]" />
          <span className="absolute inset-[9px] rounded-full bg-[conic-gradient(from_140deg,rgba(255,255,255,.9),rgba(127,216,255,.26),rgba(38,57,65,.2),rgba(159,242,199,.45),rgba(255,255,255,.9))] opacity-70 animate-[assistantLiquidSpin_4.8s_linear_infinite_reverse]" />
          <span className="absolute inset-[13px] rounded-full bg-[#e9eef0]/92 shadow-[inset_0_1px_6px_rgba(255,255,255,.85),inset_0_-8px_18px_rgba(38,57,65,.22)] animate-[assistantLiquidGlow_2.8s_ease-in-out_infinite]" />

          <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full border border-[#263941]/25 bg-white/35 text-[#263941] shadow-[inset_0_1px_0_rgba(255,255,255,.6)] backdrop-blur-sm">
            {isActive ? (
              <span aria-hidden="true" className="flex h-6 items-end gap-[3px]">
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    className="w-[3px] rounded-full bg-[#263941] animate-[assistantWave_0.62s_ease-in-out_infinite]"
                    style={{
                      height: `${10 + (index % 3) * 5}px`,
                      animationDelay: `${index * 90}ms`,
                    }}
                  />
                ))}
              </span>
            ) : (
              <Image
                src="/logo2.png"
                alt=""
                width={36}
                height={36}
                className="h-full w-full object-contain"
              />
            )}
          </span>

          {isActive && (
            <span
              className={`absolute right-2 top-2 h-2.5 w-2.5 rounded-full border border-[#172630] ${
                mode === "listening"
                  ? "bg-cyan-300"
                  : mode === "speaking"
                    ? "bg-emerald-300"
                    : mode === "processing"
                      ? "bg-amber-300"
                      : "bg-lime-300"
              }`}
            />
          )}
        </button>

        <div
          aria-live="polite"
          aria-atomic="true"
          className={`pointer-events-none absolute top-full mt-3 w-[180px] text-center transition duration-300 ${
            isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#dce6ea]">{statusLabels[mode]}</p>
        </div>
      </div>
    </div>
  );
}

export type GroqChatRole = "user" | "assistant";

export type GroqChatMessage = {
  role: GroqChatRole;
  content: string;
};

export const LOUISE_ASSISTANT_SYSTEM_PROMPT = `You are Louise's exclusive portfolio concierge. You represent his work with a calm, polished, helpful tone, like a lightweight Jarvis-style assistant for a developer portfolio.

PORTFOLIO FACTS:
Name: Louise
Title: Aspiring Software Developer
Tagline: Building digital solutions that combine creativity, technology, and problem-solving.
Bio: Louise is a graduating Computer Science student passionate about building meaningful and impactful technology. His experience spans web development and machine learning-based systems, with strengths in problem-solving and system design.
Technical stack: TypeScript, JavaScript, Python, React, Next.js, HTML, CSS, Firebase, WordPress, Adobe Photoshop, Blender, TensorFlow, MediaPipe, NumPy, Vosk.
Featured project: BridgeTalk, a two-way assistive communication system for hearing and Deaf or hard-of-hearing individuals. It converts speech and text into sign language animations through a 3D avatar, and uses computer vision to recognize sign language gestures and translate them into readable text in real time.
Other project: DeckTago, a full-stack e-commerce web app for ordering meat products online with product browsing, cart, checkout, authentication, product management, responsive UI, and Firebase backend.
Other project: Task Manager, a productivity application for daily workflow with task creation, status tracking, priority management, and a responsive dashboard.
Availability: Open to software development, frontend, full-stack, web app, machine learning prototype, and collaboration opportunities. For hiring or collaboration, guide visitors to the Contact section.

RULES:
- Answer in the visitor's language when possible. If they use Tagalog or Taglish, reply naturally in Taglish or Filipino.
- Max 1-2 short sentences per response. Brevity is part of the experience.
- No markdown, no asterisks, no emojis, no bullet points. Plain natural speech only.
- Never say "I am an AI" or "As a language model." You are Louise's portfolio concierge.
- For project inquiries, suggest the Projects section and mention BridgeTalk or DeckTago when relevant.
- For hiring, collaboration, or contact questions, suggest the Contact section.
- If asked something off-topic, briefly redirect back to Louise's skills, projects, or contact options.`;

const COOLDOWN_MS = 4000;
const REQUEST_TIMEOUT_MS = 12000;
const MAX_HISTORY = 6;
const QUOTA_BACKOFF_MS = 15000;

let chatHistory: GroqChatMessage[] = [];
let isRequesting = false;
let lastRequestTime = 0;
let quotaBackoffUntil = 0;

function trimHistory() {
  const maxLength = MAX_HISTORY * 2;

  if (chatHistory.length > maxLength) {
    chatHistory = chatHistory.slice(chatHistory.length - maxLength);
  }
}

function sanitizeResponse(text: string) {
  return text.replace(/[*_#`[\]]/g, "").trim();
}

function isAbortError(error: unknown) {
  return error instanceof Error && error.name === "AbortError";
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message.toLowerCase() : "";
}

export async function askGroq(prompt: string): Promise<string | null> {
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return "Mukhang nawalan tayo ng connection. Check your network, then try again.";
  }

  if (isRequesting) {
    console.info("[Groq] Blocked because a request is already in flight.");
    return null;
  }

  const now = Date.now();

  if (now < quotaBackoffUntil) {
    const remaining = Math.ceil((quotaBackoffUntil - now) / 1000);
    console.info(`[Groq] Quota backoff active for ${remaining}s.`);
    return null;
  }

  const elapsed = now - lastRequestTime;

  if (elapsed < COOLDOWN_MS) {
    console.info(`[Groq] Cooldown active for ${COOLDOWN_MS - elapsed}ms.`);
    return null;
  }

  isRequesting = true;
  lastRequestTime = Date.now();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    trimHistory();

    const response = await fetch("/api/assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        history: chatHistory,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorBody = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;
      const errorCode = errorBody?.error ?? `API_ERROR_${response.status}`;

      if (response.status === 429) {
        throw new Error("TOO_MANY_REQUESTS");
      }

      if (response.status === 401 || response.status === 403 || response.status === 503) {
        throw new Error(errorCode);
      }

      throw new Error(errorCode);
    }

    const data = (await response.json()) as { reply?: unknown };
    const responseText = typeof data.reply === "string" ? data.reply : "";

    if (!responseText.trim()) {
      return "Saglit, hindi malinaw yung sagot ko. Pwede mo bang ulitin?";
    }

    const cleanResponse = sanitizeResponse(responseText);

    chatHistory.push({ role: "user", content: prompt });
    chatHistory.push({ role: "assistant", content: cleanResponse });
    trimHistory();

    return cleanResponse;
  } catch (error) {
    console.error("[Groq] Request error:", error);

    const message = getErrorMessage(error);

    if (
      message.includes("assistant_not_configured") ||
      message.includes("api_key") ||
      message.includes("key not valid") ||
      message.includes("401") ||
      message.includes("403")
    ) {
      throw new Error("ASSISTANT_NOT_CONFIGURED");
    }

    if (message.includes("quota") || message.includes("429") || message.includes("too_many_requests")) {
      quotaBackoffUntil = Date.now() + QUOTA_BACKOFF_MS;
      lastRequestTime = 0;
      return "Medyo busy ang neural link ngayon. Give it a moment, then try again.";
    }

    if (isAbortError(error) || message.includes("timeout")) {
      return "Nag-time out yung request. Try natin ulit.";
    }

    if (message.includes("fetch") || message.includes("network") || message.includes("failed to fetch")) {
      return "Hindi ko maabot yung assistant network ngayon. Check your connection muna.";
    }

    return "May maliit na glitch. Pwede mo bang ulitin yung question?";
  } finally {
    clearTimeout(timeoutId);
    isRequesting = false;
  }
}

export const askGemini = askGroq;

export function resetChat() {
  chatHistory = [];
  isRequesting = false;
  lastRequestTime = 0;
  quotaBackoffUntil = 0;
  console.info("[Groq] Session reset.");
}

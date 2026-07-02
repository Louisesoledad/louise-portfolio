export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  heroImage: string;
  screenshots: string[];
  features: string[];
  techStack: string[];
  githubUrl?: string;
  websiteUrl?: string;
}

export const projects: Project[] = [
  {
    id: "bridgetalk",
    title: "BridgeTalk",
    shortDescription:
      "A two-way assistive communication system that bridges the gap between hearing and Deaf individuals using AI-powered sign language recognition and 3D avatar animation.",
    heroImage: "/projects/bridgetalk/1.webp",
    screenshots: [
      "/projects/bridgetalk/1.webp",
      "/projects/bridgetalk/2.webp",
      "/projects/bridgetalk/3.webp",
      "/projects/bridgetalk/4.webp",
      "/projects/bridgetalk/5.webp",
      "/projects/bridgetalk/6.webp",
      "/projects/bridgetalk/7.webp",
    ],
    features: [
      "Real-time sign language gesture recognition",
      "Speech-to-sign translation via 3D avatar",
      "Offline processing — no internet required",
      "Computer vision hand and body tracking",
      "Two-way bidirectional communication",
      "Accessible design for Deaf and hearing users",
    ],
    techStack: [
      "Python", 
      "TensorFlow", 
      "MediaPipe", 
      "OpenCV", 
      "NumPy", 
      "Vosk", 
      "Blender",
      "PyQt5",
      "Transformer",
    ],
    githubUrl: "https://github.com/Louisesoledad/BridgeTalk",
  },
  {
    id: "decktago",
    title: "DeckTago",
    shortDescription:
      "A full-stack e-commerce web application for ordering meat products online, featuring a responsive shopping experience, cart management, and a Firebase-powered real-time backend.",
    heroImage: "/projects/decktago/1.webp",
    screenshots: [
      "/projects/decktago/1.webp",
      "/projects/decktago/2.webp",
      "/projects/decktago/3.webp",
      "/projects/decktago/4.webp",
      "/projects/decktago/5.webp",
      "/projects/decktago/6.webp",
      "/projects/decktago/7.webp",
      "/projects/decktago/8.webp",
      "/projects/decktago/9.webp",
      "/projects/decktago/10.webp",
    ],
    features: [
      "Online meat product marketplace",
      "Customer authentication with Firebase Auth",
      "Persistent cart and checkout system",
      "Product management for admins",
      "Responsive mobile-friendly interface",
      "Real-time data with Firebase Firestore",
    ],
    techStack: [
      "Next.js", 
      "React", 
      "TypeScript", 
      "Firebase Firestore",
      "Firebase Auth", 
      "Tailwind CSS", 
      "Vercel"],
    websiteUrl: "https://decktago-vert.vercel.app",
  },
  {
    id: "inventory",
    title: "DeckTaGo Inventory System",
    shortDescription:
      "A barcode-based inventory and sales management system for real-time stock tracking, weight-based product monitoring, role-based dashboards, and automated FIFO inventory deductions.",
    heroImage: "/projects/inventory/1.webp",
    screenshots: [
      "/projects/inventory/1.webp",
      "/projects/inventory/2.webp",
      "/projects/inventory/3.webp",
      "/projects/inventory/4.webp",
      "/projects/inventory/5.webp",
      "/projects/inventory/6.webp",
      "/projects/inventory/7.webp",
      "/projects/inventory/8.webp",
      "/projects/inventory/9.webp",
      "/projects/inventory/10.webp",
      "/projects/inventory/11.webp",
    ],
    features: [
      "Barcode scanning for stock intake and sales",
      "Weight-based inventory tracking in kilograms",
      "Role-based dashboards for Owner, Encoder, and Sales",
      "Automated FIFO batch deduction engine",
      "Sales analytics dashboard with Recharts",
      "Smart low-stock and expiration notifications",
      "Real-time sync across all active clients",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Firebase Firestore",
      "Firebase Auth",
      "Tailwind CSS",
      "shadcn/ui",
      "Zustand",
      "Recharts",
      "jsbarcode",
      "Vercel",
    ],
    websiteUrl: "https://deckta-inventory-sales.vercel.app",
  },
];

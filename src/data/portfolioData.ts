import { ProfileData, Project, Service, Metric, SkillItem } from '../types/portfolio';

export const profileData: ProfileData = {
  name: "Chamindu Moramudali",
  preferredName: "Chamindu",
  legalName: "Chamindu Moramudali",
  avatarUrl: "/chamindu.jpg",
  title: "Software Engineer // React, React Native & AI Forensics",
  roleDescription: "Engineering modern React frontend architectures, cross-platform React Native mobile applications, autonomous n8n workflows, and deep learning steganography detection (Cybervali).",
  tagline: "Building scalable React frontend architectures, cross-platform React Native mobile applications, and neural steganography forensics (Cybervali).",
  availability: "AVAILABLE FOR COMMISSIONS & FULL-TIME ROLES",
  location: "Colombo, Sri Lanka",
  coordinates: "6.9271° N, 79.8612° E",
  timezone: "UTC+5:30",
  email: "janithramoramudali@gmail.com",
  studentEmail: "janithramoramudali@gmail.com",
  university: "IIT / University of Westminster (UK)",
  degree: "BEng (Hons) Software Engineering | MSc in Cyber Security & Digital Forensics (Reading)",
  bioParagraphs: [
    "Hello! 👋 I'm Chamindu, a software engineer from Sri Lanka specializing in frontend web engineering with React, cross-platform mobile application development with React Native, and deep learning forensics with Cybervali.",
    "For all web frontend systems, I architect high-velocity, component-driven interfaces using React and TypeScript. For mobile experiences, I build native-grade, fluid iOS and Android applications with React Native and Expo. In parallel, I research forensic steganography detection using Multi-Task & Transfer Learning and construct enterprise automation with n8n.",
    "Having graduated with a BEng (Hons) in Software Engineering from Informatics Institute of Technology (IIT) in partnership with the University of Westminster (UK), I am currently pursuing my Master's (MSc) in Cyber Security & Digital Forensics, fusing software engineering with advanced forensic intelligence."
  ],
  socials: [
    {
      platform: "GitHub",
      url: "https://github.com/chamindumo",
      handle: "@chamindumo"
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/chamindu-moramudali-827585225/",
      handle: "chamindu-moramudali"
    },
    {
      platform: "Email",
      url: "mailto:janithramoramudali@gmail.com",
      handle: "janithramoramudali@gmail.com"
    }
  ]
};

export const featuredProjects: Project[] = [
  {
    id: "checkin-label-mobile",
    number: "01",
    title: "CheckIn & Label Pass Mobile",
    subtitle: "React Native Check-In / Check-Out & Automated Label Generation App",
    category: "Mobile Application / React Native & IoT",
    year: "2026",
    summary: "Cross-platform iOS and Android mobile app built with React Native for fast user check-in, check-out, and instantaneous identification label generation.",
    description: "Architected and developed a React Native mobile application for user entry/exit tracking and automated badge/label generation. Features camera QR-code scanning, one-tap check-in and check-out, instant QR identification label printing, offline-first verification caching, and real-time cloud attendance logging.",
    metrics: [
      { label: "Check-In Speed", value: "<1.2s" },
      { label: "Label Generation", value: "Instant" },
      { label: "Framework", value: "React Native" }
    ],
    technologies: [
      { name: "React Native", color: "#61DAFB" },
      { name: "Expo", color: "#000000" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "QR & Labels", color: "#00d8ff" },
      { name: "Firebase", color: "#FFCA28" },
      { name: "React Navigation", color: "#6B52AE" },
      { name: "NativeWind", color: "#06B6D4" }
    ],
    liveUrl: "https://github.com/chamindumo",
    githubUrl: "https://github.com/chamindumo",
    desktopScreenshots: [
      {
        title: "Mobile App Simulator - Check-In Terminal",
        url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
        caption: "React Native mobile client with live camera QR scanner and instant user status verification"
      },
      {
        title: "Automated Label Badge Dispatch",
        url: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=1200&q=80",
        caption: "Dynamic identification label generation with QR code, user credential badges, and entry timestamp"
      }
    ],
    mobileScreenshots: [
      {
        title: "User Check-In Pass",
        url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
        caption: "Instant digital badge and printable identification label with custom QR code"
      },
      {
        title: "Check-Out Verification",
        url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
        caption: "One-tap departure scanner with automated status logging and departure confirmation"
      }
    ]
  },
  {
    id: "cybervali-stego",
    number: "02",
    title: "Cybervali",
    subtitle: "Deep Steganography Detection via Multi-Task & Transfer Learning",
    category: "AI & Cybersecurity / Deep Forensics",
    year: "2025 - 2026",
    summary: "AI forensic steganography detection system featuring a React web analysis dashboard and deep multi-task neural architectures to identify hidden payloads.",
    description: "Researched and engineered an advanced steganographic payload detector with a modern React forensic analysis frontend. Leveraged transfer learning from deep vision backbones (EfficientNet/ResNet) and custom residual spatial feature extractors with a multi-task learning framework to simultaneously classify clean vs stego media, identify embedding algorithms (LSB, WOW, S-UNIWARD), and predict payload density with 98.4% detection accuracy.",
    metrics: [
      { label: "Detection Accuracy", value: "98.4%" },
      { label: "Frontend", value: "React & TS" },
      { label: "Architecture", value: "Multi-Task CNN" }
    ],
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Python", color: "#3776AB" },
      { name: "PyTorch", color: "#EE4C2C" },
      { name: "Transfer Learning", color: "#00d8ff" },
      { name: "Multi-Task Learning", color: "#a855f7" },
      { name: "FastAPI", color: "#009688" }
    ],
    liveUrl: "https://github.com/chamindumo/Cybervali",
    githubUrl: "https://github.com/chamindumo/Cybervali",
    desktopScreenshots: [
      {
        title: "React Forensics Dashboard",
        url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
        caption: "React forensic web console displaying multi-task classification outputs"
      },
      {
        title: "Spatial Residual Heatmap",
        url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        caption: "React Canvas visualization identifying high-frequency noise perturbation across pixel blocks"
      }
    ],
    mobileScreenshots: [
      {
        title: "Forensics Telemetry",
        url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80",
        caption: "Mobile-optimized payload inspection report"
      }
    ]
  },
  {
    id: "medidiet-manager",
    number: "03",
    title: "MediDiet Manager Web",
    subtitle: "Hospital Dietary & Patient Nutrition Management Platform",
    category: "Full Stack / React Healthcare Web",
    year: "2026",
    summary: "Real-time clinical nutrition and patient dietary workflow manager built entirely with React, Vite, and Firebase with live ward synchronization.",
    description: "Designed and engineered an end-to-end hospital dietary operations web platform using React and Tailwind CSS. Features real-time Firebase patient profiles, ward meal allocations, allergy restriction enforcement, live kitchen prep status, and automated Excel audit reporting.",
    metrics: [
      { label: "Frontend", value: "React & Vite" },
      { label: "Database Sync", value: "Realtime" },
      { label: "UI Performance", value: "60 FPS" }
    ],
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "JavaScript", color: "#F7DF1E" },
      { name: "Firebase", color: "#FFCA28" },
      { name: "Tailwind CSS", color: "#06B6D4" },
      { name: "Framer Motion", color: "#EA4C89" },
      { name: "XLSX", color: "#1D6F42" }
    ],
    liveUrl: "https://github.com/chamindumo/medidiet-manager",
    githubUrl: "https://github.com/chamindumo/medidiet-manager",
    desktopScreenshots: [
      {
        title: "Dietary Operations Dashboard",
        url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
        caption: "React interface displaying real-time patient ward diet allocation and nutritional profiling"
      },
      {
        title: "Ward Nutrition Matrix",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        caption: "Live hospital bed dietary requirements and meal prep queue"
      }
    ],
    mobileScreenshots: [
      {
        title: "Mobile Ward Rounds",
        url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
        caption: "Mobile-responsive React interface for bedside allergy verification"
      }
    ]
  },
  {
    id: "nazrathhouseproject",
    number: "04",
    title: "Nazrath House Portal",
    subtitle: "QR-Code Powered Resident & Visitor Access Management",
    category: "Full Stack / React & TypeScript",
    year: "2026",
    summary: "Hardware-accelerated QR code scanner and resident tracking solution built with React and TypeScript with cloud datastore sync.",
    description: "Built an automated facility management portal using React and TypeScript with browser-based HTML5 QR code scanning. Streamlines entry/exit logging, resident directories, attendance time-stamping, and real-time administrative analytics.",
    metrics: [
      { label: "Frontend", value: "React & TS" },
      { label: "Scan Latency", value: "<120ms" },
      { label: "Type Coverage", value: "100% TS" }
    ],
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Firebase", color: "#FFCA28" },
      { name: "HTML5 QR", color: "#00d8ff" },
      { name: "Tailwind CSS", color: "#06B6D4" },
      { name: "XLSX", color: "#1D6F42" }
    ],
    liveUrl: "https://github.com/chamindumo/nazrathhouseproject1",
    githubUrl: "https://github.com/chamindumo/nazrathhouseproject1",
    desktopScreenshots: [
      {
        title: "Resident Check-In Terminal",
        url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
        caption: "React scanner stream interface with verified clearance badges"
      },
      {
        title: "Administrative Roster",
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        caption: "Live attendance registry and spreadsheet export engine"
      }
    ],
    mobileScreenshots: [
      {
        title: "Mobile Scanner Access",
        url: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=600&q=80",
        caption: "Pocket QR verification scanner for security checkpoints"
      }
    ]
  }
];

export const servicesData: Service[] = [
  {
    id: "mobile-react-native",
    number: "01",
    title: "Mobile Application Engineering (React Native)",
    tagline: "Cross-platform iOS and Android mobile apps with native-grade performance.",
    description: "Architecting and developing production-grade iOS and Android mobile applications using React Native and Expo. Ensuring 60fps animations, offline-first database synchronization, biometric security, and clean App Store / Google Play deployments.",
    deliverables: [
      "Native iOS & Android cross-platform mobile apps using React Native & Expo",
      "Offline-first state architectures with SQLite / MMKV local persistence",
      "Native device hardware integrations (Camera, Biometrics, Push Notifications)",
      "Automated CI/CD build and release pipelines (EAS Build / Fastlane)"
    ],
    tools: ["React Native", "Expo", "TypeScript", "Redux Toolkit", "React Navigation", "iOS", "Android"]
  },
  {
    id: "frontend-react",
    number: "02",
    title: "Frontend Web Engineering (React)",
    tagline: "High-velocity React production web applications with 100/100 Core Web Vitals.",
    description: "Designing and developing all web frontend applications using React and TypeScript. Building component-driven user interfaces with robust state management, responsive CAD styling, and real-time backend integrations.",
    deliverables: [
      "All web frontend projects built with React 18 / 19 & TypeScript",
      "Fluid responsive design with Tailwind CSS and modular CSS Grid",
      "Real-time WebSocket & Firebase client state synchronization",
      "Zero-layout-shift performance profiling and 100/100 Core Web Vitals"
    ],
    tools: ["React", "TypeScript", "Vite", "Tailwind CSS", "Next.js", "Zustand"]
  },
  {
    id: "ai-stego",
    number: "03",
    title: "AI Forensics & Steganography Detection (Cybervali)",
    tagline: "Uncovering covert digital payloads with multi-task deep neural models.",
    description: "Architecting machine learning pipelines specialized in image, audio, and network steganalysis. Leveraging pre-trained vision backbones with multi-task transfer learning heads to detect hidden data and classify steganographic algorithms.",
    deliverables: [
      "Custom multi-task PyTorch architectures for binary & multiclass steganalysis",
      "Transfer learning backbones (ResNet, EfficientNet, Vision Transformers)",
      "Payload density estimation and spatial residual noise feature maps",
      "React forensic dashboard paired with FastAPI & Docker inference endpoints"
    ],
    tools: ["PyTorch", "Python", "Transfer Learning", "Multi-Task Learning", "React", "OpenCV", "FastAPI"]
  },
  {
    id: "n8n-automation",
    number: "04",
    title: "Autonomous Workflow Automation (n8n)",
    tagline: "Connecting services and automating business logic with zero manual drag.",
    description: "Engineering resilient, event-driven automation pipelines with n8n. Integrating webhooks, third-party APIs, LLM agents, and relational databases for autonomous data sync and alerting.",
    deliverables: [
      "Production-ready self-hosted n8n instance deployment & scaling",
      "Asynchronous webhook ingestion pipelines with payload validation",
      "Multi-system database & CRM two-way real-time synchronizations",
      "AI-assisted automated triage, reporting, and incident dispatch"
    ],
    tools: ["n8n", "Webhooks", "Node.js", "PostgreSQL", "Docker", "REST APIs", "Python"]
  }
];

export const metricsData: Metric[] = [
  {
    id: "mobile-perf",
    label: "MOBILE FPS TARGET",
    value: "60",
    unit: "FPS",
    description: "Smooth native gesture animations across React Native iOS & Android.",
    iconName: "Zap"
  },
  {
    id: "accuracy",
    label: "STEGO DETECTION ACCURACY",
    value: "98.4",
    unit: "%",
    description: "Cybervali multi-task learning accuracy across benchmark stego datasets.",
    iconName: "ShieldCheck"
  },
  {
    id: "vitals",
    label: "CORE WEB VITALS",
    value: "100",
    unit: "/100",
    description: "Flawless score across performance, accessibility, best practices, and SEO.",
    iconName: "Activity"
  },
  {
    id: "automation",
    label: "AUTOMATION VOLUME",
    value: "50",
    unit: "k+",
    description: "Monthly event executions processed through self-hosted n8n pipelines.",
    iconName: "FolderGit2"
  }
];

export const skillsData: SkillItem[] = [
  // Mobile (React Native)
  { name: "React Native (iOS & Android)", level: "Expert", category: "frontend", featured: true },
  { name: "Expo SDK & EAS", level: "Expert", category: "frontend", featured: true },
  { name: "React Navigation", level: "Expert", category: "frontend", featured: true },
  { name: "Mobile Offline Sync & SQLite", level: "Advanced", category: "frontend", featured: true },

  // Frontend (React)
  { name: "React 18 / 19 (All Frontend)", level: "Expert", category: "frontend", featured: true },
  { name: "TypeScript", level: "Expert", category: "frontend", featured: true },
  { name: "JavaScript (ESNext)", level: "Expert", category: "frontend", featured: true },
  { name: "Tailwind CSS", level: "Expert", category: "frontend", featured: true },
  { name: "Vite & Modern Tooling", level: "Expert", category: "frontend", featured: true },
  { name: "Three.js / WebGL", level: "Advanced", category: "frontend", featured: true },
  { name: "HTML5 / QR Integration", level: "Expert", category: "frontend" },
  { name: "CSS Grid & CAD Architecture", level: "Expert", category: "frontend" },

  // AI, Forensics & Automation
  { name: "Steganography Detection (Cybervali)", level: "Expert", category: "backend", featured: true },
  { name: "Multi-Task Learning", level: "Expert", category: "backend", featured: true },
  { name: "Transfer Learning", level: "Expert", category: "backend", featured: true },
  { name: "n8n Workflow Automation", level: "Expert", category: "backend", featured: true },
  { name: "PyTorch / Deep Learning", level: "Advanced", category: "backend", featured: true },
  { name: "Python", level: "Expert", category: "backend", featured: true },
  { name: "OpenCV / Image Processing", level: "Advanced", category: "backend", featured: true },
  { name: "Event-Driven Webhooks", level: "Expert", category: "backend", featured: true },

  // Backend & Cloud
  { name: "Firebase (Firestore & Auth)", level: "Expert", category: "cloud", featured: true },
  { name: "Node.js", level: "Advanced", category: "backend", featured: true },
  { name: "FastAPI / Express", level: "Advanced", category: "backend", featured: true },
  { name: "PostgreSQL & SQL", level: "Advanced", category: "backend", featured: true },
  { name: "C# / .NET", level: "Advanced", category: "backend" },
  { name: "Docker & Containers", level: "Advanced", category: "cloud", featured: true },
  { name: "Git & GitHub Workflows", level: "Expert", category: "cloud", featured: true },
  { name: "CI / CD Pipelines", level: "Advanced", category: "cloud" },
  { name: "Linux / UNIX Shell", level: "Advanced", category: "cloud", featured: true },

  // Core & Systems
  { name: "Data Structures & Algorithms", level: "Advanced", category: "core", featured: true },
  { name: "Software Architecture & OOP", level: "Expert", category: "core", featured: true },
  { name: "Web Performance Optimization", level: "Advanced", category: "core", featured: true },
  { name: "Agile & Scrum Delivery", level: "Advanced", category: "core" }
];

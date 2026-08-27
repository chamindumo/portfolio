# Chamindu Moramudali // Personal Engineering Portfolio

> Cyber-minimalist personal portfolio and systems showcase inspired by the architectural CAD design language of [vanlent.dev](https://vanlent.dev/).

---

## ⚡ Architectural Highlights

1. **Dynamic Modular Blueprint Grid**:
   - Dynamic viewport calculations (`--grid-block-size`, `--grid-section-columns`, etc.) adapting responsively across viewports.
   - Architectural crosshairs (`+`) and CAD corner brackets (`.corner-tl`, `.corner-tr`, `.corner-bl`, `.corner-br`).
2. **Day / Night Theme Engine (AM / PM Switch)**:
   - **Carbon Dark Mode** (`#121214`) and **Architectural Light Mode** (`#f8f9fa`).
   - Dynamic sliding AM/PM vertical toggle switch in both the desktop header and mobile dock with persistent storage.
3. **Interactive 3D WebGL Centerpiece**:
   - Liquid iridescent glass sphere built with Three.js that floats, pulses, and tracks mouse coordinates and scroll velocity at 60 FPS.
4. **Interactive Multi-Device Work Showcase**:
   - Dual desktop browser and mobile phone mockups with active screenshot switching via an interactive thumbnail gallery.
   - Live telemetry specs (Execution latency, canvas FPS, Core Web Vitals) and technology badge matrix with hover accents.
5. **Technical Dossier & Skills Matrix**:
   - Filterable skills matrix categorized by Frontend, Backend, Cloud & DevOps, and Core Systems.
   - Academic background at **RMIT University** (Bachelor of Computer Science / Software Engineering).
6. **Live Telemetry & Direct Communications**:
   - Live digital clocks tracking Melbourne (AEST/AEDT, UTC+10) and Colombo (IST, UTC+5:30).
   - Interactive terminal dispatch form with validation and celebratory feedback.
   - Centralized configuration in `src/data/portfolioData.ts` for instant profile and project updates.

---

## 🚀 Quick Start

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory with code splitting for React, Lucide, and Three.js.

### 3. Preview Production Build
```bash
npm run preview
```

---

## 🛠 Customizing Your Content

All profile information, projects, services, metrics, and skills are organized in:
📁 `src/data/portfolioData.ts`

You can edit:
- **`profileData`**: Your name, degree, bio paragraphs, social media links, and coordinates.
- **`featuredProjects`**: Add, edit, or reorder featured projects, screenshots, metrics, and repo links.
- **`servicesData`**: Engineering capabilities and deliverables.
- **`skillsData`**: Technical skills, proficiency levels, and categories.

---

## 📦 Deployment

Deploy effortlessly to Vercel, Netlify, Cloudflare Pages, or GitHub Pages:
```bash
# Vercel
npx vercel

# Netlify
npx netlify deploy --prod --dir=dist
```

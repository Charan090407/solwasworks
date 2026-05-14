# Revamp 3D Interior Design Promotional Website

## Goal Description

Transform the existing `src` 3D animated website into a production‑ready, visually stunning interior‑design promotion platform. The redesign will:
- Adopt the **UI/UX Pro Max** design system (from `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git`).
- Implement advanced scroll‑triggered and scroll‑linked animations using **Framer Motion** (`https://motion.dev`).
- Incorporate custom 3D assets (wardrobes, living‑room, bedroom) and high‑quality background videos/images.
- Apply branding, color palette, typography, and copy from **solwasworks.lovable.app**.
- Ensure SEO, responsive design, accessibility, and production‑ready build configuration.

---

## User Review Required

> [!IMPORTANT]
> Please confirm the following before we proceed:
> - Accept the addition of **react‑three‑fiber** and **@react-three/drei** for 3D rendering.
> - Approve using placeholder 3D GLTF assets (we will generate low‑poly placeholders now; you can replace them later with final assets).
> - Agree to add **Framer Motion** as a dependency and to copy UI/UX Pro Max components into the project.
> - Confirm that the site will be deployed using Vite's default production build (`npm run build`).

---

## Open Questions

> [!WARNING]
> - Do you have any specific brand fonts (e.g., Google Font name) you want us to import, or should we use the default Inter font from the UI/UX Pro Max repo?
> - Do you prefer video backgrounds to autoplay muted and loop, or should we provide a fallback static image for mobile?
> - Do you have existing GLTF URLs for the wardrobe/living room/bedroom models, or shall we generate placeholder assets now?

---

## Proposed Changes

### 1. Project Setup & Dependencies

- **[MODIFY] package.json** – add:
  ```json
  "dependencies": {
    "framer-motion": "^11.0.0",
    "@react-three/fiber": "^8.13.0",
    "@react-three/drei": "^9.56.0",
    "three": "^0.160.0",
    "react-intersection-observer": "^9.4.0"
  }
  ```
- **Run install** (`npm install`).
- Create a **`src/assets/`** folder for videos, images, and 3D GLTF files.

### 2. Integrate UI/UX Pro Max Design System

- Clone the UI/UX Pro Max repo into a temporary folder, copy **`src/components/*`**, **`src/theme/*`**, and **`src/styles/*`** into our project under **`src/ui-pro-max/`**.
- Refactor `App.tsx` to wrap the app with the **`ProMaxProvider`** (or equivalent) from the copied theme.
- Update routing structure in **`src/pages/`** to match the design system’s layout (Hero, Features, Gallery, Contact).

### 3. Add 3D Scene with React‑Three‑Fiber

- Create **`src/components/ThreeScene.tsx`** that loads GLTF models using `useGLTF` from `@react-three/drei`.
- Provide three separate scenes (Wardrobe, LivingRoom, Bedroom) that can be toggled via scroll sections.
- Use **`Canvas`** with `shadows` and `camera` presets for performance.
- Add fallback loading spinner.

### 4. Framer Motion Scroll Animations

- Install **`react-intersection-observer`** to detect scroll positions.
- In each page section, wrap content with `<motion.div>` using `whileInView`, `initial`, `animate` props.
- Implement **parallax scroll** effects for background images/videos (e.g., `translateY` linked to scrollY).
- Use **`motion.scrollYProgress`** for progressive animations (e.g., fading in 3D models as the user scrolls).

### 5. Branding & Content Extraction

- Scrape key branding values (primary/secondary colors, logo URL, tagline) from **`https://solwasworks.lovable.app`**.
- Insert branding into **`src/ui-pro-max/theme.ts`** (or similar) and update meta tags in **`index.html`**.
- Add the logo to **`src/assets/logo.svg`**.

### 6. Media Assets (Videos & Images)

- Generate placeholder background videos using the **`generate_image`** tool (render a short animated loop as a video placeholder) and store as **`src/assets/hero-bg.mp4`**.
- Generate high‑resolution background images for mobile fallback (**`hero-bg.jpg`**).
- Place 3D asset placeholders (**`wardrobe.glb`**, **`livingroom.glb`**, **`bedroom.glb`**) in **`src/assets/models/`**.

### 7. SEO & Accessibility

- Add **`<title>`**, **`<meta name="description" …>`** reflecting the interior‑design brand.
- Ensure each interactive element has **`aria-label`**.
- Implement **`lang="en"`** attribute on `<html>`.
- Add **Open Graph** tags for social sharing.

### 8. Production Build Optimizations

- Configure **Vite** for code‑splitting and asset hashing.
- Enable **dynamic import** for 3D scenes to reduce initial bundle size.
- Add **compression** plugin (`vite-plugin-compression`) for gzipping.
- Verify **Lighthouse** scores (Performance > 90, SEO > 90, Accessibility > 90).

---

## Verification Plan

### Automated Tests
- Run `npm run build` and ensure no TypeScript errors.
- Execute `npm run preview` and manually verify:
  - Hero section loads background video.
  - Scroll triggers Framer Motion animations.
  - 3D models appear and animate smoothly.
  - Responsive layout on mobile.
- Lint with `npm run lint` (ESLint + Prettier).

### Manual Verification
- Open the site in Chrome/Firefox and check:
  - Brand colors, fonts, and logo match solwasworks.
  - All sections animate on scroll.
  - No console errors.
  - Page load < 2 s on a typical 3G connection.
- Capture a short video walkthrough (using the browser tool) for the user.

---

*Once you approve the plan, we will create a detailed task checklist and begin implementation.*

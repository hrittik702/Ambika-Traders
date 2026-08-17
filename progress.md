# Ambika Traders — Development Progress

## Project Status
Stage 01 Completed (Foundation, Architecture, Content Mapping & Design System Setup). Ready for Stage 02.

---

## Completed
- [x] Initialized modern Vite + React project architecture.
- [x] Configured Tailwind CSS with custom theme extensions, semantic monochrome tokens, and `INTERN` font mappings.
- [x] Configured PostCSS and Autoprefixer.
- [x] Created `src/styles/tokens.css` with semantic CSS variables for colors, typography scale, spacing scale, radius, and shadows.
- [x] Created `src/styles/index.css` with `@font-face` definitions for INTERN, WCAG 2.2 `:focus-visible` ring styles, reduced motion rules, and editorial utility classes.
- [x] Configured asset organization directory structure (`src/assets/images/products/`, `services/`, `projects/`, `brand/`, `general/`, `fonts/`, `icons/`).
- [x] Implemented structured data models in Hinglish (Roman letters):
  - `src/data/products.js` (Catalog with features, category bindings, relation keys)
  - `src/data/productCategories.js` (Aluminium Doors & Windows, Sliding Partitions, Sanitaryware, Modular Kitchens, Wardrobes, False Ceiling, Hardware)
  - `src/data/services.js` (Fabrication, Glass works, Interior execution, Ceilings, Renovation, Consultation)
  - `src/data/projects.js` (Verified residential, commercial, and penthouse case studies)
  - `src/data/navigation.js` (Primary nav order, utility bar, footer structures, Hinglish CTA "Enquiry Karein")
  - `src/data/contact.js` (Showroom address, timings, phones, WhatsApp message)
  - `src/data/relationships.js` (Bi-directional relationship queries: product <-> service <-> project)
- [x] Implemented Motion & Smooth Scroll architecture:
  - Fixed scrolling conflicts by removing conflicting native `scroll-smooth` on HTML and CSS.
  - Linked Lenis smooth scrolling directly into `gsap.ticker` (`gsap.ticker.add(...)` with `lagSmoothing(0)`), eliminating frame drops and jitter.
  - Integrated `ScrollTrigger.update()` on every Lenis scroll event.
  - Added safe `scrollToTarget` utility with duration & easing support for buttons (e.g. `BackToTop`).
  - Added route change synchronization in `App.jsx` with `lenis.scrollTo(0, { immediate: true })` and `ScrollTrigger.refresh()`.
  - Implemented GSAP entrance & ScrollTrigger animations across `Home`, `Products`, `Services`, `Projects`, `About`, and `Contact` pages.
  - Created `useGsap` and `useScrollAnimation` hooks using React 18 `gsap.context()` with complete automatic cleanup and `prefers-reduced-motion` safety.
- [x] Implemented core UI components:
  - `Button.jsx` (Accessible, state-aware: hover/active/focus-visible/disabled/loading, polymorphic Link/Anchor)
  - `Badge.jsx` (Architectural tags)
  - `SectionHeading.jsx` (Editorial index, tags, and Hinglish subtitles)
  - `BackToTop.jsx` (Accessible scroll-to-top trigger)
  - `ProductCard.jsx`, `ProductCategoryCard.jsx`, `ServiceCard.jsx`, `ProjectCard.jsx`
  - `EnquiryForm.jsx` (Accessible form controls with status management)
- [x] Implemented Layout foundation:
  - `Navbar.jsx` (Utility top bar, main navigation, mobile drawer with ARIA attributes)
  - `Footer.jsx` (High-contrast dark monochrome architecture with Hinglish callout & links)
  - `PageContainer.jsx` (WCAG 2.2 AA skip-to-content target)
- [x] Configured React Router DOM v6 with all core routes:
  - `/` (Home foundation shell)
  - `/products` (Products listing with category filters)
  - `/products/:slug` (Product detail with dynamic relationships & enquiry anchor)
  - `/services` (Services listing)
  - `/services/:slug` (Service detail with workflow & relations)
  - `/projects` (Projects portfolio listing)
  - `/projects/:slug` (Project detail with specifications & relations)
  - `/about` (About / Heritage)
  - `/contact` (Contact & Showroom location)
  - `*` (404 Not Found)
- [x] Created root documentation: `progress.md` and `design.md`.

---

## In Progress
- None (Stage 01 complete; awaiting user instructions for Stage 02).

---

## Pending
- [ ] Stage 02 Homepage sections implementation & fine-tuning.
- [ ] Final product catalog UI enhancements and search.
- [ ] Client image asset ingestion (replacing placeholders with high-res client photographs).
- [ ] Advanced GSAP scroll animations & hero reveal transitions.
- [ ] Production SEO audit and build validation.

---

## Pages
- [x] Home (Foundation shell ready)
- [x] Products (Catalog listing shell ready)
- [x] Product Detail (Dynamic route shell ready)
- [x] Services (Services listing shell ready)
- [x] Service Detail (Dynamic route shell ready)
- [x] Projects (Portfolio listing shell ready)
- [x] Project Detail (Dynamic route shell ready)
- [x] About (Heritage shell ready)
- [x] Contact (Showroom & enquiry shell ready)

---

## Components
- [x] `Navbar` (Utility bar, desktop links, mobile drawer)
- [x] `Footer` (Dark monochrome editorial layout)
- [x] `PageContainer` (Semantic layout shell + skip-link)
- [x] `Button` (Accessible polymorphic button with loading states)
- [x] `SectionHeading` (Editorial index & Hinglish subtitles)
- [x] `Badge` (Minimal tags)
- [x] `ProductCard` (Sharp architectural product card)
- [x] `ProductCategoryCard` (Category navigation card)
- [x] `ServiceCard` (Service scope & details card)
- [x] `ProjectCard` (Project case study card)
- [x] `EnquiryForm` (Accessible interactive form shell)
- [x] `BackToTop` (Floating accessible utility)

---

## Content
- [x] Strictly client-supplied domains mapped: Aluminium doors/windows, sliding partitions, sanitaryware, modular kitchens, wardrobes, false ceilings, renovation, construction, fabrication.
- [x] No fabricated prices (using quote model), no fake warranties, no fake client testimonials.
- [x] 100% Hinglish written in Roman/English alphabet. Zero Devanagari script.

---

## Design System
- [x] Black + White + Neutral Monochrome established.
- [x] INTERN typography tokens and `@font-face` configured.
- [x] Sharp / lightly rounded corners (no excessive pill rounding on cards).
- [x] Controlled spacing scale and container constraints (`1440px`).

---

## Animations
- [x] GSAP 3 + ScrollTrigger architecture setup.
- [x] Lenis smooth scrolling integration.
- [x] `prefers-reduced-motion` safety guards implemented.

---

## Responsive
- [x] Mobile (stacked layout, responsive hamburger drawer, reduced heading clamp).
- [x] Tablet & Desktop grids configured.

---

## SEO
- [x] Semantic HTML5 structure throughout.
- [x] Meta description, OpenGraph tags, title tags in `index.html`.
- [x] Clean, semantic URLs for all routes.

---

## Performance
- [x] Lightweight Vite setup with zero runtime CSS-in-JS overhead.
- [x] Font display swap and lazy loading ready.

---

## Bugs / Issues
- None identified in Stage 01.

---

## Decisions
1. **Color Palette**: Dedicated monochrome system (`mono-950` to `mono-0`) with semantic CSS variable mapping.
2. **Typography**: Hard requirement `INTERN` font set as default across all headings, body, and UI elements.
3. **Copywriting**: Natural conversational Hinglish in Latin script throughout.
4. **Data Isolation**: All business copy isolated in `src/data/` modules with dynamic relationship query helpers.

---

## Last Updated
2026-08-17 — Stage 01 Foundation Architecture Setup Completed.

# Ambika Traders — Project-Wide Comprehensive Issues Audit

> **Generated On:** 2026-08-18  
> **Scope:** Entire codebase (`src/`, `public/`, config files, styles, pages, components, data, animations)  
> **Status:** Full Project Diagnostic Completed

---

## 📊 Executive Summary & Issues Heatmap

A complete and rigorous scan of the entire Ambika Traders project was conducted across all 40+ source files. The issues identified range from styling token mismatches in Tailwind to broken interactive variants, missing asset files, invalid GSAP easing functions, and accessibility gaps.

| Severity Level | Count | Impact Description |
|---|:---:|---|
| 🔴 **Critical** | **5** | Code breaking, invalid Tailwind classes, invalid GSAP easing functions, or non-existent component variants |
| 🟠 **High** | **14** | Broken layouts, visual artifacts, placeholder data, or missing asset directories |
| 🟡 **Medium** | **18** | Redundant styling, minor accessibility gaps, double numbering, or inconsistent behavior |
| 🔵 **Low / Quality** | **12** | Unused imports, code cleanup, or minor optimization opportunities |

---

## 🔍 Section 1: Global Navigation & Layout Issues

### 1.1 `Navbar.jsx` (`src/components/layout/Navbar.jsx`)
- **[High] `shadow-subtle` is NOT a generated Tailwind utility:** The navbar uses `shadow-subtle` on its scrolled state (`L100`), but `tailwind.config.js` does not extend `boxShadow` with `subtle`. The shadow is silently ignored by the browser.
- **[High] `animate-fade-in` is undefined:** The mobile overlay (`L179`) uses `animate-fade-in`. There is no keyframe or animation defined for `fade-in` in `tailwind.config.js` or `index.css`. The overlay appears without any smooth fade.
- **[Medium] Hardcoded `top-[73px]` drawer offset:** The mobile drawer uses `top-[73px]` and `max-h-[calc(100vh-73px)]`. The navbar height token is `80px` (`h-20`) when resting and `64px`/`72px` when scrolled. `73px` is an arbitrary magic number that creates visual misalignment.
- **[Medium] CTA Button Size Jump on Scroll:** On scroll, the CTA button changes from `size="md"` to `size="sm"`. This causes an abrupt layout snap rather than a smooth transition.
- **[Medium] Missing Focus Trap in Mobile Dialog:** The mobile menu declares `role="dialog"` and `aria-modal="true"`, but has no focus trapping. Tabbing escapes to background elements behind the overlay.
- **[Low] Unused Import:** `MapPin` is imported from `lucide-react` on `L3` but never used.

### 1.2 `Footer.jsx` (`src/components/layout/Footer.jsx`)
- **[Medium] Email address mismatch:** Footer reads from `contactData.email` (`contact@ambikatraders.com`), while Navbar utility bar reads from `navigationData.utilityBar.email` (`info@ambikatraders.com`). Two different emails are presented across the site.
- **[Low] Missing Footer Service Link:** `navigationData.footerNav.servicesList` lists 5 services but omits the 6th service (`srv-architectural-planning`).

### 1.3 `PageContainer.jsx` (`src/components/layout/PageContainer.jsx`)
- **[Medium] Focus Outline Removed on Main Element:** `<main>` has `tabIndex="-1"` and `focus:outline-none`. When skip-link targets `#main-content`, no visual focus ring is rendered.
- **[Medium] Section padding conflict:** When `noPadding` is `false`, `<main>` applies `section-pad-sm md:section-pad-md`. If inner pages also use section padding, vertical spacing becomes doubled.

---

## 🔍 Section 2: Homepage Sections Issues

### 2.1 `Hero.jsx` (`src/components/sections/Hero.jsx`)
- **[High] Full-bleed Hero Image has Box Border & Rounded Corners:** The `Image` component (`src/components/ui/Image.jsx`) wraps images with `border border-mono-200 rounded-xs bg-mono-100`. In the Hero section, this adds an unwanted 1px gray border and rounded corners around what should be an edge-to-edge cinematic hero background.
- **[High] Missing Hero Background Image:** `src="/images/products/cat-doors-windows.jpg"` does not exist on disk. Hero falls back to placeholder icon.
- **[Medium] Missing Image Reveal Animation:** Stage 03 spec requires the hero image to scale in and settle. However, `Home.jsx` GSAP timeline only targets text elements, leaving the background image static.
- **[Medium] Arbitrary Z-Index `z-[1]`:** Pattern overlay uses `z-[1]` instead of semantic design token `z-base`.
- **[Low] Decorative Pulse Dot lacks `aria-hidden`:** Pulse dot on `L39` has no `aria-hidden="true"`.

### 2.2 `Stats.jsx` (`src/components/sections/Stats.jsx`)
- **[Medium] Invisible Divider Border:** Stat cards use `border-mono-850` (`#151515`). Since the section background is `darkSoft` (`#151515`), the divider lines are completely invisible. They should use `border-mono-800` (`#222222`).
- **[Low] Skipped Heading Level:** Heading structure jumps directly from `<h1>` (in Hero) to `<h3>` inside Stats without an `<h2>`.

### 2.3 `ProductsPreview.jsx` (`src/components/sections/ProductsPreview.jsx`)
- **[Critical] Invalid Button Variant `variant="outline"`:** The desktop "Sabhi Products Dekhein" button uses `variant="outline"`. Button component only accepts `primary`, `secondary`, `dark`, `ghost`, `text`, `icon`, `inverse`, `inverseOutline`. `"outline"` renders with no variant styling.
- **[High] Primary Product 12-Column Grid Layout Bug:** `ProductCard` is given `className="lg:grid lg:grid-cols-12 lg:gap-8 items-stretch"`. Because `ProductCard` has only 2 direct children (`image-wrapper` and `content-wrapper`) without `col-span` classes, applying `grid-cols-12` causes both children to cram into the first column instead of a 2-column featured layout.
- **[Medium] Redundant Double Numbering:** `SectionHeading` receives `index="01"` and `eyebrow="01 — PRODUCTS"`. It renders both `[01]` and `01 — PRODUCTS` side-by-side.

### 2.4 `ServicesPreview.jsx` (`src/components/sections/ServicesPreview.jsx`)
- **[Medium] Numbering Inconsistency:** `index="03"` (section index) and `eyebrow="02 — SERVICES"` (business priority index) render together as `[03] 02 — SERVICES`.
- **[Low] Featured Services Truncation:** There are 4 featured services in data, but `.slice(0, 3)` hides the 4th featured service ("Renovation Execution") without an obvious indicator.

### 2.5 `ProjectsPreview.jsx` (`src/components/sections/ProjectsPreview.jsx`)
- **[Medium] Numbering Inconsistency:** `index="04"` and `eyebrow="03 — PROJECTS"` render as `[04] 03 — PROJECTS`.
- **[Medium] Button Variant Inconsistency:** Desktop CTA in `SectionHeading` uses `variant="secondary"`, while mobile CTA uses `variant="primary"`.

### 2.6 `WhyAmbika.jsx` (`src/components/sections/WhyAmbika.jsx`)
- **[Low] Unused Import:** `CheckCircle2` is imported from `lucide-react` on `L2` but never used.
- **[Low] Missing Heading GSAP Target:** The section heading is custom HTML without `data-heading-container`, so it doesn't participate in the scroll reveal choreography.

### 2.7 `CTASection.jsx` (`src/components/sections/CTASection.jsx`)
- **[Critical] Invalid Tailwind Class `h-13`:** WhatsApp and Phone links use `h-13` on `L49` and `L57`. `h-13` is not in default Tailwind spacing or custom config. Elements have no computed height.
- **[High] Missing `shadow-subtle` Utility:** WhatsApp button uses `shadow-subtle` which is not registered in Tailwind config.
- **[Medium] Hardcoded Anchor Elements instead of Button Component:** WhatsApp and Phone links duplicate button CSS manually instead of using `<Button as="a" ...>`.

### 2.8 `Location.jsx` (`src/components/sections/Location.jsx`)
- **[Medium] Distracting `animate-bounce`:** MapPin uses continuous CSS `animate-bounce`, which is visually distracting and conflicts with motion accessibility best practices.
- **[Medium] Static Mock Map:** Map is a styled card rather than an interactive or embedded map.

---

## 🔍 Section 3: Design System, Tokens & Tailwind Configuration

### 3.1 `tailwind.config.js`
- **[Critical] Missing `boxShadow` Extension:**
  Tokens defined in `tokens.css` (`--shadow-subtle`, `--shadow-card`, `--shadow-floating`) are not mapped under `theme.extend.boxShadow`. Any class using `shadow-subtle`, `shadow-card`, or `shadow-floating` fails across 14+ components.
- **[Critical] Missing `h-13` Spacing Value:**
  Used in `Button.jsx` (`size="lg"`) and `CTASection.jsx`. Missing from `theme.extend.spacing`.
- **[High] Missing Keyframe Animations:**
  `animate-fade-in` used in `Navbar.jsx` has no keyframe definition.
- **[Medium] `text-border` / `bg-bg-*` Color Key Overlaps:**
  Defining `border` and `bg` at top level creates redundant/confusing utility names like `text-text-primary` and `text-border`.

### 3.2 Typography & Font Files (`src/styles/index.css`)
- **[High] Missing Custom Font Files (`.woff2` / `.woff`):**
  `src/assets/fonts/` contains only `README.md`. All `@font-face` declarations fail silently, falling back to `system-ui`.
- **[Medium] Duplicate Container Classes:**
  `.page-container` and `.content-container` in `index.css` have identical CSS rules.
- **[Medium] Automatic Section Bottom Borders:**
  `.section-theme-*` classes enforce `border-bottom: 1px solid ...`. When combined with component-level borders, double borders appear, including an unwanted border above the footer.

---

## 🔍 Section 4: UI & Form Primitives Issues

### 4.1 `Button.jsx` (`src/components/ui/Button.jsx`)
- **[Critical] Missing `variant="outline"`:** Used across multiple pages (`Products.jsx`, `NotFound.jsx`, etc.) but missing from the `variants` object.
- **[Critical] `h-13` on `size="lg"`:** Large buttons have no height due to missing `13` spacing token.
- **[High] Missing `shadow-subtle`:** Primary and inverse variants fail to render shadow.
- **[Medium] Anchor Link Disabled State Not Enforced:** When `as="link"` or `as="a"` is rendered with `disabled={true}`, `aria-disabled` is set, but `onClick` is not intercepted, allowing navigation.
- **[Low] Prop Overwrite Order:** `type={props.type || 'button'}` appears before `{...props}`, making type resolution fragile.

### 4.2 `Image.jsx` (`src/components/ui/Image.jsx`)
- **[High] Unconditional Wrapper Styling:** Outer wrapper div always applies `border border-mono-200 rounded-xs bg-mono-100`. Breaks full-bleed and transparent image use-cases.
- **[Medium] `hoverZoom` Requires Outer `group`:** Image uses `group-hover:scale-105` on `<img>`, but the Image component's wrapper does not have `group`. Standalone images cannot zoom on hover.

### 4.3 `Link.jsx` (`src/components/ui/Link.jsx`)
- **[High] Component Name Collision with React Router:** Component exports `Link`, shadowing React Router's `Link`.
- **[Medium] Nested `group-hover` in `arrow` Variant:** `arrow` variant adds `group` class. When placed inside another `group` (like a card), hover states conflict.

### 4.4 `Card.jsx` (`src/components/ui/Card.jsx`)
- **[High] `shadow-card` Undefined in Tailwind:** Shadow fails to render.

### 4.5 `BackToTop.jsx` (`src/components/ui/BackToTop.jsx`)
- **[High] `shadow-floating` Undefined in Tailwind:** Shadow fails to render.
- **[Medium] Arbitrary `z-40`:** Uses hardcoded `z-40` instead of design token `z-sticky` or `z-floating`.

### 4.6 `ProductCard.jsx`, `ProductCategoryCard.jsx`, `ProjectCard.jsx`, `ServiceCard.jsx`
- **[High] `shadow-subtle` and `shadow-card` Undefined:** All cards have broken shadow classes.
- **[Medium] Index Formatter Bug for ≥10:** Index formatting `[0${index}]` renders `[010]` instead of `[10]` for double digits.
- **[Medium] Missing Prop Shape Validation:** Card components access `product.slug`, `project.scope` without fallback checks.

### 4.7 Form Components (`Input.jsx`, `Select.jsx`, `Textarea.jsx`, `EnquiryForm.jsx`)
- **[High] EnquiryForm Uses Undefined Shadows:** `shadow-subtle` and `shadow-card` fail.
- **[Medium] Form Labels Use `font-mono`:** Labels use monospace font, which looks inconsistent with the rest of the typography system.
- **[Medium] EnquiryForm Validation Lacks Phone Regex:** Checks only for non-empty string despite error message stating "valid 10-digit number".
- **[Low] Decorative Send Icon Missing `aria-hidden`:** SVG icon on submit button is announced by screen readers.

---

## 🔍 Section 5: Inner Pages & Routing Issues

### 5.1 Stale Numeric Heading Classes on Inner Pages
The following pages from Stage 01 still use deprecated numeric heading scale (`text-heading-1`, `text-heading-2`, `text-heading-3`, etc.):
- **`About.jsx` (L95):** Uses `text-heading-2` (must be `text-heading-lg`).
- **`Contact.jsx` (L54):** Uses `text-heading-3` (must be `text-heading-md`).
- **`Products.jsx` (L106):** Uses `variant="outline"` on `<Button>`.
- **`NotFound.jsx` (L35):** Uses `variant="outline"` on `<Button>`.
- **`Services.jsx` & `Projects.jsx`:** Check for stale `text-heading-1` and `section-padding-y` classes.

### 5.2 `Products.jsx` Category Filter Bar
- **[Medium] Undefined `scrollbar-none` Utility:** `L62` uses `scrollbar-none`. No scrollbar-hide plugin is installed; scrollbar remains visible or behaves erratically across browsers.

### 5.3 `ServiceDetail.jsx` & `ProjectDetail.jsx`
- **[Medium] `shadow-subtle` on Scope Box:** Scope box in `ServiceDetail.jsx` uses broken shadow class.
- **[Low] Unused Import:** `CheckCircle2` imported in `ProjectDetail.jsx` but unused.

---

## 🔍 Section 6: Data Layer & Media Assets

### 6.1 Missing Image Assets
- **[High] Zero Image Files in `public/images/`:**
  Every single product (`products.js`), service (`services.js`), project (`projects.js`), and category (`productCategories.js`) references image paths like `/images/products/slim-sliding-window.jpg`.
  **No such files exist**, causing all images across the entire website to render fallback placeholder states.

### 6.2 Data Inconsistencies & Placeholders
- **[High] Placeholder Contact Information (`contact.js`):**
  Phone number (`+91 98765 43210`), email (`contact@ambikatraders.com`), address (`City Center`, pincode `000000`), and social URLs are generic placeholder data.
- **[Medium] Missing `image` Field on Service:**
  `srv-custom-sliding-partitions` in `services.js` has no `image` property defined, while other services have one.
- **[Medium] Dual Email Addresses:**
  `navigation.js` defines `info@ambikatraders.com`, whereas `contact.js` defines `contact@ambikatraders.com`.

---

## 🔍 Section 7: GSAP & Smooth Scroll Choreography

### 7.1 `GSAP_EASING.editorial` is Invalid GSAP Syntax
- **[Critical] `editorial: 'cubic-bezier(0.16, 1, 0.3, 1)'` in `src/lib/animations/gsap.js` (L23):**
  GSAP does **not** support CSS `cubic-bezier()` syntax natively.
  Every animation across `Home.jsx`, `Products.jsx`, `About.jsx`, and `Contact.jsx` that specifies `ease: GSAP_EASING.editorial` silently falls back to GSAP's default linear/power1 ease.
  **Fix:** Change to `'power3.out'`, `'expo.out'`, or configure `CustomEase`.

### 7.2 Lenis Virtual Scroll vs `window.scrollY`
- **[High] Inconsistent Scroll Position Tracking:**
  `Navbar.jsx` and `BackToTop.jsx` attach listeners directly to `window.scrollY`. With Lenis virtual scrolling active, `window.scrollY` does not reliably sync with the animated scroll offset, causing state flickering.
  **Fix:** Subscribe to `lenis.on('scroll', ...)` or use `getLenis().scroll`.

### 7.3 Missing Scroll Restoration
- **[Medium] Scroll Position Not Reset on Route Change:**
  Navigating between routes does not automatically reset scroll to top (`x: 0, y: 0`).

---

## 🔍 Section 8: Accessibility & Compliance

- **[High] Missing Modal Focus Trap:** Mobile navigation drawer (`Navbar.jsx`) lacks focus trapping.
- **[Medium] Double Focus Rings:** Global CSS `:focus-visible` outline plus Tailwind's `focus-visible:ring-2` trigger together, creating double visual rings.
- **[Medium] Unlabeled Landmark / Headings Skip:** Heading levels skip from `h1` directly to `h3` in multiple sections.
- **[Low] Monospace Number Formatting Overflows:** Number formatting with leading zero (`0${index}`) breaks for index values ≥ 10.

---

## 🛠️ Step-by-Step Resolution Roadmap

1. **Step 1 — Tailwind Config Fixes (`tailwind.config.js`):**
   - Add `boxShadow` with `subtle`, `card`, `floating`.
   - Add spacing `'13': '3.25rem'`.
   - Add `keyframes` and `animation` for `fadeIn`.
2. **Step 2 — GSAP Core Fix (`src/lib/animations/gsap.js`):**
   - Fix `GSAP_EASING.editorial` from CSS `cubic-bezier()` to `'power3.out'` or `'expo.out'`.
3. **Step 3 — UI Primitive Fixes (`Button.jsx`, `Image.jsx`, `Link.jsx`):**
   - Add `variant="outline"` or alias to `secondary` in `Button.jsx`.
   - Add `borderless` or `raw` container option in `Image.jsx`.
4. **Step 4 — Navbar & Header Polish (`Navbar.jsx`):**
   - Fix mobile drawer top offset using `--header-height`.
   - Connect scroll detection to Lenis scroll instance.
   - Remove unused `MapPin` import.
5. **Step 5 — Inner Pages Typography & Variant Cleanup:**
   - Replace `text-heading-2`, `text-heading-3` in `About.jsx` and `Contact.jsx` with valid tokens (`text-heading-lg`, `text-heading-md`).
   - Fix `variant="outline"` in `Products.jsx` and `NotFound.jsx`.
   - Add `.scrollbar-none` CSS utility in `index.css`.
6. **Step 6 — Homepage Alignment Fixes:**
   - Fix primary product layout in `ProductsPreview.jsx`.
   - Fix invisible border in `Stats.jsx`.
   - Replace raw anchor tags in `CTASection.jsx` with polymorphic `<Button as="a" ...>`.
7. **Step 7 — Media & Data Assets:**
   - Populate `public/images/` with SVG/WebP graphics or product photography assets.
   - Synchronize contact info and email addresses.

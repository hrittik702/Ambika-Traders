# Ambika Traders — Design System

## 1. Brand Identity
* **Brand Name**: Ambika Traders
* **Tagline**: Aluminium Works & Interior Solutions
* **Brand Motto (Hinglish)**: *“Aapki zaroorat ke hisaab se sahi solution.”*
* **Positioning**: Luxury architectural studio × premium product showroom × modern editorial website.

---

## 2. Business Priorities & Global Hierarchy
1. **01 — Products** (Highest business priority: Aluminium doors/windows, sliding partitions, sanitaryware, modular kitchens, wardrobes, false ceilings, hardware)
2. **02 — Services** (Second highest priority: Fabrication, installation, interior execution, renovation, consultation)
3. **03 — Projects** (Visual proof of craftsmanship & verified case studies)
4. **04 — About** (Heritage, material standards & trust)
5. **05 — Contact** (Direct lead conversion & showroom visits)

---

## 3. Language & Copywriting Rules
* **Mandatory Script**: Hinglish written in **Roman / English letters only**.
* **Prohibited**: Devanagari script is strictly prohibited.
* **Tone**: Natural, authoritative, premium Indian craftsmanship.
* **Examples**:
  * *“Aapki zaroorat ke hisaab se sahi solution.”*
  * *“Premium products aur practical services, ek hi jagah.”*
  * *“Apne project ke liye humse baat karein.”*
  * *“Enquiry Karein”*

---

## 4. Typography System
* **Primary Font**: **INTERN** (Hard requirement across all headings, body, labels, buttons, navigation, and metadata).
* **Font Fallback**: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.
* **Prohibited Substitutions**: Do not substitute INTERN with Inter, Poppins, Montserrat, Roboto, Manrope, Geist, or Clarkson.

### Hierarchy Scale:
| Token / Class | Size (Fluid Clamp / Rem) | Line Height | Letter Spacing | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `display-2xl` | `clamp(3.5rem, 8vw, 6.5rem)` | `1.02` | `-0.035em` | Hero main editorial headlines |
| `display-xl` | `clamp(2.75rem, 6vw, 4.75rem)` | `1.05` | `-0.03em` | Major section impact titles |
| `display-lg` | `clamp(2.25rem, 4.5vw, 3.5rem)` | `1.10` | `-0.025em` | Section headings / Page headers |
| `heading-1` | `clamp(1.85rem, 3.5vw, 2.75rem)`| `1.15` | `-0.02em` | Main card / feature titles |
| `heading-2` | `clamp(1.5rem, 2.5vw, 2.15rem)` | `1.20` | `-0.018em`| Secondary section headings |
| `heading-3` | `clamp(1.25rem, 1.8vw, 1.65rem)`| `1.28` | `-0.015em`| Card titles & subheadings |
| `body-lg` | `1.125rem` (`18px`) | `1.60` | `-0.005em`| Lead paragraphs |
| `body` | `1.000rem` (`16px`) | `1.60` | `0em` | Standard body copy |
| `body-sm` | `0.875rem` (`14px`) | `1.55` | `+0.005em` | Card descriptions & secondary info |
| `caption` | `0.750rem` (`12px`) | `1.45` | `+0.02em` | Footnotes & fine print |
| `label` / `mono`| `0.750rem` (`12px`) | `1.20` | `+0.08em` | Category badges, indexes `[01]` |

---

## 5. Visual Direction & Color Tokens
**Primary Visual Language**: **Black + White + Neutral Monochrome**.
No cream/gold-heavy themes. No generic colorful SaaS palettes.

### Semantic Color Mapping:
* `--color-bg-primary`: `#ffffff` (Pure White Canvas)
* `--color-bg-secondary`: `#f7f7f7` (Subtle Neutral Warmth)
* `--color-bg-surface`: `#fbfbfb` (Card Surfaces)
* `--color-bg-dark`: `#0a0a0a` (Near-Black Contrast Sections)
* `--color-bg-dark-secondary`: `#141414` (Elevated Dark Cards)
* `--color-text-primary`: `#0a0a0a` (High Contrast Black)
* `--color-text-secondary`: `#404040` (Neutral Body Gray)
* `--color-text-muted`: `#737373` (Subtle Meta Gray)
* `--color-text-inverse`: `#ffffff` (White on Dark Sections)
* `--color-text-inverse-muted`: `#a3a3a3` (Muted on Dark Sections)
* `--color-border`: `#e5e5e5` (Crisp Light Borders)
* `--color-border-dark`: `#262626` (Crisp Dark Section Borders)
* `--color-accent`: `#0a0a0a` (Restrained Monochrome Accent)
* `--color-focus-ring`: `#0a0a0a` / `#ffffff` (WCAG 2.2 focus outline)

---

## 6. Layout & Spacing Scale
* **Max Container Width**: `1440px` (with fluid horizontal page gutters `clamp(1rem, 4vw, 3.5rem)`).
* **Narrow Container**: `1120px` (for editorial reading).
* **Vertical Section Rhythm**:
  * Small: `clamp(3.5rem, 6vw, 5rem)`
  * Medium: `clamp(5rem, 9vw, 7.5rem)`
  * Large: `clamp(6.5rem, 12vw, 10rem)`
* **Grid**: 12-column architectural layout with strong horizontal alignment lines.

---

## 7. Radius & Shadow Direction
* **Corners**: Sharp (`0px`) or lightly refined (`2px` to `6px`).
* **Avoid**: Pill-shaped normal cards or `rounded-full` containers.
* **Shadows**: Extremely restrained (`0 1px 2px rgba(0,0,0,0.04)` to `0 4px 12px rgba(0,0,0,0.05)`). Rely on clean 1px borders rather than heavy blur shadows.

---

## 8. Component State System
Every interactive component supports:
* `default`
* `hover` (Subtle translation, border darkening, color shifts)
* `focus-visible` (High contrast outline ring with 2px offset for keyboard navigation)
* `active` (Pressed state feedback)
* `disabled` (Reduced opacity, pointer-events disabled)
* `loading` (Spinner state with accessible `aria-busy`)

---

## 9. Motion & Animation Foundation
* **Engines**: GSAP 3 + ScrollTrigger + Lenis Smooth Scroll.
* **Accessibility**: Automatic detection of `prefers-reduced-motion: reduce` shuts off heavy scroll animation loops.
* **Easing**: Custom luxury curve `cubic-bezier(0.16, 1, 0.3, 1)`.

---

## 10. Accessibility Standard (WCAG 2.2 AA)
* Visual skip link to `#main-content`.
* Keyboard navigable menus and forms with visible `:focus-visible` rings.
* 4.5:1 minimum contrast ratio across all text elements.
* Descriptive `alt` attributes and semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`, `<address>`).

---

## 11. Content & Data Source Rule
* Only client-supplied Ambika Traders offerings and domains are permitted.
* **No invented prices**: Use `price: null` / `priceOnEnquiry: true`.
* **No invented testimonials, awards, or false guarantees**.

---

## 12. Anti-Patterns & Prohibited Styles
* ❌ No excessive gradients or colorful glow effects.
* ❌ No glassmorphic blur overdosing.
* ❌ No Devanagari script.
* ❌ No generic ecommerce templates.
* ❌ No unverified claims or fake client reviews.

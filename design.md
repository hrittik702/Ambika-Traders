# Ambika Traders — Design System (Stage 02)

## 1. Brand Identity & Strategy
* **Brand Name**: Ambika Traders
* **Tagline**: Aluminium Works & Interior Solutions
* **Brand Motto (Hinglish)**: *“Aapki zaroorat ke hisaab se sahi solution.”*
* **Positioning**: Luxury architectural studio × premium product showroom × modern editorial publication.
* **Tone**: Natural, authoritative, confident, concise, premium Indian craftsmanship.

---

## 2. Business Priorities & Global Hierarchy
1. **01 — Products** (Highest business priority: Aluminium doors/windows, sliding partitions, sanitaryware, modular kitchens, wardrobes, false ceilings, hardware)
2. **02 — Services** (Second highest priority: Custom fabrication, installation, interior execution, renovation, consultation)
3. **03 — Projects** (Visual proof of craftsmanship & verified case studies)
4. **04 — About** (Heritage, material standards & trust)
5. **05 — Contact** (Direct lead conversion & showroom visits)

---

## 3. Language & Copywriting Rules
* **Mandatory Script**: Hinglish written in **Roman / English letters only**.
* **Prohibited**: Devanagari script is strictly prohibited.
* **Examples**:
  * *“Aapki zaroorat ke hisaab se sahi solution.”*
  * *“Premium products aur practical services, ek hi jagah.”*
  * *“Apne project ke liye humse baat karein.”*
  * *“Enquiry Karein”*
  * *“Products dekhein”*
  * *“Services explore karein”*

---

## 4. Typography System (INTERN)
* **Primary Font**: **`INTERN`** (Mandatory across all headings, body, labels, buttons, navigation, and metadata).
* **Font Fallback**: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.
* **Prohibited Substitutions**: Inter, Poppins, Montserrat, Roboto, Manrope, Geist, or Clarkson must NOT be committed as the design font.

### Finalized Typography Hierarchy Scale:
| Token / Level | Fluid Clamp / Size | Line Height | Tracking | Purpose & Usage |
| :--- | :--- | :--- | :--- | :--- |
| `display-2xl` | `clamp(3.5rem, 8vw, 6.5rem)` | `1.02` | `-0.035em` | Hero main editorial headlines |
| `display-xl` | `clamp(2.75rem, 6.5vw, 5.25rem)` | `1.05` | `-0.03em` | Impact section hero titles |
| `display-lg` | `clamp(2.25rem, 4.5vw, 3.75rem)` | `1.08` | `-0.025em` | Major page headings |
| `display-md` | `clamp(1.85rem, 3.5vw, 2.75rem)` | `1.15` | `-0.02em` | Section headings |
| `heading-xl` | `clamp(1.75rem, 3vw, 2.5rem)` | `1.18` | `-0.02em` | Main card / feature titles |
| `heading-lg` | `clamp(1.4rem, 2.2vw, 2rem)` | `1.22` | `-0.018em` | Secondary section headers |
| `heading-md` | `clamp(1.2rem, 1.6vw, 1.55rem)` | `1.28` | `-0.015em` | Card titles & subheadings |
| `heading-sm` | `1.125rem` (`18px`) | `1.35` | `-0.01em` | Compact feature headers |
| `body-lg` | `1.125rem` (`18px`) | `1.65` | `-0.005em` | Lead paragraphs (max 65ch width) |
| `body-md` / `body` | `1.000rem` (`16px`) | `1.60` | `0em` | Standard body copy (55-75ch width) |
| `body-sm` | `0.875rem` (`14px`) | `1.55` | `+0.005em` | Card descriptions & secondary info |
| `eyebrow` | `0.750rem` (`12px`) | `1.20` | `+0.12em` | Numbered indexes `[01]` & section tags |
| `label` | `0.750rem` (`12px`) | `1.20` | `+0.08em` | Form labels and architectural tags |
| `caption` | `0.750rem` (`12px`) | `1.45` | `+0.02em` | Footnotes & metadata |
| `nav` / `button` | `0.875rem` (`14px`) | `1.25` | `-0.01em` | Navigation items and button text |

---

## 5. Global Color System
**Primary Visual Language**: **Black + White + Neutral Monochrome**.
No cream/gold dominance. No generic SaaS colors.

### Semantic Color Mapping:
* `--color-bg-primary`: `#ffffff` (Pure Crisp White)
* `--color-bg-secondary`: `#f5f5f3` (Subtle Warm-Neutral White)
* `--color-bg-surface`: `#fbfbfb` (Card Canvas)
* `--color-bg-muted`: `#f0f0ee` (Neutral Alternating Backdrop)
* `--color-bg-dark`: `#0a0a0a` (Near-Black Contrast Canvas)
* `--color-bg-dark-soft`: `#151515` (Elevated Soft Dark Canvas)
* `--color-text-primary`: `#0a0a0a` (Near-Black Typography)
* `--color-text-secondary`: `#4a4a4a` (Refined Body Gray)
* `--color-text-muted`: `#777777` (Subtle Metadata)
* `--color-text-inverse`: `#ffffff` (Crisp White on Dark)
* `--color-text-inverse-muted`: `#a3a3a3` (Muted White on Dark)
* `--color-border`: `#dcdcdc` (Crisp 1px Architectural Divider)
* `--color-border-dark`: `#2a2a2a` (Crisp 1px Dark Divider)
* `--color-accent`: `#0a0a0a` (Monochrome Restrained Accent)
* `--color-accent-contrast`: `#ffffff`
* `--color-focus-ring`: `#0a0a0a` / `#ffffff` (WCAG 2.2 focus outline)

---

## 6. Layout, Container & 12-Column Grid System
* **Max Container Width**: `1440px` (with responsive gutters `clamp(1.25rem, 4vw, 3.5rem)`).
* **Narrow Container**: `1120px` (for focused editorial reading).
* **12-Column Grid**: `.grid-12` with responsive `1.5rem` to `2rem` gap.
* **Prose Control**: `.prose-editorial` restricts paragraph line length to `65ch` for optimal reading comfort.

---

## 7. Semantic Section Spacing
* `--section-xs`: `clamp(2rem, 3.5vw, 3rem)`
* `--section-sm`: `clamp(3.5rem, 5vw, 4.5rem)`
* `--section-md`: `clamp(4.5rem, 7vw, 6.5rem)`
* `--section-lg`: `clamp(6rem, 10vw, 8.5rem)`
* `--section-xl`: `clamp(7.5rem, 13vw, 11rem)`

---

## 8. Reusable Component Foundation
* **Navbar**: Global reusable header with utility top bar, active underline indicator, scrolled elevation, and accessible mobile drawer with Escape key listener and body scroll lock.
* **Footer**: High-contrast dark monochrome architectural shell with categorized columns and Hinglish brand callout.
* **PageContainer**: Global layout wrapper with skip-to-content target.
* **Section**: Alternating themes (`light`, `secondary`, `muted`, `dark`, `darkSoft`) with semantic spacing.
* **SectionHeading**: Eyebrow, index `[01]`, main title, description, and action slot with `left`, `center`, and `split` alignments.
* **Button**: Polymorphic component supporting `primary`, `secondary`, `dark`, `ghost`, `text`, `icon`, `inverse`, and `inverseOutline` with hover, active, disabled, loading, and focus-visible states.
* **Image**: Aspect ratio presets (`hero`, `product`, `productSquare`, `service`, `project`), lazy loading, hover scale, and placeholder fallback.
* **Link**: Consistent link component (`nav`, `text`, `arrow`, `external`, `subtle`).
* **Card**: Editorial, image-first card shell with 1px border and minimal radius (`rounded-xs` / `rounded-sm`).
* **Form Primitives**: Accessible `Input`, `Select`, and `Textarea` components with real validation states.

---

## 9. Z-Index Hierarchy
* `--z-base`: `0`
* `--z-content`: `10`
* `--z-sticky`: `20`
* `--z-navbar`: `40`
* `--z-mobile-menu`: `50`
* `--z-modal`: `60`
* `--z-toast`: `70`
* `--z-skip-link`: `100`

---

## 10. Motion & Animation Tokens
* `--motion-instant`: `50ms`
* `--motion-fast`: `150ms`
* `--motion-normal`: `300ms`
* `--motion-slow`: `500ms`
* `--motion-luxury`: `700ms`
* `--ease-standard`: `cubic-bezier(0.4, 0, 0.2, 1)`
* `--ease-emphasized`: `cubic-bezier(0.16, 1, 0.3, 1)`
* `--ease-luxury`: `cubic-bezier(0.16, 1, 0.3, 1)`
* **Accessibility**: Automatic detection of `prefers-reduced-motion: reduce`.

---

## 11. Accessibility Standard (WCAG 2.2 AA)
* Visible skip link to `#main-content`.
* Keyboard navigable interactive controls with 2px `:focus-visible` rings.
* Minimum 4.5:1 contrast across all typography and backgrounds.
* Screen reader landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<address>`).
* Form inputs with explicit labels, `aria-invalid`, and error messages.

---

## 12. Anti-Patterns & Prohibited Styles
* ❌ No excessive gradients or colorful glow effects.
* ❌ No glassmorphic blur overdosing.
* ❌ No Devanagari script.
* ❌ No generic ecommerce templates.
* ❌ No unverified claims or fake client reviews.

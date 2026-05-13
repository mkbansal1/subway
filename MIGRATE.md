# Subway.com to AEM Edge Delivery Services Migration Plan

## Site Overview
- **Source**: https://www.subway.com/en-us (Phoenix version)
- **Target**: AEM Edge Delivery Services with DA (Document Authoring)
- **Total Pages**: 24
- **Locale**: en-us

---

## Page Templates Identified (7 Templates)

### Template 1: Homepage
**Pages**: 1
- `/en-us`

**Structure**: Hero banner (full-width image + overlay heading + description + CTA) → Promo card (Sub Club) → Menu category grid (image+title links) → Promotional banner (EA Sports) → Dual card list (Gift Cards + Catering) → Footer branding image

---

### Template 2: Menu Listing
**Pages**: 1
- `/en-us/menunutrition/menu`

**Structure**: Page heading with reorder description → Category card grid (14 items: image + title links) → Standard footer

---

### Template 3: Marketing Landing Page
**Pages**: 4
- `/en-us/rewards` — Hero + benefits list (3 items) + links section + join CTA bar
- `/en-us/subwaycard` — Hero carousel (2 slides) + reload section + balance inquiry + bulk order + T&C section
- `/en-us/catering` — Hero + icon benefits row (5 items) + product cards (3 items)
- `/en-us/careers` — Hero (image+text) + image-text cards (2 items) + values section

**Common Pattern**: Hero section → Feature/benefit content → Additional sections → CTA

---

### Template 4: About / Corporate Page
**Pages**: 2
- `/en-us/aboutus` — Hero + text sections + image-text cards + CTA banner
- `/en-us/aboutus/history` — Hero + narrative text + related video cards + interactive timeline + CTA banner

---

### Template 5: Legal / Policy (Long-form Text)
**Pages**: 8
- `/en-us/privacy/privacy-policy`
- `/en-us/privacy/state-privacy-notice`
- `/en-us/legal/terms-of-use`
- `/en-us/legal/order-terms`
- `/en-us/legal/subway-card`
- `/en-us/legal/rewards`
- `/en-us/legal/kiosk-terms`
- `/en-us/legal/accessibility`

**Structure**: H1 heading → Long-form rich text body. No blocks — pure default content.

---

### Template 6: Sustainability Hub
**Pages**: 1
- `/en-us/sustainability`

**Structure**: Hero banner → Intro text section → Image-text cards with sub-links → Featured image-text banner → CTA banner

---

### Template 7: Sustainability Sub-page (Tabbed)
**Pages**: 7
- `/en-us/sustainability/building-stronger-communities/serving-our-communities`
- `/en-us/sustainability/building-stronger-communities/our-people`
- `/en-us/sustainability/preserve-our-planet/climate-and-conservation`
- `/en-us/sustainability/preserve-our-planet/responsible-sourcing`
- `/en-us/sustainability/well-being/quality-and-food-safety`
- `/en-us/sustainability/well-being/fresh-fit-for-kids`
- `/en-us/sustainability/well-being/better-living`

**Structure**: Hero banner (shared parent heading) → Tab navigation (sibling pages) → Rich text content with images → Expandable/accordion topic groups → Disclaimer text → CTA banner

---

## Blocks Inventory (12 Blocks)

| # | Block | Variant(s) | Description | Used On |
|---|-------|-----------|-------------|---------|
| 1 | **Hero** | `hero`, `hero (overlay)` | Full-width image with overlaid heading, description, CTA button(s) | Homepage, Rewards, Catering, Careers, About Us, History, Sustainability pages |
| 2 | **Cards** | `cards (menu-grid)` | Image + title link grid for menu categories | Homepage, Menu |
| 3 | **Cards** | `cards (promo)` | Image + heading + description + CTA card | Homepage (Sub Club, promo cards), About Us, Sustainability hub, Careers |
| 4 | **Carousel** | `carousel` | Sliding hero panels with navigation dots and pause/play | Subway Card |
| 5 | **Columns** | `columns` | Side-by-side image + text + CTA | About Us, Subway Card (reload, bulk order sections) |
| 6 | **CTA Banner** | `cta-banner` | Image + text + button promotional strip | Homepage (EA Sports), reusable "Order Now" across many pages |
| 7 | **Icon List** | `icon-list` | Small icon + text label in horizontal row | Catering (5 benefits) |
| 8 | **Benefits** | `benefits` | Heading + description feature cards | Rewards (3 benefits) |
| 9 | **Tabs** | `tabs (navigation)` | Horizontal tab navigation for sibling pages | Sustainability sub-pages |
| 10 | **Accordion** | `accordion` | Expandable/collapsible content sections | Sustainability sub-pages (topic groups) |
| 11 | **Timeline** | `timeline` | Interactive era buttons + year milestones with images and horizontal scroll | History page (custom block) |
| 12 | **Video Card** | `video-card` | Thumbnail with play button + title + description | History page (tribute videos) |

---

## Shared Fragments (3 Fragments)

| Fragment | Description |
|----------|-------------|
| **Header** | Subway logo, hamburger navigation menu, sign-in link, shopping bag icon with item count |
| **Footer** | "Get To Know Us" collapsible links (Our Food, Our Planet, Our People, Careers), Franchise/Cares/Feed links, language selector, legal links row (Privacy, Terms, Accessibility, Cookie Settings, DNSMPI, FAQs, Unsubscribe), copyright text, social media icons (Facebook, X, Instagram, YouTube), app store badges (Apple, Google Play) |
| **CTA Banner — Order Now** | Reusable "Order how you want, when you want" with image + CTA button — appears on About Us, Sustainability hub, and all 7 sustainability sub-pages |

---

## Design Tokens / Theme

| Token | Value |
|-------|-------|
| **Primary Green** | #008C15 (Subway brand green) |
| **Dark Green** | #006400 (CTA buttons, active states) |
| **Yellow/Gold** | #FFC600 (accents, highlights) |
| **Background White** | #FFFFFF |
| **Background Cream** | #F5F0EB (warm beige sections) |
| **Text Dark** | #1B1B1B |
| **Font Family** | Custom Subway brand font (SubwayFootlong / equivalent) + system fallbacks |
| **Button Style** | Rounded pill/capsule, green background, white text, hover darkens |
| **Card Style** | Rounded corners (~12px), subtle box-shadow, white background |
| **Responsive Breakpoints** | Mobile-first: 600px (tablet), 900px (desktop), 1200px (wide) |

---

## Key Considerations & Risks

1. **Timeline Block (History page)** — Most complex custom block. Has decade selectors, year buttons, horizontal scrolling milestones with images. Requires dedicated JS decoration and careful responsive handling.

2. **Tab Navigation (Sustainability)** — Sub-pages use sibling-page tab navigation. In EDS, implement as a Tabs block that links between actual pages (server-side navigation) rather than client-side tab switching.

3. **Carousel** — Only used on Subway Card page. Evaluate if a lightweight carousel is worth building vs. simplifying to a static hero.

4. **External Service Links** — Many CTAs link to external platforms (ezcater.com for catering, buyatab.com for gift cards, app stores, ServiceNow for FAQs). Preserve all external URLs as-is.

5. **Legal Pages (8 pages)** — Pure long-form text with no blocks. Simplest and fastest to migrate as default content. Good candidates for early wins.

6. **Cookie Consent (OneTrust)** — Site uses OneTrust for cookie/privacy consent banner. Must be configured in `delayed.js` for the EDS project.

7. **Analytics** — Current site uses Adobe Launch / Quantum Metric. Plan for martech integration in `delayed.js`.

8. **Accordion Content** — Sustainability sub-pages have expandable topic sections (e.g., "Waste", "Packaging Sustainability", "Human Rights & Modern Slavery"). Content inside may need to be fetched or authored inline.

---

## Migration Phases

### Phase 1: Foundation Setup — COMPLETED (commit `cf6fdb8`)
- [x] Initialize DA project with EDS boilerplate
- [x] Extract and configure design tokens as CSS custom properties in `styles/styles.css`
  - Subway brand colors: `--green-primary: #068332`, `--green-dark: #03421c`, `--cream: #fff6e9`, `--cream-dark: #f8ead8`
  - Pill-shaped buttons (`border-radius: 9999px`), font-weight 600, green primary/secondary variants
- [x] Set up font files and `styles/fonts.css`
  - Downloaded 5 Subway Sans woff2 files: Regular (400), Medium (500), Semibold (600), Bold (700), Condensed Bold (700)
  - Configured `@font-face` declarations with `font-display: swap`
- [x] Configure responsive breakpoints (mobile-first: 600px / 900px / 1200px)
- [x] Style Header block with Subway green navigation (`blocks/header/header.css`)
- [x] Style Footer block with dark green background + cream text (`blocks/footer/footer.css`)
- [x] Style Hero block with overlay text + responsive min-heights (`blocks/hero/hero.css`)
- [ ] Build Header fragment content (logo, hamburger nav, sign-in, cart) — *content authoring pending*
- [ ] Build Footer fragment content (all link groups, social icons, app badges, legal links) — *content authoring pending*
- [ ] Create reusable CTA Banner "Order Now" fragment — *deferred to Phase 2*

### Phase 2: Core Blocks Development — COMPLETED (commit `5bc9a63`)
- [x] Hero block — OOTB JS with `no-image` variant + Subway overlay CSS
- [x] Cards block — OOTB JS + Subway rounded cards + `menu-grid` variant (circular images for menu categories)
- [x] Cards block — promo variant styling (rounded corners, hover shadow, CTA)
- [x] Columns block — OOTB JS + Subway styling (rounded images, 32px desktop gap)
- [x] CTA Banner block — **new block** for promotional strips (image + text + button)
- [x] Benefits block — **new block** for feature cards (heading + description grid, 3-col on desktop)

### Phase 3: Specialized Blocks Development
- [ ] Carousel block — sliding panels with dots + pause/play controls
- [ ] Icon List block — horizontal icon + label row
- [ ] Tabs block — navigation linking between sibling pages
- [ ] Accordion block — expandable/collapsible content sections
- [ ] Timeline block — interactive era/year milestones with horizontal scroll (custom JS)
- [ ] Video Card block — thumbnail + play button + description overlay

### Phase 4: Content Migration — High-Priority Pages
- [ ] Homepage (`/en-us`)
- [ ] Menu page (`/en-us/menunutrition/menu`)
- [ ] Rewards page (`/en-us/rewards`)
- [ ] Subway Card page (`/en-us/subwaycard`)
- [ ] Catering page (`/en-us/catering`)
- [ ] Careers page (`/en-us/careers`)

### Phase 5: Content Migration — Corporate & Legal
- [ ] About Us page (`/en-us/aboutus`)
- [ ] History page (`/en-us/aboutus/history`)
- [ ] Privacy Policy (`/en-us/privacy/privacy-policy`)
- [ ] State Privacy Notice (`/en-us/privacy/state-privacy-notice`)
- [ ] Terms of Use (`/en-us/legal/terms-of-use`)
- [ ] Order Terms (`/en-us/legal/order-terms`)
- [ ] Subway Card Terms (`/en-us/legal/subway-card`)
- [ ] Rewards Terms (`/en-us/legal/rewards`)
- [ ] Kiosk Terms (`/en-us/legal/kiosk-terms`)
- [ ] Accessibility Statement (`/en-us/legal/accessibility`)

### Phase 6: Content Migration — Sustainability
- [ ] Sustainability hub (`/en-us/sustainability`)
- [ ] Serving Our Communities (`/en-us/sustainability/building-stronger-communities/serving-our-communities`)
- [ ] Our People (`/en-us/sustainability/building-stronger-communities/our-people`)
- [ ] Climate and Conservation (`/en-us/sustainability/preserve-our-planet/climate-and-conservation`)
- [ ] Responsible Sourcing (`/en-us/sustainability/preserve-our-planet/responsible-sourcing`)
- [ ] Quality and Food Safety (`/en-us/sustainability/well-being/quality-and-food-safety`)
- [ ] Fresh Fit For Kids (`/en-us/sustainability/well-being/fresh-fit-for-kids`)
- [ ] Better Living (`/en-us/sustainability/well-being/better-living`)

### Phase 7: Design, QA & Launch Readiness
- [ ] Apply full design token styling across all blocks and templates
- [ ] Visual comparison of every page against original site
- [ ] Responsive testing across mobile, tablet, and desktop viewpoints
- [ ] Accessibility audit (WCAG 2.1 AA compliance)
- [ ] Performance validation (target Lighthouse score of 100)
- [ ] Configure OneTrust cookie consent in `delayed.js`
- [ ] Configure analytics (Adobe Launch) in `delayed.js`
- [ ] Final cross-browser testing

---

## Checklist Summary

- [x] **Foundation**: DA project setup, design tokens, fonts, header/footer/hero block styling (commit `cf6fdb8`)
- [x] **Core Blocks (6)**: Hero, Cards (x2 variants), Columns, CTA Banner, Benefits (commit `5bc9a63`)
- [ ] **Specialized Blocks (6)**: Carousel, Icon List, Tabs, Accordion, Timeline, Video Card
- [ ] **Content Migration**: 24 pages across 7 templates
- [ ] **Import Infrastructure**: Parsers and transformers for automated content import
- [ ] **Design QA**: Visual fidelity, responsive, accessibility, performance
- [ ] **Martech**: Cookie consent (OneTrust) + Analytics (Adobe Launch)

# Nexora — Enterprise Intelligence & Operations Suite

Nexora is a unified, high-performance web platform combining real-time financial analytics, order ledger management, editorial publications, collaborative community discussions, and a 7-tool developer suite.

Built with **React 19, TypeScript, Vite, and Tailwind CSS**, adhering to the official **Nexora Design System (`DESIGN.md`)**.

---

## 🌟 Architecture & Features

### 1. ⚡ Landing Experience (`/` or Home)
- **Live Stream Counter**: Animated real-time gross revenue processing with verifiable dollar precision.
- **Interactive Workflow Architecture**: 3-step visualization (Connect & Ingest → Model & Automate → Deliver & Scale).
- **Executive Testimonials & Social Proof**: Clean, readable feedback cards.
- **Transparent Pricing Calculator**: Monthly vs Annual toggle with automatic 20% discount calculations.

### 2. 📊 Reconciled Analytics Dashboard (`/admin` or Dashboard)
- **Reconciled Financial KPIs**:
  - Net Revenue: Float-accurate summation with dollar formatting (`$XX,XXX.XX`).
  - Total Orders: Categorized by Paid, Pending, and Refunded.
  - Average Order Value: Reconciled against total order volume.
  - Total Items Sold: Accurate integer summation (fixing legacy string concatenation bugs).
- **High-Contrast SVG Visualizations**:
  - Sales by Product Category with distinct 8-color palette.
  - Order Status Distribution Donut & Health Bar.
- **Enterprise Orders Table**:
  - Live search across Order ID, Customer Name, Email, and Product.
  - Filter by Status (Paid, Pending, Refunded) and Category.
  - Multi-column sorting (Date, Amount, Quantity, Customer).
  - Configurable pagination (10, 15, 25, 50 rows per page).
  - Modal drawer with full order audit notes.
  - Delete Order confirmation with deterministic ID filtering.
  - Real CSV Exporter (`.csv` download with RFC escaping and UTF-8 BOM).

### 3. 📖 The Journal (`/blog` or Blog)
- **High-Readability Editorial Layout**: Fluid, responsive type scale with Geist and Inter.
- **Instant Search & Category Filtering**: AI, Blockchain, Engineering, Design, and Life.
- **Full Article Reader Modal**: Complete essays, key architectural takeaways, and reading time estimation.
- **Persistent Like Counter**: Real numeric increment saved to `localStorage`.
- **Saved Reading List**: Bookmark and share link capabilities.

### 4. 💬 Community & Support (`/contact` or Community)
- **Interactive Discussion Forum**:
  - Real-time thread creation modal with tags (Showcase, Question, Feature Request, Announcement).
  - Thread upvoting and reply threads.
  - Fully sanitized virtual DOM rendering (eliminating legacy XSS vulnerabilities).
- **Humane Contact Form**:
  - Instant validation for Name, RFC-compliant Email, Phone, and Message.
  - Dynamic verification math challenge with refresh option.
  - Asynchronous submission with loading spinner and instant feedback (no synchronous browser freezes).

### 5. 🛠️ Verified Developer Toolkit (`/tools` or Tools)
All 7 tools mathematically verified:
1. **KM ↔ Miles Converter**: Bi-directional conversion ($1\text{ mi} = 1.609344\text{ km}$, $1\text{ km} = 0.621371\text{ mi}$) with precision controls (1, 2, 4 decimal places).
2. **BMI Calculator**: Metric (cm/kg) & Imperial (ft+in/lbs) with official WHO classifications (Underweight, Normal, Overweight, Obese) and visual gauge indicator.
3. **Tip & Bill Splitter**: Custom tip percentage or presets (10%, 15%, 18%, 20%), bill splitting between $N$ people, and per-person breakdown.
4. **Live Currency Converter**: Real global exchange matrix across 10 currencies (USD, EUR, GBP, INR, JPY, CAD, AUD, CHF, SGD, BTC) with inverse swap button.
5. **Cryptographic Password Generator**: Configurable length slider (8–64), character set toggles, cryptographic entropy score (bits), strength meter, and one-click copy.
6. **Exact Age & Milestone Calculator**: Years, months, and days breakdown, days until next birthday countdown, and total days lived.
7. **WCAG 2.1 Contrast Checker**: Computes relative luminance and contrast ratio ($CR = \frac{L_1 + 0.05}{L_2 + 0.05}$) with compliance tests for AA/AAA Normal and Large text, and live typography preview.

---

## 🎨 Design System Compliance (`DESIGN.md`)

- **Typography**: `Geist` (UI & headings), `Geist Mono` (code & data numbers).
- **Color Tokens**:
  - Dark Mode: `--bg`: `#0b0d12`, `--surface`: `#141821`, `--text`: `#e6e8ee`, `--text-muted`: `#a3a9b7`
  - Light Mode: `--bg`: `#f8fafc`, `--surface`: `#ffffff`, `--text`: `#0f172a`, `--text-muted`: `#475569`
  - Brand Accent: `--brand`: `#3b82f6` (Blue)
- **Accessibility**: Visible focus rings (`focus-visible:ring-2`), WCAG AAA compliant text contrast, semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`), zero screen freezes.
- **Responsiveness**: Tested from 360px mobile to 768px tablet and 1440px desktop.

---

## 🚀 Development & Verification

```bash
# Start development server
npm run dev

# Run TypeScript linter
npm run lint

# Build production bundle
npm run build
```

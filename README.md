# Amazon Clone UI - Modern Responsive E-Commerce Frontend

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Design-Responsive%20Grid%20%26%20Flexbox-success?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://ganesh-badar.github.io/amazon-clone-ui/)

> A high-fidelity, responsive Amazon homepage clone built using modern **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)**. Designed with a modular, **CMS-ready content architecture**, real-time search filtering, accessible modals, and an interactive shopping cart with `localStorage` persistence.

---

## 🌐 Live Demo & Preview
- **Live Website:** [https://ganesh-badar.github.io/amazon-clone-ui/](https://ganesh-badar.github.io/amazon-clone-ui/)
- **Repository:** [https://github.com/ganesh-badar/amazon-clone-ui](https://github.com/ganesh-badar/amazon-clone-ui)

---

## 🎯 Alignment with Core Industry & Role Requirements

This project directly demonstrates the core technical proficiencies and engineering practices expected for frontend, web authoring, and web operations roles:

| Required Skill | Implementation in Project |
| :--- | :--- |
| **HTML5 & Semantic Markup** | Implemented clean HTML5 semantic hierarchy (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`), ARIA attributes (`aria-label`, `role="dialog"`, `aria-hidden`), and SEO-ready meta tags. |
| **CSS3 & Responsive Layouts** | Fluid grid and flexbox layout with custom properties (CSS variables), smooth transitions, hover elevations, and multi-breakpoint media queries supporting Mobile (≤600px), Tablet (≤900px), and Desktop (1200px+). |
| **Vanilla JavaScript (ES6+)** | Complete DOM manipulation, debounced search filtering, event delegation, slide-out drawer animations, and state management without external dependencies. |
| **Content Management Systems (CMS) & Web Authoring** | Architected with a decoupled, structured data schema (`CATALOG_DATA`). Reusable component templates allow non-technical authors to update product cards, badges, and promos just like headless CMS blocks. |
| **Routine Problem-Solving** | Solved layout shifting, box-sizing border bugs, cross-device responsiveness, keyboard accessibility (ESC key dismissal), and persistent cart storage across browser refreshes. |
| **Code Quality & Documentation** | Modular, well-commented code following clean code standards and strict separation of concerns (HTML structure, CSS presentation, JS behavior). |

---

## ✨ Key Features

### 1. 🔍 Real-Time Search & Category Filter
- Dynamic real-time search input filtering product boxes as the user types.
- Category dropdown (`Electronics`, `Home & Kitchen`, `Beauty & Health`, `Fashion`, `Fitness`, `Toys & Games`) to isolate specific departments.
- Clear search quick-button (`X`) and automatic fallback empty state with a "Reset Filter" trigger.

### 2. 🛒 Interactive Cart & Slide-out Drawer
- Live cart count badge updated in the navigation bar.
- "Add to Cart" quick action on each product card.
- Sliding cart drawer displaying selected items, unit pricing, quantity modifiers (`+` / `-`), item removal, and subtotal calculation.
- Browser `localStorage` integration keeps cart items saved even after page refresh.

### 3. 📂 Side Navigation Drawer (Amazon "All" Menu)
- Amazon-style sliding navigation drawer activated via the hamburger icon (`All`).
- Department shortcuts that automatically filter the product catalog and scroll into view.
- Dimmed backdrop overlay and keyboard `Escape` key dismissal.

### 4. 📍 Delivery Location & Pincode Modal
- Interactive "Deliver to" modal allowing users to switch countries or enter custom postal codes.
- Persists selected delivery region in `localStorage` and updates the navbar badge instantly.

### 5. 🌐 Language Switcher Dropdown
- Working language dropdown toggle supporting English (EN), Spanish (ES), Hindi (HI), and French (FR).
- Active state indicators and outside-click dismiss behavior.

### 6. 📱 Fluid Multi-Device Responsiveness
- **Desktop (1200px+):** 4-column balanced product grid with full navigation controls.
- **Tablet (600px - 900px):** 2-column grid with condensed toolbar and optimized touch targets.
- **Mobile (<600px):** Single-column stacked product cards with sticky search bar and drawer-accessible secondary links.

---

## 🏗️ Project Architecture & File Structure

```
amazon-clone-ui/
├── index.html            # Main semantic HTML5 markup & accessible structure
├── style.css             # Modern CSS3 stylesheet with design tokens & media queries
├── app.js                # Vanilla JS ES6+ logic (Cart, Search, CMS Schema, Modals)
├── amazon_logo.png       # Amazon brand logo asset
├── hero_image.jpg        # Homepage hero banner background
├── box1_image.jpg ...    # Product catalog images (box1 through box12)
├── Amazon-Web-Clone/     # Preserved legacy subfolder for backwards compatibility
└── README.md             # Project documentation and technical overview
```

---

## 🛠️ CMS & Website Authoring Structure

To emulate how modern **Content Management Systems (CMS)** author website content, the product grid is powered by a structured JSON schema:

```javascript
const CATALOG_DATA = [
  {
    id: 1,
    title: 'Refresh your space',
    category: 'Home',
    image: 'box1_image.jpg',
    badge: 'Popular',
    price: 29.99,
    rating: 4.7,
    reviews: '1.2k'
  },
  // Additional modular content blocks...
];
```

This decoupled pattern ensures:
1. **Easy Content Authoring:** Content managers can change banners, prices, or product titles without editing HTML templates.
2. **Headless CMS Ready:** The catalog rendering function can effortlessly hook into REST or GraphQL endpoints (e.g. Strapi, Contentful, WordPress REST API).

---

## 🚀 Getting Started Locally

No complex build tools or dependencies required.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ganesh-badar/amazon-clone-ui.git
   cd amazon-clone-ui
   ```

2. **Open `index.html` in your favorite browser:**
   - On Windows: Double-click `index.html` or run:
     ```powershell
     Start-Process index.html
     ```
   - Using VS Code: Right-click `index.html` and select **"Open with Live Server"**.

---

## 👨‍💻 Author

**Ganesh Badar**
- **GitHub:** [@ganesh-badar](https://github.com/ganesh-badar)
- **Portfolio:** [ganesh-badar.github.io](https://ganesh-badar.github.io)

---

## 📄 License
This project is an educational UI clone created for portfolio demonstration and skill showcase purposes. All Amazon logos and trademarks are property of Amazon.com, Inc.

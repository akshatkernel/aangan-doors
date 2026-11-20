# AANGAN DOORS — Digital Showroom & Workshop Administration

A premium, modern wooden door manufacturing business website for **AANGAN DOORS** based in **Bhopal, Madhya Pradesh, India**. 

Built with React, Vite, Tailwind CSS, and Lucide React, combining traditional architectural woodwork aesthetics with a functional local demo Admin Panel.

---

## 1. Project Overview

- **Brand Name:** AANGAN DOORS
- **Specialization:** Premium Wooden Doors, CNC Carved Wooden Doors, Custom Architectural Manufacturing, Designer Entrance Doors, Traditional Doors, Interior Doors
- **Manufacturing Technology:** Multi-Axis CNC Machinery & Hand Craftsmanship
- **Location:** Bhopal, Madhya Pradesh, India
- **Primary Inquiry Channel:** WhatsApp (+91 7879626597)
- **Business Model:** Inquiry-based digital showroom (no online shopping cart/checkout; inquiries lead directly to formatted WhatsApp chats)

---

## 2. Technology Stack

| Technology | Purpose |
|---|---|
| **React 19** | Modern UI library with component architecture |
| **Vite 6** | Ultra-fast build tool and development server |
| **Tailwind CSS v4** | Clean architectural styling with custom warm walnut & cream tokens |
| **React Router DOM v7** | Client-side routing with URL search query parameter synchronization |
| **Lucide React** | Lightweight, accessible iconography |
| **React Context API** | Unified state management for Catalog, Wishlist, Website Content, and Settings |
| **Browser LocalStorage** | Modular persistence layer simulating database storage without external backends |

---

## 3. Getting Started & Running Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation

1. Open your terminal and navigate to the project directory:
   ```bash
   cd aangan-doors
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` (or the URL printed in the terminal) in your web browser.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview the production build locally:
   ```bash
   npm run preview
   ```

---

## 4. Admin Login Credentials (Demo Mode)

- **Login URL:** `/admin/login`
- **Username:** `admin`
- **Password:** `Aangan@123`

> **Note on Security:** This project uses browser-only `localStorage` for demo session persistence. It is designed for interactive demonstration and showroom client previews, not for securing actual commercial databases in production.

---

## 5. Main Routes & Site Structure

### Customer-Facing Showroom
- `/` — **Home:** Large photographic hero, brand introduction, 4 collection categories, featured product cards, CNC manufacturing highlight, grounded value propositions, customization CTA, and architectural footer.
- `/collections` — **Collections:** 15-product catalog with live keyword search, category filter tabs, alphabetical/ID sorting, responsive grid, and wishlist toggles.
- `/product/:id` — **Product Details:** Dynamic product view with multi-image gallery, material specifications, bespoke sizing details, related products, and direct WhatsApp inquiry CTA.
- `/production` — **Production:** Editorial overview of timber grading, CAD/CAM planning, CNC multi-axis routing, hand finishing, and quality inspection.
- `/wishlist` — **Wishlist:** Saved door designs with live navbar counter, item removal, and the primary "Send Wishlist to WhatsApp" inquiry feature.
- `/about` — **About:** Authentic brand narrative, core woodworking pillars, and commitment to dimensional stability.
- `/contact` — **Contact:** Workshop details, WhatsApp contact button, and an inquiry form that validates fields and opens a prefilled message directly on WhatsApp.
- `*` — **Not Found (404):** Clean fallback screen with navigation back to Home or Collections.

### Admin Panel
- `/admin/login` — Authentication screen with demo credentials hint.
- `/admin` — **Dashboard:** Real-time LocalStorage counts (Products, Categories, Featured, Wishlist), recent product updates, and quick navigation.
- `/admin/products` — **Product Management:** Searchable table of all door designs, category filter, feature toggle, preview link, and delete modal.
- `/admin/products/new` — **Add Product:** Form with required field validation, duplicate ID protection, and local image upload.
- `/admin/products/edit/:id` — **Edit Product:** Modify any product field or add/remove images.
- `/admin/categories` — **Category Management:** Create, edit, and delete door categories with safety checks to prevent orphan products.
- `/admin/content` — **Website Content:** Live editor for Homepage Hero, Brand Intro, CNC Highlights, About text, and Footer.
- `/admin/settings` — **Website Settings:** Update business identity, phone number, operating hours, and WhatsApp routing destination.

---

## 6. How to Add and Edit Products

1. Sign in to the Admin Panel at `/admin/login`.
2. Navigate to **Products** and click **Add New Product**.
3. Fill in the required fields:
   - **Product Name** (e.g. `Imperial Carve`)
   - **Product ID** (e.g. `AD-016` — must be unique)
   - **Category** (select from existing categories)
   - **Timber Material, Dimensions, Finish, and Descriptions**
   - **Toggles:** Custom Sizing Available & Feature on Homepage
4. **Upload Images:** Click the upload area to select JPG, PNG, or WebP images from your computer.
5. Click **Save New Product**.
6. The new product immediately appears in the Collections page, Homepage (if featured), and Wishlist selectors.

---

## 7. Image Management & Compression

- **Formats Supported:** JPG, JPEG, PNG, WebP.
- **Client-Side Compression:** Uploaded images are compressed in-browser using HTML5 `<canvas>` before being converted to Base64 data URLs. This prevents exceeding the typical 5MB-10MB browser LocalStorage quota.
- **Fallback Imagery:** If an external image link fails or is blocked, every component uses an automated `onError` handler that gracefully swaps in an authentic architectural vector SVG door illustration (`/images/door-fallback.svg`), ensuring zero broken image icons.

---

## 8. WhatsApp Integration Architecture

All WhatsApp interactions are centralized in `src/utils/whatsapp.js`:
- **Default Number:** `+91 7879626597` (Bhopal, MP, India).
- **Target URL:** `https://wa.me/{phone}?text={encodeURIComponent(message)}`.
- **Dynamic Configuration:** Changing the WhatsApp number in `/admin/settings` updates all inquiry buttons across the site immediately.
- **Message Types:**
  - `createProductInquiry(product)`: Prepares inquiry with door name, reference ID, category, timber, and finish.
  - `createWishlistInquiry(products)`: Compiles an itemized list of all shortlisted doors.
  - `createCustomDesignInquiry()`: Requests architectural discussion for bespoke blueprints.
  - `createContactInquiry(formData)`: Prepares the customer's name, phone, and inquiry message.

---

## 9. Deploying to Vercel

This repository is ready for zero-configuration deployment to Vercel:

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. In your Vercel Dashboard, click **Add New Project** and select your repository.
3. Configure the build settings:
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (or `aangan-doors`)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.
5. Client-side routing is supported out-of-the-box. If using deep routes directly on Vercel, a `vercel.json` with a rewrite rule (`"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]`) can be included.

---

## 10. Important Architecture Limitations

1. **Local Demo Persistence:** All product edits, categories, and settings are saved to your browser's `localStorage`. Opening the site in Incognito mode or a different browser will show the initial 15 demo products until re-seeded.
2. **Demonstration Content:** Sample products, descriptions, and manufacturing photographs represent realistic woodworking techniques. Real certifications, machine serial numbers, and customer testimonials have not been fabricated.
3. **No Checkout/Cart:** This is an inquiry-based digital showroom designed to initiate direct WhatsApp discussions, which matches the commercial workflow of custom wooden door manufacturing.

# RYXERMART — Production Website & Service-Commerce Platform

A production-ready website and service-commerce platform engineered specifically for **RyxerMart**, selling professional website development, e-commerce development, and digital web solutions.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Prisma Relational ORM, server-side bcrypt & JWT authentication, Nodemailer SMTP delivery, official WhatsApp click-to-chat integration, and a Google Gemini AI-powered customer guidance chatbot.

---

## Brand Visual Identity

- **Official Brand Colors**:
  - Deep Navy Blue: `#0A2558`
  - Dark Navy Backgrounds: `#061536`
  - Royal Blue Accents: `#0E387A`
  - Brand Violet / Purple: `#6C3CE9`
  - Soft Slate Backgrounds: `#F8FAFC`
  - Clean Whites & Slate Borders: `#FFFFFF` / `#E2E8F0`
- **Logo Asset**: Sourced directly from `Assets/Logo.png` and served via `/images/logo.png`.
- **Aesthetic Principles**: Real Indian web-development business feel — clean, commercial, trustworthy, human-designed. No generic AI templates, no neon cyberpunk, no excessive glassmorphism.

---

## Core System Architecture

```
                    ┌────────────────────────────┐
                    │ Visitor Browser (Desktop / │
                    │ Mobile 320px - 1920px)     │
                    └──────────────┬─────────────┘
                                   │
                   Browse, Search & Add to Cart
                                   │
                                   ▼
                    ┌────────────────────────────┐
                    │ Client-Side Cart (Storage) │
                    └──────────────┬─────────────┘
                                   │
               Submit Order / Enquiry (/api/orders)
                                   │
      ┌────────────────────────────┴────────────────────────────┐
      ▼                                                         ▼
┌───────────────────────────────┐              ┌───────────────────────────────┐
│ Server-Side Price Verification│              │ In-Memory Sliding Rate Limiter│
│ (Recalculates from Database)  │              └───────────────────────────────┘
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│ Prisma ORM (Relational Store) │ ──> Orders, Customers, OrderItems
└──────────────┬────────────────┘
               │
      ┌────────┴───────────────────────────┐
      ▼                                    ▼
┌───────────────────────────────┐ ┌────────────────────────────────────┐
│ Nodemailer HTML Admin Email   │ │ Official WhatsApp Click-to-Chat    │
│ (With retry & failure tracking│ │ (wa.me link with encoded order ID, │
│ in Admin Dashboard)           │ │ items, customer info, & total)     │
└───────────────────────────────┘ └────────────────────────────────────┘
```

---

## Initial Seeded Services

1. **Starter Website (₹3,499)**
   - 1 Website, 5–10 Pages
   - 1 Year High-Speed SSD Hosting Free Included
   - SSL Security Certificate Free
   - Google Map & Location Integration
   - Full SEO Friendly Setup
   - WhatsApp Direct Enquiry Integration
   - Call Button Integration for Mobile Visitors
   - Fully Responsive across Mobile, Tablet, Laptop & Desktop
2. **Royal Website (₹5,499) — MOST POPULAR**
   - 1 Website + Dedicated Admin Panel Access
   - 6 Months Cloud Hosting Free Included
   - 15–20 Pages Custom Design
   - SSL Certificate Free
   - WhatsApp E-Commerce Catalog & Ordering Flow
   - SEO Architecture & Schema Markup
   - Multi-device Responsive Support
3. **Ecommerce Starter (₹9,999)**
   - 1 Complete Ecommerce Online Store
   - Dedicated Admin Dashboard & Order Management
   - Payment Gateway Integration Ready (UPI / Cards / NetBanking / COD)
   - Products & Inventory Control, Cart & Wishlist
   - Discount Coupons Engine & Reviews
   - 6 Months Hosting Free Included

*All descriptions, prices, and features are dynamically editable from the `/admin` dashboard without touching source code.*

---

## Security Invariants & Hardening

1. **Authoritative Server-Side Price Recalculation**:
   - The frontend never dictates the final order price.
   - When `/api/orders` receives an order, it looks up active database records, pulls the authoritative unit price, and computes `subtotal` and `total` server-side before persisting.
   - Historical snapshots are stored in `OrderItem.unitPrice`. If prices change later, old orders retain their exact original purchase price.
2. **Server-Side Route Protection (`middleware.ts`)**:
   - Admin routes (`/admin/*`) and admin APIs (`/api/admin/*`) require an encrypted JWT session cookie (`ryxermart_admin_session`).
   - Unauthorized requests to `/admin/*` are automatically redirected to `/admin/login`.
   - Unauthorized requests to `/api/admin/*` return HTTP 401 Unauthorized.
   - Sensitive routes (`/admin/settings`, `/admin/chatbot`) enforce strict `ADMIN` role access.
3. **Password Security**:
   - Stored using 12-round salted Bcrypt hashes. No plaintext credentials.
4. **Chatbot Protection & Hallucination Prevention**:
   - Implements layered system instructions: Immutable Base Security Guardrails + Dynamic Live Database Catalog + Admin Business Guidelines.
   - API key (`GOOGLE_AI_API_KEY`) is stored strictly server-side and never exposed to the browser.
   - Refuses prompt injections, role-hijacking, payment requests, order alterations, or access to private customer data.
5. **Rate Limiting**:
   - In-memory sliding window rate limits protect `/api/orders`, `/api/contact`, `/api/chatbot`, and `/api/auth/login`.

---

## Getting Started Locally

### Prerequisites
- Node.js v18+ (tested with Node.js v24)
- npm v9+

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default configuration values for development:
```env
DATABASE_URL="file:./dev.db"
APP_URL="http://localhost:3000"
SESSION_SECRET="ryxermart-dev-secret-key-32-chars-long-local-auth-test-2026"
ADMIN_EMAIL="admin@ryxermart.com"
WHATSAPP_NUMBER="919876543210"
GOOGLE_AI_API_KEY=""
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASSWORD=""
SMTP_FROM="RyxerMart <orders@ryxermart.com>"
```

### 3. Database Sync & Seeding
Push the Prisma schema to create the local SQLite database and seed the initial packages, categories, FAQs, and default admin:
```bash
npx prisma db push
npm run seed
```

**Default Admin Credentials**:
- **Email**: `admin@ryxermart.com`
- **Password**: `Admin@Ryxer2026!`
*(Please change this password after your initial login from the database/settings).*

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
The Admin Dashboard is accessible at [http://localhost:3000/admin](http://localhost:3000/admin).

### 5. Run Automated Tests
```bash
npm run test
```
Verifies:
- Unique Order ID format (`RXM-YYYYMMDD-XXXX`)
- Bcrypt password hashing & authentication
- JWT session creation & verification
- WhatsApp link formatting & URL encoding
- Database seed integrity
- Server price tamper-proofing
- Rate limiter window enforcement
- Chatbot security guardrails

---

## Production Deployment

### Option A: Docker Compose (Recommended)
RyxerMart includes a production-ready `Dockerfile` and `docker-compose.yml` that automatically deploys the Next.js app alongside a dedicated PostgreSQL database container:

1. In `.env`, set:
   ```env
   GOOGLE_AI_API_KEY="your-actual-google-gemini-key"
   SMTP_HOST="smtp.yourmailserver.com"
   SMTP_PORT="587"
   SMTP_USER="notifications@ryxermart.com"
   SMTP_PASSWORD="your-smtp-password"
   ```
2. Start the stack:
   ```bash
   docker-compose up -d --build
   ```
3. Run migrations and seed on the container:
   ```bash
   docker-compose exec app npx prisma db push
   docker-compose exec app npm run seed
   ```

### Option B: Cloud Hosting (Vercel, Render, Railway, VPS)
1. Provision a PostgreSQL instance (e.g., Neon, Supabase, AWS RDS, or Render PostgreSQL).
2. Set `DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"` in your host environment.
3. In `prisma/schema.prisma`, change `provider = "sqlite"` to `provider = "postgresql"`.
4. Run `npx prisma db push` and `npm run seed`.
5. Run build and start:
   ```bash
   npm run build
   npm run start
   ```

---

## Database Backup Strategy
- **SQLite (Dev)**: Safely snapshot or copy `prisma/dev.db` when the application is idle.
- **PostgreSQL (Prod)**:
  ```bash
  # Daily automated backup:
  pg_dump -U ryxer_admin -d ryxermart -F c -b -v -f "/backups/ryxermart_$(date +%Y%m%d).dump"
  ```

---

## Business Placeholders to Review

Before going live with real customers:
1. **WhatsApp Number**: Update `WHATSAPP_NUMBER` in `.env` and Admin Settings to your official Indian WhatsApp business phone number (format: country code without `+` or spaces, e.g. `919876543210`).
2. **SMTP Credentials**: Configure `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD` for live email notifications.
3. **Google AI Key**: Add your Gemini API key from [Google AI Studio](https://aistudio.google.com/) to enable the live chatbot.
4. **Legal Pages**: Review `Privacy Policy`, `Terms & Conditions`, and `Refund Policy` in `src/app/privacy`, `src/app/terms`, and `src/app/refund-policy` to ensure adherence to your specific registration and commercial structure.

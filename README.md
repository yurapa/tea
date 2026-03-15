# TeaVibe Store

A full-featured e-commerce platform for tea products built with Next.js 16, React 19, TypeScript, and PostgreSQL.

**Version:** 25.09.23 | **Status:** MVP Complete | **Repository:** [github.com/yurapa/tea](https://github.com/yurapa/tea.git)

---

## Quick Start

```bash
# Install dependencies
npm install

# Setup environment (copy .env.example → .env.local)
# Add: DATABASE_URL, NEXTAUTH_SECRET, PayPal/Stripe keys, etc.

# Seed database with sample data
npm run prisma:seed

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## Key Features

**E-Commerce Core**
- Product catalog with search, filtering, and featured products
- Multi-step checkout (cart → shipping → payment → confirmation)
- Real-time stock tracking and inventory management
- Shopping cart (guest sessions + authenticated users)

**Payment & Orders**
- PayPal & Stripe payment processing with webhooks
- Cash on Delivery (COD) support
- Order management dashboard with status tracking
- Automated email receipts and notifications

**User Features**
- Secure authentication (email/password signup & signin)
- User profiles (address, payment methods, order history)
- Product reviews and 5-star ratings
- Multi-language support (English, Russian, Ukrainian, Greek)

**Admin Dashboard**
- Real-time KPI metrics (sales, orders, users, revenue)
- Product CRUD with image uploads (UploadThing)
- User and order management
- Sales analytics and charts (Recharts)

**Technical Features**
- SSR/SSG with Next.js App Router
- Type-safe database queries (Prisma ORM)
- Form validation (React Hook Form + Zod)
- SEO optimized (sitemap, robots.txt, hreflang)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16.1.6, React 19, TypeScript 5 |
| **Styling** | Tailwind CSS, shadcn/ui, Lucide icons |
| **Forms** | React Hook Form, Zod validation |
| **Database** | PostgreSQL (Neon serverless), Prisma ORM |
| **Auth** | NextAuth v5 beta.30 |
| **Payments** | PayPal SDK, Stripe SDK |
| **Email** | Resend API, React Email templates |
| **File Upload** | UploadThing (4MB max) |
| **Charts** | Recharts v2.15.1 |
| **i18n** | next-intl v4.5.3 |
| **Testing** | Jest |
| **Code Quality** | ESLint 9, Prettier 3 |

---

## Development Commands

```bash
# Development
npm run dev                      # Start dev server with Turbopack
npm run code:lint-fix            # Fix linting issues
npm run code:format-fix          # Format code with Prettier

# Database
npm run prisma:generate          # Generate Prisma client
npm run prisma:migrate           # Create database migration
npm run prisma:seed              # Load sample data
npm run prisma:studio            # Open Prisma Studio GUI

# Production
npm run build                    # Production build
npm start                        # Run production server

# Testing
npm test                         # Run Jest tests
npm run test:watch               # Watch mode
```

---

## Project Structure

```
tea/
├── app/[locale]/                # Next.js App Router (locale-based routing)
│   ├── (auth)/                  # Signup/signin pages
│   ├── (root)/                  # Public pages (home, products, cart, checkout)
│   ├── user/                    # User profile & order history
│   ├── admin/                   # Admin dashboard (protected)
│   └── api/                     # API routes (auth, webhooks)
├── components/
│   ├── ui/                      # shadcn/ui base components (19 total)
│   └── shared/                  # Reusable feature components
├── lib/
│   ├── actions/                 # Server actions (CRUD operations)
│   ├── constants/               # App configuration
│   └── utils/                   # Helper functions
├── db/                          # Prisma client, seeds
├── prisma/schema/               # Database schema (modular)
├── email/                       # React Email templates
├── i18n/translations/           # JSON translations (4 locales)
└── types/                       # TypeScript definitions
```

---

## Environment Setup

Create `.env.local` with required variables:

```bash
# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://...

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Payments
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-paypal-id
STRIPE_SECRET_KEY=your-stripe-secret
STRIPE_WEBHOOK_SECRET=your-webhook-secret

# File Upload
UPLOADTHING_SECRET=your-secret
UPLOADTHING_APP_ID=your-app-id

# Email
RESEND_API_KEY=your-resend-key

# Analytics (Optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
```

See `.env.example` for complete template.

---

## Stripe Test Card

For development/testing:
- **Card:** 4242 4242 4242 4242
- **Expiry:** 12/34
- **CVC:** 123

---

## Documentation

Comprehensive documentation available in `/docs/`:

- **[Project Overview & PDR](docs/project-overview-pdr.md)** - Vision, goals, success metrics
- **[Codebase Summary](docs/codebase-summary.md)** - File structure, modules, dependencies
- **[Code Standards](docs/code-standards.md)** - Conventions, patterns, best practices
- **[System Architecture](docs/system-architecture.md)** - Architecture diagrams, data flow
- **[Development Roadmap](docs/project-roadmap.md)** - Phases, timeline, feature backlog

---

## Database Schema

**Core Models:**
- **User** - Authentication, profile, payment methods
- **Product** - Catalog with pricing, images, ratings
- **Order & OrderItem** - Purchase history and line items
- **Cart** - Session-based shopping carts
- **Review** - Product ratings and comments

See `docs/codebase-summary.md` for full schema details.

---

## Common Tasks

### Add New Component

```bash
# Use shadcn/ui CLI
npx shadcn@latest add button
```

### Create Database Migration

```bash
npm run prisma:migrate add_new_field
# Then edit prisma/schema/*.prisma
npm run prisma:migrate dev
```

### Add Translation

Edit JSON files in `i18n/translations/[locale]/` and add keys across all locales.

### Deploy to Vercel

```bash
git push origin main
# Vercel auto-deploys on push
# Set env vars in Vercel dashboard
npm run build   # Test build locally first
```

---

## Known Issues & TODOs

**Tracked Issues:**
- [ ] Add "Order Comment" field (textarea + DB migration)
- [ ] Add map to Contacts page (react-leaflet)
- [ ] Improve test coverage (target: > 70%)
- [ ] Optimize Lighthouse score (target: > 95)

**Limitations:**
- UploadThing 4MB file size limit (may need upgrade for larger images)
- NextAuth v5 still in beta (stable release Q2 2025)

---

## Architecture Overview

TeaVibe uses a modern **monolithic full-stack architecture**:

- **Server-first approach:** Maximize server components and server actions
- **Type safety:** End-to-end TypeScript with Zod validation
- **Modular design:** Feature-based organization with clear separation
- **Scalable:** Serverless database (Neon), CDN assets (UploadThing)

See `docs/system-architecture.md` for detailed diagrams and data flows.

---

## Performance

**Current Metrics:**
- Page load: ~2.3s (Lighthouse)
- Lighthouse score: 82/100
- Mobile usability: ✅ 100%

**Optimization:**
- Next.js Image optimization (WebP, responsive)
- Route-based code splitting
- ISR (Incremental Static Regeneration) for products
- Efficient Prisma queries (no N+1)

---

## Security

**Implementation:**
- Secure password hashing (NextAuth best practices)
- HTTPS/SSL for all traffic
- CSRF protection via tokens
- SQL injection prevention (Prisma parameterized queries)
- Input validation (Zod schemas)
- Role-based access control (admin/editor/user)

**No stored:** API keys, secrets, or passwords in code. All via environment variables.

---

## License

[Check LICENSE file](LICENSE)

---

## Contributing

Follow the code standards and conventions in [docs/code-standards.md](docs/code-standards.md).

Workflow:
1. Create feature branch from `dev`
2. Implement changes following standards
3. Run `npm run code:lint-fix && npm run code:format-fix`
4. Run `npm test` to verify
5. Push and create Pull Request to `dev`
6. Code review before merge to `main`

---

## Support & Contact

For issues, questions, or feature requests:
- Open GitHub issue: [github.com/yurapa/tea/issues](https://github.com/yurapa/tea/issues)
- Check documentation first: `/docs` directory

---

## Changelog

See [docs/project-changelog.md](docs/project-changelog.md) for detailed version history and release notes.

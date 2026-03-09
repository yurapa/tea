# TeaVibe Store - Codebase Summary

**Project:** TeaVibe Store (tea)
**Tech Stack:** Next.js 16.1.6, React 19, TypeScript 5, PostgreSQL, Prisma
**Total Files:** 217 | **Total Lines:** 9,962 | **Total Tokens:** 91,611
**Last Generated:** March 2025

---

## Directory Structure Overview

```
tea/
├── app/                    # Next.js App Router (3,263 LOC)
│   ├── [locale]/           # i18n routing - locale-specific pages
│   │   ├── (auth)/         # Authentication pages (signin, signup)
│   │   ├── (root)/         # Public pages (home, products, cart, checkout)
│   │   ├── user/           # User dashboard (profile, orders)
│   │   └── admin/          # Admin dashboard (analytics, management)
│   ├── api/                # API routes (auth, webhooks, uploads)
│   ├── robots.ts           # SEO robots.txt
│   └── sitemap.ts          # Dynamic sitemap (all locales)
├── components/             # React Components (2,914 LOC)
│   ├── ui/                 # shadcn/ui primitives (19 components)
│   ├── shared/             # Feature components (layouts, forms, lists)
│   ├── analytics/          # Google Analytics wrapper
│   └── *.tsx               # Root-level shared components
├── lib/                    # Utilities & Logic (1,561 LOC)
│   ├── actions/            # Server actions for backend ops
│   ├── constants/          # App configuration
│   ├── hooks/              # Custom React hooks
│   └── utils/              # Helper utilities
├── db/                     # Database Utilities (422 LOC)
│   ├── client.ts           # Prisma client singleton
│   ├── seed.ts             # Database seeding
│   └── sample-data-*.ts    # Sample product data
├── email/                  # Email Templates (557 LOC)
│   └── *.tsx               # React Email components
├── prisma/                 # Database Schema & Migrations
│   ├── schema/             # Modular Prisma schemas
│   │   ├── schema.prisma   # Main config
│   │   ├── user.prisma     # User, Account, Session
│   │   ├── product.prisma  # Product catalog
│   │   ├── order.prisma    # Orders and items
│   │   ├── cart.prisma     # Shopping cart
│   │   └── review.prisma   # Product reviews
│   └── migrations/         # 6+ database migrations
├── types/                  # TypeScript Definitions (64 LOC)
│   ├── index.ts            # Shared type exports
│   └── next-auth.d.ts      # NextAuth type augmentation
├── i18n/translations/      # Translation Files (227 LOC)
│   ├── en/                 # English translations
│   ├── ru/                 # Russian translations
│   ├── uk/                 # Ukrainian translations
│   └── el/                 # Greek translations
├── .config/                # Project Configuration
│   └── prisma.ts           # Prisma client config
├── .claude/                # Development Rules & Workflows
├── public/                 # Static assets (images, icons)
├── .env.example            # Environment template
├── package.json            # Dependencies & scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS config
├── next.config.ts          # Next.js configuration
├── middleware.ts           # Request middleware (auth, i18n)
├── jest.config.ts          # Jest testing config
└── repomix-output.xml      # Codebase snapshot (AI analysis)
```

---

## Key Modules & Components

### 1. Authentication (Next.js App + NextAuth v5)
**Location:** `app/[locale]/(auth)/`, `middleware.ts`, `types/next-auth.d.ts`

**Functionality:**
- Email/password signup with form validation (Zod)
- Signin with "remember me" option
- JWT session tokens (secure httpOnly cookies)
- Role-based access control (user, editor, admin)
- Protected routes via middleware

**Key Files:**
- `app/[locale]/(auth)/sign-in/credentials-signin-form.tsx` - Login form
- `app/[locale]/(auth)/sign-up/sign-up-form.tsx` - Registration form
- `app/api/auth/[...nextauth]/route.ts` - NextAuth handler
- `middleware.ts` - Auth middleware, locale routing

**Dependencies:**
- NextAuth v5 beta.30
- @auth/prisma-adapter
- React Hook Form + Zod

---

### 2. Product Management (Server Actions + API)
**Location:** `lib/actions/product.actions.ts`, `app/[locale]/admin/products/`

**Server Actions:**
- `getLatestProducts()` - Fetch recent products (homepage)
- `getAllProducts()` - Full product catalog with pagination
- `getFeaturedProducts()` - Highlighted products (carousel)
- `getProductBySlug()` - Single product details
- `createProduct()` - Admin: Add new product
- `updateProduct()` - Admin: Edit product details
- `deleteProduct()` - Admin: Remove product

**Functionality:**
- Product creation/editing with image upload (UploadThing)
- Stock tracking and availability checking
- Slug generation via slugify library
- Featured products for homepage carousel

**Related Components:**
- `components/shared/product/product-form.tsx` - Product create/edit form
- `components/shared/product/product-list.tsx` - Product grid display
- `components/shared/product/product-carousel.tsx` - Featured products slider

---

### 3. Shopping Cart (Server Actions + Client State)
**Location:** `lib/actions/cart.actions.ts`, `app/[locale]/(root)/cart/`

**Server Actions:**
- `addItemToCart()` - Add product to cart with quantity
- `removeItemFromCart()` - Delete item from cart
- `updateCartItemQty()` - Change item quantity
- `getMyCart()` - Fetch user's current cart

**Features:**
- Session-based cart for guests (localStorage + sessionCartId)
- Persistent cart for authenticated users
- Automatic price calculations (items + tax + shipping)
- Real-time stock validation

**Cart Data Structure:**
```typescript
{
  id: string,
  userId?: string,
  sessionCartId: string,
  items: CartItem[],      // JSON array
  itemsPrice: Decimal,
  shippingPrice: Decimal,
  taxPrice: Decimal,
  totalPrice: Decimal,
  createdAt: DateTime
}
```

---

### 4. Orders & Checkout (Multi-Step Flow)
**Location:** `lib/actions/order.actions.ts`, `app/[locale]/(root)/place-order/`

**Server Actions:**
- `createOrder()` - Create pending order from cart
- `createPayPalOrder()` - Initiate PayPal payment
- `approvePayPalOrder()` - Capture PayPal transaction
- `updateOrderToPaid()` - Mark order as paid after Stripe webhook
- `updateOrderToPaidByCOD()` - Mark COD order as paid
- `deliverOrder()` - Admin action to mark delivered

**Checkout Flow:**
1. Cart review
2. Shipping address form
3. Payment method selection (PayPal, Stripe, COD)
4. Create order
5. Payment processing (PayPal/Stripe/COD)
6. Order confirmation page

**Order Structure:**
```typescript
{
  id: string,
  userId: string,
  shippingAddress: Json,     // Address object
  paymentMethod: string,     // "PayPal" | "Stripe" | "COD"
  paymentResult: Json?,      // {id, status, email_address}
  itemsPrice, shippingPrice, taxPrice, totalPrice: Decimal,
  isPaid: boolean,
  paidAt?: DateTime,
  isDelivered: boolean,
  deliveredAt?: DateTime,
  orderItems: OrderItem[]
}
```

---

### 5. Payment Integration
**Location:** `app/api/webhooks/stripe/`, `lib/actions/order.actions.ts`

**PayPal Integration:**
- SDK: `@paypal/react-paypal-js`
- Flow: Client-side order creation → Server approval
- Component: `app/[locale]/(root)/order/[id]/stripe-payment.tsx`

**Stripe Integration:**
- SDK: `@stripe/react-stripe-js` + `@stripe/stripe-js`
- Webhook: `POST /api/webhooks/stripe` - Listens for `charge.succeeded`
- Flow: Create payment element → Customer pays → Webhook updates order

**Payment Methods:**
- PayPal: Full payment capture
- Stripe: Card payments via Payment Element
- Cash on Delivery: No online processing

---

### 6. Reviews & Ratings
**Location:** `lib/actions/review.actions.ts`, `app/[locale]/(root)/product/[slug]/`

**Server Actions:**
- `createUpdateReview()` - Add/update user review (1-5 stars + comment)
- `getReviews()` - Fetch product reviews with pagination

**Features:**
- User can only review once per product (update overwrites)
- Reviews count and average rating update Product model
- Review moderation (admin approval possible in future)

**Review Structure:**
```typescript
{
  id: string,
  rating: number,        // 1-5 stars
  title: string,
  comment: string,
  productId: string,
  userId: string,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

---

### 7. User Management (Admin Dashboard)
**Location:** `lib/actions/user.actions.ts`, `app/[locale]/admin/users/`

**Server Actions:**
- `signInWithCredentials()` - Auth login
- `signUp()` - Auth registration
- `updateProfile()` - User profile update
- `getAllUsers()` - Admin: Fetch all users with pagination

**User Data:**
```typescript
{
  id: string,
  name: string,
  email: string (unique),
  password?: string,
  role: "user" | "editor" | "admin",
  emailVerified?: DateTime,
  image?: string,
  address?: Json,
  paymentMethod?: string,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

---

### 8. Admin Dashboard
**Location:** `app/[locale]/admin/`

**Pages:**
- `overview/` - KPI metrics and sales charts
- `products/` - Product CRUD operations
- `users/` - User management and roles
- `orders/` - Order management and fulfillment

**Features:**
- Real-time KPI cards (total sales, orders, users, revenue)
- Line charts (revenue, orders over time via Recharts)
- Role-based access (admin only)
- Product image upload via UploadThing

---

### 9. Email Notifications
**Location:** `email/` directory, `lib/actions/` (send functions)

**Email Templates:**
- Order confirmation with receipt
- Signup verification
- Signin confirmation
- Password reset (future)

**Technology:**
- Resend API (email service)
- React Email (template components)
- Server-side rendering of email HTML

---

### 10. Internationalization (i18n)
**Location:** `i18n/translations/`, `middleware.ts`, `next-intl` config

**Supported Locales:**
- English (`en`)
- Russian (`ru`)
- Ukrainian (`uk`)
- Greek (`el`)

**Implementation:**
- next-intl library (v4.5.3)
- Locale in URL path: `/[locale]/...`
- Middleware detects user locale, redirects appropriately
- JSON translation files per locale
- hreflang tags for SEO

**File Structure:**
```
i18n/translations/
├── en/home.json, product.json, ...
├── ru/home.json, product.json, ...
├── uk/home.json, product.json, ...
└── el/home.json, product.json, ...
```

---

## Database Schema (Prisma)

### Entity Relationship Diagram
```
User
├── Cart (1:Many)
├── Order (1:Many)
├── Review (1:Many)
├── Account (1:Many) [NextAuth]
└── Session (1:Many) [NextAuth]

Product
├── OrderItem (1:Many)
└── Review (1:Many)

Order
├── OrderItem (1:Many)
└── User (Many:1)

OrderItem
├── Order (Many:1)
└── Product (Many:1)

Cart
└── User (Many:1)

Review
├── Product (Many:1)
└── User (Many:1)
```

### Key Tables
| Table | Purpose | Rows Est. |
|-------|---------|-----------|
| User | Authentication & profiles | 500+ |
| Product | Catalog | 200+ |
| Order | Purchase history | 1,000+ |
| OrderItem | Order line items | 3,000+ |
| Review | Product ratings/comments | 500+ |
| Cart | Active shopping carts | 100+ |

---

## API Routes & Server Actions

### Authentication Endpoints
- `POST /api/auth/signin` - NextAuth signin
- `POST /api/auth/signup` - NextAuth signup
- `GET /api/auth/session` - Current session
- `POST /api/auth/signout` - Logout

### File Upload
- `POST /api/uploadthing/` - UploadThing handler

### Payment Webhooks
- `POST /api/webhooks/stripe` - Stripe event processing

### Server Actions (Called via form/button in components)
- `lib/actions/product.actions.ts` - 6 actions
- `lib/actions/cart.actions.ts` - 4 actions
- `lib/actions/order.actions.ts` - 7 actions
- `lib/actions/user.actions.ts` - 4 actions
- `lib/actions/review.actions.ts` - 2 actions

---

## UI Component Library (shadcn/ui)

### Installed Components (19 total)
- Alert Dialog, Button, Card, Checkbox, Dialog
- Dropdown Menu, Form, Input, Label, Pagination
- Product Form, Radio Group, Select, Sheet, Sidebar
- Textarea, Toast, Tooltip, Skeleton

### Custom Components
- **Product:** ProductList, ProductCarousel, ProductForm
- **Admin:** AdminHeader, SidebarNav, Charts
- **Forms:** ShippingAddressForm, PaymentMethodForm, ProductForm
- **Shared:** Header, Footer, Navbar, SearchBar

---

## Configuration Files

### Environment Variables (.env)
```
DATABASE_URL=postgresql://user:pass@host/db
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://...
NEXTAUTH_PROVIDER=credentials
NEXT_PUBLIC_PAYPAL_CLIENT_ID=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
UPLOADTHING_SECRET=...
UPLOADTHING_APP_ID=...
RESEND_API_KEY=...
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=...
```

### Build & Development Scripts
| Script | Purpose |
|--------|---------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Run production build |
| `npm run code:lint` | ESLint check |
| `npm run code:format` | Prettier check |
| `npm test` | Jest unit tests |
| `npm run prisma:seed` | Seed database |
| `npm run prisma:studio` | Prisma Studio GUI |

---

## Performance Metrics

### File Sizes (Top 5)
1. `db/sample-data-products.ts` - 10.4 KB (4.4% of tokens)
2. `lib/actions/order.actions.ts` - 10.5 KB (2.7% of tokens)
3. `components/shared/admin/product-form.tsx` - 9.9 KB (2.1% of tokens)
4. `components/ui/dropdown-menu.tsx` - 7.4 KB (1.9% of tokens)
5. `app/.../order-details-table.tsx` - 7.8 KB (1.9% of tokens)

### Total Metrics
- **Total Files:** 217
- **Total Lines of Code:** 9,962
- **Total Characters:** 364,205
- **Total Tokens (GPT-4):** 91,611

---

## Dependencies Overview

### Core Dependencies (31)
**Framework:**
- next 16.1.6, react 19.2.4, react-dom 19.2.4, typescript 5.0.0

**Database:**
- prisma 6.17.1, @prisma/client 6.17.1
- @prisma/adapter-neon (serverless PostgreSQL)

**Authentication:**
- next-auth 5.0.0-beta.30, @auth/prisma-adapter 2.11.0

**UI/Forms:**
- react-hook-form 7.64.0, zod 3.24.2
- @hookform/resolvers 3.10.0
- tailwindcss 3.4.1, shadcn/ui components

**Payments:**
- @paypal/react-paypal-js 8.9.2, stripe 17.7.0

**Email:**
- resend 6.1.2, react-email 4.3.0

**File Uploads:**
- uploadthing 7.7.4, @uploadthing/react 7.3.3

**Internationalization:**
- next-intl 4.5.3

**Charts & UI:**
- recharts 2.15.1, lucide-react 0.545.0

### Dev Dependencies (16)
- eslint 9.37.0, prettier 3.6.2
- jest 30.1.3, ts-jest 29.4.5
- tsx 4.20.6 (TypeScript execution)

---

## Development Workflow

### Setup
```bash
npm install
npm run prisma:generate
npm run prisma:seed              # Load sample data
npm run dev                      # Start dev server (http://localhost:3000)
```

### Development
```bash
npm run dev                      # Dev server
npm run code:lint-fix            # Auto-fix linting
npm run code:format-fix          # Auto-format code
npm test                         # Run unit tests
npm run prisma:studio            # Database GUI
```

### Database
```bash
npm run prisma:migrate           # Create migration
npm run prisma:seed              # Seed sample data
npm run prisma:reset-dev         # Full reset (DEV ONLY)
```

### Deployment
```bash
npm run build                    # Production build
npm start                        # Run production
npm run prisma:deploy            # Apply migrations + generate client
```

---

## Code Quality Standards

### Linting & Formatting
- **ESLint:** Next.js config + Prettier integration
- **Prettier:** Code formatting (2-space indent, trailing commas)
- **TypeScript:** Strict mode enabled

### Testing
- **Jest:** Unit & integration tests
- **Test Command:** `npm test`
- **Coverage Target:** 70%+ (optional)

---

## Open Issues & TODOs

### Tracked in README
- [ ] Add "Order Comment" field (textarea + DB migration)
- [ ] Add map to Contacts page (react-leaflet)

### Schema TODOs
- `prisma/schema/product.prisma` line 19: Category should be separate table with parent-child relationship

### Known Limitations
- UploadThing 4MB file size limit
- NextAuth v5 still in beta (move to stable when available)
- Payment webhooks timeout if order creation fails

---

## Related Documentation

- **Project Overview & PDR:** `docs/project-overview-pdr.md`
- **Code Standards:** `docs/code-standards.md`
- **System Architecture:** `docs/system-architecture.md`
- **Development Roadmap:** `docs/project-roadmap.md`

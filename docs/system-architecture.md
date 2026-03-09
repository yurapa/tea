# TeaVibe Store - System Architecture

**Project:** TeaVibe Store E-Commerce Platform
**Version:** 1.0
**Last Updated:** March 2025
**Architecture Pattern:** Monolithic Full-Stack (Next.js App Router)

---

## Architecture Overview

TeaVibe Store follows a **modern full-stack JavaScript architecture** with clear separation between frontend and backend layers, leveraging Next.js 16 for both server and client rendering.

### Key Architectural Principles
1. **Server-First:** Maximize server-side rendering (SSR) and server actions
2. **Type Safety:** End-to-end TypeScript with Zod validation
3. **Separation of Concerns:** UI components, business logic, data access clearly separated
4. **Modular Design:** Feature-based organization with minimal coupling
5. **Performance:** Optimized images, lazy loading, efficient queries

---

## High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Browser / Next.js Client Components                      │   │
│  │ - React 19 Components (Client-side)                      │   │
│  │ - Form Interactions (React Hook Form)                    │   │
│  │ - State Management (useState, useContext)                │   │
│  │ - Payment UI (PayPal, Stripe Elements)                   │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
                              ↓ HTTP/HTTPS
┌──────────────────────────────────────────────────────────────────┐
│                    NEXT.JS SERVER LAYER                          │
│  ┌───────────────────────┐      ┌──────────────────────────┐    │
│  │ App Router Pages      │      │ API Routes & Webhooks    │    │
│  │ - [locale]/...        │      │ - /api/auth/[...nextauth]│    │
│  │ - Server Components   │      │ - /api/uploadthing       │    │
│  │ - Layouts             │      │ - /api/webhooks/stripe   │    │
│  └───────────────────────┘      └──────────────────────────┘    │
│  ┌───────────────────────┐      ┌──────────────────────────┐    │
│  │ Server Actions        │      │ Middleware               │    │
│  │ - product.actions.ts  │      │ - Auth verification      │    │
│  │ - order.actions.ts    │      │ - Locale routing         │    │
│  │ - cart.actions.ts     │      │ - CSRF protection        │    │
│  │ - user.actions.ts     │      └──────────────────────────┘    │
│  │ - review.actions.ts   │                                      │
│  └───────────────────────┘                                      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Business Logic Layer (lib/)                             │    │
│  │ - Data validation (Zod schemas)                         │    │
│  │ - Utility functions (formatters, validators)            │    │
│  │ - Constants (app config, payment details)               │    │
│  └─────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
                              ↓ SQL / HTTP
┌──────────────────────────────────────────────────────────────────┐
│                    DATA LAYER                                    │
│  ┌─────────────────────┐  ┌──────────────────────────────────┐   │
│  │ PostgreSQL Database │  │ External Services                │   │
│  │ (Neon Serverless)   │  │ - PayPal API                     │   │
│  │ - Users             │  │ - Stripe API                     │   │
│  │ - Products          │  │ - UploadThing (File Storage)     │   │
│  │ - Orders            │  │ - Resend (Email Service)         │   │
│  │ - Cart Items        │  │ - NextAuth Sessions              │   │
│  │ - Reviews           │  └──────────────────────────────────┘   │
│  └─────────────────────┘                                         │
└──────────────────────────────────────────────────────────────────┘
```

---

## Detailed Layer Descriptions

### 1. Client Layer (Frontend)

**Technology:** React 19 + TypeScript + Tailwind CSS

**Responsibilities:**
- Render UI using shadcn/ui components
- Handle user interactions (clicks, form submissions)
- Manage local state (form values, UI toggles)
- Display data from server
- Initiate payment flows (PayPal, Stripe)

**Key Components:**
- `components/ui/` - Base components (Button, Card, Form, etc.)
- `components/shared/` - Feature-specific components (ProductCard, OrderForm, etc.)
- `app/[locale]/(root)/` - Public pages and checkout flow
- `app/[locale]/admin/` - Admin dashboard pages

**Communication:**
- Server Actions (POST form data)
- Direct API calls (Stripe, PayPal SDKs)
- Fetch API (read-only queries via server components)

---

### 2. Next.js Server Layer (Application)

**Technology:** Next.js 16.1.6 App Router + TypeScript

**Components:**

#### A. Server Components & Pages
```
app/[locale]/(root)/page.tsx           # Home page
app/[locale]/(root)/product/[slug]/    # Product detail
app/[locale]/(root)/cart/              # Shopping cart
app/[locale]/(root)/shipping-address/  # Shipping form
app/[locale]/(root)/payment-method/    # Payment selection
app/[locale]/(root)/place-order/       # Order placement
app/[locale]/admin/                    # Admin dashboard
```

**Responsibilities:**
- Fetch data from database (no browser code)
- Render initial HTML on server
- Pass data to client components
- Handle SEO (metadata, structured data)

#### B. Server Actions
- Pure server-side functions marked with `"use server"`
- Handle form submissions, mutations, complex operations
- Have direct database access via Prisma
- Return results to client

```typescript
// lib/actions/product.actions.ts
"use server"

export async function getLatestProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
  })
  return products
}

export async function createProduct(formData: FormData) {
  // Validate, check auth, create, return
}
```

#### C. API Routes
```
app/api/auth/[...nextauth]/route.ts    # NextAuth handler
app/api/uploadthing/route.ts            # File upload handler
app/api/webhooks/stripe/route.ts        # Stripe webhook
```

**Responsibilities:**
- NextAuth authentication
- File upload processing
- Payment webhook handling

#### D. Middleware
```typescript
// middleware.ts
export async function middleware(request) {
  // Auth verification
  // Locale detection
  // CSRF protection
}
```

---

### 3. Business Logic Layer

**Location:** `lib/` directory

**Components:**

#### A. Server Actions (lib/actions/)
```
product.actions.ts    # Product CRUD, search, featured products
cart.actions.ts       # Add/remove/update cart items
order.actions.ts      # Create orders, payment processing
user.actions.ts       # Auth, profile management
review.actions.ts     # Reviews, ratings
```

**Characteristics:**
- Pure server-side functions
- Database access via Prisma
- Authorization checks
- Error handling

#### B. Validation (lib/validation/)
```typescript
// Zod schemas for all inputs
const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const CreateProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  stock: z.number().int().positive(),
})
```

#### C. Constants (lib/constants/)
```typescript
export const LATEST_PRODUCTS_LIMIT = 8
export const CART_ITEMS_PER_PAGE = 10
export const DEFAULT_SHIPPING_PRICE = 10
export const TAX_RATE = 0.08
export const PAYMENT_METHODS = ["PayPal", "Stripe", "COD"]
```

#### D. Utilities (lib/utils/)
```typescript
// Formatting helpers
export function formatPrice(price: number): string { ... }
export function formatDate(date: Date): string { ... }

// Calculation helpers
export function calculateTax(subtotal: number): number { ... }
export function calculateTotal(items, shipping): number { ... }

// Validation helpers
export function isValidEmail(email: string): boolean { ... }
export function isValidPhoneNumber(phone: string): boolean { ... }
```

---

### 4. Data Access Layer (Prisma)

**Technology:** Prisma ORM v6.17.1 + PostgreSQL

**Responsibilities:**
- Database schema definition
- Type-safe queries
- Relationship management
- Migration handling

**Schema Organization:**
```
prisma/schema/
├── schema.prisma          # Config and imports
├── user.prisma           # User, Account, Session
├── product.prisma        # Product model
├── order.prisma          # Order, OrderItem
├── cart.prisma           # Cart model
└── review.prisma         # Review model
```

**Database Structure:**
```sql
users
├── id (UUID)
├── email (unique)
├── name
├── password (hashed)
├── role (enum: user/editor/admin)
├── address (JSON)
├── paymentMethod
└── timestamps

products
├── id (UUID)
├── name
├── slug (unique)
├── category
├── price (Decimal)
├── images (String[])
├── rating (Decimal 1-5)
├── stock (Int)
├── isFeatured (Boolean)
└── timestamps

orders
├── id (UUID)
├── userId (FK → User)
├── shippingAddress (JSON)
├── paymentMethod
├── paymentResult (JSON)
├── isPaid
├── isDelivered
└── timestamps

orderItems
├── orderId (FK → Order)
├── productId (FK → Product)
├── qty, price, name, slug, image

cart
├── id (UUID)
├── userId (FK → User, nullable)
├── sessionCartId
├── items (JSON[])
├── pricing (itemsPrice, shippingPrice, taxPrice, totalPrice)

reviews
├── id (UUID)
├── productId (FK → Product)
├── userId (FK → User)
├── rating (1-5)
├── comment
└── timestamps
```

---

## Data Flow Diagrams

### User Registration Flow

```
┌─────────────────────────────────────────────────────────┐
│  1. User navigates to /[locale]/sign-up                 │
│     Renders SignUpForm component                        │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  2. User fills form: email, password, name              │
│     Validates with Zod schema                           │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  3. Form submission triggers Server Action              │
│     signUp(formData) in lib/actions/user.actions.ts     │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  4. Server Action:                                      │
│     - Validate with Zod schema                          │
│     - Hash password                                     │
│     - Create User in DB (Prisma)                        │
│     - Send welcome email (Resend)                       │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  5. Return result to client                             │
│     Success: Create NextAuth session, redirect home     │
│     Error: Display error message                        │
└─────────────────────────────────────────────────────────┘
```

### Shopping Cart & Checkout Flow

```
┌──────────────────────────────────────────────────────────┐
│ 1. Browse Products                                       │
│    - Server fetches products from DB                     │
│    - Client displays ProductList                         │
└──────────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────────┐
│ 2. Add to Cart                                           │
│    - Click "Add to Cart" → addItemToCart(productId)     │
│    - Server Action adds item to Cart (DB or session)     │
└──────────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────────┐
│ 3. Review Cart (/cart)                                  │
│    - Show cart items, calculate totals (tax + shipping) │
│    - Allow quantity changes, item removal               │
└──────────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────────┐
│ 4. Shipping Address (/shipping-address)                 │
│    - Form: name, address, city, zip, phone              │
│    - Submit → Server Action saves to session/cart        │
└──────────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────────┐
│ 5. Select Payment Method (/payment-method)              │
│    - Options: PayPal, Stripe, COD                       │
│    - Submit → Server Action saves choice                │
└──────────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────────┐
│ 6. Place Order (/place-order)                           │
│    - createOrder() Server Action:                        │
│      * Validate inventory                               │
│      * Create Order record (isPaid=false)                │
│      * Clear cart                                        │
│      * Return orderId                                    │
└──────────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────────┐
│ 7. Process Payment (/order/[id])                        │
│    IF PayPal:                                            │
│      - renderPayPalButtons() from SDK                    │
│      - approvePayPalOrder(orderId, paypalOrderId)       │
│      - updateOrderToPaid(orderId)                        │
│    IF Stripe:                                            │
│      - Show Stripe Payment Element                       │
│      - Webhook receives charge.succeeded                 │
│      - updateOrderToPaid(orderId) via webhook            │
│    IF COD:                                               │
│      - updateOrderToPaidByCOD(orderId)                   │
└──────────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────────┐
│ 8. Order Confirmation                                    │
│    - Email receipt sent (Resend)                         │
│    - Order status page shows details                     │
│    - User can track delivery                             │
└──────────────────────────────────────────────────────────┘
```

### Payment Processing (Stripe Webhook)

```
┌──────────────────────────────┐
│ Client submits payment        │
│ Stripe Payment Element        │
└──────────────────────────────┘
            ↓
┌──────────────────────────────┐
│ User completes payment        │
│ Stripe processes charge       │
└──────────────────────────────┘
            ↓
┌──────────────────────────────────────────────┐
│ Stripe sends webhook event: charge.succeeded │
│ POST /api/webhooks/stripe                    │
└──────────────────────────────────────────────┘
            ↓
┌──────────────────────────────────────────────┐
│ Server receives webhook:                      │
│ - Verify signature with STRIPE_WEBHOOK_SECRET│
│ - Extract orderId from event metadata         │
│ - Query Order by stripe charge ID            │
└──────────────────────────────────────────────┘
            ↓
┌──────────────────────────────────────────────┐
│ Update Order:                                 │
│ - Mark isPaid = true                         │
│ - Set paidAt = now()                         │
│ - Save paymentResult = {id, status, ...}     │
└──────────────────────────────────────────────┘
            ↓
┌──────────────────────────────────────────────┐
│ Send confirmation:                            │
│ - Email receipt to user (Resend)             │
│ - Update order status page                   │
└──────────────────────────────────────────────┘
```

---

## External Service Integrations

### Payment Providers

#### PayPal Integration
```
Next.js Server
      ↓
PayPal SDK (@paypal/react-paypal-js)
      ↓
PayPal API
      ↓
Creates Order, Captures Payment
      ↓
Returns transaction details
      ↓
Server Action: approvePayPalOrder()
      ↓
Updates Order.isPaid & paymentResult
```

#### Stripe Integration
```
Client (Stripe Elements)
      ↓
User enters card details
      ↓
Stripe API (secure)
      ↓
Processes charge
      ↓
Sends webhook: charge.succeeded
      ↓
POST /api/webhooks/stripe
      ↓
Verify signature, update Order
```

### Email Service (Resend)

```
Server Action (Order Created)
      ↓
Render React Email template (OrderConfirmation.tsx)
      ↓
Call Resend API with HTML
      ↓
Email sent to customer
```

### File Upload (UploadThing)

```
ProductForm (admin)
      ↓
File input selected
      ↓
UploadThing SDK uploader
      ↓
POST /api/uploadthing
      ↓
Validates file (type, size)
      ↓
Uploads to UploadThing CDN
      ↓
Returns signed URL
      ↓
Server Action saves URL to Product.images
```

### Authentication (NextAuth)

```
Sign In/Sign Up Form
      ↓
POST /api/auth/[...nextauth]
      ↓
NextAuth handler:
  - Validate credentials
  - Hash password (signup)
  - Create/find User
  - Create session
      ↓
Returns JWT in httpOnly cookie
      ↓
Client authenticated, can access protected routes
```

---

## Security Architecture

### Authentication & Authorization
```
┌─────────────────────────────────────────┐
│ Client Request                          │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│ Middleware (middleware.ts)              │
│ - Check for valid session cookie        │
│ - Verify JWT signature                  │
│ - Redirect unauthenticated users        │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│ Server Action / API Route               │
│ - Verify session again                  │
│ - Check user role (admin/editor/user)   │
│ - Throw error if unauthorized           │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│ Database Operation                      │
│ - Query/update data                     │
│ - Return results                        │
└─────────────────────────────────────────┘
```

### Input Validation
```
Form Input (Client)
      ↓
Client-side validation (React Hook Form)
      ↓
Form submission (Server Action)
      ↓
Server-side validation (Zod schema)
      ↓
Process validated data
      ↓
Return error or success
```

### Password Security
```
User enters password in signup form
      ↓
Client sends over HTTPS
      ↓
Server receives
      ↓
Hash with bcrypt (NextAuth)
      ↓
Store hashed value in DB (never plaintext)
      ↓
On signin: compare input hash with stored hash
```

---

## Deployment Architecture

### Hosting Strategy
```
┌──────────────────────────────────────┐
│ Vercel (Recommended)                 │
│ - Next.js hosting (optimized)         │
│ - Git-based deployment                │
│ - Environment variables management    │
│ - Edge functions & serverless routes  │
└──────────────────────────────────────┘
                ↓
┌──────────────────────────────────────┐
│ PostgreSQL Database                  │
│ Neon (Serverless)                    │
│ - Auto-scaling                        │
│ - Managed backups                     │
│ - Connection pooling                  │
└──────────────────────────────────────┘
                ↓
┌──────────────────────────────────────┐
│ CDN & Static Assets                  │
│ - UploadThing (user-uploaded files)   │
│ - Vercel CDN (next/image optimization)│
└──────────────────────────────────────┘
                ↓
┌──────────────────────────────────────┐
│ External Services                    │
│ - PayPal / Stripe (payments)          │
│ - Resend (email)                      │
│ - NextAuth (auth)                     │
└──────────────────────────────────────┘
```

---

## Performance Optimization

### Client-Side
- **Image Optimization:** `next/image` with automatic WebP
- **Code Splitting:** Route-based splitting (App Router)
- **Lazy Loading:** Dynamic imports with React.lazy
- **Caching:** ISR (Incremental Static Regeneration) for product pages

### Server-Side
- **Query Optimization:** Prisma select/include to avoid N+1
- **Database Indexing:** Indexes on email, slug, userId
- **Middleware Optimization:** Fast auth checks, skip unnecessary processing
- **API Response Compression:** gzip enabled by default

### Database
```sql
-- Key indexes for performance
CREATE UNIQUE INDEX user_email_idx ON "User"(email);
CREATE UNIQUE INDEX product_slug_idx ON "Product"(slug);
CREATE INDEX order_userId_idx ON "Order"(userId);
CREATE INDEX review_productId_idx ON "Review"(productId);
CREATE INDEX cart_userId_idx ON "Cart"(userId);
```

---

## Error Handling & Observability

### Error Handling Strategy
```
Try-Catch in Server Actions
      ↓
Specific error type detection
      ↓
User-friendly error message
      ↓
Log to console (server-side)
      ↓
Return error response to client
      ↓
Client displays toast/alert
```

### Logging Points
- Authentication attempts
- Payment processing events
- Database errors
- File upload failures
- Server action errors

### Monitoring (Future Enhancement)
- Page load performance (Web Vitals)
- Error tracking (Sentry/Rollbar)
- Usage analytics (Google Analytics)
- Server metrics (CPU, memory, response time)

---

## Scalability Considerations

### Horizontal Scaling
- **Stateless design:** No server-side session state (JWT via cookies)
- **Database:** Neon serverless handles scaling automatically
- **File uploads:** Delegated to UploadThing (external)
- **CDN:** Vercel handles edge replication

### Database Scaling
- Connection pooling via Neon
- Read replicas for analytics (future)
- Archive old orders (future)
- Denormalization for frequently-accessed data (if needed)

### Future Enhancements
- Caching layer (Redis) for cart/session
- Message queue (Bull/RabbitMQ) for async jobs
- Search service (Elasticsearch) for product search
- Rate limiting on API endpoints

---

## Architecture Decision Records (ADRs)

### ADR-001: Monolithic vs Microservices
**Decision:** Monolithic full-stack application
**Rationale:**
- Simpler deployment and scaling
- Easier cross-feature transactions (orders, payments)
- Team size doesn't warrant microservices complexity

### ADR-002: Server Components vs Client Components
**Decision:** Server-first approach (default server components)
**Rationale:**
- Better performance (less JavaScript shipped)
- Secure database access on server
- Reduced client-side logic complexity

### ADR-003: ORM vs Raw SQL
**Decision:** Prisma ORM
**Rationale:**
- Type safety across full stack
- Automated migrations
- Relationship management
- Query optimization

---

## Related Documentation

- **Project Overview & PDR:** `docs/project-overview-pdr.md`
- **Codebase Summary:** `docs/codebase-summary.md`
- **Code Standards:** `docs/code-standards.md`
- **Development Roadmap:** `docs/project-roadmap.md`

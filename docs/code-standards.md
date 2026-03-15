# TeaVibe Store - Code Standards & Conventions

**Version:** 1.0
**Last Updated:** March 2025
**Framework:** Next.js 16.1.6 + TypeScript 5 + React 19

---

## 1. Project Structure & Organization

### Directory Naming Convention
- **Directories:** kebab-case (lowercase with hyphens)
- **Example:** `shared-components`, `admin-dashboard`, `payment-integration`

### File Naming Convention
- **Components:** PascalCase + `.tsx` extension
  ```
  ProductCard.tsx, ShoppingCart.tsx, AdminHeader.tsx
  ```
- **Server Actions:** kebab-case + `.actions.ts` extension
  ```
  product.actions.ts, order.actions.ts, user.actions.ts
  ```
- **Utilities:** kebab-case + `.ts` or `.utils.ts` extension
  ```
  format-currency.ts, validate-email.ts, auth-helpers.ts
  ```
- **Types:** kebab-case + `.ts` extension
  ```
  product-types.ts, order-types.ts, auth-types.ts
  ```

### Maximum File Size
- **Code Files:** Keep under 200 lines of code
- **Rationale:** Improves readability, aids context management for LLMs
- **Strategy:** Split large components/utilities into smaller modules with clear concerns

### Directory Structure
```
app/
  [locale]/
    (root)/
      page.tsx                    # Page component (PascalCase or index)
      layout.tsx                  # Layout wrapper
      {feature}/
        page.tsx
        {component}.tsx           # Feature-specific components
      ...

components/
  ui/                             # shadcn/ui base components
  shared/                         # Cross-feature shared components
    product/
      ProductCard.tsx
      ProductList.tsx
      ProductCarousel.tsx
    admin/
      AdminHeader.tsx
      DashboardChart.tsx
      ...
  {feature-components}/           # Feature-specific UI

lib/
  actions/
    product.actions.ts
    order.actions.ts
    ...
  constants/
    app-config.ts
    payment-constants.ts
    ...
  utils/
    format-price.ts
    validate-form.ts
    ...

types/
  index.ts                        # Type exports
  next-auth.d.ts                  # NextAuth augmentation

prisma/
  schema/
    schema.prisma                 # Database config
    user.prisma                   # User models
    product.prisma                # Product models
    order.prisma                  # Order models
    ...
```

---

## 2. TypeScript & Type Safety

### Strict Mode Enabled
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

### Type Naming
- **Interfaces:** PascalCase with "I" prefix optional (we prefer without prefix)
  ```typescript
  interface Product { ... }        // Preferred
  interface IProduct { ... }       // Also acceptable
  ```
- **Types:** PascalCase + "Type" or "Props" suffix
  ```typescript
  type ProductProps = { ... }
  type OrderStatus = "pending" | "paid" | "delivered"
  type FormField = { name: string; value: any }
  ```
- **Enums:** PascalCase
  ```typescript
  enum PaymentMethod {
    PayPal = "PayPal",
    Stripe = "Stripe",
    COD = "COD"
  }
  ```

### Generic Type Parameters
```typescript
// Use meaningful names for generics
function fetchItems<T extends { id: string }>(items: T[]): T[] { ... }

// Map/Record types
type UserMap = Record<string, User>
type StatusToCount = Map<OrderStatus, number>
```

### Avoid `any` Type
```typescript
// DON'T
const handleSubmit = (data: any) => { ... }

// DO
interface FormData {
  email: string
  password: string
}
const handleSubmit = (data: FormData) => { ... }
```

---

## 3. React Component Patterns

### Functional Components Only
```typescript
// Preferred: Functional component with TypeScript
interface ProductCardProps {
  product: Product
  onAddToCart: (productId: string) => void
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
    </div>
  )
}

export default ProductCard
```

### Server Components vs Client Components
- **Server Components (Default in Next.js 16):**
  ```typescript
  // No "use client" - runs on server by default
  const HomePage = async () => {
    const products = await getLatestProducts()
    return <ProductList data={products} />
  }
  ```

- **Client Components (Need interactivity):**
  ```typescript
  "use client"

  import { useState } from "react"

  export const CartForm = () => {
    const [items, setItems] = useState<CartItem[]>([])
    return <form>...</form>
  }
  ```

### Props Destructuring & Typing
```typescript
// GOOD: Explicit typing with interface
interface ButtonProps {
  text: string
  onClick: () => void
  variant?: "primary" | "secondary"
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = "primary",
  disabled = false,
}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  )
}
```

### Component Organization
```typescript
// 1. Imports
import React from "react"
import { Button } from "@/components/ui/button"

// 2. Types
interface MyComponentProps {
  title: string
  onSubmit: (data: FormData) => void
}

// 3. Component definition
const MyComponent: React.FC<MyComponentProps> = ({
  title,
  onSubmit,
}) => {
  // 3a. Hooks (at top)
  const [state, setState] = React.useState("")

  // 3b. Event handlers
  const handleClick = () => {
    setState("clicked")
  }

  // 3c. JSX
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  )
}

// 4. Export
export default MyComponent
```

### Using Hooks
```typescript
// Hooks at the top of component (not nested in conditionals)
const MyComponent = () => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("")

  useEffect(() => {
    // Side effects here
  }, [count])

  return <div>{count}</div>
}
```

---

## 4. Server Actions & Form Handling

### Server Action Naming
```typescript
// lib/actions/{domain}.actions.ts

// Verb + Noun pattern
export async function getProducts() { ... }      // Read
export async function createProduct() { ... }    // Create
export async function updateProduct() { ... }    // Update
export async function deleteProduct() { ... }    // Delete

// Specific naming for complex operations
export async function approvePayPalOrder() { ... }
export async function updateOrderToPaid() { ... }
```

### Server Action Implementation
```typescript
"use server"

import { prisma } from "@/db/client"
import { ProductSchema } from "@/types"

export async function createProduct(formData: FormData) {
  try {
    // 1. Validate input
    const validatedData = ProductSchema.parse(formData)

    // 2. Check authorization
    const session = await auth()
    if (session?.user?.role !== "admin") {
      throw new Error("Unauthorized")
    }

    // 3. Execute business logic
    const product = await prisma.product.create({
      data: validatedData,
    })

    // 4. Return result or redirect
    return { success: true, data: product }
  } catch (error) {
    console.error("Create product error:", error)
    return { success: false, error: error.message }
  }
}
```

### Form Validation with Zod
```typescript
// types/form-schemas.ts
import { z } from "zod"

export const SignInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
  rememberMe: z.boolean().optional(),
})

export type SignInFormData = z.infer<typeof SignInSchema>
```

### React Hook Form Integration
```typescript
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInSchema, SignInFormData } from "@/types"

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
  })

  const onSubmit = async (data: SignInFormData) => {
    const result = await signInWithCredentials(data)
    if (!result.success) {
      // Handle error
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      <button type="submit" disabled={isLoading}>
        Sign In
      </button>
    </form>
  )
}
```

---

## 5. Naming Conventions

### Variables & Constants
```typescript
// Variables: camelCase
const productName = "Green Tea"
let cartItems: CartItem[] = []

// Constants: UPPER_SNAKE_CASE (for truly constant values)
const MAX_UPLOAD_SIZE = 4 * 1024 * 1024 // 4MB
const DEFAULT_SHIPPING_PRICE = 10
const API_ENDPOINTS = {
  PRODUCTS: "/api/products",
  ORDERS: "/api/orders",
}

// Configuration constants: PascalCase or camelCase
const LATEST_PRODUCTS_LIMIT = 8
const TAX_RATE = 0.08
```

### Functions & Methods
```typescript
// Regular functions: camelCase
function formatPrice(price: number): string { ... }
function isValidEmail(email: string): boolean { ... }

// React component: PascalCase
function ProductCard() { ... }

// Event handlers: camelCase with "handle" prefix
const handleClick = () => { ... }
const handleSubmit = (e: FormEvent) => { ... }

// Async functions: camelCase with action verb
async function fetchProducts() { ... }
async function submitOrder() { ... }
```

### Boolean Variables
```typescript
// Use "is", "has", "can" prefixes
const isLoading = true
const hasError = false
const canDelete = user.role === "admin"
const isVisible = true
```

### Loops & Iteration
```typescript
// Use descriptive names
products.forEach((product) => {
  console.log(product.name)
})

items.map((item) => <CartItem key={item.id} item={item} />)

users.filter((user) => user.role === "admin")
```

---

## 6. Database & Prisma Patterns

### Model Naming
- **Models:** PascalCase
  ```prisma
  model User { ... }
  model Product { ... }
  model Order { ... }
  ```

- **Fields:** camelCase
  ```prisma
  model User {
    id String @id
    email String @unique
    firstName String
    emailVerified DateTime?
  }
  ```

- **Relations:** PascalCase (Model reference)
  ```prisma
  model Order {
    user User @relation(...)
    orderItems OrderItem[]
  }
  ```

### Prisma Query Patterns
```typescript
// Use specific select/include to avoid N+1
const product = await prisma.product.findUnique({
  where: { id: productId },
  include: {
    reviews: true,
    orderItems: true,
  },
})

// Pagination
const products = await prisma.product.findMany({
  take: 10,
  skip: (page - 1) * 10,
  orderBy: { createdAt: "desc" },
})

// Filtering
const orders = await prisma.order.findMany({
  where: {
    isPaid: true,
    userId: currentUserId,
  },
})
```

### Timestamps
- Always include: `createdAt` and `updatedAt`
  ```prisma
  model Product {
    createdAt DateTime @default(now()) @db.Timestamp(6)
    updatedAt DateTime @updatedAt @db.Timestamp(6)
  }
  ```

---

## 7. Styling & Tailwind CSS

### Class Naming in Components
```typescript
// Use Tailwind's built-in classes consistently
<div className="flex items-center justify-between gap-4 px-4 py-2">
  <h2 className="text-lg font-bold text-gray-900">Product</h2>
  <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
    Add to Cart
  </button>
</div>
```

### Color Variables (if extending tailwind)
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
      },
    },
  },
}
```

### Use `cn()` for Dynamic Classes
```typescript
import { cn } from "@/lib/utils"

interface ButtonProps {
  variant?: "primary" | "secondary"
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", disabled }) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium",
        variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "secondary" && "bg-gray-200 text-gray-900 hover:bg-gray-300",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      disabled={disabled}
    >
      Click me
    </button>
  )
}
```

---

## 8. Error Handling & Logging

### Try-Catch Pattern
```typescript
export async function updateProduct(id: string, data: UpdateProductInput) {
  try {
    const result = await prisma.product.update({
      where: { id },
      data,
    })
    return { success: true, data: result }
  } catch (error) {
    console.error("Update product error:", error)

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return { success: false, error: "Product not found" }
      }
    }

    return { success: false, error: "Internal server error" }
  }
}
```

### Error Messages
```typescript
// Be specific with error messages
interface ActionResult<T> {
  success: boolean
  data?: T
  error?: string
  code?: string // For client-side error handling
}

// Usage
const result = await createProduct(formData)
if (!result.success) {
  toast.error(result.error || "Failed to create product")
}
```

### Logging
```typescript
// Use console methods appropriately
console.log("Info:", message)      // General info
console.warn("Warning:", message)  // Warnings
console.error("Error:", message)   // Errors

// Avoid logging sensitive data
console.log({ user: session.user.email }) // OK
console.log({ password: formData.password }) // DON'T
```

---

## 9. Comments & Documentation

### Inline Comments
```typescript
// Use comments to explain WHY, not WHAT

// BAD
const price = product.price * 1.08 // multiply by 1.08

// GOOD
// Apply 8% sales tax to product price
const priceWithTax = product.price * 1.08
```

### Function Documentation
```typescript
/**
 * Calculates total order price including tax and shipping
 * @param items - Array of cart items with prices
 * @param shippingAddress - Delivery address for shipping cost calculation
 * @returns Total price as Decimal type
 */
export async function calculateOrderTotal(
  items: CartItem[],
  shippingAddress: Address
): Promise<Decimal> {
  // Implementation
}
```

### JSDoc for Complex Logic
```typescript
/**
 * Applies discount code to cart
 * @throws {Error} If discount code is invalid or expired
 * @returns Updated cart with new total
 */
const applyDiscount = async (code: string) => { ... }
```

---

## 10. Testing Patterns

### File Naming
- Test files: `{component-name}.test.tsx` or `{component-name}.spec.tsx`
- Location: Same directory as component (or `__tests__` folder)

### Test Structure
```typescript
// components/__tests__/ProductCard.test.tsx

import { render, screen } from "@testing-library/react"
import ProductCard from "../ProductCard"

describe("ProductCard", () => {
  it("renders product name", () => {
    const product = { id: "1", name: "Green Tea" }
    render(<ProductCard product={product} />)
    expect(screen.getByText("Green Tea")).toBeInTheDocument()
  })

  it("calls onAddToCart when button clicked", () => {
    const onAddToCart = jest.fn()
    const product = { id: "1", name: "Green Tea" }
    render(
      <ProductCard product={product} onAddToCart={onAddToCart} />
    )
    screen.getByText("Add to Cart").click()
    expect(onAddToCart).toHaveBeenCalledWith("1")
  })
})
```

---

## 11. Import Organization

### Import Order
```typescript
// 1. External dependencies
import React, { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"

// 2. Internal imports (absolute paths with @/)
import { Button } from "@/components/ui/button"
import { getProducts } from "@/lib/actions/product.actions"
import { cn } from "@/lib/utils"
import type { Product } from "@/types"

// 3. Relative imports (if any)
import { ProductCard } from "./ProductCard"
```

### Wildcard Imports
```typescript
// AVOID excessive wildcards
import * as AllUtils from "@/lib/utils"

// PREFER specific imports
import { cn, formatPrice } from "@/lib/utils"
```

---

## 12. Performance Optimization

### React.memo for Components
```typescript
interface ProductListProps {
  products: Product[]
  onSelect: (id: string) => void
}

const ProductList = React.memo(({ products, onSelect }: ProductListProps) => {
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id} onClick={() => onSelect(p.id)}>
          {p.name}
        </li>
      ))}
    </ul>
  )
})

ProductList.displayName = "ProductList"
export default ProductList
```

### useMemo & useCallback
```typescript
const MyComponent = ({ items }: { items: Item[] }) => {
  // Memoize expensive computations
  const expensiveValue = useMemo(
    () => items.reduce((sum, item) => sum + item.price, 0),
    [items]
  )

  // Memoize callbacks passed to child components
  const handleDelete = useCallback((id: string) => {
    deleteItem(id)
  }, [])

  return <div>{expensiveValue}</div>
}
```

---

## 13. Security Standards

### Input Validation
```typescript
// Always validate user input with Zod
const createProductSchema = z.object({
  name: z.string().min(1).max(100),
  price: z.number().positive(),
  description: z.string().max(1000),
})

export async function createProduct(data: unknown) {
  const validated = createProductSchema.parse(data)
  // Process validated data
}
```

### Authentication Checks
```typescript
export async function deleteProduct(id: string) {
  const session = await auth()

  // Always check authorization
  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized")
  }

  return prisma.product.delete({ where: { id } })
}
```

### Environment Variables
```typescript
// Never commit .env.local, use .env.example
// Access via process.env in Node.js context
const dbUrl = process.env.DATABASE_URL

// For client-side, prefix with NEXT_PUBLIC_
const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
```

---

## 14. Code Review Checklist

Before submitting code:
- [ ] TypeScript strict mode - no `any` types
- [ ] Component under 200 lines
- [ ] Props properly typed
- [ ] No console.log in production code
- [ ] Error handling implemented
- [ ] Input validation with Zod
- [ ] Authorization checks for admin actions
- [ ] No hardcoded secrets/API keys
- [ ] Tests written for critical logic
- [ ] Comments explain WHY, not WHAT
- [ ] Imports organized and sorted
- [ ] Tailwind classes are consistent
- [ ] Accessibility considered (ARIA labels)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Mar 2025 | Initial code standards documentation |

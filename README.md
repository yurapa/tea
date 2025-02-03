# The TeaVibe store

A full-featured Ecommerce website built with Next.js, TypeScript, PostgreSQL and Prisma.

## Tech stack:

- [Next.js v.15](https://nextjs.org/docs)
- React v.19
- TypeScript
- [Zod](https://zod.dev) is a TypeScript-first schema declaration and validation library.
- DB:
  - PostgreSQL database (offered through [Vercel](https://vercel.com/docs/storage/vercel-postgres) but is managed and is hosted by [Neon](https://neon.tech))
  - Prisma ORM [![Made with Prisma](http://made-with.prisma.io/indigo.svg)](https://prisma.io)
- UI
  - [ShadCN UI](https://ui.shadcn.com/docs)
  - Tailwindcss
  - lucide-react (for icons)
  - next-themes (theme mode toggle)
- Formatting
  - ESLint v.9
  - Prettier

### Getting Started

```bash

# Run in development mode
npm run dev

# Build for production
npm run build

# Run in production mode
npm start

# Export static site
npm run export
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Prisma Studio

To open Prisma Studio, run the following command:

```bash
npx prisma studio
```

## Seed Database

To seed the database with sample data, run the following command:

```bash
npx tsx ./db/seed
```

## ShadCN

We can use the `Button` component from Shadcn. You can read more about the button component [here](https://ui.shadcn.com/docs/components/button). Add the component:

```bash
npx shadcn@latest add button
```

## Fix Hydration Issue

Add the `surpressHydrationWarning` attribute to the `<html>` tag in the main layout.

One of the reasons is listed as "Server/client branch like if (typeof window !== 'undefined')"

We can fix this by making sure the component is mounted before the theme is set. We can do this by setting a `mounted` state and then checking if the component is mounted before setting the theme.

```tsx
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return null;
}
```

@TODO:

- [+] Theme toggle
- [+] Latest Products on the homepage
- [+] Product Details Page
- [...] Auth,
- [...] Login and Register pages
- Add product to cart
- Cart
- Payment
- Order History
- Admin
- Search
- Rating
- Send Email
- Homepage components

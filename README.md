# The TeaVibe store

Tech stack:

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

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

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

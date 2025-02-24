# The TeaVibe store

A full-featured Ecommerce website built with Next.js, TypeScript, PostgreSQL and Prisma.

## Tech stack:

- [Next.js v.15](https://nextjs.org/docs)
- React v.19
- TypeScript
- [Zod](https://zod.dev) is a TypeScript-first schema declaration and validation library.
- Database:
  - PostgreSQL database (offered through [Vercel](https://vercel.com/docs/storage/vercel-postgres) but is managed and is hosted by [Neon](https://neon.tech))
  - Prisma ORM [![Made with Prisma](http://made-with.prisma.io/indigo.svg)](https://prisma.io)
- Styling:
  - [ShadCN UI](https://ui.shadcn.com/docs)
  - Tailwindcss
  - `lucide-react`: icons
  - `next-themes`: theme mode toggle
- Forms:
  - `react-hook-form`: This is a library that helps us manage forms in React. It integrates well with ShadCN form components. It takes care of things like managing form state, handling form submissions, validating form inputs and displaying error messages
  - `@hookform/resolvers`: provides integrations between `react-hook-form` and validation libraries like Zod. It enables react-hook-form to leverage the validation schemas from these libraries directly, making it simpler to apply custom validation rules.
  - `slugify`: convert names to slugs
  - `uploadthing`: to handle the [image uploading](https://uploadthing.com)
- Charts:
  - `recharts`: A composable charting library built on React components
- Code Formatting:
  - ESLint v.9
  - Prettier
- Payment integration:
  - PayPal
  - [Stripe](https://dashboard.stripe.com/test/dashboard)
- E-mail:
  - `resend`: a simple API for sending emails
  - `react-email`: a library for creating email templates in React
  - `@react-email/components`: a set of pre-built components

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

If you need a card or any other component, you can easily add it to your project using the Shadcn command line interface.

```bash
npx shadcn@latest add card
```

## Test card details for Stripe

- Card Number: 4242 4242 4242 4242
- Expiry Date: 12/34
- CVC: 123

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

- Add possibility to add a "Comment" for the Order: Textarea field + DB
- (Add map to the Contacts page)[https://react-leaflet.js.org]

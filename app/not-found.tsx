import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-playfair text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">Page not found</p>
      <Link
        href="/"
        className="rounded-md bg-accent px-6 py-2 text-accent-foreground hover:bg-accent/90 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}

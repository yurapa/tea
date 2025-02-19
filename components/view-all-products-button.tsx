"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

const ViewAllProductsButton = () => {
  return (
    <Button asChild className="px-8 py-4 text-lg font-semibold">
      <Link href="/search">View All Products</Link>
    </Button>
  );
};

export default ViewAllProductsButton;

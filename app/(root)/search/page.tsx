import Link from "next/link";

import {
  getAllCategories,
  getAllProducts,
} from "@/lib/actions/product.actions";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/shared/pagination";
import ProductCard from "@/components/shared/product/product-card";

const prices = [
  {
    name: "€1 to €10",
    value: "1-10",
  },
  {
    name: "€11 to €20",
    value: "11-20",
  },
  {
    name: "€21 to €30",
    value: "21-30",
  },
  {
    name: "€31 to €50",
    value: "31-50",
  },
  {
    name: "€51 to €100",
    value: "51-100",
  },
];

const ratings = [4, 3, 2, 1];

const sortOrders = ["newest", "lowest", "highest", "rating"];

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string;
    category: string;
    price: string;
    rating: string;
  }>;
}) {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
  } = await props.searchParams;

  const isQuerySet = q && q !== "all" && q.trim() !== "";
  const isCategorySet =
    category && category !== "all" && category.trim() !== "";
  const isPriceSet = price && price !== "all" && price.trim() !== "";
  const isRatingSet = rating && rating !== "all" && rating.trim() !== "";

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `Search ${isQuerySet ? q : ""}
      ${isCategorySet ? `: Category ${category}` : ""}
      ${isPriceSet ? `: Price ${price}` : ""}
      ${isRatingSet ? `: Rating ${rating}` : ""}`,
    };
  } else {
    return {
      title: "Search Products",
    };
  }
}

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;

  const getFilterUrl = ({
    c,
    p,
    s,
    r,
    pg,
  }: {
    c?: string;
    p?: string;
    s?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };
    if (c) params.category = c;
    if (p) params.price = p;
    if (s) params.sort = s;
    if (r) params.rating = r;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({
    category,
    query: q,
    price,
    rating,
    page: Number(page),
    sort,
  });
  const categories = await getAllCategories();

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">
        <div className="text-xl mt-3 mb-2">Category</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                href={getFilterUrl({ c: "all" })}
                className={`${
                  (category === "all" || category === "") && "font-bold"
                }`}
              >
                Any
              </Link>
            </li>
            {categories.map((x) => (
              <li key={x.category}>
                <Link
                  href={getFilterUrl({ c: x.category })}
                  className={`${category === x.category && "font-bold"}`}
                >
                  {x.category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-xl mt-8 mb-2">Price</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                href={getFilterUrl({ p: "all" })}
                className={`${price === "all" && "font-bold"}`}
              >
                Any
              </Link>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                <Link
                  href={getFilterUrl({ p: p.value })}
                  className={`${p.value === price && "font-bold"}`}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-xl mt-8 mb-2">Customer Review</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                href={getFilterUrl({ r: "all" })}
                className={`${rating === "all" && "font-bold"}`}
              >
                Any
              </Link>
            </li>
            {ratings.map((r) => (
              <li key={r}>
                <Link
                  href={getFilterUrl({ r: `${r}` })}
                  className={`${rating === r.toString() && "font-bold"}`}
                >
                  {`${r} stars & up`}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="md:col-span-4 space-y-4">
        <div className="flex-between flex-col md:flex-row my-4">
          <div className="flex items-center">
            {q !== "all" && q !== "" && "Query : " + q}
            {category !== "all" && category !== "" && " Category: " + category}
            {price !== "all" && " Price: " + price}
            {rating !== "all" && " Rating: " + rating + " stars & up"}
            &nbsp;
            {(q !== "all" && q !== "") ||
            (category !== "all" && category !== "") ||
            rating !== "all" ||
            price !== "all" ? (
              <Button variant={"link"} asChild>
                <Link href="/search">Clear</Link>
              </Button>
            ) : null}
          </div>
          <div>
            Sort by:{" "}
            {sortOrders.map((s) => (
              <Link
                key={s}
                href={getFilterUrl({ s })}
                className={`mx-2 ${sort == s && "font-bold"} `}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products!.data.length === 0 && <div>No product found</div>}
          {products!.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {products!.totalPages! > 1 && (
          <Pagination page={page} totalPages={products!.totalPages} />
        )}
      </div>
    </div>
  );
};

export default SearchPage;

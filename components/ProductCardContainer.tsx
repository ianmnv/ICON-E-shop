"use client";

import { useFetchProductsQuery } from "@/store/api/productsApi";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";

export default function ProductCardContainer({
  productQuery,
}: {
  productQuery: string;
}) {
  const { isLoading, isError, data } = useFetchProductsQuery(productQuery);

  return (
    <>
      {isLoading && <LoadingSpinner />}

      {isError && <p>An error occurred, please try again.</p>}

      {data && <ProductCard productDetails={data.products} />}
    </>
  );
}

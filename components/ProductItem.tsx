"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./ProductItem.module.css";
import { useFetchProductsQuery } from "@/store/api/productsApi";
import LoadingSpinner from "./LoadingSpinner";
import type { Product } from "@/types";

export default function ProductItem({
  productQuery,
}: {
  productQuery: string;
}) {
  const { isLoading, isError, data } = useFetchProductsQuery(productQuery);

  return (
    <>
      {isError && <p>An error occurred, please try again.</p>}

      {isLoading && <LoadingSpinner />}

      {data?.products?.map((product: Product, i: number) => {
        const { id, title, thumbnail, price, rating } = product;

        return (
          <Link
            key={i}
            href={`/product/${id}`}
            className={styles.features__card}
          >
            <div className={styles.imgWrapper}>
              <Image
                src={thumbnail}
                alt={title}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover", borderRadius: "1rem" }}
                fill
              />
            </div>
            <h3 className={styles.feature__card_title}>{title}</h3>
            <div className={styles.feature__card_info}>
              <span
                className={styles.feature__card_price}
              >{`💲 ${price}`}</span>
              <span>{`⭐️ ${rating}`}</span>
            </div>
          </Link>
        );
      })}
    </>
  );
}

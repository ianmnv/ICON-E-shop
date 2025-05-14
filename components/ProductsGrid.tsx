"use client";

import Link from "next/link";
import styles from "./ProductsGrid.module.css";
import Image from "next/image";
import { useFetchProductsQuery } from "@/store/api/productsApi";

interface Product {
  id: number;
  rating: number;
  price: number;
  title: string;
  thumbnail: string;
}

export default function ProductsGrid({
  productsList,
}: {
  productsList: string[];
}) {
  const categories = productsList.map((productItem) =>
    useFetchProductsQuery(productItem)
  );

  return (
    <div className={styles.features__grid}>
      {categories.map((category) => {
        if (category.isError) return "An error occur please try again";

        if (category.isLoading) return "Loading...";

        if (category.data.products) {
          const products = category.data.products.map(
            (product: Product, i: number) => {
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
                    <span className={styles.feature__card_price}>{price}</span>
                    <span>{rating}</span>
                  </div>
                </Link>
              );
            }
          );
          return products;
        }
      })}
    </div>
  );
}

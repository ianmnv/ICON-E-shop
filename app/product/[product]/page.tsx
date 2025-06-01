"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import styles from "./page.module.css";
import { useFetchSingleProductQuery } from "@/store/api/productsApi";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function SingleProduct({
  params,
}: {
  params: Promise<{ product: number }>;
}) {
  const { product } = use(params);
  const { data, isLoading, isError } = useFetchSingleProductQuery(product);

  return (
    <main className={styles.main}>
      {isLoading && <LoadingSpinner />}

      {isError && notFound()}

      {data && (
        <>
          <div className={styles.imgs__container}>
            <Image
              src={data.images[0]}
              alt={data.title}
              width={600}
              height={600}
              className={styles.main__img}
            />

            <div className={styles.inner__img__container}></div>
          </div>

          <section className={styles.section__description__container}>
            <div className={styles.descriptive__info__container}>
              <h2>{data.title}</h2>
              <span className={styles.info__element}>{data.price}</span>
            </div>

            <div className={styles.description__container}>
              <h3>Description:</h3>
              <p className={styles.description__p}>{data.description}</p>
              <p className={styles.description__p}>{data.returnPolicy}</p>
              <p className={styles.description__p}>
                {data.warrantyInformation}
              </p>
            </div>

            <button className={styles.cart__btn}>
              Add to the cart
              <ShoppingBag className={styles.cart__icon} />
            </button>
          </section>
        </>
      )}
    </main>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import styles from "./ProductContent.module.css";
import { useFetchSingleProductQuery } from "@/store/api/productsApi";
import LoadingSpinner from "./LoadingSpinner";

type ProductContentProps = {
  productId: number;
};

export default function ProductContent({ productId }: ProductContentProps) {
  const { data, isLoading, isError } = useFetchSingleProductQuery(productId);
  const [activeImg, setActiveImg] = useState(0);

  return (
    <main className={styles.main}>
      {isError && notFound()}

      {isLoading && <LoadingSpinner />}

      {data && (
        <>
          <div className={styles.imgs__container}>
            <Image
              src={data.images[activeImg]}
              alt={data.title}
              width={400}
              height={400}
              className={styles.main__img}
              priority
            />

            <div className={styles.inner__img__container}>
              {data.images.map((img: string, i: number) => (
                <button
                  key={i}
                  style={{ backgroundColor: "#fff", cursor: "pointer" }}
                  onClick={() => setActiveImg(i)}
                  aria-label={`${data.title}-${i}`}
                >
                  <Image
                    src={img}
                    alt={`${data.title}-${i}`}
                    width={100}
                    height={100}
                    className={`${styles.inner__img__container} ${
                      activeImg === i ? styles.active__img : undefined
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <section className={styles.section__description__container}>
            <div className={styles.descriptive__info__container}>
              <h2>{data.title}</h2>
              <span className={styles.info__element}>{`💲 ${data.price}`}</span>
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

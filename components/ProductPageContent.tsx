"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ShoppingBag, Info } from "lucide-react";
import { useFetchSingleProductQuery } from "@/store/api/productsApi";
import { useAppDispatch } from "@/store/hooks/reduxHooks";
import { addToCart } from "@/store/features/cartSlice";
import styles from "./ProductPageContent.module.css";
import LoadingSpinner from "./LoadingSpinner";
import CartNotification from "./CartNotification";

type ProductContentProps = {
  productId: number;
};

export default function ProductContent({ productId }: ProductContentProps) {
  const { data, isLoading, isError } = useFetchSingleProductQuery(productId);
  const dispatch = useAppDispatch();
  const [activeImg, setActiveImg] = useState(0);
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    let startTimeout: NodeJS.Timeout;

    if (isAddedToCart) {
      startTimeout = setTimeout(() => setIsAddedToCart(false), 2000);
    }

    return () => clearTimeout(startTimeout);
  }, [isAddedToCart]);

  function handleImgChange(i: number) {
    setIsLoadingImg(true);
    setActiveImg(i);
  }

  function handleClick() {
    setIsAddedToCart(true);
    dispatch(addToCart(data));
  }

  return (
    <main className={styles.main}>
      <CartNotification isAddedToCart={isAddedToCart} />

      {isError && notFound()}

      {isLoading && <LoadingSpinner />}

      {data && (
        <>
          <div className={styles.imgs__container}>
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              {isLoadingImg && (
                <div className={styles.main__img__wrapper}>
                  <span style={{ fontSize: "var(--font-size-S)" }}>
                    Loading...
                  </span>
                </div>
              )}

              <Image
                src={data.images[activeImg]}
                alt={data.title}
                width={600}
                height={600}
                className={styles.main__img}
                priority
                onLoad={() => setIsLoadingImg(false)}
              />
            </div>

            <div className={styles.inner__img__container}>
              {data.images.map((img: string, i: number) => (
                <button
                  key={i}
                  style={{ backgroundColor: "#fff", cursor: "pointer" }}
                  onClick={() => handleImgChange(i)}
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
              <span className={styles.info__element}>{`💲${data.price}`}</span>
            </div>

            <div className={styles.description__container}>
              <h3>Description:</h3>
              <p className={styles.description__p}>{data.description}</p>
              <p className={styles.description__p}>{data.returnPolicy}</p>
              <p className={styles.description__p}>
                {data.warrantyInformation}
              </p>
              <p
                className={`${styles.description__p} ${styles.availableInStock}`}
              >
                <Info className={styles.availableIcon} />
                {data.availabilityStatus}
              </p>
            </div>

            <button className={styles.cart__btn} onClick={handleClick}>
              Add to the cart
              <ShoppingBag className={styles.cart__icon} />
            </button>
          </section>
        </>
      )}
    </main>
  );
}

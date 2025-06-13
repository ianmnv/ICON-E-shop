import Link from "next/link";
import Image from "next/image";
import styles from "./ProductCard.module.css";
import type { Product } from "@/types";

export default function ProductCard({
  productDetails,
}: {
  productDetails: Product[];
}) {
  return (
    <>
      {productDetails.map((product, i) => {
        const { id, title, thumbnail, rating, price } = product;

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

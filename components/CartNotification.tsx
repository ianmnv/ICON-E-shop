"use client";

import { BadgeCheck } from "lucide-react";
import styles from "./ProductPageContent.module.css";

export default function CartNotification({
  isAddedToCart,
}: {
  isAddedToCart: boolean;
}) {
  return (
    <>
      <div
        data-testid="cart-notification"
        className={`${styles.shopping__cart__notification} ${
          isAddedToCart ? styles.show__notification : undefined
        }`}
      >
        <span>Added to your cart</span>
        <BadgeCheck className={styles.confirmation__icon} />
      </div>
    </>
  );
}

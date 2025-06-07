"use client";

import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import { useAppSelector } from "@/store/hooks/reduxHooks";
import styles from "../Header.module.css";

export default function CartLink() {
  const cartState = useAppSelector((state) => state.cart);

  return (
    <Link href="/cart" className={styles.header__button}>
      <ShoppingBasket className={styles.header__icon} />
      <span>{cartState.length}</span>
    </Link>
  );
}

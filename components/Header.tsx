import Link from "next/link";
import { AlignJustify, ShoppingBag, ShoppingBasket } from "lucide-react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.header__logo} href="/">
        <ShoppingBag className={styles.header__icon} />
        <h1 className={styles.header__title}>ICON</h1>
      </Link>

      <div className={styles.header__nav}>
        <button className={styles.header__button}>
          <AlignJustify className={styles.header__icon} />
        </button>

        <Link href="/cart" className={styles.header__button}>
          <ShoppingBasket className={styles.header__icon} />
          <span>0</span>
        </Link>
      </div>
    </header>
  );
}

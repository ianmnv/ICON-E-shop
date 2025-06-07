import Link from "next/link";
import { AlignJustify, ShoppingBag } from "lucide-react";
import styles from "./Header.module.css";
import MenuBtn from "./buttons/MenuBtn";
import CartLink from "./buttons/CartLink";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.header__logo} href="/">
        <ShoppingBag className={styles.header__icon} />
        <h1 className={styles.header__title}>ICON</h1>
      </Link>

      <div className={styles.header__nav}>
        <MenuBtn ariaLabel="Open menu" classes={[`${styles.header__button}`]}>
          <AlignJustify className={styles.header__icon} />
        </MenuBtn>

        <CartLink />
      </div>
    </header>
  );
}

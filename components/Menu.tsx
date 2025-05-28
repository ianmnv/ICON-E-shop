"use client";

import styles from "./Menu.module.css";
import { CircleX } from "lucide-react";
import MenuCategory from "./MenuCategory";
import Button from "./Button";
import { useContext } from "react";
import { MenuContext } from "@/context/MenuContext";

interface Categories {
  title: string;
  subRoute: string;
}

export default function Menu() {
  const { isMenuOpen } = useContext(MenuContext);

  const menCategories: Categories[] = [
    { title: "All for men", subRoute: "all" },
    { title: "T-shirts", subRoute: "mens-shirts" },
    { title: "Men's watches", subRoute: "mens-watches" },
    { title: "Men's shoes", subRoute: "mens-shoes" },
    { title: "Men's sunglasses", subRoute: "sunglasses" },
  ];

  const womenCategories: Categories[] = [
    {
      title: "All for women",
      subRoute: "all",
    },
    { title: "Dresses", subRoute: "womens-dresses" },
    { title: "Women's shoes", subRoute: "womens-shoes" },
    { title: "Women's jewellery", subRoute: "womens-jewellery" },
    { title: "Women's watches", subRoute: "womens-watches" },
    { title: "Women's bags", subRoute: "womens-bags" },
  ];

  return (
    <aside
      className={`${styles.menu} ${
        isMenuOpen ? styles.menu__transition : undefined
      }`}
    >
      <header className={styles.menu__title}>
        <Button classes={[`${styles.close__icon__btn}`]} ariaLabel="Close menu">
          <CircleX className={styles.close__icon} />
        </Button>

        <h3>Categorias</h3>
      </header>

      <MenuCategory categoryName="Men" categories={menCategories} />
      <MenuCategory categoryName="Women" categories={womenCategories} />
    </aside>
  );
}

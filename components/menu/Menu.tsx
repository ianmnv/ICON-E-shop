import { CircleX } from "lucide-react";
import styles from "./Menu.module.css";
import MenuCategory from "./MenuCategory";
import MenuBtn from "../buttons/MenuBtn";
import MenuWrapper from "./MenuWrapper";

interface Categories {
  title: string;
  subRoute: string;
}

export default function Menu() {
  const menCategories: Categories[] = [
    { title: "All for men", subRoute: "all-for-men" },
    { title: "T-shirts", subRoute: "mens-shirts" },
    { title: "Men's watches", subRoute: "mens-watches" },
    { title: "Men's shoes", subRoute: "mens-shoes" },
    { title: "Men's sunglasses", subRoute: "sunglasses" },
  ];

  const womenCategories: Categories[] = [
    {
      title: "All for women",
      subRoute: "all-for-women",
    },
    { title: "Dresses", subRoute: "womens-dresses" },
    { title: "Women's shoes", subRoute: "womens-shoes" },
    { title: "Women's jewellery", subRoute: "womens-jewellery" },
    { title: "Women's watches", subRoute: "womens-watches" },
    { title: "Women's bags", subRoute: "womens-bags" },
  ];

  return (
    <MenuWrapper>
      <header className={styles.menu__title}>
        <MenuBtn
          classes={[`${styles.close__icon__btn}`]}
          ariaLabel="Close menu"
        >
          <CircleX className={styles.close__icon} />
        </MenuBtn>

        <h3>Categories</h3>
      </header>

      <MenuCategory categoryName="Men" categories={menCategories} />
      <MenuCategory categoryName="Women" categories={womenCategories} />
    </MenuWrapper>
  );
}

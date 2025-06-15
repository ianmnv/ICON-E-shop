import Carousel from "@/components/Carousel";
import styles from "./page.module.css";
import ProductCardContainer from "@/components/ProductCardContainer";

export default function Home() {
  return (
    <main className={styles.main}>
      <Carousel />

      <section className={styles.section__features}>
        <header className={styles.header}>
          <h2 className={styles.header__title}>Features</h2>
          <span className={styles.header__category}>- For men</span>
        </header>

        <section className="card__grid__container">
          {["mens-watches", "sunglasses"].map((productQuery) => (
            <ProductCardContainer
              productQuery={productQuery}
              key={productQuery}
            />
          ))}
        </section>

        <header className={styles.header}>
          <h2 className={styles.header__title}>Features</h2>
          <span className={styles.header__category}>- For women</span>
        </header>

        <section className="card__grid__container">
          {["womens-jewellery", "womens-bags"].map((productQuery) => (
            <ProductCardContainer
              productQuery={productQuery}
              key={productQuery}
            />
          ))}
        </section>
      </section>
    </main>
  );
}

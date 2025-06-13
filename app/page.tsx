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

        <div className={styles.features__grid}>
          {["mens-watches", "sunglasses"].map((productQuery, i) => (
            <ProductCardContainer productQuery={productQuery} key={i} />
          ))}
        </div>

        <header className={styles.header}>
          <h2 className={styles.header__title}>Features</h2>
          <span className={styles.header__category}>- For women</span>
        </header>

        <div className={styles.features__grid}>
          {["womens-jewellery", "womens-bags"].map((productQuery, i) => (
            <ProductCardContainer productQuery={productQuery} key={i} />
          ))}
        </div>
      </section>
    </main>
  );
}

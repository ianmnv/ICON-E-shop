import Carousel from "@/components/Carousel";
import styles from "./page.module.css";
import ProductItem from "@/components/ProductItem";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.section__portrait}>
        <Carousel />
      </section>

      <section className={styles.section__features}>
        <header className={styles.header}>
          <h2 className={styles.header__title}>Destacados</h2>
          <span className={styles.header__category}>- Para hombre</span>
        </header>

        <div className={styles.features__grid}>
          {["mens-watches", "sunglasses"].map((productItem, i) => (
            <ProductItem productItem={productItem} key={i} />
          ))}
        </div>

        <header className={styles.header}>
          <h2 className={styles.header__title}>Destacados</h2>
          <span className={styles.header__category}>- Para mujer</span>
        </header>

        <div className={styles.features__grid}>
          {["womens-jewellery", "womens-bags"].map((productItem, i) => (
            <ProductItem productItem={productItem} key={i} />
          ))}
        </div>
      </section>
    </main>
  );
}

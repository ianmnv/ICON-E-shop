import Carousel from "@/components/Carousel";
import styles from "./page.module.css";
import ProductsGrid from "@/components/ProductsGrid";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.section__portrait}>
        <Carousel />
      </section>

      <section className={styles.section__features}>
        <div>
          <header className={styles.header}>
            <h2 className={styles.header__title}>Destacados</h2>
            <span className={styles.header__category}>- Para hombre</span>
          </header>

          {/* display product cards here */}
          <div className="titulo-H"></div>
          <ProductsGrid productsList={["mens-watches", "sunglasses"]} />
        </div>

        <div>
          <header className={styles.header}>
            <h2 className={styles.header__title}>Destacados</h2>
            <span className={styles.header__category}>- Para mujer</span>
          </header>

          <div className="titulo-M"></div>
        </div>
      </section>
    </main>
  );
}

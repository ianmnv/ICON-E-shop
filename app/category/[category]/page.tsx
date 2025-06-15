import ProductCardContainer from "@/components/ProductCardContainer";
import styles from "./page.module.css";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  // TODO: Create condition when category doesn't exist

  const categoryName = category.replaceAll("-", " ").toUpperCase();

  const displayContent = (productQuery: string) => {
    if (productQuery === "all-for-men") {
      return ["mens-shirts", "mens-watches", "mens-shoes", "sunglasses"].map(
        (productQuery) => (
          <ProductCardContainer
            productQuery={productQuery}
            key={productQuery}
          />
        )
      );
    } else if (productQuery === "all-for-women") {
      return [
        "womens-dresses",
        "womens-shoes",
        "womens-jewellery",
        "womens-watches",
        "womens-bags",
      ].map((productQuery) => (
        <ProductCardContainer productQuery={productQuery} key={productQuery} />
      ));
    } else {
      return (
        <ProductCardContainer productQuery={productQuery} key={productQuery} />
      );
    }
  };

  return (
    <main className={styles.main}>
      <p className={styles.category__name}>{categoryName}</p>

      <section className="card__grid__container">
        {displayContent(category)}
      </section>
    </main>
  );
}

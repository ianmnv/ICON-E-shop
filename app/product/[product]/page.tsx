import { Suspense, use } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProductContent from "@/components/ProductContent";

type Props = {
  params: Promise<{ product: number }>;
};

async function getProductData(productId: number) {
  try {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product data");
    }
    return await response.json();
  } catch (error) {
    console.error(`Something went wrong. ${error}`);
    return null;
  }
}

export async function generateMetadata({ params }: Props) {
  const { product } = await params;
  const productData = await getProductData(product);

  if (!productData) {
    return { title: "ERROR" };
  }

  return {
    title: productData.title,
    description: productData.description,
  };
}

export default function SingleProduct({ params }: Props) {
  const { product } = use(params);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductContent productId={product} />
    </Suspense>
  );
}

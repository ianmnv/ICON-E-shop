import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: (query: string) => {
        return {
          url: `products/category/${query}`,
          method: "GET",
        };
      },
    }),
    fetchSingleProduct: builder.query({
      query: (productId: number) => {
        return {
          url: `products/${productId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useFetchProductsQuery, useFetchSingleProductQuery } =
  productsApi;

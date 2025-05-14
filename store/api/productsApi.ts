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
  }),
});

export const { useFetchProductsQuery } = productsApi;

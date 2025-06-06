import { Product } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: Product[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      state.push(action.payload);
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { addToCart } = cartSlice.actions;

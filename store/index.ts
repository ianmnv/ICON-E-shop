import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./api/productsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cartReducer } from "./features/cartSlice";

const rootReducer = combineReducers({
  [productsApi.reducerPath]: productsApi.reducer,
  cart: cartReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productsApi.middleware),
  });

  setupListeners(store.dispatch);

  return store;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

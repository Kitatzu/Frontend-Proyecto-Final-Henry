import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "../Slices";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
  },
});

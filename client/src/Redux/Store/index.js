import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "../Slices";
import { themeSlice } from "../Slices/theme";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    theme: themeSlice.reducer,
  },
});

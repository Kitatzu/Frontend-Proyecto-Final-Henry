import { configureStore } from "@reduxjs/toolkit";
import { categoriesSlice, productsSlice, providerSlice } from "../Slices";
import { themeSlice } from "../Slices/theme";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    theme: themeSlice.reducer,
    categories: categoriesSlice.reducer,
    providers: providerSlice.reducer,
  },
});

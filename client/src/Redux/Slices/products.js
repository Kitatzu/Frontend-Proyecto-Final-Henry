import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
  tempProducts: null,
  isLoading: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoadingProducts: (state, action) => {
      state.isLoading = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.tempProducts = action.payload;
    },
    
  },
});

export const { setLoadingProducts, setProducts } = productsSlice.actions;

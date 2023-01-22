import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
  tempProducts: null,
  productCreate: {
    id: null,
    series: [],
  },
  pages: 0,
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
    setPages: (state, action) => {
      state.pages = action.payload;
    },
    setCreateProduct: (state, action) => {
      state.productCreate.id = action.payload;
      state.productCreate.series = [];
    },
    setSeriesProducts: (state, action) => {
      state.productCreate.series = [
        ...state.productCreate.series,
        action.payload,
      ];
    },
  },
});
export const {
  setLoadingProducts,
  setProducts,
  setCreateProduct,
  setSeriesProducts,
  setPages,
} = productsSlice.actions;

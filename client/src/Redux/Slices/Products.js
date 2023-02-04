import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
  productDetail: null,
  tempProducts: null,
  popularProducts: null,
  productCreate: {
    id: null,
    series: [],
  },
  pages: 0,
  isLoading: false,
  filters: {
    prices: {
      min: 0,
      max: 0,
    },
  },
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
    setPopularProducts: (state, action) => {
      state.popularProducts = action.payload;
    },
    setPages: (state, action) => {
      state.pages = action.payload;
    },
    setProductID: (state, action) => {
      state.productDetail = action.payload;
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
    },setDeletedProducts:(state,action)=>{
      state.products=action.payload
    },
    filterPrice: (state, action) => {
      state.filters.prices[action.payload.name] = action.payload.value;
    },
    filterProduct: (state) => {
      if (parseInt(state.filters.prices.min) > 0)
        state.tempProducts = state.products.filter(
          (p) => parseFloat(p.price) >= parseFloat(state.filters.prices.min)
        );

      if (parseInt(state.filters.prices.max) > 0)
        state.tempProducts = state.products.filter(
          (p) => parseFloat(p.price) <= parseFloat(state.filters.prices.max)
        );

      if (
        parseInt(state.filters.prices.min) > 0 &&
        parseInt(state.filters.prices.max) > 0
      )
        state.tempProducts = state.products.filter(
          (p) =>
            parseFloat(p.price) <= parseFloat(state.filters.prices.max) &&
            parseFloat(p.price) >= parseFloat(state.filters.prices.min)
        );
      if (
        (parseInt(state.filters.prices.min) === 0 ||
          parseInt(state.filters.prices.min) === "") &&
        (parseInt(state.filters.prices.max) === 0 ||
          parseInt(state.filters.prices.max) === "")
      )
        state.tempProducts = state.products;
    },
  },
});

export const {
  setLoadingProducts,
  setProducts,
  setProductID,
  setCreateProduct,
  setSeriesProducts,
  setPages,
  setPriceRange,
  filterPrice,
  filterProduct,
  setPopularProducts,
  setDeletedProducts,
} = productsSlice.actions;

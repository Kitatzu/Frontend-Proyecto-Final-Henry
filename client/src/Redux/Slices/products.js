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
    orderByPrice:(state,action)=>{
      if (action.payload === "menor") {
        return {
          ...state,
          products: [...state.products].sort(function (a, b) {
            if (a.price > b.price) {
              return 1;
            }
            if (b.price > a.price) {
              return -1;
            }
            return 0;
          }),
        };
      }
      if (action.payload === "mayor") {
        return {
          ...state,
          products: [...state.products].sort(function (a, b) {
            if (a.price > b.price) {
              return -1;
            }
            if (b.price > a.price) {
              return 1;
            }
            return 0;
          }),
        };
      }
      if (action.payload === "All") {
        return {
          ...state,
          products: state.products,
        };
      } else {
        return {
          ...state,
          products: state.products,
        };
  }

}}});

export const { setLoadingProducts, setProducts } = productsSlice.actions;

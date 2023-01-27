import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsCart: [],
  totalPrice: null,
  status: null,
  error: null,
  isLoading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    startLoadingCart: (state) => {
      state.isLoading = true;
    },
    setProductsCart: (state, action) => {
      state.isLoading = false;
      state.productsCart = action.payload.products;
      state.status = action.payload.status;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload.status;
      state.error = action.payload.msg;
      state.isLoading = false;
    },
  },
});

export const { startLoadingCart, setProductsCart, setTotalPrice, setStatus } =
  cartSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  facturas: null,
  tempFactura: null,
  facturaDetail: null,
  loadingFactura: false,
  redir: false,
  error: null,
};

export const facturaSlice = createSlice({
  name: "facturas",
  initialState,
  reducers: {
    startLoadingFactura: (state) => {
      state.loadingFactura = true;
    },
    setFacturas: (state, action) => {
      state.isLoading = false;
      state.facturas = action.payload.facturas;
      state.tempFactura = action.payload.facturas;
    },
    setStatusFactura: (state, action) => {
      state.error = action.payload.msg;
      state.loadingFactura = false;
    },
    searchFactura: (state, action) => {
      if (state.facturas && action.payload !== "") {
        state.tempFactura = state.facturas.map(
          (f) => f.factura === action.payload
        );
      } else {
        state.tempFactura = state.facturas;
      }
    },
    setFacturaDetail: (state, action) => {
      state.facturaDetail = action.payload;
      state.loadingFactura = false;
    },
    setRedir: (state, action) => {
      state.redir = action.payload;
    },
  },
});

export const {
  startLoadingFactura,
  setFacturas,
  setStatusFactura,
  setFacturaDetail,
  setRedir,
} = facturaSlice.actions;

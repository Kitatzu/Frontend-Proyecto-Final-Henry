import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  dark: {
    primary:
      "linear-gradient(243.18deg, #000000 0%, #272727 50%, #323232 100%)",
    textPrimary: "#FAFAFA",
    textSecondary: "#1976D2",
    sidebar: "#5F5AB3",
    buttonPrimary:
      "linear-gradient(135.13deg, #7DFFB4 10.46%, #4244FF 127.81%)",
    card: "#585858",
    cardSecondary: "#FF23FF",
    cardCategory: "#C524FE",
    cardForm: "#CD2C8B",
  },
  light: {
    primary: "#FAFAFA",
    textPrimary: "#272727",
    textSecondary: "#565656",
    sidebar: "white",
    cardCategory: "#282828",
    cardForm: "rgba(255,255,255,.1)",
    buttonPrimary:
      "linear-gradient(135.13deg, #7DFFB4 10.46%, #4244FF 127.81%)",
    card: "white",
    cardSecondary: "#ffffff",
  },
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});
export const { setMode } = themeSlice.actions;

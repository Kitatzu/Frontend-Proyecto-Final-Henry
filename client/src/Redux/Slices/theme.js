import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  dark: {
    primary:
      "linear-gradient(243.18deg, #0F0F0F 0%, rgba(39, 39, 39, 0.71) 100%)",
    textPrimary: "#f2f2f2",
    textSecondary: "#1976D2",
    sidebar: "#272727",
    buttonPrimary:
      "linear-gradient(135.13deg, #7DFFB4 10.46%, #4244FF 127.81%)",
    card: "#565656",
    cardSecondary: "#1976D2",
  },
  light: {
    primary: "#f2f2f2f2",
    textPrimary: "#272727",
    textSecondary: "#565656",
    sidebar: "white",
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

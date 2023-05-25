import { createSlice } from "@reduxjs/toolkit";
import getSystemColorTheme from "./../../utils/getSystemColorTheme";

const initialState = localStorage.getItem("theme") ?? getSystemColorTheme();
document.body.classList.toggle("dark", initialState === "dark");

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      localStorage.setItem("theme", action.payload);
      document.body.classList.toggle("dark", action.payload === "dark");
      return action.payload;
    },
  },
});

export const { toggleTheme: toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

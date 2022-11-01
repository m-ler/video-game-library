import { createSlice } from "@reduxjs/toolkit";
import getSystemColorTheme from "./../../utils/getSystemColorTheme";

export const themeSlice = createSlice({
  name: "theme",
  initialState: localStorage.getItem("theme") ?? getSystemColorTheme(),
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

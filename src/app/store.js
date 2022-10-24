import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice";
import navMenuReducer from "../features/nav-menu/navMenuSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    navMenu: navMenuReducer,
  },
});

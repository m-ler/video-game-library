import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice";
import requestReducer from "../features/request/requestSlice";
import navMenuReducer from "../features/nav-menu/navMenuSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    request: requestReducer,
    navMenu: navMenuReducer,
  },
});

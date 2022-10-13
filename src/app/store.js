import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice";
import requestReducer from "../features/request/requestSlice";
import gamesFiltersReducer from "../features/filter/gamesFiltersSlice";
import gamePlatformReducer from "../features/data/gamePlatforms";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    request: requestReducer,
    gamesFilters: gamesFiltersReducer,
    gamePlatforms: gamePlatformReducer
  },
});

import { createSlice } from "@reduxjs/toolkit";
import { platformList } from "../../data/platformList";

const initialState = {
  OrderBy: "-added",
  Platform: null//platformList.find(x => x.slug === "all"),
};

export const gamesFiltersSlice = createSlice({
  name: "gameFilters",
  initialState,
  reducers: {
    setOrderBy: (state, action) => {
      state.OrderBy = action.payload;
    },
    setPlatform: (state, action) => {
      state.Platform = action.payload;
    },
  },
});

export const { setOrderBy, setPlatform } = gamesFiltersSlice.actions;
export default gamesFiltersSlice.reducer;

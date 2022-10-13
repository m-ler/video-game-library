import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  OrderBy: "-added",
  Platform: "All",
};

export const gamesFiltersSlice = createSlice({
  name: "gameFilters",
  initialState,
  reducers: {
    setOrderBy: (state, action) => {
      state.OrderBy = action.payload;
    },
    setPlatform: (state, action) => {
      console.log(action.payload)
      state.Platform = action.payload;
    },
  },
});

export const { setOrderBy, setPlatform } = gamesFiltersSlice.actions;
export default gamesFiltersSlice.reducer;

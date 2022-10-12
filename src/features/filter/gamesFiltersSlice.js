import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  OrderBy: "-added",
};

export const gamesFiltersSlice = createSlice({
  name: "gameFilters",
  initialState,
  reducers: {
    setOrderBy: (state, action) => {
      state.OrderBy = action.payload; 
    },
  },
});

export const { setOrderBy } = gamesFiltersSlice.actions;
export default gamesFiltersSlice.reducer;

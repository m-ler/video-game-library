import { createSlice } from "@reduxjs/toolkit";

export const genreSlice = createSlice({
  name: "genres",
  initialState: [],
  reducers: {
    setGenres: (state, action) => {
      return action.payload;
    },
  },
});

export const { setGenres } = genreSlice.actions;
export default genreSlice.reducer;

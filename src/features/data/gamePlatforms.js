import { createSlice } from "@reduxjs/toolkit";

export const gamePlatformSlice = createSlice({
  name: "gamePlatforms",
  initialState: [],
  reducers: {
    setGamePlatforms: (state, action) => {
      return action.payload;
    },
  },
});

export const { setGamePlatforms } = gamePlatformSlice.actions;
export default gamePlatformSlice.reducer;

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  currentUser: null,
};

export const fireBaseSlice = createSlice({
  name: "firebase",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = fireBaseSlice.actions;
export default fireBaseSlice.reducer;

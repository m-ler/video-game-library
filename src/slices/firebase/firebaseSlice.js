const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  currentUser: null,
  currentUserLikes: [],
};

export const fireBaseSlice = createSlice({
  name: "firebase",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setCurrentUserLikes: (state, action) => {
      state.currentUserLikes = action.payload;
    },
  },
});

export const { setCurrentUser, setCurrentUserLikes } = fireBaseSlice.actions;
export default fireBaseSlice.reducer;

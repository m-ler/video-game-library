const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  visible: document.body.clientWidth >= 640,
};

export const navMenuSlice = createSlice({
  name: "navMenu",
  initialState,
  reducers: {
    toggleNavMenu: (state, action) => {
      state.visible = action.payload;
    },
  },
});

export const { toggleNavMenu } = navMenuSlice.actions;
export default navMenuSlice.reducer;

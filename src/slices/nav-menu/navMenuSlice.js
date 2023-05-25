import { isScreenMobile } from "../../utils/environment";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  visible: !isScreenMobile(),
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

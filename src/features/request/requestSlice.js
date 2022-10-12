import { createSlice } from "@reduxjs/toolkit";

const doRequestsValue = localStorage.getItem("doRequests");

export const requestSlice = createSlice({
  name: "doRequests",
  initialState: doRequestsValue ? doRequestsValue === "true" : true,
  reducers: {
    toggleDoRequest: (state, action) => {
      localStorage.setItem("doRequests", action.payload.toString());
      return action.payload;
    },
  },
});

export const { toggleDoRequest } = requestSlice.actions;
export default requestSlice.reducer;

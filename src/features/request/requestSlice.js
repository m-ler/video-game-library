import { createSlice } from '@reduxjs/toolkit';

export const requestSlice = createSlice({
    name: "doRequests",
    initialState: localStorage.getItem("doRequests") === 'true' ?? false,
    reducers: {
        toggleDoRequest: (state, action) => {
            localStorage.setItem("doRequests", action.payload.toString());
            return action.payload;
        }
    }
});

export const { toggleDoRequest } = requestSlice.actions;
export default requestSlice.reducer;
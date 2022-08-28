import { createSlice } from '@reduxjs/toolkit';
import getSystemColorTheme from './../../utils/getSystemColorTheme';

export const themeSlice = createSlice({
    name: "theme",
    initialState: localStorage.getItem("theme") ?? getSystemColorTheme(),
    reducers: {
        changeTheme: (state, action) => {
            localStorage.setItem("theme", action.payload);
            return action.payload;
        }
    }
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
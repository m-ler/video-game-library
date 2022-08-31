import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import requestReducer from '../features/request/requestSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        request: requestReducer
    }
})

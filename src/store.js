import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/theme/themeSlice";
import navMenuReducer from "./slices/nav-menu/navMenuSlice";
import fireBaseReducer from "./slices/firebase/firebaseSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  theme: themeReducer,
  navMenu: navMenuReducer,
  firebase: fireBaseReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

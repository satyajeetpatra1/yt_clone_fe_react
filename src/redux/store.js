import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import uiReducer from "./slices/uiSlice";
import authReducer from "./slices/authSlice";
import videoReducer from "./slices/videoSlice";

// Configure the Redux store with the defined slices
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    ui: uiReducer,
    auth: authReducer,
    video: videoReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        ui: uiReducer,
    }
})
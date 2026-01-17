import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    sidebarOpen: true,
  },
  reducers: {
    // Toggle sidebar open/close state
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    // Close the sidebar
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
  },
});

export const { toggleSidebar, closeSidebar } = uiSlice.actions;
export default uiSlice.reducer;

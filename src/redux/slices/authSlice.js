import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromStorage,
  },
  reducers: {
    // Set user data upon login
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    // Clear user data upon logout
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

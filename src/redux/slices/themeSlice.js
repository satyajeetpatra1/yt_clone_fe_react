import { createSlice } from "@reduxjs/toolkit";

const initialTheme = localStorage.getItem("theme") === "dark";

if (initialTheme) {
  document.documentElement.classList.add("dark");
}

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    dark: initialTheme,
  },
  reducers: {
    // Toggle between dark and light themes
    toggleTheme: (state) => {
      state.dark = !state.dark;

      if (state.dark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

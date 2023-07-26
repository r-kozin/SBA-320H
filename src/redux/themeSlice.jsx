import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { theme: "light" },
  reducers: {
    toggleTheme: (state) => {
      if (state.theme === "light") {
        state.theme = "dark";
        document.querySelector("html").setAttribute("data-bs-theme", "dark");
      } else {
        state.theme = "light";
        document.querySelector("html").setAttribute("data-bs-theme", "light");
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;

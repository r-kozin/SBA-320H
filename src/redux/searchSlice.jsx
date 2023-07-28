import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchSearchResults = createAsyncThunk(
    "search/fetchResults",
    async (searchFor) => {
        console.log(searchFor);
      const response = await axios.get(
        `https://rickandmortyapi.com/api/${searchFor[0]}/?name=${searchFor[1]}`
      );
      return response.data;
    }
  );

const searchSlice = createSlice({
  name: "search",
  initialState: { results: [], status: "idle", error: null },
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
                // Dispatch the updateCharactersWithSearchResults action to update the characters slice
        // with the search results payload
    })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase("characters/fetchCharacterPage/fulfilled", (state, action) => {
        // Update searchSlice's results with the characters data from the payload 
        state.results = action.payload;
      }) //these two cases make it so you never get an error from clicking to a character page from search or charaters page
      .addCase("characters/fetchCharacters/fulfilled", (state, action) => {
        // Update searchSlice's results with the characters data from the payload
        state.results = action.payload;
      });
    }
});

export const { toggleTheme } = searchSlice.actions;

export default searchSlice.reducer;

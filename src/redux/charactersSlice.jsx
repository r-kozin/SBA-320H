import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCharacters = createAsyncThunk(
    "characters/fetchCharacters",
    async () => {
      const response = await axios.get("https://rickandmortyapi.com/api/character/");
      return response.data;
    }
  );

const charactersSlice = createSlice({
    name: "characters",
    initialState: { characters: [], currentPage: 1, status: "idle", error: null },
    reducers: {
      updatePageNum: (state, action) => {
        state.currentPage = action.payload;
      }
    },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.characters = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
  });

  export const { updatePageNum } = charactersSlice.actions;

export default charactersSlice.reducer;

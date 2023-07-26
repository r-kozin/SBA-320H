import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async () => {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/character/"
    );
    return response.data;
  }
);

export const fetchCharacterPage = createAsyncThunk(
  "characters/fetchCharacterPage",
  async (pageNumber) => {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?page=${pageNumber}`
    );
    return response.data;
  }
);

const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    characters: [
      {
        info: {
          count: 0,
          pages: 1,
          next: "",
          prev: null,
        },
        results: [],
      },
    ],
    currentPage: 1,
    status: "idle",
    pageChangeStatus: "idle",
    error: null,
  },
  reducers: {
    updatePageNum: (state, action) => {
      state.currentPage = action.payload;
    },
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
      })
      .addCase(fetchCharacterPage.pending, (state) => {
        state.pageChangeStatus = "loading";
      })
      .addCase(fetchCharacterPage.fulfilled, (state, action) => {
        state.pageChangeStatus = "succeeded";
        state.characters = action.payload;
      })
      .addCase(fetchCharacterPage.rejected, (state, action) => {
        state.pageChangeStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updatePageNum } = charactersSlice.actions;

export default charactersSlice.reducer;

export const selectCharacterByID = (state, charId) =>
  state.characters.characters.results.find(
    (character) => character.id == charId
  );

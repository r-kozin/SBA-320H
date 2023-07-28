import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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
    pageChangeError: null,
  },
  reducers: {
    updatePageNum: (state, action) => {
      state.currentPage = action.payload;
    },
    updateCharacters: (state, action) => {
      state.characters = action.payload;
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
        state.status = "loading";
      })
      .addCase(fetchCharacterPage.fulfilled, (state, action) => {
        state.pageChangeStatus = "succeeded";
        state.status = "succeeded";
        state.characters = action.payload;
      })
      .addCase(fetchCharacterPage.rejected, (state, action) => {
        state.pageChangeStatus = "failed";
        state.status = "failed";
        state.pageChangeError = action.error.message;
      })
      .addCase("search/fetchResults/fulfilled", (state, action) => {
        // Update charactersSlice's characters with the data from the payload
        state.characters = action.payload;
      });
  },
});

export const { updatePageNum } = charactersSlice.actions;

export default charactersSlice.reducer;

export const selectCharacterByID = (state, charId) =>
  state.characters.characters.results.find(
    (character) => character.id == charId
  );

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

export const fetchResidents = createAsyncThunk(
  "characters/fetchResidents",
  async (residentIds) => {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/${residentIds}`
    );
    return response.data;
  }
);

export const fetchSpecificResident = createAsyncThunk(
  "characters/fetchSpecificResident",
  async (id) => {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/${id}`
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
        results: [
          {
            id: 6,
            name: "Abadango Cluster Princess",
            status: "Alive",
            species: "Alien",
            type: "",
            gender: "Female",
            image: "https://rickandmortyapi.com/api/character/avatar/6.jpeg",
            url: "https://rickandmortyapi.com/api/character/6",
            created: "2017-11-04T19:50:28.250Z",
          },
        ],
      },
    ],
    residents: [],
    currentPage: 1,
    status: "idle",
    residentStatus: "idle",
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
      })
      .addCase(fetchResidents.pending, (state) => {
        state.residentStatus = "loading";
      })
      .addCase(fetchResidents.fulfilled, (state, action) => {
        state.residentStatus = "succeeded";
        state.residents = action.payload;
      })
      .addCase(fetchResidents.rejected, (state, action) => {
        state.residentStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSpecificResident.pending, (state) => {
        state.residentStatus = "loading";
      })
      .addCase(fetchSpecificResident.fulfilled, (state, action) => {
        state.residentStatus = "succeeded";
        const charExists = state.characters.results.some(c => c.id === action.payload.id);
        if (charExists) {
          console.log("char already exists");
        }else {
        state.characters.results = state.characters.results.concat(
          action.payload
        );}
      })
      .addCase(fetchSpecificResident.rejected, (state, action) => {
        state.residentStatus = "failed";
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

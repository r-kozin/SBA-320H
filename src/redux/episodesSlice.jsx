import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEpisodes = createAsyncThunk(
  "episode/fetchEpisodes",
  async () => {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/episode/"
    );
    return response.data;
  }
);

export const fetchSingleEpisode = createAsyncThunk(
  "episode/fetchSingleEpisode",
  async (epId) => {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/episode/${epId}`
    );
    return response.data;
  }
);

export const fetchEpisodePage = createAsyncThunk(
  "episode/fetchEpisodePage",
  async (pageNumber) => {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/episode/?page=${pageNumber}`
    );
    return response.data;
  }
);

const episodesSlice = createSlice({
  name: "episodes",
  initialState: {
    episodes: {
      info: {
        count: 0,
        pages: 1,
        next: "",
        prev: null,
      },
      results: [],
    },
    currentPage: 1,
    status: "idle",
    epStatus: "idle",
    pageChangeStatus: "idle",
    error: null,
    pageChangeError: null,
  },
  reducers: {
    updateEpisodePageNum: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.episodes = action.payload;
      })
      .addCase(fetchEpisodes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSingleEpisode.pending, (state) => {
        state.epStatus = "loading";
      })
      .addCase(fetchSingleEpisode.fulfilled, (state, action) => {
        state.epStatus = "succeeded";
          console.log(action.payload);
          state.episodes.results = action.payload
      })
      .addCase(fetchSingleEpisode.rejected, (state, action) => {
        state.epStatus = "failed";
        state.epStatus = action.error.message;
      })
      .addCase(fetchEpisodePage.pending, (state) => {
        state.pageChangeStatus = "loading";
        state.status = "loading";
      })
      .addCase(fetchEpisodePage.fulfilled, (state, action) => {
        state.pageChangeStatus = "succeeded";
        state.status = "succeeded";
        state.episodes = action.payload;
      })
      .addCase(fetchEpisodePage.rejected, (state, action) => {
        state.pageChangeStatus = "failed";
        state.status = "failed";
        state.pageChangeError = action.error.message;
      });
  },
});

export const { updateEpisodePageNum } = episodesSlice.actions;

export default episodesSlice.reducer;

export const selectEpisodeByID = (state, epId) =>
  state.episodes.episodes.results.find((episode) => episode.id == epId);

// export const filterEpisodeByID = (state, epId) =>
//   state.episodes.episodes.results[0].filter(({ id }) => !epId.includes(id));

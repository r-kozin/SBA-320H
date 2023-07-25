import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLocations = createAsyncThunk(
    "locations/fetchLocations",
    async () => {
      const response = await axios.get("https://rickandmortyapi.com/api/location/");
      return response.data;
    }
  );

const locationSlice = createSlice({
    name: "location",
    initialState: { locations: [], currentPage: 1, status: "idle", error: null },
    reducers: {
      updateLocationPageNum: (state, action) => {
        state.currentPage = action.payload;
      }
    },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
  });

  export const { updateLocationPageNum } = locationSlice.actions;

export default locationSlice.reducer;

export const selectLocationByName = (state, locationName) =>
  state.location.locations.results.find((location) => location.name === locationName)
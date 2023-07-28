import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import charactersReducer from './charactersSlice'
import locationsReducer from './locationsSlice'
import themeReducer from './themeSlice'
import episodesReducer from './episodesSlice'
import searchReducer from './searchSlice'

export default configureStore({
    reducer: {
        characters: charactersReducer,
        location: locationsReducer,
        theme: themeReducer,
        episodes: episodesReducer,
        search: searchReducer,
    }
});
import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from './charactersSlice'
import locationsReducer from './locationsSlice'
import themeReducer from './themeSlice'
import episodesReducer from './episodesSlice'

export default configureStore({
    reducer: {
        characters: charactersReducer,
        location: locationsReducer,
        theme: themeReducer,
        episodes: episodesReducer
    }
});
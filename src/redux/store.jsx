import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from './charactersSlice'
import locationsReducer from './locationsSlice'
import themeReducer from './themeSlice'

export default configureStore({
    reducer: {
        characters: charactersReducer,
        location: locationsReducer,
        theme: themeReducer
    }
});
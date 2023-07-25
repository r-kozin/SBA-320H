import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from './charactersSlice'
import locationsReducer from './locationsSlice'

export default configureStore({
    reducer: {
        characters: charactersReducer,
        location: locationsReducer,
    }
});
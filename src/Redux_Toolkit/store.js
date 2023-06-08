import { configureStore } from "@reduxjs/toolkit";
import providersReducer from './providersSlice'

const store = configureStore(
    {
        reducer: {
            providers: providersReducer
        },
    });

    export default store;
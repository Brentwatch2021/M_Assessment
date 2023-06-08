import { createSlice } from '@reduxjs/toolkit'


const providersSlice = createSlice(
    {
        name:"providersSlice",
        initialState: [],
        reducers: {
            setProviders: (state, action) => {
                state = action.payload;
            }
        },
    }
);

export const { setProviders } = providersSlice.actions;
export default providersSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const flagSlice = createSlice({
    name: 'flag',
    initialState: {
        isLoading: false,
        isPromptOne: false,
        isPromptTwo: false,
        index: -1,
    },
    reducers: {
        setIsLoading: (state) => {
            state.isLoading = true;
            state.isPromptOne = false;
            state.isPromptTwo = false;
        },
        setIsPromptOne: (state) => {
            state.isPromptOne = true;
            state.isLoading = false;
            state.isPromptTwo = false;
        },
        setIsPromptTwo: (state) => {
            state.isPromptTwo = true;
            state.isPromptOne = false;
            state.isLoading = false;
        },
        setLoaded: (state) => {
            state.isPromptTwo = false;
            state.isPromptOne = false;
            state.isLoading = false;
        },
        setIndex: (state,action) => {
            state.index = action.payload
        }
    },
});

export const { setIsLoading, setIsPromptOne, setIsPromptTwo, setLoaded, setIndex } = flagSlice.actions;
export default flagSlice.reducer;

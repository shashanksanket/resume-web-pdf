import { createSlice } from '@reduxjs/toolkit';

const resumeSlice = createSlice({
  name: 'resumeData',
  initialState: '',
  reducers: {
    setResume: (state, action) => {
      return action.payload;
    },
  },
});

export const { setResume } = resumeSlice.actions;
export default resumeSlice.reducer;
// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './resumeSlice';
import flagReducer from './flagSlice';

const store = configureStore({
  reducer: {
    resumeData: resumeReducer,
    flag: flagReducer,
  },
});

export default store;

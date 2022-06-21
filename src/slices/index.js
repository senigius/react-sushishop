import { configureStore } from '@reduxjs/toolkit';
import filter from './filterSlice';

export default configureStore({
  reducer: {
    filter,
  },
});

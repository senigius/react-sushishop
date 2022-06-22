import { configureStore } from '@reduxjs/toolkit';
import filter from './filterSlice';
import cart from './cartSlice';

export default configureStore({
  reducer: {
    filter,
    cart,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import filter from './filterSlice';
import cart from './cartSlice';
import products from './productsSlice';

export default configureStore({
  reducer: {
    filter,
    cart,
    products,
  },
});

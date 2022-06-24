import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ currentPage, category, search, propertyName }) => {
    const { data } = await axios.get(
      `${routes.getItems()}?page=${currentPage}&limit=8&${category}${search}&sortBy=${propertyName}&order=desc`,
    );
    return data;
  },
);

const initialState = {
  items: [],
  status: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setItems(state, { payload }) {
      state.items = payload;
    },
    setStatus(state, { payload }) {
      state.status = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.status = 'success';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'network error'; // TODO: handle network error
        state.items = [];
        console.log(action);
      });
  },
});

export const { actions } = productsSlice;
export default productsSlice.reducer;

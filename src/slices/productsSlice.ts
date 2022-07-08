import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { pageItemsLimit, Status } from '../constants';

import routes from '../routes';

export type TProduct = {
  category: number;
  id: number;
  img: string;
  ingredients: string[];
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  weight: number;
}

interface ProductsSliceState {
  items: TProduct[];
  status: Status;
}

export const fetchProducts = createAsyncThunk<TProduct[], Record<string, string>> (
  'products/fetchProducts',
  async ({ currentPage, category, search, sortName, orderValue }) => {
    const { data } = await axios.get<TProduct[]>(
      `${routes.getItems()}?page=${currentPage}${pageItemsLimit}${category}${search}${sortName}${orderValue}`,
    );
    return data;
  },
);

const initialState: ProductsSliceState = {
  items: [],
  status: Status.LOADING,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TProduct[]>) {
      state.items = action.payload;
    },
    setStatus(state, action:  PayloadAction<Status>) {
      state.status = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.items = payload;

        if (payload.length > 0) {
          state.status = Status.SUCCESS;
        } else {
          state.status = Status.NOITEMS;
        }
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const { actions } = productsSlice;
export default productsSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getItemsFromLocalStorage from '../utils/getItemsFromLocalStorage';
import getTotalPrice from '../utils/getTotalPrice';

export type TCartItem = {
  id: number;
  title: string;
  price: number;
  img: string;
  size: number;
  count: number;
}

interface CartSliceState {
  totalPrice: number;
  items: TCartItem[];
};

const data = getItemsFromLocalStorage();

const initialState: CartSliceState = {
  totalPrice: getTotalPrice(data),
  items: data,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TCartItem>) {
      const { payload } = action
      const findItem = state.items.find(
        (item) => item.id === payload.id && item.size === payload.size,
      );

      if (findItem) {
        findItem.count += 1;
      } else {
        state.items.push({
          ...payload,
          count: 1,
        });
      }
      state.totalPrice = getTotalPrice(state.items);
    },
    removeOneItem(state, action: PayloadAction<TCartItem>) {
      const { payload } = action;
      const findItem = state.items.find(
        (item) => item.id === payload.id && item.size === payload.size,
      );

      if (findItem) {
        findItem.count -= 1;
      }
      state.totalPrice = getTotalPrice(state.items);
    },
    removeAllCurrentItems(state, action: PayloadAction<TCartItem>) {
      const { payload } = action;
      state.items = state.items.filter(
        (item) => !(item.size === payload.size && item.id === payload.id),
      );

      state.totalPrice = getTotalPrice(state.items);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { actions } = cartSlice;
export default cartSlice.reducer;

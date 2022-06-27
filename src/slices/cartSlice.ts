import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

const updateTotalPrice = (state: CartSliceState) =>
  state.items.reduce((acc: number, item) => item.count * item.price + acc, 0);

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
      state.totalPrice = updateTotalPrice(state);
    },
    removeOneItem(state, action: PayloadAction<TCartItem>) {
      const { payload } = action;
      const findItem = state.items.find(
        (item) => item.id === payload.id && item.size === payload.size,
      );

      if (findItem) {
        findItem.count -= 1;
      }
      state.totalPrice = updateTotalPrice(state);
    },
    removeAllCurrentItems(state, action: PayloadAction<TCartItem>) {
      const { payload } = action;
      state.items = state.items.filter(
        (item) => !(item.size === payload.size && item.id === payload.id),
      );

      state.totalPrice = updateTotalPrice(state);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { actions } = cartSlice;
export default cartSlice.reducer;

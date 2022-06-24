import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const updateTotalPrice = (state) =>
  state.items.reduce((acc, item) => item.count * item.price + acc, 0);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, { payload }) {
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
    removeOneItem(state, { payload }) {
      const findItem = state.items.find(
        (item) => item.id === payload.id && item.size === payload.size,
      );

      findItem.count -= 1;
      state.totalPrice = updateTotalPrice(state);
    },
    removeAllCurrentItems(state, { payload }) {
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

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, { payload }) {
      const findItem = state.items.find((item) => item.id === payload.id);

      if (findItem) {
        findItem.count += 1;
      } else {
        state.items.push({
          ...payload,
          count: 1,
        });
      }
      state.cartPrice += payload.price;
    },
    removeOneItem(state, { payload }) {
      state.items = state.items.filter((item) => item.id !== payload);
    },
    removeAllItems(state) {
      state.items = [];
    },
  },
});

export const { actions } = cartSlice;
export default cartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortType: {
    sortName: 'популярности',
    propertyName: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, { payload }) {
      state.categoryId = payload;
    },
    setSortType(state, { payload }) {
      state.sortType = payload;
    },
  },
});

export const { actions } = filterSlice;
export default filterSlice.reducer;

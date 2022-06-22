import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currentPage: 1,
  pageCount: 3,
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
      state.currentPage = initialState.currentPage;
    },
    setSortType(state, { payload }) {
      state.sortType = payload;
    },
    setCurrentPage(state, { payload }) {
      state.currentPage = payload;
    },
    setPageCount(state, { payload }) {
      state.pageCount = payload;
    },
    setFilters(state, { payload }) {
      state.currentPage = Number(payload.currentPage);
      state.categoryId = Number(payload.categoryId);
      state.sortType = payload.sort;
    },
  },
});

export const { actions } = filterSlice;
export default filterSlice.reducer;

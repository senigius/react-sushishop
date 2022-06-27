import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TSortValues = {
  sortName: string;
  propertyName: string;
  order: string;
};

interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  pageCount: number;
  sortType: TSortValues;
};

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  pageCount: 3,
  sortType: {
    sortName: 'популярности',
    propertyName: 'rating',
    order: 'desc',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
      state.currentPage = initialState.currentPage;
    },
    setSortType(state, action: PayloadAction<TSortValues>) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilters(state, action: PayloadAction<Partial<FilterSliceState>>) { 
      const { payload } = action;
      if (Object.keys(payload).length) {
        state.currentPage = Number(payload.currentPage);
        state.categoryId = Number(payload.categoryId);
        state.sortType = payload.sortType || initialState.sortType;
      } else {
        state = initialState;
      }
    },
  },
});

export const { actions } = filterSlice;
export default filterSlice.reducer;

import { RootState } from ".";

export const getCategoryId = (state: RootState) => state.filter.categoryId;
export const getSortType = (state: RootState) => state.filter.sortType;
export const getCurrentPage = (state: RootState) => state.filter.currentPage;
export const getPageCount = (state: RootState) => state.filter.pageCount;
export const getSearchValue = (state: RootState) => state.filter.searchValue;

export const getCartPrice = (state: RootState) => state.cart.totalPrice;
export const getCartItems = (state: RootState) => state.cart.items;
export const getCurrentItems = (id: number) => (state: RootState) => state.cart.items.filter((item) => item.id === id);
export const getCartItemsCount = (state: RootState) =>
  state.cart.items.reduce((acc, item) => item.count + acc, 0);

export const getProducts = (state: RootState) => state.products.items;
export const getStatus = (state: RootState) => state.products.status;

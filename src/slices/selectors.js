export const getCategoryId = (state) => state.filter.categoryId;
export const getSortType = (state) => state.filter.sortType;
export const getCurrentPage = (state) => state.filter.currentPage;
export const getPageCount = (state) => state.filter.pageCount;

export const getCartPrice = (state) => state.cart.cartPrice;
export const getCartItems = (state) => state.cart.items;
export const getCurrentItems = (id) => (state) => state.cart.items.filter((item) => item.id === id);
export const getCartItemsCount = (state) =>
  state.cart.items.reduce((acc, item) => item.count + acc, 0);

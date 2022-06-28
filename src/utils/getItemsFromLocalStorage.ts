const getItemsFromLocalStorage = () => {
  const data = localStorage.getItem('cartItems');
  return data ? JSON.parse(data) : [];
};

export default getItemsFromLocalStorage;
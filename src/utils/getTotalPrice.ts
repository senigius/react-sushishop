import { TCartItem } from "../slices/cartSlice";

const getTotalPrice = (items: TCartItem[]) =>
  items.reduce((acc: number, item) => item.count * item.price + acc, 0);

export default getTotalPrice;
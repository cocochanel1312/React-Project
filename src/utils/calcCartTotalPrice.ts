import { ICartItem } from "../redux/slices/cartSlice";

export const calcCartTotalPrice = (items: ICartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};

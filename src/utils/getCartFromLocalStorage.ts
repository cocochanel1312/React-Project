import { calcCartTotalPrice } from "./calcCartTotalPrice";

export const getCartFromLocalStorage = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcCartTotalPrice(items);

  return {
    items,
    totalPrice,
  };
};

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { calcCartTotalPrice } from "../../utils/calcCartTotalPrice";
import { getCartFromLocalStorage } from "../../utils/getCartFromLocalStorage";

export interface ICartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  types: string;
  count: number;
}

interface InitialStateCartSlice {
  totalPrice: number;
  items: ICartItem[];
}

const { items, totalPrice } = getCartFromLocalStorage();

const initialState: InitialStateCartSlice = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ICartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcCartTotalPrice(state.items);
    },
    plusItem(state, action: PayloadAction<string>) {
      const cartItem = state.items.find((obj) => obj.id === action.payload);
      if (cartItem) {
        cartItem.count++;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return (sum += obj.price * obj.count);
      }, 0);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return (sum += obj.price * obj.count);
      }, 0);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return (sum += obj.price * obj.count);
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;
export const cartItemByIdSelector = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, plusItem, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;

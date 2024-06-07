import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface IPizzaSliceItems {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  count: number;
}

interface InitialStatePizzaSlice {
  items: IPizzaSliceItems[];
  status: "loading" | "success" | "error";
}

interface IParamsType {
  category: string;
  currentPage: number;
  sortType: {
    name: string;
    sortProperty: string;
  };
  search: string;
}

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: IParamsType) => {
    const { category, currentPage, sortType, search } = params;
    const res = await axios.get(
      `https://6630dd5dc92f351c03db6116.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortType.sortProperty}&order=desc${search}`
    );

    return res.data;
  }
);

const initialState: InitialStatePizzaSlice = {
  items: [],
  status: "loading", // loading | success | error
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const { setItems } = pizzasSlice.actions;

export const pizzaItemsSelector = (state: RootState) => state.pizzas.items;
export const pizzaStatusSelector = (state: RootState) => state.pizzas.status;

export default pizzasSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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
    const { data } = await axios.get<IPizzaSliceItems[]>(
      `https://6630dd5dc92f351c03db6116.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortType.sortProperty}&order=desc${search}`
    );

    return data;
  }
);

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface InitialStatePizzaSlice {
  items: IPizzaSliceItems[];
  status: Status;
}

const initialState: InitialStatePizzaSlice = {
  items: [],
  status: Status.LOADING,
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<IPizzaSliceItems[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(
        fetchPizzas.fulfilled,
        (state, action: PayloadAction<IPizzaSliceItems[]>) => {
          state.status = Status.SUCCESS;
          state.items = action.payload;
        }
      )
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = pizzasSlice.actions;

export const pizzaItemsSelector = (state: RootState) => state.pizzas.items;
export const pizzaStatusSelector = (state: RootState) => state.pizzas.status;

export default pizzasSlice.reducer;

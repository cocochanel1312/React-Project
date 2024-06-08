import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ISortList } from "../../components/Sort";

interface InitialStateFilterSlice {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: {
    name: string;
    sortProperty: string;
  };
}

const initialState: InitialStateFilterSlice = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<ISortList>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<InitialStateFilterSlice>) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export const sortSelector = (state: RootState) => state.filter.sort;
export const categoryIdSelector = (state: RootState) => state.filter.categoryId;
export const currentPageSelector = (state: RootState) =>
  state.filter.currentPage;
export const searchValueSelector = (state: RootState) =>
  state.filter.searchValue;

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  favoritesItems: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavoritesItem(state, action) {
      console.log(state.favoritesItems);
      const findFavoritesItem = state.favoritesItems.find(
        (obj) => obj.id === action.payload.id
      );
      if (findFavoritesItem) {
        state.favoritesItems = state.favoritesItems.filter(
          (obj) => obj.id !== action.payload.id
        );
      } else {
        state.favoritesItems.push(action.payload);
      }
    },
    removeFavoritesItem(state, action) {
      state.favoritesItems = state.favoritesItems.filter(
        (obj) => obj.id !== action.payload
      );
    },
    clearFavoritesItem(state) {
      state.favoritesItems = [];
    },
  },
});

export const favoritesCountSelector = (state: RootState) =>
  state.favorites?.favoritesItems.length ?? 0;
export const favoritesSelector = (state) => state.favorites;
export const isItemInFavoritesSelector = (id) => (state: RootState) =>
  state.favorites.favoritesItems.some((obj) => obj.id === id);

export const { addFavoritesItem, removeFavoritesItem, clearFavoritesItem } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;

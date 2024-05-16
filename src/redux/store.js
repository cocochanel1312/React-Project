import { configureStore } from "@reduxjs/toolkit";

import filterSlice from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    filter: filterSlice // назвали нами созданное состояние (filter) и передали логику (filterSlice)
  },
});

console.log(store);

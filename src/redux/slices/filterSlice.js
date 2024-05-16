import { createSlice } from "@reduxjs/toolkit";
// при создании slice необзодимо сделать такой импорт

const initialState = {
  value: 0,
};
// Задали начальное состояние нашему компоненту

export const filterSlice = createSlice({
  // создали переменную со значением функции в которой содержится логика
  name: "filter", // называние нашей функции
  initialState, // начальное состояние нашего компонента, аналог useState(0);
  reducers: {
    // reducers отвечает за логику изменения нашего состояния (методы изменяющие наш стейт)
    increment: (state) => {
      // state будет считаться созданное нами initialState (т.е. начальное состояние)
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

console.log(filterSlice);

export const { increment, decrement, incrementByAmount } = filterSlice.actions;
// экспоритруем все действия (actions) из нашего переменной filterSlice

export default filterSlice.reducer;
// обязательно необходимо экспортировать в store.js

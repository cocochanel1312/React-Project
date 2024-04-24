import React from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';


function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            <PizzaBlock title="Морской узел" price="4.99"/>
            <PizzaBlock title="4 мать его сыра" price="2.99"/>
            <PizzaBlock title="Хэллоупенья" price="3.99"/>
            <PizzaBlock title="Острый Мексиканец" price="5.99"/>
            <PizzaBlock title="Омичка" price="9.99"/>
            <PizzaBlock title="Крабово-креветочная" price="13.99"/>
            <PizzaBlock title="Торпедуха" price="8.99"/>
            <PizzaBlock title="Мясная" price="7.99"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

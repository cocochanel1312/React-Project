import React, { useEffect, useState } from "react";
import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import Skeleton from "./components/PizzaBlock/Skeleton";

function App() {
  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://6630dd5dc92f351c03db6116.mockapi.io/items")
      .then((response) => {
        return response.json();
      })
      .then((pizzaArray) => {
        setPizzaItems(pizzaArray);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
              : pizzaItems.map((object) => (
                  <PizzaBlock key={object.id} {...object} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

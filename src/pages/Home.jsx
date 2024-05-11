import React, { useState, useEffect } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

function Home({ searchValue }) {
  // TODO: поменять способ задания функции
  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  useEffect(() => {
    setIsLoading(true);
    const category = categoryId ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    fetch(
      `https://6630dd5dc92f351c03db6116.mockapi.io/items?${category}&sortBy=${sortType.sortProperty}&order=desc${search}`
    )
      .then((response) => {
        return response.json();
      })
      .then((pizzaArray) => {
        setPizzaItems(pizzaArray);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzas = pizzaItems.map((object) => (
    <PizzaBlock key={object.id} {...object} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          valueId={categoryId}
          onChangeCategory={(categoryIndex) => setCategoryId(categoryIndex)}
        />
        <Sort
          sortValue={sortType}
          onChangeSort={(categoryIndex) => setSortType(categoryIndex)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination />
    </div>
  );
}

export default Home;

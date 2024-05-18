import React, { useState, useEffect, useContext, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

import { setCategoryId, setSortType } from "../redux/slices/filterSlice";

import { SearchContext } from "../App";

function Home() {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort);
  const dispatch = useDispatch();

  const { searchValue } = useContext(SearchContext);
  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangeSort = (name) => {
    dispatch(setSortType(name));
  };

  useEffect(() => {
    setIsLoading(true);
    const category = categoryId ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    fetch(
      `https://6630dd5dc92f351c03db6116.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sortProperty}&order=desc${search}`
    )
      .then((response) => {
        return response.json();
      })
      .then((pizzaArray) => {
        setPizzaItems(pizzaArray);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzas = useMemo(() => {
    if (Array.isArray(pizzaItems)) {
      return pizzaItems.map((object) => (
        <PizzaBlock key={object.id} {...object} />
      ));
    }
  }, [pizzaItems]);
  // const pizzas = pizzaItems.map((object) => (
  //   <PizzaBlock key={object.id} {...object} />
  // ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories valueId={categoryId} onChangeCategory={onChangeCategory} />
        <Sort sortValue={sortType} onChangeSort={onChangeSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}

export default Home;

import React, { useState, useEffect, useContext, useMemo, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import QueryString from "qs";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import Sort, { popUpList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

import { setItems } from "../redux/slices/pizzasSlice";

import { SearchContext } from "../App";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const pizzaItems = useSelector((state) => state.pizzas.items);

  const { searchValue } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = async () => {
    setIsLoading(true);
    const category = categoryId ? `&category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    try {
      const res = await axios.get(
        `https://6630dd5dc92f351c03db6116.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortType.sortProperty}&order=desc${search}`
      );
      dispatch(setItems(res.data));
      setIsLoading(false);
    } catch {
      setIsLoading(true);
      alert("Введите правильное название пиццы");
    }
  };

  useEffect(() => {
    if (window.location.search) {
      const params = QueryString.parse(window.location.search.substring(1));
      const sort = popUpList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = QueryString.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  useEffect(() => {
    window.scroll(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
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
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;

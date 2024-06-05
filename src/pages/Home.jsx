import React, { useEffect, useContext, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import QueryString from "qs";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  sortSelector,
  categoryIdSelector,
  currentPageSelector,
  searchValueSelector,
} from "../redux/slices/filterSlice";

import {
  fetchPizzas,
  pizzaItemsSelector,
  pizzaStatusSelector,
} from "../redux/slices/pizzasSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const categoryId = useSelector(categoryIdSelector);
  const sortType = useSelector(sortSelector);
  const currentPage = useSelector(currentPageSelector);
  const searchValue = useSelector(searchValueSelector);

  const pizzaItems = useSelector(pizzaItemsSelector);
  const pizzaStatus = useSelector(pizzaStatusSelector);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzasRequst = async () => {
    const category = categoryId ? `&category=${categoryId}` : " ";
    const search = searchValue ? `&search=${searchValue}` : " ";
    dispatch(
      fetchPizzas({
        category,
        search,
        currentPage,
        sortType,
      })
    );
  };

  useEffect(() => {
    if (window.location.search) {
      const params = QueryString.parse(window.location.search.substring(1));
      const sort = sortList.find(
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
  }, [categoryId, sortType, currentPage, searchValue]);

  useEffect(() => {
    window.scroll(0, 0);

    if (!isSearch.current) {
      fetchPizzasRequst();
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
      <div className="content__items">
        {pizzaStatus === "loading" ? skeletons : pizzas}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
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
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const categoryId = useSelector(categoryIdSelector);
  const sortType = useSelector(sortSelector);
  const currentPage = useSelector(currentPageSelector);
  const searchValue = useSelector(searchValueSelector);

  const pizzaItems = useSelector(pizzaItemsSelector);
  const pizzaStatus = useSelector(pizzaStatusSelector);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, [])

  const onChangePage = (selectedPageNumber: number) => {
    dispatch(setCurrentPage(selectedPageNumber));
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
          searchValue: "",
          categoryId: 0,
          currentPage: 1,
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
      return pizzaItems.map((object: any) => (
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
};

export default Home;

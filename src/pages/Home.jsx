import React, { useState, useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import qs from 'qs';

import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Item from '../components/ItemBlock';
import Skeleton from '../components/ItemBlock/Skeleton';
import Pagination from '../components/Pagination';
import Sort, { sortValues } from '../components/Sort';
import { getCategoryId, getSortType, getCurrentPage } from '../slices/selectors';
import { actions as filterActions } from '../slices/filterSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const haveSearchParams = useRef(false);
  const isMounted = useRef(false);

  const categoryId = useSelector(getCategoryId);
  const { propertyName } = useSelector(getSortType);
  const currentPage = useSelector(getCurrentPage);
  const { seacrhValue } = useContext(SearchContext);

  const onChangePage = (num) => {
    dispatch(filterActions.setCurrentPage(num));
  };

  useEffect(() => {
    const Qstr = window.location.search;
    if (Qstr) {
      const params = qs.parse(Qstr.substring(1));
      const sort = sortValues.find((item) => item.propertyName === params.propertyName);

      dispatch(
        filterActions.setFilters({
          ...params,
          sort,
        }),
      );
    }
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    if (!haveSearchParams.current) {
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = seacrhValue ? `&search=${seacrhValue}` : '';
      // const changePageCount = (length) => dispatch(filterActions.setPageCount(Math.ceil(length / 8)));

      axios
        .get(
          `https://62ac9b539fa81d00a7b5e700.mockapi.io/items?page=${currentPage}&limit=8&${category}${search}&sortBy=${propertyName}&order=desc`,
        )
        .then(({ data }) => {
          // changePageCount(data.length);
          setItems(data);
          setIsLoading(false);
        })
        .catch((err) => console.error(err));
    }

    haveSearchParams.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, currentPage, propertyName, seacrhValue]);

  useEffect(() => {
    if (isMounted.current) {
      const queryStr = qs.stringify({
        propertyName,
        categoryId,
        currentPage,
      });
      navigate(`?${queryStr}`);
    }
    isMounted.current = true;
  }, [categoryId, currentPage, navigate, propertyName]);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => <Item {...item} key={item.id} />)}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;

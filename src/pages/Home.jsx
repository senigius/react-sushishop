import React, { useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import qs from 'qs';

import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Item from '../components/ItemBlock';
import Skeleton from '../components/ItemBlock/Skeleton';
import Pagination from '../components/Pagination';
import Sort, { sortValues } from '../components/Sort';
import {
  getCategoryId,
  getSortType,
  getCurrentPage,
  getProducts,
  getStatus,
} from '../slices/selectors';
import { actions as filterActions } from '../slices/filterSlice';
import { fetchProducts } from '../slices/productsSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(getProducts);
  const status = useSelector(getStatus);
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
    if (!haveSearchParams.current) {
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = seacrhValue ? `&search=${seacrhValue}` : '';
      // const changePageCount = (length) => dispatch(filterActions.setPageCount(Math.ceil(length / 8)));

      dispatch(fetchProducts({ currentPage, category, search, propertyName }));
    }

    haveSearchParams.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, currentPage, dispatch, propertyName, seacrhValue]);

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

  if (status === 'network error') {
    return (
      <div className="content__error-info">
        <h2>Ошибка сети</h2>
        <p>Заходите попозже, всё починится!</p>
      </div>
    );
  }

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <div className="content__items">
        {status === 'loading'
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => <Item {...item} key={item.id} />)}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;

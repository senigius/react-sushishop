import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import qs from 'qs';

import Categories from '../components/Categories';
import Item from '../components/ItemBlock';
import Skeleton from '../components/ItemBlock/Skeleton';
import Pagination from '../components/Pagination/index';
import Sort, { sortValues } from '../components/Sort';
import {
  getCategoryId,
  getSortType,
  getCurrentPage,
  getProducts,
  getStatus,
  getSearchValue,
} from '../slices/selectors';
import { actions as filterActions } from '../slices/filterSlice';
import { fetchProducts, Status } from '../slices/productsSlice';
import { useAppDispatch } from '../slices';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useSelector(getProducts);
  const status = useSelector(getStatus);
  const haveSearchParams = useRef(false);
  const isMounted = useRef(false);

  const categoryId = useSelector(getCategoryId);
  const { propertyName, order } = useSelector(getSortType);
  const currentPage = useSelector(getCurrentPage);
  const searchValue = useSelector(getSearchValue);

  const onChangePage = (num: number) => {
    dispatch(filterActions.setCurrentPage(num));
  };

  useEffect(() => {
    const Qstr = window.location.search;
    if (Qstr) {
      const params = qs.parse(Qstr.substring(1));
      const sortType = sortValues.find((item) => item.propertyName === params.propertyName && item.order === params.order);

      dispatch(
        filterActions.setFilters({
          ...params,
          sortType,
        }),
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (!haveSearchParams.current) {
      const category = categoryId > 0 ? `&category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';
      const sortName = propertyName ? `&sortBy=${propertyName}` : '';
      const orderValue = order ? `&order=${order}` : '';
      // const changePageCount = (length) => dispatch(filterActions.setPageCount(Math.ceil(length / 8)));
      
      dispatch(fetchProducts({ currentPage: currentPage.toString(), category, search, sortName, orderValue }));
    }

    haveSearchParams.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, currentPage, dispatch, order, propertyName, searchValue]);

  useEffect(() => {
    if (isMounted.current) {
      const queryStr = qs.stringify({
        propertyName,
        order,
        categoryId,
        currentPage,
      });
      navigate(`?${queryStr}`);
    }
    isMounted.current = true;
  }, [categoryId, currentPage, navigate, order, propertyName]);

  if (status === Status.ERROR) {
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
        {status === Status.LOADING
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => <Item {...item} key={item.id} />)}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;

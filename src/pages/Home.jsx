import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Item from '../components/ItemBlock';
import Skeleton from '../components/ItemBlock/Skeleton';
import Pagination from '../components/Pagination';
import Sort from '../components/Sort';
import { getCategoryId, getSortType } from '../slices/selectors';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const categoryId = useSelector(getCategoryId);
  const { propertyName } = useSelector(getSortType);
  const { seacrhValue } = useContext(SearchContext);

  useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = seacrhValue ? `&search=${seacrhValue}` : '';

    fetch(
      `https://62ac9b539fa81d00a7b5e700.mockapi.io/items?${category}${search}&sortBy=${propertyName}&order=desc`,
    )
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
    window.scrollTo(0, 40);
  }, [categoryId, propertyName, seacrhValue]);

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
      <Pagination />
    </>
  );
};

export default Home;

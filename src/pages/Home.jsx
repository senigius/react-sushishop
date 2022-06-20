import React, { useState, useEffect, useContext } from 'react';
import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Item from '../components/ItemBlock';
import Skeleton from '../components/ItemBlock/Skeleton';
import Pagination from '../components/Pagination';
import Sort from '../components/Sort';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    propertyName: 'rating',
  });

  const { seacrhValue } = useContext(SearchContext);

  useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = seacrhValue ? `&search=${seacrhValue}` : '';

    fetch(
      `https://62ac9b539fa81d00a7b5e700.mockapi.io/items?${category}${search}&sortBy=${sortType.propertyName}&order=desc`,
    )
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
    window.scrollTo(20, 0);
  }, [categoryId, sortType, seacrhValue]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onChangeSortType={(type) => setSortType(type)} />
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

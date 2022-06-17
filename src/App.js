import { useEffect, useState } from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import Item from './components/Item';
import Sort from './components/Sort';

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://62ac9b539fa81d00a7b5e700.mockapi.io/items')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">aboba</h2>
          <div className="content__items">
            {items.map((item) => (
              <Item {...item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

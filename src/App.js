import Categories from './components/Categories';
import Header from './components/Header';
import Item from './components/Item';
import Sort from './components/Sort';

import data from '../src/assets/data.json';

function App() {
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
            {data.map((item) => (
              <Item data={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

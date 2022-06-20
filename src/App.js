import React, { createContext, useState } from 'react';
import { Routes, Route } from 'react-router';

import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import routes from './routes';

export const SearchContext = createContext('');

const App = () => {
  const [seacrhValue, setSeacrhValue] = useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ seacrhValue, setSeacrhValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path={routes.cartPage()} element={<Cart />} />
              <Route path={routes.notFoundPage()} element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
};

export default App;

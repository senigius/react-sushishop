import React from 'react';
import { Routes, Route } from 'react-router';

import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import routes from './routes';

const App = () => {
  return (
    <div className="wrapper">
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
    </div>
  );
};

export default App;

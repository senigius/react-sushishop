import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import routes from './routes';

const Cart = lazy(() => import('./pages/Cart'));

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path={routes.cartPage()}
              element={
                <Suspense>
                  <Cart />
                </Suspense>
              }
            />
            <Route path={routes.notFoundPage()} element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;

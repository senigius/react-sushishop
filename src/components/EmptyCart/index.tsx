import { Link } from 'react-router-dom';

import img from '../../assets/images/empty-cart.png';

const EmptyCart = () => {
  return (
    <div className="cart cart--empty">
      <h2>В корзине пусто</h2>
      <h3>( ´•︵•` )</h3>
      <p>Для того, чтобы заказать суши, перейдите на главную страницу.</p>
      <img src={img} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default EmptyCart;

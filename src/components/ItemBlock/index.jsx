import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { actions as cartActions } from '../../slices/cartSlice';
import styles from './ItemBlock.module.scss';

const Item = ({ id, title, sizes, ingredients, weight, price, img }) => {
  const [count, setCount] = useState('');
  const [piecesIndex, setPiecesIndex] = useState(0);
  const [activePrice, setActivePrice] = useState(price);
  const dispatch = useDispatch();

  const handleAddItem = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        size: sizes[piecesIndex],
        price: activePrice,
        img,
      }),
    );
    setCount(count + 1);
  };

  const handleChangePiecesValue = (index) => {
    setPiecesIndex(index);
    index === 0 ? setActivePrice(price) : setActivePrice(price * 2);
  };

  const imagePath = `../assets/images/products/${img}`;

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <img className={styles.image} src={imagePath} alt="sushi" />
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.selector}>
          <ul>
            {sizes.map((size, i) => (
              <li
                className={piecesIndex === i ? styles.active : ''}
                key={i}
                onClick={() => handleChangePiecesValue(i)}
              >{`${size} шт.`}</li>
            ))}
          </ul>
          <div className={styles.description}>
            <b>Подробнее</b>
            <span className={styles.hidden}>
              Состав: {ingredients.join(', ')} {`Вес ${weight} гр.`}
            </span>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.price}>{`${activePrice} ₽`}</div>
          <button className="button button--outline button--add" onClick={handleAddItem}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {count && <i>{count}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;

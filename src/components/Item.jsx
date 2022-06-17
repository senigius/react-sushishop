import React, { useState } from 'react';

const Item = ({ title, sizes, ingredients, weight, price, category, img }) => {
  const [count, setCount] = useState(null);
  const [piecesIndex, setPiecesIndex] = useState(0);
  const [activePrice, setActivePrice] = useState(price);

  const handleAddItem = () => setCount(count + 1);

  const handleChangePiecesValue = (index) => {
    setPiecesIndex(index);
    index === 0 ? setActivePrice(price) : setActivePrice(price * 2);
  };

  const imagePath = `../assets/images/products/${img}`;

  return (
    <div className="sushi-block">
      <img className="sushi-block__image" src={imagePath} alt="sushi" />
      <h4 className="sushi-block__title">{title}</h4>
      <div className="sushi-block__selector">
        <ul>
          {sizes.map((size, i) => (
            <li
              className={piecesIndex === i ? 'active' : ''}
              key={i}
              onClick={() => handleChangePiecesValue(i)}
            >{`${size} шт.`}</li>
          ))}
        </ul>
        <span>{`Вес ${weight} гр.`}</span>
        <b>Состав:</b>
        <span>{ingredients.join(', ')}</span>
      </div>
      <div className="sushi-block__bottom">
        <div className="sushi-block__price">{`${activePrice} ₽`}</div>
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
  );
};

export default Item;
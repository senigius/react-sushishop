import React from 'react';

const categoriesArr = ['Все', 'Суши', 'Запеченные суши', 'Острые суши', 'Сашими'];

const Categories = ({ value, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categoriesArr.map((item, index) => {
          return (
            <li
              className={value === index ? 'active' : ''}
              key={index}
              onClick={() => onChangeCategory(index)}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;

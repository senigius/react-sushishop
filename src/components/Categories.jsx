import React, { useState } from 'react';

const categoriesArr = ['Все', 'Суши', 'Запеченные суши', 'Острые суши', 'Сашими'];

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSetActiveCategory = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {categoriesArr.map((item, index) => {
          return (
            <li
              className={activeIndex === index ? 'active' : ''}
              key={index}
              onClick={() => handleSetActiveCategory(index)}
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

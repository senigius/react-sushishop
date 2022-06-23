import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { actions as filterActions } from '../../slices/filterSlice.js';
import { getCategoryId } from '../../slices/selectors.js';

import styles from './Categories.module.scss';

const categoriesArr = ['Все', 'Суши', 'Запеченные суши', 'Острые суши', 'Сашими'];

const Categories = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector(getCategoryId);

  return (
    <div className={styles.root}>
      <ul>
        {categoriesArr.map((item, index) => {
          return (
            <li
              className={categoryId === index ? styles.active : ''}
              key={index}
              onClick={() => dispatch(filterActions.setCategoryId(index))}
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

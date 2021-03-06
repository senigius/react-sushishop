import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { categoriesArr } from '../../constants';
import { actions as filterActions } from '../../slices/filterSlice';
import { getCategoryId } from '../../slices/selectors';

import styles from './Categories.module.scss';

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector(getCategoryId);

  const handleChangeCategory = (index: number) => {
    dispatch(filterActions.setCategoryId(index));
  };

  return (
    <div className={styles.root}>
      <ul>
        {categoriesArr.map((item, index) => {
          return (
            <li
              className={categoryId === index ? styles.active : ''}
              key={index}
              onClick={() => handleChangeCategory(index)}
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

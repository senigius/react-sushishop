import React, { useCallback, useContext, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import { SearchContext } from '../../App';
import styles from './Search.module.scss';

const Search = () => {
  const [localValue, setLocalValue] = useState('');
  const { setSeacrhValue } = useContext(SearchContext);
  const inputRef = useRef();

  const handleChangeSearchValue = ({ target: { value } }) => {
    setLocalValue(value);
    searchDebounce(value);
  };

  const handleClearSearchValue = () => {
    setLocalValue('');
    setSeacrhValue('');
    inputRef.current.focus();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchDebounce = useCallback(
    debounce((localValue) => {
      setSeacrhValue(localValue);
    }, 666),
    [],
  );

  return (
    <div className={styles.root}>
      <svg className={styles.inputIcon} xmlns="http://www.w3.org/2000/svg">
        <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
      </svg>
      <input
        ref={inputRef}
        value={localValue}
        onChange={(e) => handleChangeSearchValue(e)}
        placeholder="Введите название..."
      />
      {localValue && (
        <svg
          className={styles.clearInput}
          onClick={handleClearSearchValue}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688 L 7.2929688 8.7070312 L 10.585938 12 L 7.2929688 15.292969 L 8.7070312 16.707031 L 12 13.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13.414062 12 L 16.707031 8.7070312 L 15.292969 7.2929688 L 12 10.585938 L 8.7070312 7.2929688 z"></path>
        </svg>
      )}
    </div>
  );
};

export default Search;

import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';

import { getPageCount } from '../../slices/selectors';

import styles from './Pagination.module.scss';

const Pagination = ({ currentPage, onChangePage }) => {
  const pageCount = useSelector(getPageCount);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => {
        onChangePage(e.selected + 1);
      }}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;

import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

interface IPagination {
  currentPage: number;
  onChangePage: (selectedPageNumber: number) => void;
}

const Pagination: React.FC<IPagination> = ({ currentPage, onChangePage }) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=" >"
    previousLabel="< "
    onPageChange={(event) => onChangePage(event.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={3}
    forcePage={currentPage - 1}
    renderOnZeroPageCount={null}
  />
);

export default Pagination;

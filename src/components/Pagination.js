import React from 'react';
import ReactPagination from 'react-js-pagination';

const Pagination = ({ perPage = 12, total = 0, currentPage = 1, onChange }) => {
  return (
      <ReactPagination
        innerClass="pagination"
        activePage={currentPage}
        itemsCountPerPage={perPage}
        totalItemsCount={total}
        pageRangeDisplayed={5}
        onChange={onChange}
      />
    
  );
};

export default Pagination;

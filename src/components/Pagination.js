import React from 'react';
import ReactPagination from 'react-js-pagination';

const Pagination = ({ perPage = 12, total = 0, currentPage = 1, onChange }) => {
  return (
    <div className="pagination">
      <ReactPagination
        innerClass="pagination-inner"
        activePage={currentPage}
        itemsCountPerPage={perPage}
        totalItemsCount={total}
        pageRangeDisplayed={5}
        onChange={onChange}
      />
    </div>
  );
};

export default Pagination;

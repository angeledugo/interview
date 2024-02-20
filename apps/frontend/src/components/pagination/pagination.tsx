import React from 'react';
import ReactPaginate from 'react-paginate';

/* eslint-disable-next-line */
export interface PaginationProps {
  pageCount: number;
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export function Pagination(props: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={props.pageCount}
      onPageChange={props.onPageChange}
      previousLabel={'Previous'}
      nextLabel={'Next'}
      breakLabel={'...'}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      containerClassName={'pagination flex justify-center'}
      pageClassName={'inline-block mx-1'}
      pageLinkClassName={'px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'}
      activeClassName={'text-black px-3 py-1 rounded'}
      previousClassName={'inline-block mx-1'}
      previousLinkClassName={'px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'}
      nextClassName={'inline-block mx-1'}
      nextLinkClassName={'px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'}
      breakClassName={'inline-block mx-1'}
      breakLinkClassName={'px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'}
    />
  );
}

export default Pagination;

import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Pagination from "react-bootstrap/Pagination";

export const PaginationComponent = () => {
    const currentPage = useSelector((state) => state.characters.currentPage);
  const pageCount = useSelector(
    (state) => state.characters.characters.info.pages
  );
  const active = useSelector((state) => state.characters.currentPage);

  console.log(active);
  let items = [];
  let content = "";

  if (currentPage - 4 <= 0) {
    for (let number = 1; number <= 5; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>
      );
    }
    content = (
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        {items}
        <Pagination.Ellipsis />
        <Pagination.Item>{pageCount}</Pagination.Item>
        <Pagination.Next />
      <Pagination.Last />
      </Pagination>
    );
  } else if (currentPage + 4 > pageCount) {
    for (let number = currentPage - 2; number <= pageCount; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>
      );
    }
    content = (
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Ellipsis />
        {items}
      </Pagination>
    );
  } else {
    for (let number = currentPage - 2; number <= currentPage + 2; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>
      );
    }
     content = (      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />
        {items}
        <Pagination.Ellipsis />
      <Pagination.Item>{pageCount}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
        </Pagination>)
  }

  return (
    <div className="pagination-component">
      {content}
      <br />
    </div>
  );
};

export default PaginationComponent;

import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Pagination from "react-bootstrap/Pagination";
import { useDispatch } from "react-redux";
import { updatePageNum, fetchCharacterPage } from "../redux/charactersSlice";

export const PaginationComponent = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const currentPage = useSelector((state) => state.characters.currentPage);
  const pageCount = useSelector(
    (state) => state.characters.characters.info.pages
  );
  const active = useSelector((state) => state.characters.currentPage);

  console.log(active);

  function handlePageChange(newPage) {
    dispatch(fetchCharacterPage(newPage));
    dispatch(updatePageNum(newPage));
    console.log("handling page change");
  }

  let items = [];
  let content = "";

  if (currentPage - 4 <= 0) {
    // if current page is not greater than 4
    for (let number = 1; number <= 5; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    content = (
      <Pagination data-bs-theme={theme}>
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
        {items}
        <Pagination.Ellipsis />
        <Pagination.Item onClick={() => handlePageChange(pageCount)}>
          {pageCount}
        </Pagination.Item>
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
        <Pagination.Last onClick={() => handlePageChange(pageCount)} />
      </Pagination>
    );
  } else if (currentPage + 4 > pageCount) {
    for (let number = currentPage - 2; number <= pageCount; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    content = (
      <Pagination data-bs-theme={theme}>
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
        <Pagination.Ellipsis />
        {items}
      </Pagination>
    );
  } else {
    for (let number = currentPage - 2; number <= currentPage + 2; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    content = (
      <Pagination data-bs-theme={theme}>
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
        <Pagination.Item onClick={() => handlePageChange(1)}>
          {1}
        </Pagination.Item>
        <Pagination.Ellipsis />
        {items}
        <Pagination.Ellipsis />
        <Pagination.Item onClick={() => handlePageChange(pageCount)}>
          {pageCount}
        </Pagination.Item>
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
        <Pagination.Last onClick={() => handlePageChange(pageCount)} />
      </Pagination>
    );
  }

  return (
    <div className="pagination-component">
      {content}
      <br />
    </div>
  );
};

export default PaginationComponent;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePageNum, fetchCharacters } from "../redux/charactersSlice";
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const CharactersPage = () => {
    const active = useSelector(state => state.characters.currentPage)
    const theme = useSelector(state => state.theme.theme)
    // const pageCount = useSelector(state => state.characters.characters.info.pages) <-- getting error selecting number of pages
    // console.log(pageCount);
    
    function handlePageChange(number){
        dispatch(updatePageNum(number))
    }

    let pageNumArray = [];

    for (let number = 1; number <= 42; number++) { //hard coding 42 pages for now
        pageNumArray.push(
          <Pagination.Item key={number} active={number === active} onClick={() => handlePageChange(number)}>
            {number}
          </Pagination.Item>,
        );
      }
  const dispatch = useDispatch();
  const characters = useSelector(
    (state) => state.characters.characters.results
  );
  const status = useSelector((state) => state.characters.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCharacters());
    }
  }, [status, dispatch]);

  let content;
  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "failed") {
    content = <div>Error loading characters</div>;
  } else if (status === "succeeded") {
    content = (
      <div>
        <h1>Characters</h1>
        <div className="characters-grid">
          {characters.map((character) => (
            <div key={character.id} className="product-card">
              <img src={character.image} alt={character.name} />
              <h2>{character.name}</h2>
              {/* <button onClick={() => dispatch(addToCart(product))}>
                  Add to cart
                </button> */}
              <Link to={`/character/${character.id}`}>Go to character</Link>
            </div>
          ))}
        </div>
        <Pagination data-bs-theme={theme}>{pageNumArray}</Pagination>
      </div>
    );
  }

  return (
    <>
      <div>{content}</div>
    </>
  );
};

export default CharactersPage;

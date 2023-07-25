import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePageNum, fetchCharacters } from "../redux/charactersSlice";

export const CharactersPage = () => {
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
              <p>{character.species}</p>
              {/* <button onClick={() => dispatch(addToCart(product))}>
                  Add to cart
                </button> */}
              <Link to={`/location/${character.location.name}`}>Go to Location</Link>
            </div>
          ))}
        </div>
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

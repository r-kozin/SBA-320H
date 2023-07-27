import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePageNum, fetchCharacters } from "../redux/charactersSlice";
import CharCard from "../components/CharCard";
import PaginationComponent from "../components/PaginationComponent";


export const CharactersPage = () => {
    const active = useSelector(state => state.characters.currentPage)
    const theme = useSelector(state => state.theme.theme)
    // console.log(pageCount);
    
    function handlePageChange(number){
        dispatch(updatePageNum(number))
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
           <CharCard key={character.id} charName={character.name} species={character.species} id={character.id} image={character.image} episode={character.episode}/>
          ))}
        </div>
        <PaginationComponent />
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

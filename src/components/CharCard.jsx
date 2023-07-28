import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSingleEpisode } from "../redux/episodesSlice";
import { fetchSpecificResident, selectCharacterByID } from "../redux/charactersSlice";

export default function CharCard(character) {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate()


  function getCharEpIds(){
    let epIds = [];
    for (let i = 0; i < character.episode.length; i++) {
      let url = character.episode[i];
      let epId = url.split("episode/")[1];
      epIds.push(epId)
    } //get array of all episode id's character is features in
    let charEpIds = epIds.join(","); //join array and dispatch to fetch episode to get all eps in one api call
    console.log(charEpIds);
    dispatch(fetchSingleEpisode(charEpIds)); //get all eps in one api call
    dispatch(fetchSpecificResident(character.id));
    navigate(`/character/${character.id}`) //go to single character page
}

  function handleClick(event) {
    event.preventDefault();
    getCharEpIds()
  }
  return (
    <Card style={{ width: "18rem" }} data-bs-theme={theme}>
      <Card.Img variant="top" src={character.image} alt={character.charName}/>
      <Card.Body>
        <Card.Title>{character.charName}</Card.Title>
        <Card.Text>Species: {character.species}</Card.Text>
        <Link to={`/character/${character.id}`}>
        <Button variant="primary" onClick={handleClick}>
          See More
        </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

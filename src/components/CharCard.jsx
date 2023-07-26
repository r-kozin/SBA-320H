import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CharCard(character) {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <Card style={{ width: "18rem" }} data-bs-theme={theme}>
      <Card.Img variant="top" src={character.image} alt={character.charName}/>
      <Card.Body>
        <Card.Title>{character.charName}</Card.Title>
        <Card.Text>Species: {character.species}</Card.Text>
        <Link to={`/character/${character.id}`}>
        <Button variant="primary">
          See More
        </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

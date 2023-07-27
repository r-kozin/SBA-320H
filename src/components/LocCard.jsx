import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function LocCard(loc) {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{loc.name}</Card.Title>
        <Card.Text>Type: {loc.type}</Card.Text>
        <Card.Text>Dimension: {loc.dimension}</Card.Text>
        <Link to={`/location/${loc.name}`}>
        <Button variant="primary">
          See More
        </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

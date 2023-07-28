import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLocationByName } from "../redux/locationsSlice";
import { useParams } from "react-router-dom";
import { Card, ListGroup, Accordion } from "react-bootstrap";

export const SingleLocationPage = ({ match }) => {
  const { locationName } = useParams();
  console.log(locationName);
  const location = useSelector((state) =>
    selectLocationByName(state, locationName)
  );
  console.log(location);

  return (
    <div className="single-location-container">
    <div className="loc-card-container">
          <Card style={{ width: "25rem" }}>
            <Card.Body>
              <Card.Title>{location.name}</Card.Title>
              <Card.Text>
                Characters residing here: {location.residents.length}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                Location Type: {location.type}
              </ListGroup.Item>
              <ListGroup.Item>Location Dimension: {location.dimension}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </div>
        <div className="episode-list">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Residents</Accordion.Header>
              <Accordion.Body>
                <div className="epCards"></div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
  );
};

export default SingleLocationPage;

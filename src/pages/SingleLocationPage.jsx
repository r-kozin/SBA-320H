import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLocationByName } from "../redux/locationsSlice";
import { useParams } from "react-router-dom";
import { Card, ListGroup, Accordion } from "react-bootstrap";
import { fetchResidents } from "../redux/charactersSlice";
import CharCard from "../components/CharCard";

export const SingleLocationPage = ({ match }) => {
  const dispatch = useDispatch();
  const { locationName } = useParams();
  console.log(locationName);
  const location = useSelector((state) =>
    selectLocationByName(state, locationName)
  );
  console.log(location);
  const status = useSelector((state) => state.characters.residentStatus)
  const residents = useSelector((state) => state.characters.residents)
  console.log(residents);
useEffect(() => {
  let resIds = [];
  for (let i = 0; i < location.residents.length; i++) {
    let url = location.residents[i];
    let epId = url.split("character/")[1];
    resIds.push(epId)
  } //get array of all episode id's character is features in
  let locResIds = resIds.join(","); //join array and dispatch to fetch episode to get all eps in one api call
  console.log(locResIds);
  dispatch(fetchResidents(locResIds))
}, [location]);

function isObject(objValue) {
  return objValue && typeof objValue === 'object' && objValue.constructor === Object;
}

  let content;
  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "failed") {
    content = <div>Error loading residents</div>;
  } else if (status === "succeeded") {
    if (residents.length > 1){
    content = (
        <div className="characters-grid">
          {residents.map((character) => (
           <CharCard key={character.id} charName={character.name} species={character.species} id={character.id} image={character.image} episode={character.episode}/>
          ))}
        </div>
    );
          }else if (location.residents.length === 1){
            content = (
              <div className="characters-grid">
                 <CharCard key={residents.id} charName={residents.name} species={residents.species} id={residents.id} image={residents.image} episode={residents.episode}/>
              </div>
          )} else {
           content = <div>No characters reside here</div>
          }
  }


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
                <div className="resCards">{content}</div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
  );
};

export default SingleLocationPage;

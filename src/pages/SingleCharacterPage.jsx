import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCharacterByID } from "../redux/charactersSlice";
import { selectEpisodeByID } from "../redux/episodesSlice";
import { Link, useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";

export const SingleCharacterPage = ({ match }) => {
  const dispatch = useDispatch();
  const { charId } = useParams();
  console.log(charId);
  const singleCharacter = useSelector((state) =>
    selectCharacterByID(state, charId)
  ); //will only work for characters already in state (first page by default)
  console.log(singleCharacter);


  const epStatus = useSelector((state) => state.episodes.epStatus);
  const singleEpisode = useSelector((state) => state.episodes.episodes.results);
const resStatus = useSelector((state) => state.characters.residentStatus);

  function getCharEpisodes() {
    for (let i = 0; i < singleCharacter.episode.length; i++) {
      let url = singleCharacter.episode[i];
      let id = url.split("episode/")[1];
      console.log(id);
    }
  }

  let content;
  if (epStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (epStatus === "failed") {
    content = <div>Error loading episodes</div>;
  } else if (epStatus === "succeeded") {
    if (Array.isArray(singleEpisode)) {
      console.log(singleEpisode);
      content = singleEpisode.map((episode) => (
        <Card key={episode.id} style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{episode.name}</Card.Title>
            <Card.Subtitle>{episode.episode}</Card.Subtitle>
            <Card.Text>Original Air Date: {episode.air_date}</Card.Text>
            <Card.Link as={Link} to={`/episode/${episode.id}`}>
              Go to Episode
            </Card.Link>
          </Card.Body>
        </Card>
      ));
    } else {
      content = (
        <Card key={singleEpisode.id} style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{singleEpisode.name}</Card.Title>
            <Card.Subtitle>{singleEpisode.episode}</Card.Subtitle>
            <Card.Text>Original Air Date: {singleEpisode.air_date}</Card.Text>
            <Card.Link as={Link} to={`/episode/${singleEpisode.id}`}>
              Go to Episode
            </Card.Link>
          </Card.Body>
        </Card>
      );
    }
  }

  let charContent

  if (resStatus === "loading"){
    charContent = <div>Loading...</div>
  }else if (resStatus === "failed"){
charContent = <div>Error loading character</div>
  }else if (resStatus === "succeeded") {
    charContent = (
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={singleCharacter.image}
            alt={singleCharacter.name}
          />
          <Card.Body>
            <Card.Title>{singleCharacter.name}</Card.Title>
            <Card.Text>
              Featured in: {singleCharacter.episode.length} episodes
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item className="status-box">
              Status:{" "}
              <span className={`status-indicator-${singleCharacter.status}`} />
              {singleCharacter.status}
            </ListGroup.Item>
            <ListGroup.Item>Species: {singleCharacter.species}</ListGroup.Item>
            <ListGroup.Item>Gender: {singleCharacter.gender}</ListGroup.Item>
            <ListGroup.Item>
              Origin: {singleCharacter.origin.name}
            </ListGroup.Item>
            <ListGroup.Item>
              Last Known Location: {singleCharacter.location.name}
            </ListGroup.Item>
          </ListGroup>
        </Card>
    )
  }



  return (
    <div className="single-character-container">
      <div className="char-card-container">
        {charContent}
      </div>
      <div className="episode-list">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Episodes</Accordion.Header>
            <Accordion.Body>
              <div className="epCards">{content}</div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default SingleCharacterPage;

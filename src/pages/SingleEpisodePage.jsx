import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectEpisodeByID } from "../redux/episodesSlice";
import { Card, ListGroup, Accordion } from "react-bootstrap";

export const SingleEpisodePage = ({ match }) => {
  const { epId } = useParams();
  console.log(epId);
  const results = useSelector((state) => state.episodes.episodes.results);
console.log(results.length);
  if (results.length > 1) {
  const episode = useSelector((state) => selectEpisodeByID(state, epId));
  console.log(episode);
  return (
    <div className="single-episode-container">
      <div className="ep-card-container">
        <Card style={{ width: "25rem" }}>
          <Card.Body>
            <Card.Title>{episode.name}</Card.Title>
            <Card.Subtitle>{episode.episode}</Card.Subtitle>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              Original Air Date: {episode.air_date}
            </ListGroup.Item>
            <ListGroup.Item>
              Characters featured in this episode: {episode.characters.length}
            </ListGroup.Item>
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
            <Accordion.Header>
              Characters featured in this episode
            </Accordion.Header>
            <Accordion.Body>
              <div className="epCards"></div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}else {
    const singleEpisode = useSelector((state) => state.episodes.episodes.results)
    return (
    <div className="single-episode-container">
    <div className="ep-card-container">
      <Card style={{ width: "25rem" }}>
        <Card.Body>
          <Card.Title>{singleEpisode.name}</Card.Title>
          <Card.Subtitle>{singleEpisode.episode}</Card.Subtitle>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            Original Air Date: {singleEpisode.air_date}
          </ListGroup.Item>
          <ListGroup.Item>
            Characters featured in this episode: {singleEpisode.characters.length}
          </ListGroup.Item>
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
          <Accordion.Header>
            Characters featured in this episode
          </Accordion.Header>
          <Accordion.Body>
            <div className="epCards"></div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  </div>)
}

  
};

export default SingleEpisodePage;

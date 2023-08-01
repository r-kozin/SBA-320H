import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectEpisodeByID } from "../redux/episodesSlice";
import { Card, ListGroup, Accordion } from "react-bootstrap";
import { fetchResidents } from "../redux/charactersSlice";
import CharCard from "../components/CharCard";

export const SingleEpisodePage = ({ match }) => {
  const { epId } = useParams();
  console.log(epId);
  const results = useSelector((state) => state.episodes.episodes.results);
console.log(results.length);
const status = useSelector((state) => state.characters.residentStatus)
const residents = useSelector((state) => state.characters.residents)
console.log(residents);

const dispatch = useDispatch();


if (results.length > 1) {
  const episode = useSelector((state) => selectEpisodeByID(state, epId));
  console.log(episode);

  useEffect(() => {
let epChars = [];
for (let i = 0; i < episode.characters.length; i++) {
  let url = episode.characters[i];
  let charId = url.split("character/")[1];
  epChars.push(charId)
} //get array of all character id's  featured in this episode
let epCharIds = epChars.join(","); //join array and dispatch to fetch characters to get all chars in one api call
console.log(epCharIds);
dispatch(fetchResidents(epCharIds));
  }, []);

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
        }else if (residents.length === 1){
          content = (
            <div className="characters-grid">
               <CharCard key={residents.id} charName={residents.name} species={residents.species} id={residents.id} image={residents.image} episode={residents.episode}/>
            </div>
        )} else {
         content = <div>No characters featured in this episode</div>
        }
}

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
              <div className="epCards">{content}</div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}else {
    const singleEpisode = useSelector((state) => state.episodes.episodes.results)
    
    useEffect(() => {
      let epChars = [];
      for (let i = 0; i < singleEpisode.characters.length; i++) {
        let url = singleEpisode.characters[i];
        let charId = url.split("character/")[1];
        epChars.push(charId)
      } //get array of all character id's  featured in this episode
      let epCharIds = epChars.join(","); //join array and dispatch to fetch characters to get all chars in one api call
      console.log(epCharIds);
      dispatch(fetchResidents(epCharIds));
        }, []);

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
            }else if (residents.length === 1){
              content = (
                <div className="characters-grid">
                   <CharCard key={residents.id} charName={residents.name} species={residents.species} id={residents.id} image={residents.image} episode={residents.episode}/>
                </div>
            )} else {
             content = <div>No characters featured in this episode</div>
            }
    }

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
            <div className="epCards">{content}</div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  </div>)
}

  
};

export default SingleEpisodePage;

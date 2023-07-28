import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchEpisodes } from '../redux/episodesSlice';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const EpisodesPage = () => {
    const dispatch = useDispatch();
    const episodes = useSelector(
      (state) => state.episodes.episodes.results
    );
    const epStatus = useSelector((state) => state.episodes.status);
  
    useEffect(() => {
      if (epStatus === "idle") {
        dispatch(fetchEpisodes());
      }
    }, [epStatus, dispatch]);
  
    let content;
    if (epStatus === "loading") {
      content = <div>Loading...</div>;
    } else if (epStatus === "failed") {
      content = <div>Error loading episodes</div>;
    } else if (epStatus === "succeeded") {
      if (Array.isArray(episodes)) {
      console.log(episodes);
      content = episodes.map((episode) => (
        <Card key={episode.id} style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{episode.name}</Card.Title>
            <Card.Subtitle>{episode.episode}</Card.Subtitle>
            <Card.Text>Original Air Date: {episode.air_date}</Card.Text>
            <Card.Link as={Link} to={`/episode/${episode.id}`}>Go to Episode</Card.Link>
          </Card.Body>
        </Card>
      ));
      } else {
        content = (
          <Card key={episodes.id} style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{episodes.name}</Card.Title>
              <Card.Subtitle>{episodes.episode}</Card.Subtitle>
              <Card.Text>Original Air Date: {episodes.air_date}</Card.Text>
              <Card.Link href="#">Go to Episode</Card.Link>
            </Card.Body>
          </Card>)
      }
    }
  
    return (
      <>
        <h1>Episodes</h1>
        <div className='episodes-grid'>{content}</div>
      </>
    );
  };

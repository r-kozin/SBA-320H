import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchEpisodePage, fetchEpisodes, updateEpisodePageNum } from '../redux/episodesSlice';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';

export const EpisodesPage = () => {
    const dispatch = useDispatch();
    const episodes = useSelector(
      (state) => state.episodes.episodes.results
    );
    const epStatus = useSelector((state) => state.episodes.status);
    const active = useSelector((state) => state.episodes.currentPage);
    const pageCount = useSelector((state) => state.episodes.episodes.info.pages);

    function handlePageChange(newPage) {
      dispatch(fetchEpisodePage(newPage));
      dispatch(updateEpisodePageNum(newPage));
      console.log("handling page change");
    }
  
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
      // console.log(episodes);
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

    let items = [];
    for (let number = 1; number <= pageCount; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

  
    return (
      <>
        <h1>Episodes</h1>
        <div className='episodes-grid'>{content}</div>
        <div>
        <Pagination style={{justifyContent: "center"}}>{items}</Pagination>
        <br />
      </div>
      </>
    );
  };

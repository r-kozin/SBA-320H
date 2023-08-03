import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import { Accordion } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { fetchSearchResults } from "../redux/searchSlice";
import { useDispatch } from "react-redux";
import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import CharCard from "../components/CharCard";

export const Search = () => {
  const [searchFor, setSearchFor] = useState("");
  const charactersChecked = useRef();
  const locationsChecked = useRef();
  const episodesChecked = useRef();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.search.status);
  const searchResults = useSelector((state) => state.search.results.results);

  // console.log(searchFor);

  function handleSearch(e) {
    e.preventDefault();
    if (charactersChecked.current.checked) {
      dispatch(fetchSearchResults(["character", searchFor.toString()]));
      // console.log(searchFor.toString());
    } else if (locationsChecked.current.checked) {
      console.log("locations");
    } else if (episodesChecked.current.checked) {
      console.log("episodes");
    } else console.log("Error, no search type selected");
  }

  let content;
  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "failed") {
    content = <div>Error loading search results</div>;
  } else if (status === "succeeded") {
    content = (
      <div>
        <h1>Results:</h1>
        <div className="locations-grid">
          {searchResults.map((result) => (
            <CharCard
              key={result.id}
              charName={result.name}
              species={result.species}
              id={result.id}
              image={result.image}
              episode={result.episode}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Form className="d-flex">
        <Col>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e) => setSearchFor(e.target.value)}
          />
          <div key={`inline-radio`} className="mb-3">
            <Form.Label>Search for: </Form.Label>
            <br></br>
            <Form.Check
              inline
              label="Characters"
              name="group1"
              type="radio"
              id={`inline-radio-1`}
              ref={charactersChecked}
            />
            <Form.Check
              inline
              disabled
              label="Locations"
              name="group1"
              type="radio"
              id={`inline-radio-2`}
              ref={locationsChecked}
            />
            <Form.Check
              inline
              disabled
              label="Episodes"
              name="group1"
              type="radio"
              id={`inline-radio-3`}
              ref={episodesChecked}
            />
          </div>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Search Options</Accordion.Header>
              <Accordion.Body></Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Button variant="outline-success" onClick={handleSearch}>
            Search
          </Button>
        </Col>
      </Form>
      <div className="search-results">
        {content}
      </div>
    </div>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { fetchCharacters } from "../redux/charactersSlice";
import { fetchLocations } from "../redux/locationsSlice";

const HomePage = () => {

  const status = useSelector((state) => state.characters.status);
  const locStatus = useSelector((state) => state.location.status);
  const dispatch = useDispatch();


  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCharacters());
    }
    if (locStatus === "idle") {
      dispatch(fetchLocations());
    }
  }, []);

  return (
  <div className="container">
    <h1>Welcome to the Rick and Morty Site!</h1>
    <Link to="/characters" style={{ fontSize: "40px" }}>
      <h2>Go to Characters!</h2>
    </Link>
    <Link to="/locations" style={{ fontSize: "40px" }}>
      <h2>Check out Locations!</h2>
    </Link>
  </div>
)};

export default HomePage;

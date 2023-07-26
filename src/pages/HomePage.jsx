import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="container">
    <h1>Welcome to the Rick and Morty Site!</h1>
    <Link to="/characters" style={{ fontSize: "40px" }}>
      <h2>Go to Characters!</h2>
    </Link>
    <Link to="/locations" style={{ fontSize: "40px" }}>
      <h2>Check out Locations!</h2>
    </Link>
  </div>
);

export default HomePage;

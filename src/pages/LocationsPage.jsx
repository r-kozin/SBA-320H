import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations, updateLocationPageNum } from "../redux/locationsSlice";

export const LocationsPage = () => {
  const dispatch = useDispatch();
  const locations = useSelector(
    (state) => state.location.locations.results
  );
  const status = useSelector((state) => state.location.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLocations());
    }
  }, [status, dispatch]);

  let content;
  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "failed") {
    content = <div>Error loading locations</div>;
  } else if (status === "succeeded") {
    content = (
      <div>
        <h1>Locations</h1>
        <div className="locations-grid">
          {locations.map((location) => (
            <div key={location.id} className="location-card">
              <h2>{location.name}</h2>
              <p>{location.type}</p>
              <p>{location.dimension}</p>
              {/* <button onClick={() => dispatch(addToCart(product))}>
                  Add to cart
                </button> */}
            <Link to={`/location/${location.name}`}>Go to Location</Link>
              {/* <Link to={`/location/${character.location.name}`}>Go to Location</Link> */}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div>{content}</div>
    </>
  );
};

export default LocationsPage;

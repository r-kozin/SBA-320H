import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations, updateLocationPageNum } from "../redux/locationsSlice";
import LocCard from "../components/LocCard";

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
            <LocCard key={location.id} name={location.name} type={location.type} id={location.id} dimension={location.dimension} />
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

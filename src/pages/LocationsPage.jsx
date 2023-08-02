import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations, updateLocationPageNum, fetchLocationsPage } from "../redux/locationsSlice";
import LocCard from "../components/LocCard";
import Pagination from "react-bootstrap/Pagination";

export const LocationsPage = () => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.location.currentPage);
  const pageCount = useSelector((state) => state.location.locations.info.pages);

  function handlePageChange(newPage) {
    dispatch(fetchLocationsPage(newPage));
    dispatch(updateLocationPageNum(newPage));
    console.log("handling page change");
  }

  
  const locations = useSelector((state) => state.location.locations.results);
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
            <LocCard
              key={location.id}
              name={location.name}
              type={location.type}
              id={location.id}
              dimension={location.dimension}
            />
          ))}
        </div>
      </div>
    );
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
      <div>{content}</div>
      <div>
        <Pagination style={{justifyContent: "center"}}>{items}</Pagination>
        <br />
      </div>
    </>
  );
};

export default LocationsPage;

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLocationByName } from '../redux/locationsSlice'
import { useParams } from 'react-router-dom'


export const SingleLocationPage = ({ match }) => {
    const { locationName } = useParams()
    console.log(locationName);
    const location = useSelector((state) => selectLocationByName(state, locationName))
    console.log(location);

  return (
    <div className="single-location-container">
        <h3>{location.name}</h3>
        <h3>{location.type}</h3>
        <h3>{location.dimension}</h3>
        <h3>{location.residents}</h3>
    </div>
  )
}

export default SingleLocationPage
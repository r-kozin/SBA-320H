import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCharacterByID } from '../redux/charactersSlice'
import { useParams } from 'react-router-dom'


export const SingleCharacterPage = ({ match }) => {
    const { charId } = useParams()
    console.log(charId);
    const singleCharacter = useSelector((state) => selectCharacterByID(state, charId)) //will only work for characters already in state (first page by default)
    console.log(singleCharacter);

    

  return (
    <div className="single-character-container">
              <img src={singleCharacter.image} alt={singleCharacter.name} />
              <h2>{singleCharacter.name}</h2>
        <h3>Status: {singleCharacter.status}</h3>
        <h3>Species: {singleCharacter.species}</h3>
        <h3>Gender: {singleCharacter.gender}</h3>
        <h3>Origin: {singleCharacter.origin.name}</h3>
        <h3>Last Known Location: {singleCharacter.location.name}</h3>
        <h3>Episodes: {singleCharacter.episode}</h3>
    </div>
  )
}

export default SingleCharacterPage
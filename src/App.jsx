import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CharactersPage from './pages/CharactersPage'
import LocationsPage from './pages/LocationsPage'
import HomePage from './pages/HomePage'
import SingleLocationPage from './pages/SingleLocationPage'


function App() {

  return (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/characters" element={<CharactersPage />} />
      <Route path="/locations" element={<LocationsPage />} />
      <Route path="/location/:locationName" element={<SingleLocationPage />} />

    </Routes>
  </Router>       
  )
}

export default App

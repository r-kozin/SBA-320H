import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CharactersPage from './pages/CharactersPage'
import LocationsPage from './pages/LocationsPage'
import HomePage from './pages/HomePage'
import SingleLocationPage from './pages/SingleLocationPage'
import SingleCharacterPage from './pages/SingleCharacterPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavbar from './TopNavbar.jsx'



function App() {

  return (
  <Router>
  <TopNavbar />
  <div className="App">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/characters" element={<CharactersPage />} />
      <Route path="/character/:charId" element={<SingleCharacterPage />} />
      <Route path="/locations" element={<LocationsPage />} />
      <Route path="/location/:locationName" element={<SingleLocationPage />} />

    </Routes>
    </div>
  </Router>       
  )
}

export default App

import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CharactersPage from './pages/CharactersPage'
import LocationsPage from './pages/LocationsPage'
import HomePage from './pages/HomePage'
import SingleLocationPage from './pages/SingleLocationPage'
import SingleCharacterPage from './pages/SingleCharacterPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import './styles/CharactersPage.css';
import './styles/TopNavbar.css';
import './styles/SingleCharacterPage.css';
import TopNavbar from './TopNavbar.jsx'
import { useSelector } from 'react-redux/es/hooks/useSelector'



function App() {
  const theme = useSelector(state => state.theme.theme)

  return (
  <Router>
  <TopNavbar />
  <div className={`App ${theme}`}>
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

import { useEffect, useState, useRef } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom'
import HomePage from './components/HomePage.js'
import ArtistView from './components/ArtistView'
import AlbumView from './components/AlbumView'
import NavBar from './components/NavBar'
import Spinner from './components/Spinner'
import './App.css';

const App = () => {
  let [search, setSearch] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState([])
  let searchInput = useRef('');

  const API_URL = 'https://itunes.apple.com/search?term='



  const handleSearch = (e, term) => {
    e.preventDefault()
    const fetchData = async () => {
        document.title = `${term} Music`
        const response = await fetch(API_URL + term)
        const resData = await response.json()
        if (resData.results.length > 0) {
            return setData(resData.results)
        } else {
            return setMessage('Not Found.')
        }
    }
    fetchData()
}

console.log('DATA FROM API!!! app.js', data)
  return (
      <div className='App'>
        <SearchContext.Provider value={{term: searchInput, handleSearch: handleSearch}}>
          <DataContext.Provider value={data}>

            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/artist/:id" element={<ArtistView />} />
                <Route path="/album/:id" element={<AlbumView />} />
              </Routes>
            </Router>
            
          </DataContext.Provider>
        </SearchContext.Provider>
      </div>
  )
}

export default App
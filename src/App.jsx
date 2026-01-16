import React, { useState } from 'react'
import SearchBar from './components/SearchBar'
import SideBar from './components/SideBar'
import WeatherContent from './components/WeatherContent'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState([])
  const [city, setCity] = useState('')
  const [favourites, setFavourites] = useState([])
  const [condition, setCondition] = useState('')
  const [icon, setIcon] = useState('')

  const handleSearch = ({ city, weatherData, condition, icon }) => {
    setWeatherData(weatherData)
    setCity(city)
    setCondition(condition)
    setIcon(icon)
  }

  const addFavourite = (city, weatherData, condition, icon) => {
    if (city && !favourites.some(fav => fav.city === city)) {
      setFavourites([...favourites, { city, weatherData, condition, icon }])
    }
  }

  const removeFavourite = (cityName) => {
    setFavourites(favourites.filter(fav => fav.city !== cityName))
  }

  const loadFavourite = (fav) => {
    setCity(fav.city)
    setWeatherData(fav.weatherData)
    setCondition(fav.condition)
    setIcon(fav.icon)
  }

  const getBackgroundClass = (cond) => {
    switch (cond) {
      case 'Clear':
        return 'bg-cyan-500'
      case 'Clouds':
        return 'bg-gradient-to-br from-slate-500 via-gray-500 to-slate-600'
      case 'Rain':
        return 'bg-cyan-600'
      case 'Snow':
        return 'bg-blue-300'
      case 'Thunderstorm':
        return 'bg-purple-700'
      case 'Drizzle':
        return 'bg-cyan-600'
      case 'Mist':
        return 'bg-gray-600'
      default:
        return 'bg-cyan-400'
    }
  }

  return (
    <div className={`App h-screen flex flex-col md:flex-row ${getBackgroundClass(condition)}`}>
      <div className="w-full md:w-1/5">
        <SideBar weatherData={weatherData} city={city} favourites={favourites} addFavourite={addFavourite} condition={condition} icon={icon} loadFavourite={loadFavourite} removeFavourite={removeFavourite} />
      </div>
      <div className="main-content w-full md:w-4/5 flex-col">
        <div className='h-1/12'>
          <SearchBar onSearch={handleSearch} condition={condition} />
        </div>
        <div className='h-11/12'>
          <WeatherContent weatherData={weatherData} condition={condition} />
        </div> 
      </div>
    </div>
  )
}

export default App

import React, { useState } from 'react'

const SearchBar = ({ onSearch, condition }) => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const getBgClass = (cond) => {
    switch (cond) {
      case 'Clear':
        return 'bg-blue-100'
      case 'Clouds':
        return 'bg-slate-100'
      case 'Rain':
        return 'bg-cyan-100'
      case 'Snow':
        return 'bg-sky-50'
      case 'Thunderstorm':
        return 'bg-purple-100'
      case 'Drizzle':
        return 'bg-teal-100'
      case 'Mist':
        return 'bg-gray-100'
      default:
        return 'bg-blue-100'
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
      )
      const data = await response.json()

      if (data.cod === 200) {
        const weatherData = [
          { label: 'Wind Direction', value: `${data.wind.deg}°`, icon: '🧭' },
          { label: 'Humidity', value: `${data.main.humidity}%`, icon: '💧' },
          { label: 'Wind Speed', value: `${data.wind.speed} m/s`, icon: '💨' },
          { label: 'Pressure', value: `${data.main.pressure} hPa`, icon: '📊' },
          { label: 'Visibility', value: `${(data.visibility / 1000).toFixed(1)} km`, icon: '👁️' },
          { label: 'Temperature', value: `${Math.round(data.main.temp)}°C`, icon: '🌡️' },
          { label: 'Precipitation', value: data.rain ? `${data.rain['1h'] || 0} mm` : '0 mm', icon: '🌧️' },
          { label: 'Feels Like', value: `${Math.round(data.main.feels_like)}°C`, icon: '🤒' },
          { label: 'Cloudiness', value: `${data.clouds.all}%`, icon: '☁️' },
        ]
        onSearch({ city: data.name, weatherData, condition: data.weather[0].main, icon: data.weather[0].icon })
      } else {
        alert('City not found')
      }
    } catch (error) {
      console.error('Error fetching weather data:', error)
      alert('Error fetching weather data')
    }
    setLoading(false)
  }

  return (
    <div className={`search-bar h-full flex items-center justify-center p-4 ${getBgClass(condition)}`}>
      <form onSubmit={handleSubmit} className="flex w-full gap-4 max-w-sm md:max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="flex-1 px-2 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-3 md:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  )
}

export default SearchBar
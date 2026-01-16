import React from 'react'


const WeatherContent = ({ weatherData, condition }) => {
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

  if (!weatherData || weatherData.length === 0) {
    return (
      <div className={`weather-content h-full p-4 flex items-center justify-center ${getBgClass(condition)}`}>
        <p className="text-lg text-gray-500">Search a city for weather info</p>
      </div>
    )
  }

  return (
    <div className={`weather-content h-full p-4 ${getBgClass(condition)}`}>
      <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-5 md:grid-rows-3 gap-2 h-full">
        {weatherData.map((data, index) => (
          <div key={index} className="bg-transparent rounded-lg shadow-md p-2 flex flex-col items-center justify-center">
            <span className="text-lg md:text-2xl">{data.icon}</span>
            <p className="text-xs md:text-sm font-semibold">{data.value}</p>
            <p className="text-xs">{data.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeatherContent
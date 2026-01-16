import React from 'react'
import { SunIcon, CloudIcon, BoltIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

const SideBar = ({ weatherData, city, favourites, addFavourite, condition, icon, loadFavourite, removeFavourite }) => {
  const temperature = weatherData.find(item => item.label === 'Temperature')?.value || 'N/A'

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

  const getWeatherIcon = (cond) => {
    const iconClass = 'w-8 h-8 md:w-12 md:h-12'
    switch (cond) {
      case 'Clear':
        return <SunIcon className={`${iconClass} text-yellow-400`} />
      case 'Clouds':
        return <CloudIcon className={`${iconClass} text-gray-400`} />
      case 'Rain':
        return <CloudIcon className={`${iconClass} text-blue-500`} />
      case 'Snow':
        return <CloudIcon className={`${iconClass} text-blue-100`} />
      case 'Thunderstorm':
        return <BoltIcon className={`${iconClass} text-yellow-500`} />
      case 'Drizzle':
        return <CloudIcon className={`${iconClass} text-blue-300`} />
      default:
        return <CloudIcon className={`${iconClass} text-gray-400`} />
    }
  }

  const isFavourited = favourites.some(fav => fav.city === city)

  const handleHeartClick = () => {
    if (isFavourited) {
      removeFavourite(city)
    } else {
      addFavourite(city, weatherData, condition, icon)
    }
  }

  return (
    <div className="side-bar h-full flex flex-col">
      <div className={`h-1/2 p-4 relative ${getBgClass(condition)}`}>
        {(!weatherData || weatherData.length === 0) ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-gray-500">Search for a city to see weather</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg h-full">
            <button
              onClick={handleHeartClick}
              className="absolute top-6 right-6 text-red-500 hover:text-red-700 cursor-pointer"
            >
              {isFavourited ? (
                <HeartSolidIcon className="w-6 h-6 md:w-8 md:h-8" />
              ) : (
                <HeartOutlineIcon className="w-6 h-6 md:w-8 md:h-8" />
              )}
            </button>
            <h4 className="text-lg md:text-xl font-bold mb-2">{city}</h4>
            <span className="text-2xl md:text-4xl mb-2">{temperature}</span>
            <div className="mb-2">
              {getWeatherIcon(condition)}
            </div>
            <p className="text-lg">{condition}</p>
          </div>
        )}
      </div>
      <div className={`h-1/2 p-4 relative ${getBgClass(condition)}`}>
        {favourites.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-gray-600">No favourite cities yet</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full overflow-y-auto">
            <h4 className="text-lg font-semibold mb-4">Favourites</h4>
            <ul className="list-none space-y-2 w-full">
              {favourites.map((fav, index) => {
                const temp = fav.weatherData.find(item => item.label === 'Temperature')?.value || 'N/A';
                return (
                  <li
                    key={index}
                    onClick={() => loadFavourite(fav)}
                    className="cursor-pointer hover:bg-gray-300 p-2 rounded-lg transition-colors duration-200 text-sm text-center"
                  >
                    {fav.city} - {temp}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
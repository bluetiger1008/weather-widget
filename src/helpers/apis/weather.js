import axios from 'axios'

const weatherAppId = '4ef94411c88af639e42262a773805c7e'

const getWeatherAPIWithLocation = (location) => {
  return axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherAppId}&units=metric`
  )
}

const getWeatherAPIWithGeocode = (lat, lon) => {
  return axios.get(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAppId}&units=metric`
  )
}

export { getWeatherAPIWithLocation, getWeatherAPIWithGeocode }

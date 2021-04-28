import axios from 'axios'

const weatherAppId = '4ef94411c88af639e42262a773805c7e'

const getWeatherAPI = (city) => {
  return axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAppId}&units=metric`
  )
}

export { getWeatherAPI }

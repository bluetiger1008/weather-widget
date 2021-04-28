import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  card: {
    color: '#fff',
    background: blue[400],
  },
}))

const WeatherCard = ({ weatherData }) => {
  const classes = useStyles()

  return (
    <Box
      width={500}
      p={5}
      boxShadow={3}
      borderRadius={16}
      className={classes.card}
    >
      <Box display='flex' justifyContent='space-between'>
        <Box>
          <Typography>{weatherData.name}</Typography>
          <Typography variant='h2' gutterBottom>
            {weatherData.main.temp}
            <span style={{ fontSize: '0.5em' }}> &#8451;</span>
          </Typography>
          <Typography>Humidity: {weatherData.main.humidity}%</Typography>
          <Typography>Visibility: {weatherData.visibility / 1000}km</Typography>
          <Typography>Wind speed: {weatherData.wind.speed}m/s</Typography>
        </Box>
        <Box textAlign='center'>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt='weather icon'
          />
          <Typography>{weatherData.weather[0].description}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default WeatherCard

import { useEffect, useState } from 'react'
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@material-ui/core'
import { geolocated } from 'react-geolocated'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  getWeatherAPIWithLocation,
  getWeatherAPIWithGeocode,
} from './helpers/apis/weather'
import WeatherCard from './components/WeatherCard'
import './App.css'

const App = ({ isGeolocationAvailable, isGeolocationEnabled, coords }) => {
  const [weatherData, setWeatherData] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [location, setLocation] = useState('')
  const [locationError, setLocationError] = useState(false)
  const [getWeatherDataBy, setGetWeatherDataBy] = useState()

  const getWeatherData = async () => {
    setLocationError(false)
    try {
      let res
      if (getWeatherDataBy === 'location') {
        res = await getWeatherAPIWithLocation(location)
      } else if (getWeatherDataBy === 'geocode') {
        res = await getWeatherAPIWithGeocode(coords.latitude, coords.longitude)
      }

      setWeatherData(res.data)
      setOpenModal(false)
    } catch (e) {
      setLocationError(true)
      toast.error(
        'Weather data is not available for this location! Please put the right location.'
      )
    }
  }

  const handleClickOpen = () => {
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  const onChangeLocation = (e) => {
    setLocation(e.target.value)
  }

  const onFormSubmit = () => {
    setGetWeatherDataBy('location')
  }

  const onSelectCurrentLocation = () => {
    setGetWeatherDataBy('geocode')
  }

  useEffect(() => {
    if (getWeatherDataBy) {
      getWeatherData()
    }
  }, [getWeatherDataBy])

  useEffect(() => {
    const interval = setInterval(() => {
      if (weatherData) {
        getWeatherData()
      }
    }, 1000 * 60 * 60)
    return () => clearInterval(interval)
  }, [weatherData])

  return (
    <div className='App'>
      <ToastContainer />
      {!weatherData && (
        <Box mb={2}>
          <Button variant='outlined' color='primary' onClick={handleClickOpen}>
            Enter your location
          </Button>
        </Box>
      )}
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby='form-location'
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle id='form-location-title'>Your location</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='location'
            label='Location'
            type='text'
            fullWidth
            value={location}
            onChange={onChangeLocation}
            error={locationError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onFormSubmit} color='primary' variant='contained'>
            Submit Location
          </Button>
          {coords && (
            <Button
              onClick={onSelectCurrentLocation}
              color='primary'
              variant='contained'
            >
              Use Current Location
            </Button>
          )}

          <Button onClick={handleClose} color='secondary' variant='contained'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  )
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App)

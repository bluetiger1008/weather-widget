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

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { getWeatherAPI } from './helpers/apis/weather'
import WeatherCard from './components/WeatherCard'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [location, setLocation] = useState('')
  const [locationError, setLocationError] = useState(false)

  const getWeatherData = async (location) => {
    setLocationError(false)

    try {
      const res = await getWeatherAPI(location)

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
    getWeatherData(location)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (weatherData) {
        getWeatherData(weatherData.name)
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
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={onFormSubmit} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  )
}

export default App

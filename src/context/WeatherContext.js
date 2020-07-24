import * as R from 'ramda'

import axios from 'axios'
import createDataContext from './createDataContext'
export const MSGS = {
  LOCATION_INPUT: 'LOCATION_INPUT',
  ADD_LOCATION: 'ADD_LOCATION',
  REMOVE_LOCATION: 'REMOVE_LOCATION',
  HTTP_SUCCESS: 'HTTP_SUCCESS',
  HTTP_ERROR: 'HTTP_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
}
const weatherReducer = (state, action) => {
  switch (action.type) {
    case 'LOCATION_INPUT':
      const { location } = action
      return { ...state, location }

    case 'ADD_LOCATION': {
      const { location, locations, nextId } = state
      const newLocation = {
        name: location,
        id: nextId,
        temp: '',
        low: '',
        high: '',
      }

      const updatedLocations = R.prepend(newLocation, locations)

      return {
        ...state,
        location: '',
        locations: updatedLocations,
        nextId: nextId + 1,
      }
    }
    case 'HTTP_SUCCESS':
      const { id, res } = action
      const { locations } = state
      const { temp } = R.pathOr({}, ['data', 'main'], res)
      const updatedLocations = R.map((location) => {
        console.log(location.id, id)
        if (location.id === id) {
          return {
            ...location,
            temp: Math.round(temp),
          }
        }
        return location
      }, locations)
      return {
        ...state,
        locations: updatedLocations,
      }

    default:
      return state
  }
}

const locationInput = (dispatch) => (location) =>
  dispatch({
    type: MSGS.LOCATION_INPUT,
    location,
  })
const handleSubmit = (dispatch) => () => {
  dispatch({ type: MSGS.ADD_LOCATION })
}

const getWeather = (dispatch) => async (location, nextId) => {
  const res = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=5112c8bcb956163de1bef731c878cecc`,
  )
  console.log(`getWeather${nextId}`)
  dispatch({
    type: MSGS.HTTP_SUCCESS,
    res,
    id: nextId,
  })
}

export const { Context, Provider } = createDataContext(
  weatherReducer,
  {
    locationInput,
    handleSubmit,
    getWeather,
  },
  {
    location: '',
    nextId: 0,
    locations: [],
    error: null,
  },
)

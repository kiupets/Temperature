import React, { useContext } from 'react'
import { Context } from '../context/WeatherContext'
import FormWeather from './FormWeather'
import LocationList from './LocationList'

const Home = () => {
  const { state } = useContext(Context)
  console.log(state)
  return (
    <div>
      <FormWeather />
      <LocationList />
    </div>
  )
}
export default Home

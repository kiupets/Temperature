import React, { useContext, useEffect, useState, useCallback } from 'react'
import { Context } from '../context/WeatherContext'
import useDidMount from '../hooks/didMount'

const FormWeather = () => {
  const didMount = useDidMount()
  const [search, setSearch] = useState('')
  const { state, locationInput, handleSubmit, getWeather } = useContext(Context)
  const { location, nextId } = state
  const [id, setId] = useState(nextId)

  useEffect(() => {
    if (didMount) getWeather(search, id)
    setId(nextId)
  }, [search])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
        setSearch(location)
      }}
    >
      <input value={location} onChange={(e) => locationInput(e.target.value)} />
      <button>ADD COUNTRY</button>
    </form>
  )
}

export default FormWeather

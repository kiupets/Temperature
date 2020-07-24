import React,{useContext} from 'react'
import { Provider } from './context/WeatherContext.js'

import Home from './components/Home'

const App = () => {
  return (
    <Provider>
      <Home />
    </Provider>
  )
}


export default App

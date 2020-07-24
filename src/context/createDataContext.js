import React, { useReducer } from 'react'
import * as R from 'ramda'

export default (reducer, actions, initialState = {}) => {
  const Context = React.createContext()

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const boundActions = R.map((key) => key(dispatch), actions)

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    )
  }
  return { Context, Provider }
}

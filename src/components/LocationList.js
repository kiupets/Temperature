import LocationCard from './LocationCard'
import { Context } from '../context/WeatherContext'
import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}))

export default function LocationList() {
  const { state } = useContext(Context)
  const classes = useStyles()
  return (
    <List className={classes.root}>
      {state.locations.map((loc) => {
        return (
          <ListItem alignItems="flex-start">
            <LocationCard temp={loc.temp} />
          </ListItem>
        )
      })}
    </List>
  )
}

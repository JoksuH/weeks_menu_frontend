import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '80%',
    margin: 'auto',
  },
  formcontrol: {
    width: '100%',
  },
}))

function Instructions() {
  const [Instructions, SetInstructions] = useState('')

  const classes = useStyles()

  const handleChange = (event) => {
    SetInstructions(event.target.value)
  }
  return (
    <Grid container className={classes.grid} direction="column" alignContent="center" spacing={3}>
      <Grid item>
        <InputLabel id="instructions-inputlabel">Instructions</InputLabel>

        <TextField multiline rows={4} variant="outlined" onChange={handleChange}></TextField>
      </Grid>
    </Grid>
  )
}

export default Instructions

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '80%',
    margin: 'auto',
    marginTop: '5vh',
  },
  formcontrol: {
    width: '100%',
  },
}))

function Instructions({handleInstructionsChange}) {

  const classes = useStyles()

  return (
    <Grid container className={classes.grid} direction="column" alignContent="center" spacing={3}>
      <Grid item>
        <InputLabel id="instructions-inputlabel">Instructions</InputLabel>

        <TextField multiline rows={4} variant="outlined" onChange={handleInstructionsChange} inputProps={{ style: { textAlign: 'center', width:'40vw' } }}></TextField>
      </Grid>
    </Grid>
  )
}

export default Instructions

import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  textfield_amount: {
    width: '10vw',
    margin: 'auto',
  },
  textfield_item: {
    width: '30vw',
    margin: 'auto',
  },
  formcontrol: {
    width: '100%',
  },
}))

function Incredient() {
  const [unit, Setunit] = useState('')
  const classes = useStyles()

  const handleChange = (event) => {
    Setunit(event.target.value)
  }

  return (
    <Grid container className={classes.grid} direction="row" alignContent="center" spacing={3}>
      <Grid item>
        <InputLabel id="unit-selection-inputlabel">Amount</InputLabel>

        <TextField className={classes.textfield_amount} fullWidth={true}></TextField>
      </Grid>
      <Grid item>
        <FormControl className={classes.formcontrol}>
          <InputLabel id="unit-selection-inputlabel">Unit</InputLabel>
          <Select id="unit-selection" value={unit} onChange={handleChange}>
            <MenuItem value={'g'}>g</MenuItem>
            <MenuItem value={'dl'}>dl</MenuItem>
            <MenuItem value={'ts'}>ts</MenuItem>
            <MenuItem value={'tbs'}>tbs</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <InputLabel id="unit-selection-inputlabel">Item</InputLabel>

        <TextField className={classes.textfield_item}></TextField>
      </Grid>
    </Grid>
  )
}

export default Incredient

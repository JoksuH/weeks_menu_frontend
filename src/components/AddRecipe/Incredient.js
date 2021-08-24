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

function Incredient({ number, onChange, defAmount="", defItem = "", defUnits="" }) {
  const classes = useStyles()
  const [units, Setunits] = useState(defUnits)
  

  const onUnitChange = (event) => {
    Setunits(event.target.value)
    onChange(event)
  }

  return (
    <Grid container className={classes.grid} direction="row" alignContent="center" spacing={3}>
      <Grid item>
        <InputLabel id="unit-selection-inputlabel">Amount</InputLabel>

        <TextField className={classes.textfield_amount} fullWidth={true} onInput={onChange} defaultValue={defAmount} name={'amount ' + number} inputProps={{ style: { textAlign: 'center' } }}></TextField>
      </Grid>
      <Grid item>
        <FormControl className={classes.formcontrol}>
          <InputLabel id="unit-selection-inputlabel">Unit</InputLabel>
          <Select id="unit-selection" value={units} onChange={onUnitChange} name={'units ' + number}>
            <MenuItem value={''}></MenuItem>
            <MenuItem value={'g'}>g</MenuItem>
            <MenuItem value={'dl'}>dl</MenuItem>
            <MenuItem value={'tsp'}>tsp</MenuItem>
            <MenuItem value={'tbsp'}>tbsp</MenuItem>
            <MenuItem value={'cups'}>cups</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <InputLabel id="unit-selection-inputlabel">Item</InputLabel>

        <TextField className={classes.textfield_item} defaultValue={defItem} onInput={onChange} name={'item ' + number} inputProps={{ style: { textAlign: 'center' } }}></TextField>
      </Grid>
    </Grid>
  )
}

export default Incredient

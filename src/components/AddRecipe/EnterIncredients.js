import { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Incredient from './Incredient'

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    margin: 'auto',
    marginTop: '5vh'
  },
  item: {
    paddingTop: '3vh',
  },
  button: {
    marginTop: '3vh',
  },
  formcontrol: {
    width: '100%',
  },
}))

function EnterIncredients({handleIncredientChange}) {
  const [AmountofIncredients, SetAmountofIncredients] = useState(2)
  const [IncredientList, SetIncredientList] = useState([0, 1])

  const classes = useStyles()

  const handleButtonClick = () => {
    const incListCopy = [...IncredientList]
    incListCopy.push(AmountofIncredients)
    SetIncredientList(incListCopy)
    SetAmountofIncredients(AmountofIncredients + 1)
  }

  return (
    <Grid container className={classes.grid} direction="column" alignContent="center">
      {IncredientList.map((val, index) => {
        return (
          <Grid item className={classes.item} key={index}>
            <Incredient number={index} onChange={handleIncredientChange}/>
          </Grid>
        )
      })}
      <Button variant="contained" onClick={handleButtonClick} className={classes.button} startIcon={<AddCircleOutlineIcon />}>
        Add New Incredient
      </Button>
    </Grid>
  )
}

export default EnterIncredients

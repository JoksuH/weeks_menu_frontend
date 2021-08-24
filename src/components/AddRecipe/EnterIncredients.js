import { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import FileCopyIcon from '@material-ui/icons/FileCopy'
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

function EnterIncredients({handleIncredientChange, handlePasting}) {
  const [AmountofIncredients, SetAmountofIncredients] = useState(2)
  const [IncredientList, SetIncredientList] = useState([])
  const [PastedText, SetPastedText] = useState("")
  const [Pasting, SetPasting] = useState(false)

  const classes = useStyles()

  const handleAddIngredientButtonClick = () => {
    const incListCopy = [...IncredientList]
    incListCopy.push(["","",""])
    SetIncredientList(incListCopy)
    SetAmountofIncredients(AmountofIncredients + 1)
  }

  const handlePastingReqButtonClicked = () => {
    SetPasting(!Pasting)
  }

  const handlePastingConfButtonClicked = () => {
    // Splits pasted text based on new lines, and gets the amounts, units and items to an array
    const ingredientsArr = PastedText.split('\n')
    let incList = []
    if (ingredientsArr.length < 2) alert('Pasting error. Make sure that the ingredients are split by new lines')
    else {
      ingredientsArr.forEach(element => {
        const trimmedText = element.trim()
        const wordsArr = trimmedText.split(" ")
        // Check if amount value has been split into multiple parts ie. 1 1/2
        // Finds the first word in the array where the first letter is not a numerical value
        const firstNotNumber = wordsArr.findIndex(element => isNaN((element.charAt(0))))
        
        const amountText = wordsArr.slice(0, firstNotNumber).join(" ")
        //Item text is currently just the rest of the string after amount + units
        const itemText = wordsArr.slice(2, wordsArr.length).join(" ")
        incList.push([amountText,formatUnitsforDb(wordsArr[firstNotNumber]),itemText])

      })
    SetIncredientList(incList)


    }
    handlePasting(ingredientsArr)
    SetPasting(!Pasting)
  }

  const handlePastedText = (event) => {
    SetPastedText(event.target.value)
  }

  const formatUnitsforDb = (string) => {
    
    if (string.includes("cup")) string = "cups"
    else if (string.includes("tablesp")) string = "tbsp"
    else if (string.includes("tbs")) string = "tbsp"
    else if (string.includes("ts")) string = "tsp"
    else if (string.includes("teas")) string = "tsp"
    else if (string.includes("gram")) string = "g"

    return string

  }



  return (
    <Grid container className={classes.grid} direction="column" alignContent="center">
      {IncredientList.map((value, index) => {
        return (
          <Grid item className={classes.item} key={index}>
            <Incredient number={index} onChange={handleIncredientChange} defAmount={value[0]} defUnits={value[1]} defItem={value[2]}/>
          </Grid>
        )
      })}
      <Button variant="contained" onClick={handleAddIngredientButtonClick} className={classes.button} startIcon={<AddCircleOutlineIcon />}>
        Add New Incredient
      </Button>
      {!Pasting ? <Button variant="contained" onClick={handlePastingReqButtonClicked} className={classes.button} startIcon={<FileCopyIcon />}>
        Paste Ingredients
      </Button> : <Button variant="contained" color="primary" onClick={handlePastingConfButtonClicked} className={classes.button} startIcon={<FileCopyIcon />}>
        Confirm Paste
      </Button>  }
      {Pasting && <TextField multiline rows={4} variant="outlined" onInput={handlePastedText} inputProps={{ style: { textAlign: 'center', width:'20vw' } }}></TextField> }
    </Grid>
  )
}

export default EnterIncredients

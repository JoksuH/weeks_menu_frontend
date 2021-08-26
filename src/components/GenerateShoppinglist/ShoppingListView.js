import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { makeStyles } from '@material-ui/core/styles'
import { useState, useEffect } from 'react'

const useStyles = makeStyles((theme) => ({
  mainbox: {
    width: '60%',
    margin: 'auto',
    marginTop: '5vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  listbox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    marginTop: 10,
  },
  button: {
    width: '40%',
    margin: '10px'
  },
}))

const ShoppingListView = ({menuRecipes}) => {

  const classes = useStyles()

  const [IngredientsList, SetIngredientsList] = useState({})

  useEffect(() => calculateItemsandAmounts(), [])

  const calculateItemsandAmounts = () => {

    const IngredientDictListing = {}

    menuRecipes.forEach(recipe => {
        recipe.IngredientList.forEach(ingredient => {
            const wordsArr = ingredient.split(" ")
            if (wordsArr.length > 0) {
                const amount = wordsArr[0] + " " + wordsArr[1]
                const item = wordsArr.slice(2).join(" ")

                //If the same ingredient has been previously entered, combine the ingredients amounts
                if (item in IngredientDictListing) {
                    const prevAmount = IngredientDictListing[item]
                    const prevAmountArr = prevAmount.split(" ")
                    const curAmountArr = amount.split(" ")
                    let newAmount = parseInt(prevAmountArr[0])
                    //If both amounts are using the same units ie. grams or teaspoons just combine the amount values
                    if (prevAmountArr[1] === curAmountArr[1]) {
                        newAmount +=  parseInt(curAmountArr[0])
                        IngredientDictListing[item] = newAmount.toString() + " " + prevAmountArr[1]
                    }
                    //Else change the amounts to the same units

                } else {
                IngredientDictListing[item] = amount
                }
            }
        }
        )
    })
    

    SetIngredientsList(IngredientDictListing)

  }


  return (
   <Box className={classes.mainbox}>
       {(IngredientsList) && Object.keys(IngredientsList).map(key => {
       return ( <Box className={classes.listbox}><ArrowRightIcon /><Typography variant="p" align="left" style={{marginLeft: '20px'}}>{IngredientsList[key] + " " + key}</Typography> </Box>)
       })
        }
    </Box>

  )
  
}

export default ShoppingListView

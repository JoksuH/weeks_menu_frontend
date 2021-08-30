import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ShoppingListItem from './ShoppingListItem'
import ShoppingListPdf from './ShoppingListPdf'
import { makeStyles } from '@material-ui/core/styles'
import { useState, useEffect } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'

import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
}

const useStyles = makeStyles((theme) => ({
  mainbox: {
    width: '60%',
    margin: 'auto',
    marginTop: '5vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    margin: '15px',
    marginBottom: '5vh'
  },
}))

const ShoppingListView = ({ menuRecipes }) => {
  const classes = useStyles()

  const [IngredientsList, SetIngredientsList] = useState({})
  const [ShoppingIngredientsList, SetShoppingIngredientsList] = useState({})
  const [PrintStatus, SetPrintStatus] = useState(false)

  useEffect(() => calculateItemsandAmounts(), [])

  const calculateItemsandAmounts = () => {
    const IngredientDictListing = {}

    menuRecipes.forEach((recipe) => {
      recipe.IngredientList.forEach((ingredient) => {
        const wordsArr = ingredient.split(' ')
        if (wordsArr.length > 0) {
          let amount = ''
          let item = ''
          // Check if the recipe has used measurements such as 1 1/2 cups where the amount is split in 2 parts
          if (isNaN(parseInt(wordsArr[1]))) {
            //If not split into 2 parts
            //If the first amount value has been entered in the format of 1/2 etc.
            if (wordsArr[0].includes('/')) amount = formatSplitNum(wordsArr[0]).toFixed(2).toString() + ' ' + wordsArr[1]
            else amount = wordsArr[0] + ' ' + wordsArr[1]
            item = wordsArr.slice(2).join(' ')
          } else {
            amount = (parseFloat(wordsArr[0]) + formatSplitNum(wordsArr[1])).toFixed(2).toString() + ' ' + wordsArr[2]
            item = wordsArr.slice(3).join(' ')
          }

          //If the same ingredient has been previously entered, combine the ingredients amounts
          if (item in IngredientDictListing) {
            const prevAmount = IngredientDictListing[item]
            const prevAmountArr = prevAmount.split(' ')
            const curAmountArr = amount.split(' ')
            let newAmount = parseFloat(prevAmountArr[0])
            //If both amounts are using the same units ie. grams or teaspoons just combine the amount values
            if (prevAmountArr[1] === curAmountArr[1]) {
              newAmount += parseFloat(curAmountArr[0])
              IngredientDictListing[item] = newAmount.toString() + ' ' + prevAmountArr[1]

              //Else change the amounts to the same units
            } else {
              let units = 'tsp'
              if (prevAmountArr[1] === 'units' || curAmountArr[1] === 'units') {
                //If one of the unit values is 'units' keep it seperate in the shopping list
                //The expectation is that ingredients measured in units are fresh produce, -spoon measurements are dried or spices
                if (prevAmountArr[1] === 'units') IngredientDictListing[item + ' (Spice)'] = amount
                else IngredientDictListing[item + ' (Fresh)'] = amount
              }
              //On units based on tablespoons and teaspoons, convert value to teespoons
              else if (prevAmountArr[1] === 'tsp' && curAmountArr[1] === 'tbsp') {
                newAmount += 3 * parseFloat(curAmountArr[0])
              } else if (prevAmountArr[1] === 'tbsp' && curAmountArr[1] === 'tsp') {
                newAmount = 3 * newAmount + parseFloat(curAmountArr[0])
              }
              //if amount is dividable by 3 or larger than 5 teaspoons, convert it to tablespoons. Otherwise keep it as teaspoons
              if (newAmount % 3 === 0 || newAmount > 5) {
                newAmount = (newAmount / 3).toFixed(2)
                units = 'tbsp'
              }
              IngredientDictListing[item] = newAmount.toString() + ' ' + units
            }
          }
          //If item not found in the list previously, add it
          else IngredientDictListing[item] = amount
        }
      })
    })
    SetIngredientsList(IngredientDictListing)
    SetShoppingIngredientsList(IngredientDictListing)
  }

  const formatSplitNum = (numString) => {
    const nums = numString.split('/')
    return parseInt(nums[0]) / parseInt(nums[1])
  }

  const handleShoppingListPrint = () => {
    SetPrintStatus(true)
  }

  const handleItemChecking = (amount, key) => {
    const ShopListCopy = { ...ShoppingIngredientsList }
    //If item is in the list, remove it
    if (key in ShopListCopy) delete ShopListCopy[key]
    //Else add it back
    else ShopListCopy[key] = amount

    SetShoppingIngredientsList(ShopListCopy)
  }

  return (
    <>
      {Object.keys(IngredientsList).length > 0 && (
        <Box className={classes.mainbox} initial="hidden" animate="show" variants={container} component={motion.ul}>
          <Typography style={{ fontStyle: 'italic' }} paragraph={true}>
            You can select ingredients to remove from your printable shopping list by checking their box. This allows you to remove ones you might already have or don't need to purchase
          </Typography>
          <Button className={classes.button} variant="contained" color="primary" onClick={handleShoppingListPrint}>
            Print Shopping List
          </Button>
          {PrintStatus && (
            <div>
              <PDFDownloadLink document={<ShoppingListPdf List={ShoppingIngredientsList}/>} fileName="shoppinglist.pdf">
                {({loading }) => (loading ? 'Loading document...' : 'Download now!')}
              </PDFDownloadLink>
            </div>
          )}
          {Object.keys(IngredientsList).map((key, index) => {
            return <ShoppingListItem amount={IngredientsList[key]} item={key} index={index} onChecking={handleItemChecking} />
          })}
         
        </Box>
      )}
    </>
  )
}

export default ShoppingListView

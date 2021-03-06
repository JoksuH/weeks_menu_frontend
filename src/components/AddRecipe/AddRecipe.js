import EnterIncredients from './EnterIncredients'
import BasicInfoBox from './BasicInfoBox'
import CookingInstructions from './CookingInstructions'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
}


function AddRecipe() {
  const [Title, SetTitle] = useState('')
  const [Description, SetDescription] = useState('')
  const [ImageURL, SetImageURL] = useState('')
  const [Instructions, SetInstructions] = useState('')
  const listOfamounts = useRef([])
  const listOfunits = useRef([])
  const listOfitems = useRef([])

  const handleTitleChange = (event) => {
    SetTitle(event.target.value)
  }
  const handleDescriptionChange = (event) => {
    SetDescription(event.target.value)
  }
  const handleInstructionsChange = (event) => {
    SetInstructions(event.target.value)
  }

  const handleImageURLChange = (event) => {
    SetImageURL(event.target.value)
  }

  const handlePasting = (dataArr) => {
    //Format data to specific arrays to allow editing values later
    dataArr.forEach((element) => {
      const wordsArr = element.trim().split(' ')
      const itemText = wordsArr.slice(2, wordsArr.length).join(' ')
      listOfamounts.current.push(wordsArr[0].toLowerCase())
      listOfunits.current.push(wordsArr[1].toLowerCase())
      listOfitems.current.push(itemText.toLowerCase())
    })
  }

  const handleIncredientChange = (event) => {
    let textArr = event.target.name.split(' ')
    const value = event.target.value.toLowerCase()
    switch (textArr[0]) {
      case 'amount':
        //If no data has been entered, add new values
        if (listOfamounts.current.length === 0 && textArr[0] === 0) {
          listOfamounts.current.push(value)
          break
        }
        // Else update previous data
        if (listOfamounts.current.length > textArr[1]) {
          listOfamounts.current[textArr[1]] = value
          break
        } else {
          //If adding ingredients before previous ones have been added, create placeholders in the created array
          for (let i = listOfamounts.current.length; i < textArr[1]; i++) {
            listOfamounts.current.push('')
          }
          listOfamounts.current.push(value)

          break
        }
      case 'units':
        if (listOfunits.current.length === 0 && textArr[0] === 0) {
          listOfunits.current.push(value)
          break
        }
        if (listOfunits.current.length > textArr[1]) {
          listOfunits.current[textArr[1]] = value
          break
        } else {
          for (let i = listOfunits.current.length; i < textArr[1]; i++) {
            listOfunits.current.push('')
          }
          listOfunits.current.push(value)

          break
        }

      case 'item':
        if (listOfitems.current.length === 0 && textArr[0] === 0) {
          listOfitems.current.push(value)
          break
        }
        if (listOfitems.current.length > textArr[1]) {
          listOfitems.current[textArr[1]] = value
          break
        } else {
          for (let i = listOfitems.current.length; i < textArr[1]; i++) {
            listOfitems.current.push('')
          }
          listOfitems.current.push(value)

          break
        }
      
      default:
    }
      
  }

  const saveRecipe = () => {
    const ingredientsStringArr = combineIngredientstoArr(listOfamounts.current, listOfunits.current, listOfitems.current)

    fetch('https://weeks-menu.herokuapp.com/recipes/addrecipe', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: Title,
        description: Description,
        imgurl: ImageURL,
        ingredients: ingredientsStringArr,
        instructions: Instructions,
      }),
    }).then(() => alert('Recipe Saved'))
  }

  const combineIngredientstoArr = (amounts, units, items) => {
    // Combine 3 arrays to a string to match database array values
    let ingredientStringArr = []

    console.log(units)
    console.log(items)

    amounts.forEach((element, index) => {
      let ingredientString = element + ' ' + formatUnitsforDb(units[index]) + ' ' + items[index]
      ingredientStringArr.push(ingredientString)
    })

    return ingredientStringArr
  }

  const formatUnitsforDb = (string) => {
    
    if (string.toLowerCase().includes("cup")) string = "cups"
    else if (string.toLowerCase().includes("tablesp")) string = "tbsp"
    else if (string.toLowerCase().includes("tbs")) string = "tbsp"
    else if (string.toLowerCase().includes("ts")) string = "tsp"
    else if (string.toLowerCase().includes("teas")) string = "tsp"
    else if (string.toLowerCase().includes("gram")) string = "g"

    return string

  }
  return (
    <motion.div initial="hidden" animate="visible" variants={variants}>
      <BasicInfoBox handleTitleChange={handleTitleChange} handleDescriptionChange={handleDescriptionChange} handleImageURLChange={handleImageURLChange} />
      <EnterIncredients handleIncredientChange={handleIncredientChange} handlePasting={handlePasting} />
      <CookingInstructions handleInstructionsChange={handleInstructionsChange} />
      <Button variant="contained" color="primary" onClick={saveRecipe} startIcon={<SaveIcon />}>
        Save
      </Button>
    </motion.div>
  )
}

export default AddRecipe

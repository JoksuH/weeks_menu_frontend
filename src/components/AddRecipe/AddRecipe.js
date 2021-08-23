import EnterIncredients from './EnterIncredients'
import BasicInfoBox from './BasicInfoBox'
import CookingInstructions from './CookingInstructions'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save';
import { useState, useRef } from 'react'


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
  
  const handleIncredientChange = (event) => {
    let textArr = event.target.name.split(' ')
    const value = event.target.value.toLowerCase()
    switch (textArr[0]) {
      case 'amount':
        if (listOfamounts.current.length === 0 && textArr[0] === 0) {
          listOfamounts.current.push(value)
          break
        }
        if (listOfamounts.current.length > textArr[1]) {
          listOfamounts.current[textArr[1]] = value
          break
        } else {
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
        } if (listOfitems.current.length > textArr[1]) {
          listOfitems.current[textArr[1]] = value
          break
        } else {
          for (let i = listOfitems.current.length; i < textArr[1]; i++) {
            listOfitems.current.push('')
          }
          listOfitems.current.push(value)

          break
        }

    }
    console.log(listOfitems)

  }

  const saveRecipe = () => {

    const ingredientsStringArr = combineIngredientstoArr(listOfamounts.current,listOfunits.current,listOfitems.current)

    fetch('http://localhost:4000/recipes/addrecipe', {
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

  const combineIngredientstoArr = (amounts,units,items) => {

    let ingredientStringArr = []

    amounts.forEach((element, index) => {
      let ingredientString = element + " " + units[index] + " " + items[index]
      ingredientStringArr.push(ingredientString)
    })

    return ingredientStringArr

  }
  return (
    <div>
      <BasicInfoBox handleTitleChange={handleTitleChange} handleDescriptionChange={handleDescriptionChange} handleImageURLChange={handleImageURLChange} />
      <EnterIncredients handleIncredientChange={handleIncredientChange} />
      <CookingInstructions handleInstructionsChange={handleInstructionsChange} />
      <Button variant="contained" color="primary" onClick={saveRecipe}         startIcon={<SaveIcon />}>
        Save
      </Button>
    </div>
  )
}

export default AddRecipe

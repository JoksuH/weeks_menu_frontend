import EnterIncredients from './EnterIncredients'
import BasicInfoBox from './BasicInfoBox'
import Instructions from './CookingInstructions'
import Button from '@material-ui/core/Button'
import { useState } from 'react'

function AddRecipe() {
  const [Title, SetTitle] = useState('')
  const [Description, SetDescription] = useState('')
  const [ImageURL, SetImageURL] = useState('')
  const listOfamounts = []
  const listOfunits = []
  const listOfitems = []

  const handleTitleChange = (event) => {
    SetTitle(event.target.value)
  }
  const handleDescriptionChange = (event) => {
    SetDescription(event.target.value)
  }
  const handleImageURLChange = (event) => {
    SetImageURL(event.target.value)
  }
  const handleIncredientChange = (event) => {
    let textArr = event.target.name.split(' ')
    const value = event.target.value.toLowerCase()

    switch (textArr[0]) {
      case 'amount':
        if (listOfamounts.length === 0 && textArr[0] === 0) {
          listOfamounts.push(value)
          break
        }
        if (listOfamounts.length > textArr[1]) {
          listOfamounts[textArr[1]] = value
          break
        } else {
          for (let i = listOfamounts.length; i < textArr[1]; i++) {
            listOfamounts.push('')
          }
          listOfamounts.push(value)

          break
        }
      case 'units':
        if (listOfunits.length === 0 && textArr[0] === 0) {
          listOfunits.push(value)
          break
        }  
        if (listOfunits.length > textArr[1]) {
          listOfunits[textArr[1]] = value
          break
        } else {
          for (let i = listOfunits.length; i < textArr[1]; i++) {
            listOfunits.push('')
          }
          listOfunits.push(value)

          break
        }

      case 'item':
        if (listOfitems.length === 0 && textArr[0] === 0) {
          listOfitems.push(value)
          break
        } if (listOfitems.length > textArr[1]) {
          listOfitems[textArr[1]] = value
          break
        } else {
          for (let i = listOfitems.length; i < textArr[1]; i++) {
            listOfitems.push('')
          }
          listOfitems.push(value)

          break
        }
    }
  }

  const saveRecipe = () => {
    console.log(listOfitems)
    console.log(listOfamounts)
    console.log(listOfunits)


  }
  return (
    <div>
      <BasicInfoBox handleTitleChange={handleTitleChange} handleDescriptionChange={handleDescriptionChange} handleImageURLChange={handleImageURLChange} />
      <EnterIncredients handleIncredientChange={handleIncredientChange} />
      <Instructions />
      <Button variant="outlined" onClick={saveRecipe}>
        Save
      </Button>
    </div>
  )
}

export default AddRecipe

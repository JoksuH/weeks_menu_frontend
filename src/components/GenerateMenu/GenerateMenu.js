import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import SaveIcon from '@material-ui/icons/Save'
import Button from '@material-ui/core/Button'
import { useState, useEffect } from 'react'
import MenuListItem from './MenuListItem'
import ViewRecipes from '../ViewRecipe/ViewRecipes'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
}

const button = {
  hidden: { opacity: 0, x: -50 },
  show: (index) => ({ opacity: 1, x: 0, transition: { duration: 0.2, delay: index * 0.05 } }),
}

const useStyles = makeStyles(() => ({
  mainbox: {
    width: '80%',
    margin: 'auto',
    marginTop: '5vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textfield: {
    marginRight: '5vh',
  },
  button: {
    width: '40%',
    margin: '10px',
    marginTop: '5vh'
  },
}))

const GenerateMenu = () => {
  const classes = useStyles()
  const [AllRecipes, SetAllRecipes] = useState([])
  const [SelectedRecipes, SetSelectedRecipes] = useState([])
  const [NumofDays, SetNumofDays] = useState(3)
  const [ManuallySelectRecipe, SetManuallySelectRecipe] = useState(false)
  const [RecipetoReplace, SetRecipetoReplace] = useState(null)

  const smallScreen = useMediaQuery('(max-width:800px)')


  useEffect(() => {
    fetch('https://weeks-menu.herokuapp.com/recipes/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json().then((json) => SetAllRecipes(json)))
  }, [])

  const handleDaySelection = (event) => {
    SetNumofDays(event.target.value)
  }

  const handleGenerateButtonClick = () => {
    if (NumofDays === '') alert('Please enter a valid number')
    else {
      const recipeArr = []
      const randomNumArr = []
      for (let i = 0; i < NumofDays; i++) {
        //Select a random number as an index
        let randomIndex = parseInt(Math.random() * AllRecipes.length)
        //If number already selected, keep choosing a new one randomly until a unique one is found
        while (randomNumArr.includes(randomIndex)) {
          randomIndex = parseInt(Math.random() * AllRecipes.length)
        }
        randomNumArr.push(randomIndex)
        recipeArr.push(AllRecipes[randomIndex])
      }
      SetSelectedRecipes(recipeArr)
    }
  }

  const handleReSelection = (index) => {
    let cloneArr = [...SelectedRecipes]
    let randomIndex = parseInt(Math.random() * AllRecipes.length)
    let selectedNewRecipe = AllRecipes[randomIndex]
    //Check that the database has more recipes to choose from. Throw alert if not
    if (cloneArr.length === AllRecipes.length) alert('The database does not contain more recipes to choose from')
    else {
      //Check if randomly selected new recipe has already been selected before. If so, select another recipe
      while (cloneArr.find((recipe) => recipe._id === selectedNewRecipe._id)) {
        selectedNewRecipe = AllRecipes[parseInt(Math.random() * AllRecipes.length)]
      }
      cloneArr.splice(index, 1, selectedNewRecipe)
      SetSelectedRecipes(cloneArr)
    }
  }

  const handleRecipeSelection = (index) => {
    SetRecipetoReplace(index)
    SetManuallySelectRecipe(true)
  }

  const onManualRecipeSelection = (Recipe) => {
    //If recipe is already on the list, throw alert
    if (SelectedRecipes.some((recipe) => recipe._id === Recipe._id)) alert('Recipe already in the list')
    else {
      const newRecipeList = [...SelectedRecipes]
      newRecipeList.splice(RecipetoReplace, 1, Recipe)
      SetSelectedRecipes(newRecipeList)
      SetManuallySelectRecipe(false)
      SetRecipetoReplace(null)
    }
  }

  const handleSaveMenu = () => {
    const ObjectIdArr = []
    SelectedRecipes.forEach((recipe) => ObjectIdArr.push(recipe._id))
    fetch('https://weeks-menu.herokuapp.com/menus/addmenu', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipes: ObjectIdArr,
      }),
    }).then(() => alert('Menu Saved'))
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={variants} style={{ marginTop: SelectedRecipes.length > 0 ? '4vh' : '25vh' }}>
      {ManuallySelectRecipe === false && (
        <>
          <Typography variant={smallScreen ? 'h5' : "h3"}>For how many days would you like to generate a menu?</Typography>
          <Box className={classes.mainbox}>
            <TextField
              className={classes.textfield}
              value={NumofDays.toString()}
              onChange={handleDaySelection}
              //Max Amount of days is either 14 or the number of recipes in the database if lower than 14
              InputProps={{ inputProps: { min: 0, max: AllRecipes.length > 14 ? 14 : AllRecipes.length } }}
              inputProps={{ style: { textAlign: 'center', fontSize: '24px' } }}
              type="number"
            />
            <Button className={classes.button} variant="contained" color="primary" onClick={handleGenerateButtonClick}>
              Generate
            </Button>
          </Box>
        </>
      )}
      {SelectedRecipes.length > 0 &&
        ManuallySelectRecipe === false &&
        SelectedRecipes.map((recipe, index) => {
          return <MenuListItem Recipe={recipe} key={recipe._id} index={index} onreSelection={handleReSelection} onRecipeSelect={handleRecipeSelection} />
        })}
      {ManuallySelectRecipe && <ViewRecipes onSelection={onManualRecipeSelection} />}
      {SelectedRecipes.length > 0 && ManuallySelectRecipe === false && (
        <Button className={classes.button} variant="contained" color="primary" initial="hidden" animate="show" variants={button} custom={SelectedRecipes.length} component={motion.div} startIcon={<SaveIcon />} onClick={handleSaveMenu}>
          Save Menu
        </Button>
      )}
    </motion.div>
  )
}

export default GenerateMenu

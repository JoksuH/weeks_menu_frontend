import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import Button from '@material-ui/core/Button'
import { useState, useEffect } from 'react'
import MenuListItem from './MenuListItem'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
}

const button = {
  hidden: { opacity: 0, x: -50 },
  show: (index) => ({ opacity: 1, x: 0, transition: { duration: 0.2, delay: index * 0.05 } }),
}


const useStyles = makeStyles((theme) => ({
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
  },
}))

const GenerateMenu = () => {
  const classes = useStyles()
  const [AllRecipes, SetAllRecipes] = useState([])
  const [SelectedRecipes, SetSelectedRecipes] = useState([])
  const [NumofDays, SetNumofDays] = useState(3)

  useEffect(() => {
    fetch('http://localhost:4000/recipes/', {
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
      while (cloneArr.filter((recipe) => recipe._id === selectedNewRecipe._id).length > 0) {
        selectedNewRecipe = AllRecipes[parseInt(Math.random() * AllRecipes.length)]
      }
      cloneArr.splice(index, 1, selectedNewRecipe)
      SetSelectedRecipes(cloneArr)
    }
  }

  const handleSaveMenu = () => {
    const ObjectIdArr = []
    SelectedRecipes.forEach((recipe) => ObjectIdArr.push(recipe._id))
    fetch('http://localhost:4000/menus/addmenu', {
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
    <motion.div initial="hidden" animate="visible" variants={variants} style={{marginTop: SelectedRecipes.length > 0 ? '4vh' : '35vh'}}>
      <Typography variant="h3">For how many days would you like to generate a menu?</Typography>
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

      {SelectedRecipes.length > 0 &&
        SelectedRecipes.map((recipe, index) => {
          return <MenuListItem Recipe={recipe} key={recipe._id} index={index} onreSelection={handleReSelection} />
        })}
      {SelectedRecipes.length > 0 && (
        <Button className={classes.button} variant="contained" color="primary" initial="hidden" animate="show" variants={button} custom={SelectedRecipes.length} component={motion.div} startIcon={<SaveIcon />} onClick={handleSaveMenu}>
          Save Menu
        </Button>
      )}
    </motion.div>
  )
}

export default GenerateMenu

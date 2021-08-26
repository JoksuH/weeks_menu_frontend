import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard'
import RecipeView from './RecipeView'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
}


const useStyles = makeStyles((theme) => ({
  grid: {
    width: '80%',
    margin: 'auto',
    marginTop: '5vh',
  },
}))

const ViewRecipes = () => {
  const classes = useStyles()
  const [Recipes, SetRecipes] = useState([])
  const [SelectedRecipe, SetSelectedRecipe] = useState({})

  useEffect(() => {
    fetch('http://localhost:4000/recipes/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json().then((json) => SetRecipes(json)))
  }, [])

  const onRecipeSelect = (Recipe) => {
    SetSelectedRecipe(Recipe)
  }

  const handleExitClick = () => {
    SetSelectedRecipe({})
  }
  return (
    <Grid container className={classes.grid} direction="row" alignContent="center" spacing={5} initial="hidden" animate="visible" variants={variants} component={motion.div}>
      {Recipes.length !== 0 &&
        Object.keys(SelectedRecipe).length === 0 &&
        Recipes.map((recipe, index) => {
          return (
            <Grid item key={index} xs={4}>
              <RecipeCard data={recipe} onSelect={onRecipeSelect} />
            </Grid>
          )
        })}
      {Object.keys(SelectedRecipe).length > 0 && <RecipeView data={SelectedRecipe} onExitClick={handleExitClick}/>}
    </Grid>
  )
}

export default ViewRecipes

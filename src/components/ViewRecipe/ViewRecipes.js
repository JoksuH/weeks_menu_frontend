import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard'
import RecipeView from './RecipeView'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  }
};

const listItem = {
  hidden: { opacity: 0, x: -50 },
  show:index =>  ({ opacity: 1, x: 0, transition: {duration: 0.2, delay: index * 0.1}, })
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
    <>
    {(Recipes) &&
      <Grid container className={classes.grid} direction="row" alignContent="center" spacing={5} initial="hidden" animate="show" variants={container} component={motion.div}>
        {Object.keys(SelectedRecipe).length === 0 &&
        Recipes.map((recipe, index) => {
          return (
            <Grid item key={recipe._id} xs={4} initial="hidden" animate="show" variants={listItem} custom={index} component={motion.div}>
              <RecipeCard data={recipe} onSelect={onRecipeSelect} />
            </Grid>
          )
        })}
      {Object.keys(SelectedRecipe).length > 0 && <RecipeView data={SelectedRecipe} onExitClick={handleExitClick}/>}
    </Grid>
      }
    </>
  )
}

export default ViewRecipes

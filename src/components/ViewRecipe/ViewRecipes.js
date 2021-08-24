import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard'
import RecipeView from './RecipeView'

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
    console.log(Recipe)
  }
  return (
    <Grid container className={classes.grid} direction="row" alignContent="center" spacing={3}>
      {Recipes.length !== 0 &&
        Object.keys(SelectedRecipe).length === 0 &&
        Recipes.map((recipe, index) => {
          return (
            <Grid item key={index}>
              <RecipeCard data={recipe} onSelect={onRecipeSelect} />
            </Grid>
          )
        })}
      {Object.keys(SelectedRecipe).length > 0 && <RecipeView data={SelectedRecipe} />}
    </Grid>
  )
}

export default ViewRecipes

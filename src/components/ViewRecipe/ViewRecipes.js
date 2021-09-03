import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard'
import RecipeView from './RecipeView'
import { motion } from 'framer-motion'
import { Typography } from '@material-ui/core'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
}

const listItem = {
  hidden: { opacity: 0, x: -50 },
  show: (index) => ({ opacity: 1, x: 0, transition: { duration: 0.2, delay: index * 0.1 } }),
}

const useStyles = makeStyles((theme) => ({
  maingrid: {
    width: '80%',
    margin: 'auto',
    marginTop: '5vh',
  },
  search: {
    width: '80%',
    margin: 'auto',
  },
}))

const ViewRecipes = () => {
  const classes = useStyles()
  const [Recipes, SetRecipes] = useState([])
  const [BackUPRecipes, SetBackUPRecipes] = useState([])
  const [SelectedRecipe, SetSelectedRecipe] = useState({})
  const [OpenDialog, SetOpenDialog] = useState(false)
  const [RecipeIDtoDelete, SetRecipeIDtoDelete] = useState('')

  useEffect(() => {
    fetch('http://localhost:4000/recipes/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) =>
      response.json().then((json) => {
        SetRecipes(json)
        SetBackUPRecipes(json)
      })
    )
  }, [])

  const onRecipeSelect = (Recipe) => {
    SetSelectedRecipe(Recipe)
  }

  const handleExitClick = () => {
    SetSelectedRecipe({})
  }

  const handleDeleteRequest = (id) => {
    SetRecipeIDtoDelete(id)
    SetOpenDialog(true)
  }

  const handleDialogClose = () => {
    SetOpenDialog(false)
    SetRecipeIDtoDelete('')
  }

  const handleDeleteConfirm = () => {
    if (RecipeIDtoDelete !== '') {
    fetch(`http://localhost:4000/recipes/${RecipeIDtoDelete}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {if (response.status === 200) alert('Menu Deleted')})
  }
    SetOpenDialog(false)    
    const recipesLeft = Recipes.filter(recipe => recipe._id !== RecipeIDtoDelete)
    SetRecipeIDtoDelete('')
    SetRecipes(recipesLeft)
  }

  const handleSearchTyping = (event) => {
    //Use the backupRecipes array to allow removing search terms and receiving proper results
    const filteredRecipes = BackUPRecipes.filter((recipe) => recipe.Title.toLowerCase().includes(event.target.value))
    SetRecipes(filteredRecipes)
  }

  return (
    <>
      {Recipes && (
        <Grid container className={classes.maingrid} direction="row" alignContent="center" spacing={5} initial="hidden" animate="show" variants={container} component={motion.div}>
          {Object.keys(SelectedRecipe).length === 0 && (
            <Grid className={classes.search}>
              <TextField label="Search For Recipes" className={classes.search} onChange={handleSearchTyping}></TextField>
            </Grid>
          )}
          {Object.keys(SelectedRecipe).length === 0 &&
            Recipes.map((recipe, index) => {
              return (
                <Grid item key={recipe._id} xs={4} initial="hidden" animate="show" variants={listItem} custom={index} component={motion.div}>
                  <RecipeCard data={recipe} onSelect={onRecipeSelect} onDelete={handleDeleteRequest} />
                </Grid>
              )
            })}
          {Recipes.length === 0 && Object.keys(SelectedRecipe).length === 0 && (
            <Grid className={classes.search} style={{ marginTop: '20vh' }}>
              <Typography variant="h3">No results found...</Typography>
            </Grid>
          )}
          {Object.keys(SelectedRecipe).length > 0 && <RecipeView data={SelectedRecipe} onExitClick={handleExitClick} />}
          <Dialog open={OpenDialog} onClose={handleDialogClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this recipe?"}</DialogTitle>
            <DialogActions>
              <Button onClick={handleDeleteConfirm} color="primary" variant="outlined">
                Confirm
              </Button>
              <Button onClick={handleDialogClose} color="secondary" autoFocus>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      )}
    </>
  )
}

export default ViewRecipes

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import RecipeViewTopInfo from './RecipeViewTopInfo'
import RecipeViewIngredients from './RecipeViewIngredients'
import RecipeViewInstructions from './RecipeViewInstructions'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2, type: 'tween', ease: 'easeOut' } },
}

const useStyles = makeStyles(() => ({
  button: {
    margin: '30px',
    width:'30vw',
    alignSelf: 'center'
  },
}))

const RecipeView = ({ data, onExitClick }) => {
  const classes = useStyles()

  return (
    <>
      {data && (
        <Box style={{ display: 'flex', flexDirection: 'column' }} initial="hidden" animate="visible" variants={variants} component={motion.div}>
          <RecipeViewTopInfo Title={data.Title} Description={data.Description} ImageUrl={data.ImageUrl} />
          <RecipeViewIngredients Ingredients={data.IngredientList} />
          <RecipeViewInstructions Instructions={data.Instructions} />
          <Button className={classes.button} variant="contained" onClick={onExitClick} color="primary">
            Go Back
          </Button>
        </Box>
      )}
    </>
  )
}

export default RecipeView

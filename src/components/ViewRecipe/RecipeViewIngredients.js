import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  mainbox: {
    width: '60%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  listbox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    width: '40%',
    margin: '10px',
  },
}))

const RecipeViewIngredients = ({ Ingredients }) => {
  const classes = useStyles()

  return (
    <Box className={classes.mainbox}>
      {Ingredients &&
        Ingredients.map((ingredient) => {
          return (
            <Box className={classes.listbox}>
              <Typography variant="p" align="left" style={{ marginLeft: '20px' }}>
                {ingredient}
              </Typography>{' '}
            </Box>
          )
        })}
    </Box>
  )
}

export default RecipeViewIngredients

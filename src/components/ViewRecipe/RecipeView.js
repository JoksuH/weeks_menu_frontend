import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import RecipeViewTopInfo from './RecipeViewTopInfo'
import RecipeViewIngredients from './RecipeViewIngredients'
import RecipeViewInstructions from './RecipeViewInstructions'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '30%',
    margin: 'auto',
    marginTop: '5vh',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  button: {
    width: '40%',
    margin: '10px',
  },
}))

const RecipeView = ({ data, onSelect }) => {
  const classes = useStyles()

  const handleButtonClick = () => {
    onSelect(data)
  }

  return (
    <>
      {data && (
        <>
          <RecipeViewTopInfo Title={data.Title} Description={data.Description} ImageUrl={data.ImageUrl} />
          <RecipeViewIngredients Ingredients={data.IngredientList} />
          <RecipeViewInstructions Instructions={data.Instructions} />
        </>
      )}
    </>
  )
}

export default RecipeView

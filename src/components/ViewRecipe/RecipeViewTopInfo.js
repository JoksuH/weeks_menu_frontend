import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  mainbox: {
    width: '80%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightbox: {
    width: '80%',
    margin: 'auto',
    marginTop: '5vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  media: {
    height: '15vh',
    marginTop: '5vh'
  },
  button: {
    width: '40%',
    margin: '10px',
  },
}))

const RecipeViewTopInfo = ({ Title, Description, ImageUrl }) => {
  const classes = useStyles()

  return (
    <Box className={classes.mainbox}>
      <img src={ImageUrl} alt={Title} className={classes.media} />
      <Box className={classes.rightbox}>
        <Typography variant="h3">{Title}</Typography>
        <Typography>{Description}</Typography>
      </Box>
    </Box>
  )
}

export default RecipeViewTopInfo

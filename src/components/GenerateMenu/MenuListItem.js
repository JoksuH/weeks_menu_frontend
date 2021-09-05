import LoopIcon from '@material-ui/icons/Loop'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { motion } from 'framer-motion'

const listItem = {
  hidden: { opacity: 0, x: -50 },
  show: (index) => ({ opacity: 1, x: 0, transition: { duration: 0.3, delay: index * 0.2 } }),
}

const useStyles = makeStyles((theme) => ({
  mainbox: {
    width: '80%',
    margin: 'auto',
    marginTop: '1vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftbox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
  },
  rightbox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'right',
  },
  image: {
    height: '15vh',
    marginRight: '2vw',
  },
  icon: {
    height: '40%',
    margin: 'auto',
    cursor: 'pointer',
  },
}))

const MenuListItem = ({ Recipe, index, onreSelection, onRecipeSelect }) => {
  const classes = useStyles()

  const handleReSelection = () => {
    onreSelection(index)
  }

  const handleRecipeSelection = () => {
    onRecipeSelect(index)
  }

  return (
    <Box className={classes.mainbox} initial="hidden" animate="show" variants={listItem} custom={index} component={motion.div}>
      <Box className={classes.leftbox}>
        <img src={Recipe.ImageUrl} alt={Recipe.Title} className={classes.image} />
        <Typography variant="h4" style={{ margin: 'auto' }}>
          {Recipe.Title}
        </Typography>
      </Box>
      <Box className={classes.rightbox}>
        <LoopIcon className={classes.icon} color="secondary" onClick={handleReSelection} fontSize="large" />
        <Button className={classes.icon} style={{ marginLeft: '20px' }} variant="contained" color="primary" onClick={handleRecipeSelection}>
          Choose a Recipe
        </Button>
      </Box>
    </Box>
  )
}

export default MenuListItem

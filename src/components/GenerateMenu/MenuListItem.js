import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
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
  button: {
    height: '40%',
    margin: 'auto',
  },
}))

const MenuListItem = ({ Recipe, index, onreSelection }) => {
  const classes = useStyles()

  const handleReSelection = () => {
    onreSelection(index)
  }

  return (
    <Box className={classes.mainbox} initial="hidden" animate="visible" variants={variants} component={motion.div}>
      <Box className={classes.leftbox}>
        <img src={Recipe.ImageUrl} alt={Recipe.Title} className={classes.image} />
        <Typography variant="h4" style={{ margin: 'auto' }}>
          {Recipe.Title}
        </Typography>
      </Box>
      <Box className={classes.rightbox}>
        <Button className={classes.button} variant="contained" onClick={handleReSelection}>
          Choose Another
        </Button>
      </Box>
    </Box>
  )
}

export default MenuListItem

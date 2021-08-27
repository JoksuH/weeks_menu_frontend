import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { makeStyles } from '@material-ui/core/styles'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: {duration: 0.2, type: 'tween', ease: "easeOut"} }
}


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
    margin: '30px',
  },
}))

const MenuListItem = ({ menu, onMenuSelect }) => {
  const classes = useStyles()

 const onSelection = () => {
    onMenuSelect(menu)
 }
  return (
    <>
      {menu && (
        <Box style={{display: 'flex', flexDirection: 'column'}} initial="hidden" animate="visible" variants={variants} component={motion.div}>
          <Typography>Menu Created {menu.dateAdded.split('T')[0]}</Typography>
          <Typography variant="h5">Contains the following recipes:</Typography>
            {menu.Recipes.map(recipe => {return (<Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}} key={recipe._id}><ArrowRightIcon /><Typography>{recipe.Title}</Typography></Box>)})}
          <Button className={classes.button} variant="contained" onClick={onSelection}>Create a Shopping List</Button>
        </Box>
      )}
    </>
  )
}

export default MenuListItem

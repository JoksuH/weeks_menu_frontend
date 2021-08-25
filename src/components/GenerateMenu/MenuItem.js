import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button  from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  mainbox: {
    width: '80%',
    margin: 'auto',
    marginTop: '5vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textfield: {
    marginRight: '5vh',
  },

  button: {
    width: '40%',
    margin: '10px',
  },
}))

const MenuItem = () => {
  const classes = useStyles()

  return (
  <>
      <Typography variant="h3">For how many days would you like to generate a menu?</Typography>
    <Box className={classes.mainbox}>
        <TextField className={classes.textfield} defaultValue="3" inputProps={{ style: { textAlign: 'center', fontSize: '24px' }}} type="number"/>
        <Button className={classes.button} variant="contained" color="primary">Generate</Button>
      </Box>
  </>
  )
}

export default MenuItem

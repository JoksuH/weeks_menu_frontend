import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { makeStyles } from '@material-ui/core/styles'
import { useState, useEffect } from 'react'

const useStyles = makeStyles((theme) => ({
  mainbox: {
    width: '60%',
    margin: 'auto',
    marginTop: '5vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  listbox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    marginTop: 10,
  },
  button: {
    width: '40%',
    margin: '10px',
  },
}))

const RecipeViewInstructions = ({ Instructions }) => {
  const classes = useStyles()
  const [InstrutionArr, SetInstructionArr] = useState([])

  useEffect(() => {
    //Split instruction string into steps
    const splitInstuctions = Instructions.split('\n')
    SetInstructionArr(splitInstuctions)
  }, [Instructions])

  return (
    <Box className={classes.mainbox}>
      {InstrutionArr &&
        InstrutionArr.map((instruction) => {
          return (
            <Box className={classes.listbox}>
              <ArrowForwardIosIcon />
              <Typography variant="p" align="left" style={{ marginLeft: '20px' }}>
                {instruction}
              </Typography>{' '}
            </Box>
          )
        })}
    </Box>
  )
}

export default RecipeViewInstructions

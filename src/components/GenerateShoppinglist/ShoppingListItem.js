import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const listItem = {
    hidden: { opacity: 0, x: -50 },
    show: (index) => ({ opacity: 1, x: 0, transition: { duration: 0.2, delay: index * 0.05 } }),
}
  
const useStyles = makeStyles(() => ({
  listbox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
}))

const ShoppingListItem = ({ amount, item, index, onChecking }) => {
  const classes = useStyles()
  const smallScreen = useMediaQuery('(max-width:600px)')


  const [Checked,SetChecked] = useState(false)
  const [Amount,SetAmount] = useState(amount)


  useEffect(() => {
    //Removes the units measurement unit from the list to make it look nicer. 3 units red pepper => 3 red peppers
    if (amount.includes("units")) {
      SetAmount(amount.replace('units',''))
    }
  }, [amount])

  const onChecked = () => {
    SetChecked(!Checked)
    onChecking(amount, item)
  }
  return (
    <>
      {item && (
        <Box className={classes.listbox} initial="hidden" animate="show" variants={listItem} component={motion.div} custom={index} key={index + Amount}>
      <Checkbox
        checked={Checked}
        color="primary"
        onChange={onChecked}
      />          <Typography align="left" style={{ marginLeft: '20px', textDecoration: Checked ? "line-through" : 'none', fontSize:'16px'}} variant={smallScreen ? 'caption' : 'overline'}>
            {Amount + ' ' + item}
          </Typography>{' '}
        </Box>
      )}
    </>
  )
}

export default ShoppingListItem

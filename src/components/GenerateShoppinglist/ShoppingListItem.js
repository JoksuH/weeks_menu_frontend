import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'
import { motion } from 'framer-motion'

const listItem = {
    hidden: { opacity: 0, x: -50 },
    show: (index) => ({ opacity: 1, x: 0, transition: { duration: 0.2, delay: index * 0.05 } }),
}
  
const useStyles = makeStyles((theme) => ({
  root: {
    width: '30%',
    margin: 'auto',
    marginTop: '5vh',
  },
  listbox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    marginTop: 10,
  },
  button: {
    margin: '30px',
  },
}))

const ShoppingListItem = ({ amount, item, index, onChecking }) => {
  const classes = useStyles()

  const [Checked,SetChecked] = useState(false)


  const onChecked = () => {
    SetChecked(!Checked)
    onChecking(amount, item)
  }
  return (
    <>
      {item && (
        <Box className={classes.listbox} initial="hidden" animate="show" variants={listItem} component={motion.div} custom={index} key={index}>
      <Checkbox
        checked={Checked}
        color="primary"
        onChange={onChecked}
      />          <Typography align="left" style={{ marginLeft: '20px', textDecoration: Checked ? "line-through" : 'none', fontSize:'16px'}} variant={'overline'}>
            {amount + ' ' + item}
          </Typography>{' '}
        </Box>
      )}
    </>
  )
}

export default ShoppingListItem

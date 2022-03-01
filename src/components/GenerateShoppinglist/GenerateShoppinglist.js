import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import MenuListItem from './MenuListItem'
import ShoppingListView from './ShoppingListView'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
}


const useStyles = makeStyles((theme) => ({
  grid: {
    width: '80%',
    margin: 'auto',
    marginTop: '5vh',
  },
}))

const GenerateShoppinglist = () => {
  const classes = useStyles()
  const [Menus, SetMenus] = useState([])
  const [SelectedMenu, SetSelectedMenu] = useState({})

  useEffect(() => {
    fetch('https://weeks-menu.herokuapp.com/menus/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json().then((json) => SetMenus(json)))
  }, [])

  const onMenuSelect = (menu) => {
    SetSelectedMenu(menu)
  }

  const onMenuDelete = (menu_id) => {
    const OtherMenus = Menus.filter(menu => menu._id !== menu_id)
    SetMenus(OtherMenus)
    fetch(`https://weeks-menu.herokuapp.com/menus/${menu_id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {if (response.status === 200) alert('Menu Deleted')})

  }

  return (
    <Grid container className={classes.grid} direction="row" alignContent="center" spacing={5} initial="hidden" animate="visible" variants={variants} component={motion.div}>
      {Menus.length !== 0 &&
        Object.keys(SelectedMenu).length === 0 &&
        Menus.map((menu, index) => {
          return (
            <Grid item key={index} xs={12}>
              <MenuListItem menu={menu} onMenuSelect={onMenuSelect} onMenuDelete={onMenuDelete}/>
            </Grid>
          )
        })}
        {Object.keys(SelectedMenu).length > 0 && <ShoppingListView menuRecipes={SelectedMenu.Recipes}/>}
    </Grid>
  )
}

export default GenerateShoppinglist

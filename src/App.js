import './App.css'
import AddRecipe from './components/AddRecipe/AddRecipe'
import GenerateMenu from './components/GenerateMenu/GenerateMenu'
import ViewRecipes from './components/ViewRecipe/ViewRecipes'
import Navbar from './components/NavBar/NavBar'
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/viewrecipes">
          <ViewRecipes />
        </Route>
        <Route path="/addrecipe">
          <AddRecipe />
        </Route>
        <Route path="/">
          <GenerateMenu />
        </Route>
      </Switch>
    </div>
  )
}

export default App

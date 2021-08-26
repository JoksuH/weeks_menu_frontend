import Grid from '@material-ui/core/Grid'
import { styled } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const MainGrid = styled(Grid)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    background: 'rgb(19, 151, 213)',
    marginBottom: 20,
})

const StyledLink = styled(Link)({
    marginRight: '35px',
    marginTop: 10,
    fontSize:' 22px',
    color: 'white',
    textDecoration: 'none',
    "&:hover": {
          Color: 'black',
          cursor: 'pointer',
          textDecoration: "underline"
        }
       
})  

const Image = styled('img')({
    width: '15%',
})

function Navbar() {

    return (
        <MainGrid>
            <StyledLink to="/">Generate Menu</StyledLink>
            <StyledLink to="/viewrecipes">View Recipes</StyledLink>
            <StyledLink to="/addrecipe">Add Recipe</StyledLink>
            <StyledLink to="/shoppinglist">Get Shopping List</StyledLink>


        </MainGrid>
    )
}

export default Navbar
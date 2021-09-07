import Grid from '@material-ui/core/Grid'
import { styled } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Link } from 'react-router-dom'

const MainGrid = styled(Grid)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    background: '#CC9966',
    marginBottom: 20,
})

const StyledLink = styled(Link)({
    marginRight: '35px',
    marginTop: 10,
    color: 'white',
    textDecoration: 'none',
    "&:hover": {
          Color: 'black',
          cursor: 'pointer',
          textDecoration: "underline"
        }
       
})  

const Navbar = () => {

    const smallScreen = useMediaQuery('(max-width:600px)')
    return (
        <MainGrid>
            <StyledLink to="/" style={{fontSize: smallScreen ? '14px' : '22px'}}>Generate Menu</StyledLink>
            <StyledLink to="/viewrecipes" style={{fontSize: smallScreen ? '14px' : '22px'}}>View Recipes</StyledLink>
            <StyledLink to="/addrecipe" style={{fontSize: smallScreen ? '14px' : '22px'}}>Add Recipe</StyledLink>
            <StyledLink to="/shoppinglist" style={{fontSize: smallScreen ? '14px' : '22px'}}>Get Shopping List</StyledLink>
        </MainGrid>
    )
}

export default Navbar
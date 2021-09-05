import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    marginTop: '5vh',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  openbutton: {
    width: '30%',
    margin: '10px',
  },
  deletebutton: {
    width: '20%',
    margin: '10px',
    marginLeft: '30px',
  },
}))

const RecipeCard = ({ data, onSelect, onDelete }) => {
  const classes = useStyles()

  const handleOpenButtonClick = () => {
    onSelect(data)
  }

  const handleDeleteButtonClick = () => {
    onDelete(data._id)
  }

  return (
    <>
      {data && (
        <Card className={classes.root} key={data._id}>
          <CardHeader title={data.Title} titleTypographyProps={{ variant: 'h4' }} />
          <CardMedia className={classes.media} image={data.ImageUrl} title={data.Title} />
          <CardContent>
            <Typography noWrap variant="body2" color="textSecondary" component="p">
              {data.Description}
            </Typography>
          </CardContent>
          {onDelete ? 
          <>
          <Button className={classes.openbutton} variant="contained" color="primary" onClick={handleOpenButtonClick}>
            Open
          </Button>
          <Button className={classes.deletebutton} variant="contained" color="secondary" onClick={handleDeleteButtonClick} startIcon={<DeleteForeverIcon />}>
            Delete
          </Button>
          </>
          : 
          <Button className={classes.openbutton} variant="contained" color="primary" onClick={handleOpenButtonClick}>
            Select
          </Button>
          }
        </Card>
      )}
    </>
  )
}

export default RecipeCard

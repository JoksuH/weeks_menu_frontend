import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    marginTop: '5vh',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  button: {
    width: '40%',
    margin: '10px',
  },
}))

const RecipeCard = ({ data, onSelect }) => {
  const classes = useStyles()

  const handleButtonClick = () => {
    onSelect(data)
  }

  return (
    <>
      {data && (
        <Card className={classes.root} key={data._id}>
          <CardHeader
            title={data.Title}
            titleTypographyProps={{ variant: 'h4' }}
          />
          <CardMedia className={classes.media} image={data.ImageUrl} title={data.Title} />
          <CardContent>
            <Typography noWrap  variant="body2" color="textSecondary" component="p">
              {data.Description}
            </Typography>
          </CardContent>
          <Button className={classes.button} variant="contained" color="primary" onClick={handleButtonClick}>
            Open
          </Button>
        </Card>
      )}
    </>
  )
}

export default RecipeCard

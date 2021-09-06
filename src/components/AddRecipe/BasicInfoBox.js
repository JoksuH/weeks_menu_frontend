import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '80%',
    margin: 'auto',
  },
  formcontrol: {
    width: '100%',
  },
}))

function BasicInfoBox({handleTitleChange, handleDescriptionChange, handleImageURLChange}) {

  const classes = useStyles()


  return (
    <Grid container className={classes.grid} direction="column" alignContent="center" spacing={3}>
      <Grid item>
        <InputLabel id="title-inputlabel" >Title</InputLabel>

        <TextField onInput={handleTitleChange} inputProps={{ style: { textAlign: 'center', width:'40vw' } }}></TextField>
      </Grid>
      <Grid item>
        <InputLabel id="description-inputlabel">Description</InputLabel>

        <TextField multiline rows={4} variant="outlined" onInput={handleDescriptionChange} inputProps={{ style: { textAlign: 'center', width:'20vw' } }}></TextField>
      </Grid>
      <Grid item>
        <InputLabel id="image-url-inputlabel">Image URL</InputLabel>

        <TextField onInput={handleImageURLChange} inputProps={{ style: { textAlign: 'center', width:'20vw' } }}></TextField>
      </Grid>
    </Grid>
  )
}

export default BasicInfoBox

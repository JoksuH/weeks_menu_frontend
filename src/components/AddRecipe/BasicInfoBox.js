import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '40%',
    margin: 'auto',
  },
  formcontrol: {
    width: '100%',
  },
}))

function BasicInfoBox() {
  const [Title, SetTitle] = useState('')
  const [Description, SetDescription] = useState('')
  const [ImageURL, SetImageURL] = useState('')

  const classes = useStyles()

  const handleTitleChange = (event) => {
    SetTitle(event.target.value)
  }
  const handleDescriptionChange = (event) => {
    SetDescription(event.target.value)
  }
  const handleImageURLChange = (event) => {
    SetImageURL(event.target.value)
  }

  return (
    <Grid container className={classes.grid} direction="column" alignContent="center" spacing={3}>
      <Grid item>
        <InputLabel id="unit-selection-inputlabel">Title</InputLabel>

        <TextField onChange={handleTitleChange}></TextField>
      </Grid>
      <Grid item>
        <InputLabel id="unit-selection-inputlabel">Description</InputLabel>

        <TextField multiline rows={4} variant="outlined" onChange={handleDescriptionChange}></TextField>
      </Grid>
      <Grid item>
        <InputLabel id="unit-selection-inputlabel">Image URL</InputLabel>

        <TextField onChange={handleImageURLChange}></TextField>
      </Grid>
    </Grid>
  )
}

export default BasicInfoBox

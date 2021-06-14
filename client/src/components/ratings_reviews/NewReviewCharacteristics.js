import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';




const useStyles = makeStyles(theme => ({
  radioArray: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: '650px',
    // backgroundColor: 'yellow',
  },
  labels: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  topLabel: {
    display: 'flex',
    justifyContent: 'center',
  }
}));


export default function Characteristics() {
  const classes = useStyles();
  const [size, setSize] = React.useState('');
  const sizeMeanings = ['', 'A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'];
  const [width, setWidth] = React.useState('');
  const widthMeanings = ['', 'Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'];
  const [comfort, setComfort] = React.useState('');
  const comfortMeanings = ['', 'Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'];
  const [quality, setQuality] = React.useState('');
  const qualityMeanings = ['', 'Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'];
  const [length, setLength] = React.useState('');
  const lengthMeanings = ['', 'Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'];
  const [fit, setFit] = React.useState('');
  const fitMeanings = ['', 'Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'];
  const options = ['', 1, 2, 3, 4, 5, 6];
  const handleRadioGroupChange = (event, selection) => {
    // alert(`clicked ${event.target.value}`);,
    if (options[1] === selection) {
      setSize(event.target.value);
    } else if (options[2] === selection) {
      setWidth(event.target.value);
    } else if (options[3] === selection) {
      setComfort(event.target.value);
    } else if (options[4] === selection) {
      setQuality(event.target.value);
    } else if (options[5] === selection) {
      setLength(event.target.value);
    } else if (options[6] === selection) {
      setFit(event.target.value);
    }
    // "A size too small", "½ a size too small", "Perfect", "½ a size too big", "A size too wide"
  };

  return (
    <Grid container item >
      <Grid container item spacing={3} direction="column">

        <Grid item>
          <FormControl component="fieldset">
            <Typography className={classes.topLabel}>{sizeMeanings[Number(size)]}</Typography>
            <FormLabel component="legend">Size </FormLabel>
            <RadioGroup className={classes.radioArray} row aria-label="Size" name="Size" value={size} onChange={(event) => {
              handleRadioGroupChange(event, 1);
            }}>
              <FormControlLabel value={'1'} control={<Radio />} />
              <FormControlLabel value={'2'} control={<Radio />} />
              <FormControlLabel value={'3'} control={<Radio />} />
              <FormControlLabel value={'4'} control={<Radio />} />
              <FormControlLabel value={'5'} control={<Radio />} />
            </RadioGroup>
          </FormControl>
          <Grid container item direction="row" className={classes.labels} >
            <Grid item><Typography>A size too small</Typography></Grid>
            <Grid item><Typography>A size too wide</Typography></Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid item>
          <FormControl component="fieldset">
            <Typography className={classes.topLabel} >{widthMeanings[Number(width)]}</Typography>
            <FormLabel component="legend">Width</FormLabel>
            <RadioGroup
              className={classes.radioArray}
              row aria-label="Width" name="Width"
              value={width}
              onChange={(event) => {
                handleRadioGroupChange(event, 2);
              }}>
              <FormControlLabel value={'1'} control={<Radio />} />
              <FormControlLabel value={'2'} control={<Radio />} />
              <FormControlLabel value={'3'} control={<Radio />} />
              <FormControlLabel value={'4'} control={<Radio />} />
              <FormControlLabel value={'5'} control={<Radio />} />
            </RadioGroup>
          </FormControl>
          <Grid container item direction="row" className={classes.labels} >
            <Grid item><Typography>Too narrow</Typography></Grid>
            <Grid item><Typography>Too wide</Typography></Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid item>
          <FormControl component="fieldset">
            <Typography className={classes.topLabel} >{comfortMeanings[Number(comfort)]}</Typography>
            <FormLabel component="legend">Comfort</FormLabel>
            <RadioGroup
              className={classes.radioArray}
              row aria-label="Comfort"
              name="Comfort"
              value={comfort}
              onChange={(event) => {
                handleRadioGroupChange(event, 3);
              }}>
              <FormControlLabel value={'1'} control={<Radio />} />
              <FormControlLabel value={'2'} control={<Radio />} />
              <FormControlLabel value={'3'} control={<Radio />} />
              <FormControlLabel value={'4'} control={<Radio />} />
              <FormControlLabel value={'5'} control={<Radio />} />
            </RadioGroup>
          </FormControl>
          <Grid container item direction="row" className={classes.labels} >
            <Grid item><Typography>Uncomfortable</Typography></Grid>
            <Grid item><Typography>Perfect</Typography></Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid item>
          <FormControl component="fieldset">
            <Typography className={classes.topLabel} >{qualityMeanings[Number(quality)]}</Typography>
            <FormLabel component="legend">Quality</FormLabel>
            <RadioGroup
              className={classes.radioArray}
              row aria-label="Quality"
              name="Quality"
              value={quality}
              onChange={(event) => {
                handleRadioGroupChange(event, 4);
              }}>
              <FormControlLabel value={'1'} control={<Radio />} />
              <FormControlLabel value={'2'} control={<Radio />} />
              <FormControlLabel value={'3'} control={<Radio />} />
              <FormControlLabel value={'4'} control={<Radio />} />
              <FormControlLabel value={'5'} control={<Radio />} />
            </RadioGroup>
          </FormControl>
          <Grid container item direction="row" className={classes.labels} >
            <Grid item><Typography>Poor</Typography></Grid>
            <Grid item><Typography>Perfect</Typography></Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid item>
          <FormControl component="fieldset">
            <Typography className={classes.topLabel} >{lengthMeanings[Number(length)]}</Typography>
            <FormLabel component="legend">Length</FormLabel>
            <RadioGroup
              className={classes.radioArray}
              row aria-label="Length"
              name="Length"
              value={length}
              onChange={(event) => {
                handleRadioGroupChange(event, 5);
              }}>
              <FormControlLabel value={'1'} control={<Radio />} />
              <FormControlLabel value={'2'} control={<Radio />} />
              <FormControlLabel value={'3'} control={<Radio />} />
              <FormControlLabel value={'4'} control={<Radio />} />
              <FormControlLabel value={'5'} control={<Radio />} />
            </RadioGroup>
          </FormControl>
          <Grid container item direction="row" className={classes.labels} >
            <Grid item><Typography>Runs Short</Typography></Grid>
            <Grid item><Typography>Runs long</Typography></Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid item>
          <FormControl component="fieldset">
            <Typography className={classes.topLabel} >{fitMeanings[Number(fit)]}</Typography>
            <FormLabel component="legend">Fit</FormLabel>
            <RadioGroup
              className={classes.radioArray}
              row aria-label="Fit"
              name="Fit"
              value={fit}
              onChange={(event) => {
                handleRadioGroupChange(event, 6);
              }}>
              <FormControlLabel value={'1'} control={<Radio />} />
              <FormControlLabel value={'2'} control={<Radio />} />
              <FormControlLabel value={'3'} control={<Radio />} />
              <FormControlLabel value={'4'} control={<Radio />} />
              <FormControlLabel value={'5'} control={<Radio />} />
            </RadioGroup>
          </FormControl>
          <Grid container item direction="row" className={classes.labels} >
            <Grid item><Typography>Runs tight</Typography></Grid>
            <Grid item><Typography>Runs long</Typography></Grid>
          </Grid>
        </Grid>
        <Divider />
      </Grid>
    </Grid >
  );
}
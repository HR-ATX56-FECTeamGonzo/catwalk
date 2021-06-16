import React, { useState } from 'react';
import TextFields from './NewReviewTextFields.js';


import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';






const Characteristics = (props) => {
  // console.log(props.conditionalStuff);
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

  // do you reccomend this product? -- RADIO ARRAY
  // const [reccomend, setReccomend] = useState(null);
  // const handleRadioChange = (event) => {
  //   setReccomend(event.target.value);
  // };

  const classes = useStyles();
  // const [size, setSize] = React.useState('');
  const sizeMeanings = ['', 'A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'];
  // const [width, setWidth] = React.useState('');
  const widthMeanings = ['', 'Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'];
  // const [comfort, setComfort] = React.useState('');
  const comfortMeanings = ['', 'Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'];
  // const [quality, setQuality] = React.useState('');
  const qualityMeanings = ['', 'Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'];
  // const [length, setLength] = React.useState('');
  const lengthMeanings = ['', 'Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'];
  // const [fit, setFit] = React.useState('');
  const fitMeanings = ['', 'Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'];
  const options = ['', 1, 2, 3, 4, 5, 6];
  const handleRadioGroupChange = (event, selection) => {
    // alert(`clicked ${event.target.value}`);,
    if (options[1] === selection) {
      props.setSize(event.target.value);
    } else if (options[2] === selection) {
      props.setWidth(event.target.value);
    } else if (options[3] === selection) {
      props.setComfort(event.target.value);
    } else if (options[4] === selection) {
      props.setQuality(event.target.value);
    } else if (options[5] === selection) {
      props.setLength(event.target.value);
    } else if (options[6] === selection) {
      props.setFit(event.target.value);
    }
  };

  return (
    <Grid container item >
      <Grid container item spacing={3} direction="column">
        {/* <Grid item >
          <Grid item>
            <FormControl component="fieldset">
              <FormLabel component="legend">Do you recommend this Product?</FormLabel>
              <RadioGroup row aria-label="recommend" name="recommend" value={reccomend} onChange={handleRadioChange}>
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="2" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Divider /> */}

        {props.conditionalStuff.Size
          ? <Grid item>
            <FormControl component="fieldset">
              <Typography className={classes.topLabel}>{sizeMeanings[Number(props.size)]}</Typography>
              <FormLabel component="legend">Size </FormLabel>
              <RadioGroup className={classes.radioArray} row aria-label="Size" name="Size" value={props.size} onChange={(event) => {
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
          : null}
        <Divider />
        {props.conditionalStuff.Width
          ? <Grid item>
            <FormControl component="fieldset">
              <Typography className={classes.topLabel} >{widthMeanings[Number(props.width)]}</Typography>
              <FormLabel component="legend">Width</FormLabel>
              <RadioGroup
                className={classes.radioArray}
                row aria-label="Width" name="Width"
                value={props.width}
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
          : null}
        <Divider />
        {props.conditionalStuff.Comfort
          ? <Grid item>
            <FormControl component="fieldset">
              <Typography className={classes.topLabel} >{comfortMeanings[Number(props.comfort)]}</Typography>
              <FormLabel component="legend">Comfort</FormLabel>
              <RadioGroup
                className={classes.radioArray}
                row aria-label="Comfort"
                name="Comfort"
                value={props.comfort}
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
          : null}
        <Divider />
        {props.conditionalStuff.Quality
          ? <Grid item>
            <FormControl component="fieldset">
              <Typography className={classes.topLabel} >{qualityMeanings[Number(props.quality)]}</Typography>
              <FormLabel component="legend">Quality</FormLabel>
              <RadioGroup
                className={classes.radioArray}
                row aria-label="Quality"
                name="Quality"
                value={props.quality}
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
          : null}
        <Divider />
        {props.conditionalStuff.Length
          ? <Grid item>
            <FormControl component="fieldset">
              <Typography className={classes.topLabel} >{lengthMeanings[Number(props.length)]}</Typography>
              <FormLabel component="legend">Length</FormLabel>
              <RadioGroup
                className={classes.radioArray}
                row aria-label="Length"
                name="Length"
                value={props.length}
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
          : null}
        <Divider />
        {props.conditionalStuff.Fit
          ? <Grid item>
            <FormControl component="fieldset">
              <Typography className={classes.topLabel} >{fitMeanings[Number(props.fit)]}</Typography>
              <FormLabel component="legend">Fit</FormLabel>
              <RadioGroup
                className={classes.radioArray}
                row aria-label="Fit"
                name="Fit"
                value={props.fit}
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
          : null}
        <Divider />
      </Grid>
      {/* <Grid item>
        <TextFields reccomend={reccomend} />
      </Grid> */}
    </Grid >
  );
};
export default Characteristics;
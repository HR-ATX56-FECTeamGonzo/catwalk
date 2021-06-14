import React from 'react';
// import { useStyles } from './SideBar.js';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Sliders = (props) => {
  const SuperSlider = withStyles({
    root: {
      '&.Mui-disabled': {
        color: 'rgb(136 118 118)',
        height: 8,
      },
    },
    thumb: {
      '&.Mui-disabled': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
          boxShadow: 'inherit',
        },
      },
    },
    passive: { '&.Mui-disabled': { passive: 'true' } },
    mark: {
      height: 8,
      color: 'white',
      width: 8,
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);
  const useStyles = makeStyles((theme) => ({
    slider: {
      width: 275,
      touchAction: 'none',
      paddingBottom: '4px',
    },
    labels: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingLeft: '10px',
      paddingBottom: '15px',
    },
  }));

  const sliderStyles = useStyles();
  return (
    <Grid container direction="column">
      {props.size !== 0
        ?
        <Grid container item >
          <Grid item >
            <Typography variant="subtitle2">SIZE</Typography>
            <SuperSlider
              className={sliderStyles.slider}
              disabled
              track={false}
              value={props.size}
              step={2}
              marks
              min={0}
              max={6}
            />
            <Grid container item direction="row" className={sliderStyles.labels} >
              <Grid item><Typography variant="caption">A size too small</Typography></Grid>
              <Grid item><Typography variant="caption">A size too wide</Typography></Grid>
            </Grid>
          </Grid>
        </Grid>
        : null}
      {props.width !== 0
        ?
        <Grid container item >
          <Grid item >
            <Typography variant="subtitle2">WIDTH</Typography>
            <SuperSlider
              className={sliderStyles.slider}
              disabled
              track={false}
              value={props.width}
              step={2}
              marks
              min={0}
              max={6}
            />
            <Grid container item direction="row" className={sliderStyles.labels} >
              <Grid item><Typography variant="caption">Too narrow</Typography></Grid>
              <Grid item><Typography variant="caption">Too wide</Typography></Grid>
            </Grid>
          </Grid>
        </Grid>
        : null}
      {props.comfort !== 0
        ?
        <Grid container item >
          <Grid item >
            <Typography variant="subtitle2">COMFORT</Typography>
            <SuperSlider
              className={sliderStyles.slider}
              disabled
              track={false}
              value={props.comfort}
              step={2}
              marks
              min={0}
              max={6}
            />
            <Grid container item direction="row" className={sliderStyles.labels} >
              <Grid item><Typography variant="caption">Uncomfortable</Typography></Grid>
              <Grid item><Typography variant="caption">Perfect</Typography></Grid>
            </Grid>
          </Grid>
        </Grid>
        : null}
      {props.quality !== 0
        ?
        <Grid container item >
          <Grid item >
            <Typography variant="subtitle2">QUALITY</Typography>
            <SuperSlider
              className={sliderStyles.slider}
              disabled
              track={false}
              value={props.quality}
              step={2}
              marks
              min={0}
              max={6}
            />
            <Grid container item direction="row" className={sliderStyles.labels} >
              <Grid item><Typography variant="caption">Poor</Typography></Grid>
              <Grid item><Typography variant="caption">Perfect</Typography></Grid>
            </Grid>
          </Grid>
        </Grid>
        : null}
      {props.length !== 0
        ?
        <Grid container item >
          <Grid item >
            <Typography variant="subtitle2">LENGTH</Typography>
            <SuperSlider
              className={sliderStyles.slider}
              disabled
              track={false}
              value={props.length}
              step={2}
              marks
              min={0}
              max={6}
            />
            <Grid container item direction="row" className={sliderStyles.labels} >
              <Grid item><Typography variant="caption">Runs short</Typography></Grid>
              <Grid item><Typography variant="caption">Runs long</Typography></Grid>
            </Grid>
          </Grid>
        </Grid>
        : null}
      {props.fit !== 0
        ?
        <Grid container item >
          <Grid item >
            <Typography variant="subtitle2">FIT</Typography>
            <SuperSlider
              className={sliderStyles.slider}
              disabled
              track={false}
              value={props.fit}
              step={2}
              marks
              min={0}
              max={6}
            />
            <Grid container item direction="row" className={sliderStyles.labels} >
              <Grid item><Typography variant="caption">Runs tight</Typography></Grid>
              <Grid item><Typography variant="caption">Runs long</Typography></Grid>
            </Grid>
          </Grid>
        </Grid>
        : null}
    </Grid>
  );
};


export default Sliders;

// props are: (conditionally render)
// size
// width
// comfort
// quality
// length
// value
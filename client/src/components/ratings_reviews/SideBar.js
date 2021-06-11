import React from 'react';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, withStyles } from '@material-ui/core/styles';

// possibly can grab the average star rating from the store

// this component needs to render:
//  - the Average star rating for a clicked item
//  - the percent of reviewers that recommend this product
//  - the breakdown of star ratings 1 -5 star ratings
//  - how the product fits on a scale from too small to too large
//  - how comfortable the product is from poor to perfect
const SideBar = (props) => {
  // console.log('this is props from sidebar:', props.metaData);
  // need to find the average star rating
  const starRating = props.metaData.ratings;
  const oneStar = Number(starRating[1] || 0);
  const twoStar = Number(starRating[2] || 0);
  const threeStar = Number(starRating[3] || 0);
  const fourStar = Number(starRating[4] || 0);
  const fiveStar = Number(starRating[5] || 0);
  const totalStars = (oneStar + twoStar + threeStar + fourStar + fiveStar);
  const averageStarRating = (((oneStar) + (twoStar * 2) + (threeStar * 3) + (fourStar * 4) + (fiveStar * 5)) / totalStars);
  // i need to find the metrics for the fit, comfort etc.
  const characteristics = props.metaData.characteristics;
  // now i need to calculate the percent of reviews that recommend this product
  const recommended = props.metaData.recommended;
  const t = Number(recommended.true);
  const f = Number(recommended.false);
  const percentRecommended = ((t / (t + f)) * 100).toFixed(0);
  // console.log('percent of people recommended', Math.floor(percentRecommended * 100));
  const useStyles = makeStyles((theme) => ({
    progressBarContainer: {
      height: '40px',
      padding: '5px'
    },
    progressBar: {
      minWidth: 200,
      height: '10px',
    },
    rating: {
      backgroundColor: 'white',
    },
    starsBars: {
      backgroundColor: 'white',
    },
    characteristics: {
      backgroundColor: 'white',
    },
    characteristicsContainer: {
      height: '40px',
      padding: '5px'
    },
    slider: {
      minWidth: 200,
    },
  }));
  const classes = useStyles();

  const SuperSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8,
    },
    thumb: {
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
  return (
    <Grid container>
      <Grid container item direction="column" spacing={4}>
        <Grid item>
          <Box className={classes.rating}>
            <Grid container direction="row">
              <Grid item>
                <Typography variant="h1">{averageStarRating.toFixed(1)}</Typography>
              </Grid>
              <Grid item>
                <Rating
                  name="averageStarRating"
                  value={Number(averageStarRating.toFixed(1))} readOnly
                  precision={0.25}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item>
          <Box className={classes.starsBars}>
            <Grid container direction="column">
              <Grid item>{percentRecommended}% of reviews recommend this product</Grid>
              <Grid container item direction="row" alignItems="center" spacing={1} className={classes.progressBarContainer}>
                <Grid item>
                  <p>5 STARS</p>
                </Grid>
                <Grid item>
                  <LinearProgress className={classes.progressBar} variant="determinate" value={(fiveStar / totalStars) * 100} />
                </Grid>
              </Grid>
              <Grid container item direction="row" alignItems="center" spacing={1} className={classes.progressBarContainer}>
                <Grid item>
                  <p>4 STARS</p>
                </Grid>
                <Grid item>
                  <LinearProgress className={classes.progressBar} variant="determinate" value={(fourStar / totalStars) * 100} />
                </Grid>
              </Grid>
              <Grid container item direction="row" alignItems="center" spacing={1} className={classes.progressBarContainer}>
                <Grid item>
                  <p>3 STARS</p>
                </Grid>
                <Grid item>
                  <LinearProgress className={classes.progressBar} variant="determinate" value={(threeStar / totalStars) * 100} />
                </Grid>
              </Grid>
              <Grid container item direction="row" alignItems="center" spacing={1} className={classes.progressBarContainer}>
                <Grid item>
                  <p>2 STARS</p>
                </Grid>
                <Grid item>
                  <LinearProgress className={classes.progressBar} variant="determinate" value={(twoStar / totalStars) * 100} />
                </Grid>
              </Grid>
              <Grid container item direction="row" alignItems="center" spacing={1} className={classes.progressBarContainer}>
                <Grid item>
                  <p>1 STARS</p>
                </Grid>
                <Grid item>
                  <LinearProgress className={classes.progressBar} variant="determinate" value={(oneStar / totalStars) * 100} />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item>
          <Box className={classes.characteristics}>
            <Grid container direction="column">
              <Grid container item direction="row" alignItems="center" spacing={1}>
                <Grid item>
                  <p>SIZE</p>
                </Grid>
                <Grid item >
                  {/* <SuperSlider
                    className={classes.slider}
                    disabled
                    passive
                    track={false}
                    defaultValue={characteristics.Fit.value}
                    step={2}
                    marks
                    min={0}
                    max={6}
                  /> */}
                  {characteristics.Fit.value}
                </Grid>
              </Grid>
              <Grid container item direction="row" alignItems="center" spacing={1}>
                <Grid item>
                  <p>COMFORT</p>
                </Grid>
                <Grid item>
                  {characteristics.Comfort.value}
                </Grid>
              </Grid>
              <Grid container item direction="row" alignItems="center" spacing={1}>
                <Grid item>
                  <p>QUALITY</p>
                </Grid>
                <Grid item>
                  {characteristics.Quality.value}
                </Grid>
              </Grid>
              <Grid container item direction="row" alignItems="center" spacing={1}>
                <Grid item>
                  <p>LENGTH</p>
                </Grid>
                <Grid item>
                  {characteristics.Length.value}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default SideBar;

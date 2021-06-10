import React from 'react';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

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
  const averageStarRating = (((oneStar) + (twoStar * 2) + (threeStar * 3) + (fourStar * 4) + (fiveStar * 5)) / (oneStar + twoStar + threeStar + fourStar + fiveStar));
  // i need to find the metrics for the fit, comfort etc.
  const characteristics = props.metaData.characteristics;
  // now i need to calculate the percent of reviews that recommend this product
  const recommended = props.metaData.recommended;
  const t = Number(recommended.true);
  const f = Number(recommended.false);
  const percentRecommended = ((t / (t + f)) * 100).toFixed(1);
  // console.log('percent of people recommended', Math.floor(percentRecommended * 100));
  const useStyles = makeStyles((theme) => ({
    progressBar: {
      flexGrow: 1,
      height: '15px'
    },
  }));
  const classes = useStyles();
  return (

    <Grid container spacing={3}>
      <Grid item><h4>RATINGS & REVIEWS</h4></Grid>
      <Grid container item>
        <Grid item>
          <h1>{averageStarRating.toFixed(1)}</h1>
        </Grid>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend"></Typography>
          <Rating
            name="averageStarRating"
            value={Number(averageStarRating.toFixed(1))} readOnly
            precision={0.25}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
          />
        </Box>
      </Grid>
      <Grid item>{percentRecommended}% of reviews recommend this product</Grid>
      <Grid container item direction="column">
        <Grid container item direction="row" alignItems="center">
          5 STARS <LinearProgress className={classes.progressBar} variant="determinate" value={fiveStar} />
        </Grid>
        <Grid container item direction="row" alignItems="center">
          4 STARS<LinearProgress className={classes.progressBar} variant="determinate" value={fourStar} />
        </Grid>
        <Grid container item direction="row" alignItems="center">
          3 STARS<LinearProgress className={classes.progressBar} variant="determinate" value={threeStar} />
        </Grid>
        <Grid container item direction="row" alignItems="center">
          2 STARS<LinearProgress className={classes.progressBar} variant="determinate" value={twoStar} />
        </Grid>
        <Grid container item direction="row" alignItems="center">
          1 STARS<LinearProgress className={classes.progressBar} variant="determinate" value={oneStar} />
        </Grid>
      </Grid>
      <Grid container item direction="column">
        <Grid container item>SIZE {characteristics.Fit.value}</Grid>
        <Grid container item>COMFORT {characteristics.Comfort.value}</Grid>
        <Grid container item>QUALITY {characteristics.Quality.value}</Grid>
        <Grid container item>LENGTH {characteristics.Length.value}</Grid>
      </Grid>
    </Grid>
  );

  // <div>SIZE {characteristics.Fit.value}</div>
  // <div>COMFORT {characteristics.Comfort.value}</div>
  // <div>QUALITY {characteristics.Quality.value}</div>
  // <div>LENGTH {characteristics.Length.value}</div>


};
export default SideBar;

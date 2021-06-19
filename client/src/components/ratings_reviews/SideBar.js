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
import { useDispatch, useSelector } from 'react-redux';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Sliders from './SidebarSliders.js';

// possibly can grab the average star rating from the store

// this component needs to render:
//  - the Average star rating for a clicked item
//  - the percent of reviewers that recommend this product
//  - the breakdown of star ratings 1 -5 star ratings
//  - how the product fits on a scale from too small to too large
//  - how comfortable the product is from poor to perfect
const SideBar = (props) => {
  // const averageStarRating = useSelector(state => test.ratingData);

  // console.log('this is props from sidebar:', props.metaData);
  // need to find the average star rating
  const starRating = props.metaData.ratings || 0;
  const oneStar = Number(starRating[1] || 0);
  const twoStar = Number(starRating[2] || 0);
  const threeStar = Number(starRating[3] || 0);
  const fourStar = Number(starRating[4] || 0);
  const fiveStar = Number(starRating[5] || 0);
  const totalStars = (oneStar + twoStar + threeStar + fourStar + fiveStar);
  const averageStarRating = (((oneStar) + (twoStar * 2) + (threeStar * 3) + (fourStar * 4) + (fiveStar * 5)) / totalStars) || 0;
  // i need to find the metrics for the fit, comfort etc.
  const characteristics = props.metaData.characteristics;
  // now i need to calculate the percent of reviews that recommend this product
  const recommended = props.metaData.recommended;
  const t = Number(recommended.true) || 0;
  const f = Number(recommended.false) || 0;
  const percentRecommended = ((t / (t + f)) * 100).toFixed(0) || 0;
  // console.log('percent of people recommended', Math.floor(percentRecommended * 100));
  const useStyles = makeStyles((theme) => ({
    progressBarContainer: {
      height: '40px',
      padding: '5px'
    },
    progressBar: {
      minWidth: 200,
      height: '10px',
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: '#7CFC00',
        // foregroundColor: 'rgb(136 118 118)',
      },
      // '& .MuiLinearProgress-bar': {
      // }
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
      touchAction: 'none',
    },
    labels: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }));

  const classes = useStyles();
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
              <Grid item>{percentRecommended || 0}% of reviews recommend this product</Grid>
              <Grid container item direction="row" alignItems="center" spacing={1} className={classes.progressBarContainer}>
                <Grid item>
                  <p>5 STARS</p>
                </Grid>
                <Grid item>
                  <LinearProgress className={classes.progressBar} color="primary" variant="determinate" value={(fiveStar / totalStars) * 100}
                  />
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
            <Sliders
              size={characteristics.Size ? Number(characteristics.Size.value) : 0}
              width={characteristics.Width ? Number(characteristics.Width.value) : 0}
              comfort={characteristics.Comfort ? Number(characteristics.Comfort.value) : 0}
              quality={characteristics.Quality ? Number(characteristics.Quality.value) : 0}
              length={characteristics.Length ? Number(characteristics.Length.value) : 0}
              fit={characteristics.Fit ? Number(characteristics.Fit.value) : 0} />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default SideBar;
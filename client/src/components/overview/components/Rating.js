import React, {useRef} from 'react';
import { Rating } from '@material-ui/lab';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: '5px',
    textDecoration: 'underline'
  },
  text: {
    lineHeight: '1.2',
    paddingLeft: '.8em'
  },
  disabled: {
    display: 'none'
  },
  stars: {

  }
});
// text output for now. use css here later
// find out how to link to another part of the page
const RatingInfo = ({ratings}) => {
  var reviewCount = 0;
  var rating = 0;
  const classes = styles();
  // calculate review count and average rating
  for (const [key, value] of Object.entries(ratings) ) {
    reviewCount += parseInt(value);
    rating += (key * value);
  }

  const scrollToReviews = () => {
    document.getElementById('reviews').scrollIntoView({behavior: 'smooth'});
  };

  if (reviewCount > 0) {
    rating /= reviewCount;
    // round to nearest quarter
    rating = (Math.round(rating * 4) / 4);
  }
  return (
    <div id='rating' className={reviewCount > 0 ? classes.root : classes.disabled}>
      <Rating defaultValue={rating} readOnly={true} precision={.25}/>
      <Typography className={classes.text} display='inline' onClick={scrollToReviews}>Read all {reviewCount} reviews</Typography>
    </div>
  );
};

export default RatingInfo;
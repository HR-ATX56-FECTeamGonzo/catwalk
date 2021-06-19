import React, {useRef} from 'react';
import { Rating } from '@material-ui/lab';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

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

const RatingInfo = () => {
  const ratingData = useSelector(state => state.ratingData);
  const classes = styles();
  // calculate review count and average rating

  const scrollToReviews = () => {
    document.getElementById('reviews').scrollIntoView({behavior: 'smooth'});
  };

  return (
    <div id='rating' className={ratingData.count > 0 ? classes.root : classes.disabled}>
      <Rating value={ratingData.average} readOnly={true} precision={.25}/>
      <Typography className={classes.text} display='inline' onClick={scrollToReviews}>
        Read all {ratingData.count} reviews
      </Typography>
    </div>
  );
};

export default RatingInfo;
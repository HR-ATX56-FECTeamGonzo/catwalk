import React from 'react';
import ReviewItem from './ReviewItem';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
// in this component i will send the relevent data to the individual review and render that specific item

const ReviewsList = (props) => {
  const useStyles = makeStyles((theme) => ({
    reviews: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '625px',
      minHeight: '300px',
      width: '100%',
      minWidth: '300px',
      maxWidth: '650px',
      overflowY: 'auto',
      overflowX: 'hidden',
    },
  }));
  const classes = useStyles();
  // console.log('this belongs to reviewsList', props.reviewData);
  const arr = props.reviewData.map((review, i) => {
    // console.log('this belongs to reviewsList', review.photos);
    return (
      <div key={i}>
        <ReviewItem
          url={props.url}
          data={review}
          changeSort={props.changeSort}
          count={props.count}
          sort={props.sort}
        />
        <Divider />
      </div>
    );
  });
  return (
    <div className={classes.reviews}>
      {arr}
    </div>
  );
};
export default ReviewsList;
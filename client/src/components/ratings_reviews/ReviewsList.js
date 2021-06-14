import React from 'react';
import ReviewItem from './ReviewItem';
import Divider from '@material-ui/core/Divider';

// in this component i will send the relevent data to the individual review and render that specific item

const ReviewsList = (props) => {
  // console.log('this belongs to reviewsList', props.reviewDataforList);
  const arr = props.reviewData.map((review, i) => {
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
  // later pass a data tag with whole review passed in
  return (
    <div>
      {arr}
    </div>
  );
};
export default ReviewsList;
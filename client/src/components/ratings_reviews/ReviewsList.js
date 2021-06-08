import React, {component, useState} from 'react';
import ReviewItem from './ReviewItem';

// in this component i will send the relevent data to the individual review and render that specific item

const ReviewsList = (props) => {
  console.log('this belongs to reviewsList', props.reviewDataforList);
  const arr = props.reviewDataforList.map((review, i) => {
    return (
      <ReviewItem key={i}
        changeSort={props.changeSort}
        rating={review.rating}
        reviewer={review.reviewer_name}
        summary={review.summary}
        body={review.body}
        date={review.date}
        recommend={review.recommend}
        response={review.response}
        helpfulness={review.helpfulness}
        count={props.count}
        sort={props.sort}
      />
    );
  });
  return (

    <div>
      {arr}
    </div>
  );
};
export default ReviewsList;
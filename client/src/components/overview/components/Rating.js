import React, {useRef} from 'react';
import { Rating } from '@material-ui/lab';

// text output for now. use css here later
// find out how to link to another part of the page
const RatingInfo = ({ratings}) => {
  var reviewCount = 0;
  var rating = 0;
  // calculate review count and average rating
  for (const [key, value] of Object.entries(ratings) ) {
    reviewCount += parseInt(value);
    rating += (key * value);
  }

  const scrollToReviews = () => {
    console.log('scrolling');
    document.getElementById('reviews').scrollIntoView({behavior: 'smooth'});
  };

  if (reviewCount > 0) {
    rating /= reviewCount;
    // round to nearest quarter
    rating = (Math.round(rating * 4) / 4);
  }
  return (
    <div id='rating' style={reviewCount === 0 ? {display: 'none'} : null}>
      <Rating defaultValue={rating} readOnly={true}/>
      <span onClick={scrollToReviews}> Read all {reviewCount} reviews</span>
    </div>
  );
};

export default RatingInfo;
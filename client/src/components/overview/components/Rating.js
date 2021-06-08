import React, {useRef} from 'react';
// text output for now. use css here later
const Rating = ({ratings}) => {
  var reviewCount = 0;
  var rating = 0;
  for (const [key, value] of Object.entries(ratings) ) {
    reviewCount += parseInt(value);
    rating += (key * value);
  }

  if (reviewCount > 0) {
    // round to nearest quarter
    rating /= reviewCount;
    rating = (Math.round(rating * 4) / 4);
  }
  reviewCount = 0;
  return (
    <div id='rating' style={reviewCount === 0 ? {display: 'none'} : {}}>
      <span>{rating} out of 5 stars</span>

    </div>
  );
};

export default Rating;
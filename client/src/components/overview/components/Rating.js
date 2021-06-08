import React, {useRef} from 'react';
// text output for now. use css here later
const Rating = ({rating, reviewCount}) => {

  return (
    <div id='rating'>
      <span>{rating} out of 5 stars</span>
    </div>
  );
};

export default Rating;
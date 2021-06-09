import React, {component, useState} from 'react';

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);

  return (
    <div>
      <h3>these are the reviews: {reviews.toString()}</h3>
      <button onClick={() => {
        setReviews([...reviews, ' review', ' reviewTwo']);
      }}>More Reviews</button>
      {/* // this button needs to generate two more reviews
    // when out of reviews button will dissapear
    // when out of room on single page, add scrolling */}
    </div>
  );
};
export default ReviewsList;
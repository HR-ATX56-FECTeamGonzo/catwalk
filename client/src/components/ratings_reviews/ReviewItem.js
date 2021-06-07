import React from 'react';


// here i will render the review item div with all of the passed down props
const ReviewItem = (props) => {
  const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = props.date.toString();
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  // console.log('this is the month', Number(month));
  return (
    <div>
      ==================
      <div>Review count: {props.count}</div>
      <div>Sorted by: {props.sort}</div>
      <div>Rating: {props.rating}</div>
      <div>Reviewer: {props.reviewer}</div>
      <div>Date: {months[Number(month) - 1]} {day}, {year}</div>
      <div>Title: {props.summary}</div>
      <div>Body: {props.body}</div>
      <div>I recommend this product: {props.recommend.toString()}</div>
      <div>Helpfulness: {props.helpfulness}
        <button>Yes</button>
        <button>Report</button>
      </div>
    </div>
  );
};

export default ReviewItem;

// prop types:
// reting={review.rating} -------------
// date={review.date} -----------------
// reviewer={review.reviewer} ---------
// summary={review.summary} -----------
// body={review.body} -----------------
// recommend={review.recommend} -------
// response={review.response} ---------
// helpfulness={review.helpfulness} ---
// count={props.count} ----------------
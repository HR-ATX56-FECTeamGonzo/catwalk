import React from 'react';


// here i will render the review item div with all of the passed down props
const ReviewItem = (props) => {
  const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = props.date.toString();
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  // console.log('this is the month', Number(month));

  // ============= need functionality for YES button and REPORT button
  // YES button needs to send an axios PUT request to ${url}/reviews/:review_id/helpful .then(probably re-render) - maybe send back boolean flag
  const yesButton = () => {};
  // REPORT button needs to send an axios PUT request to ${url}/reviews/:review_id/report then(probably re-render) - maybe send back boolean flag
  const reportButton = () => {};

  return (
    <div>
      ==================
      <div>Rating: {props.rating}(stars)</div>
      <div>Reviewer: {props.reviewer}</div>
      <div>Date: {months[Number(month) - 1]} {day}, {year}</div>
      <div>Title: {props.summary}</div>
      <div>Body: {props.body}</div>
      <div>I recommend this product: {props.recommend.toString()}</div>
      <div>Helpfulness: {props.helpfulness}
        <button onClick={'call the yesButton function'}>Yes</button>
        <button onClick={'call the reportButton function'}>Report</button>
      </div>
    </div>
  );
};

export default ReviewItem;

// prop types:

// ====================== NEED review_id as a prop for YES and REPORT button

// reting={review.rating} -------------
// date={review.date} -----------------
// reviewer={review.reviewer} ---------
// summary={review.summary} -----------
// body={review.body} -----------------
// recommend={review.recommend} -------
// response={review.response} ---------
// helpfulness={review.helpfulness} ---
// count={props.count} ----------------
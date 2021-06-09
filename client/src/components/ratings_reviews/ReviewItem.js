import React from 'react';
import axios from 'axios';
import GITHUB_API_KEY from '../../config/config.js';


// here i will render the review item div with all of the passed down props
const ReviewItem = (props) => {
  const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = props.date.toString();
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);

  // YES button needs to send an axios PUT request to ${url}/reviews/:review_id/helpful .then(probably re-render) - maybe send back boolean flag
  const yesButton = (event) => {
    event.preventDefault();
    axios.put(`${props.url}${props.review_id}/helpful`, { headers: { 'Authorization': `${GITHUB_API_KEY}`} })
      .then(() => console.log('successful Yes function'))
      .catch((err) => console.log('there was an error trying to mark a review as helpful', err));
  };

  // REPORT button needs to send an axios PUT request to ${url}/reviews/:review_id/report then(probably re-render) - maybe send back boolean flag
  const reportButton = (event) => {
    event.preventDefault();
    axios.put(`${props.url}${props.review_id}/report`, { headers: { 'Authorization': `${GITHUB_API_KEY}`}})
      .then(() => console.log('successful Yes function'))
      .catch((err) => console.log('there was an error trying to report a review', err));
  };

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
        <button onClick={() => {
          yesButton(event);
        }}>Yes</button>
        <button onClick={() => {
          reportButton(event);
        }}>Report</button>
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
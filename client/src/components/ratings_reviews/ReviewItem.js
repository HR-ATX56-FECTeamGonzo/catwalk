import React, {useState} from 'react';
import axios from 'axios';
import GITHUB_API_KEY from '../../config/config.js';


// here i will render the review item div with all of the passed down props
const ReviewItem = (props) => {
  const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = props.date.toString();
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  const headers = { headers: { 'Authorization': `${GITHUB_API_KEY}`} };
  const [clickedYes, setClickedYes] = useState(false);
  const [reported, setReported] = useState(false);


  // YES button needs to send an axios PUT request to ${url}/reviews/:review_id/helpful .then(probably re-render) - maybe send back boolean flag
  const yesButton = (event) => {
    event.preventDefault();
    (clickedYes === false ) ? axios.put(`${props.url}${props.review_id}/helpful`, null, headers)
      .then(() => console.log('successful Yes function'))
      .catch((err) => console.log('there was an error trying to mark a review as helpful', err)) : console.log('you cant click more than once');
    setClickedYes(true);
  };

  // REPORT button needs to send an axios PUT request to ${url}/reviews/:review_id/report then(probably re-render) - maybe send back boolean flag
  const reportButton = (event) => {
    event.preventDefault();
    (reported === false) ? axios.put(`${props.url}${props.review_id}/report`, null, headers)
      .then(() => console.log('successful Yes function'))
      .catch((err) => console.log('there was an error trying to report a review', err)) : console.log('you cant report something twice, it shoulve dissapeared already, never to return');
    setReported(true);
  };

  return (
    <div>
      ==================
      { reported ? null :
        <div>
          <div>Rating: {props.rating}(stars)</div>
          <div>Reviewer: {props.reviewer}</div>
          <div>Date: {months[Number(month) - 1]} {day}, {year}</div>
          <div>Title: {props.summary}</div>
          <div>Body: {props.body}</div>
          <div>I recommend this product: {props.recommend.toString()}</div>
          <div>Helpfulness: {clickedYes ? props.helpfulness + 1 : props.helpfulness}
            <button onClick={() => {
              yesButton(event);
            }}>Yes</button>
            <button onClick={() => {
              reportButton(event);
            }}>Report</button>
          </div>
        </div>}
      {/* <div>Rating: {props.rating}(stars)</div>
      <div>Reviewer: {props.reviewer}</div>
      <div>Date: {months[Number(month) - 1]} {day}, {year}</div>
      <div>Title: {props.summary}</div>
      <div>Body: {props.body}</div>
      <div>I recommend this product: {props.recommend.toString()}</div>
      <div>Helpfulness: {clickedYes ? props.helpfulness + 1 : props.helpfulness}
        <button onClick={() => {
          yesButton(event);
        }}>Yes</button>
        <button onClick={() => {
          reportButton(event);
        }}>Report</button>
      </div> */}
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
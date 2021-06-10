import React, { useState } from 'react';
import axios from 'axios';
import GITHUB_API_KEY from '../../config/config.js';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CheckIcon from '@material-ui/icons/Check';
// here i will render the review item div with all of the passed down props
const ReviewItem = (props) => {
  const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = props.date.toString();
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  const headers = { headers: { 'Authorization': `${GITHUB_API_KEY}` } };
  const [clickedYes, setClickedYes] = useState(false);
  const [reported, setReported] = useState(false);


  // YES button needs to send an axios PUT request to ${url}/reviews/:review_id/helpful .then(probably re-render) - maybe send back boolean flag
  const yesButton = (event) => {
    event.preventDefault();
    (clickedYes === false) ? axios.put(`${props.url}${props.review_id}/helpful`, null, headers)
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
      { reported ? null :
        <Grid container>
          <Grid container direction="row" justify="space-between">
            <Grid item>
              <Rating
                name="Rating"
                value={Number(props.rating)}
                readOnly precision={0.25}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
              />
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing={1}>
                <Grid item>{props.reviewer},</Grid>
                <Grid item>{months[Number(month) - 1]} {day}, {year}</Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item direction="column">
            <Grid item><h4>{props.summary}</h4></Grid>
            <Grid item><p>{props.body}</p></Grid>
            {
              props.recommend ?
                <Grid container item direction="row" alignItems="center" spacing={1}>
                  <Grid item><CheckIcon>check</CheckIcon></Grid>
                  <Grid item><p>I recommend this product</p></Grid>
                </Grid>
                : null
            }
            <Grid item container direction="row">
              <p>Was this review helpful? </p>
              <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                <Button onClick={() => {
                  yesButton(event);
                }}>Yes ({clickedYes ? props.helpfulness + 1 : props.helpfulness})</Button>
                <Button onClick={() => {
                  reportButton(event);
                }}>Report</Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>}
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

// new button styles
{/* <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup> */}
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
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import trackClick from '../util.js';


// here i will render the review item div with all of the passed down props
const ReviewItem = (props) => {
  const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = props.data.date.toString();
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  const headers = { headers: { 'Authorization': `${GITHUB_API_KEY}` } };
  const [clickedYes, setClickedYes] = useState(false);
  const [reported, setReported] = useState(false);


  // YES button needs to send an axios PUT request to ${url}/reviews/:review_id/helpful .then(probably re-render) - maybe send back boolean flag
  const yesButton = (event) => {
    event.preventDefault();
    (clickedYes === false) ? axios.put(`${props.url}${props.data.review_id.toString()}/helpful`, null, headers)
      .then(() => {
        console.log('successful Yes function');
        trackClick('increase helpfulness', 'Ratings and Reviews');
      })
      .catch((err) => console.log('there was an error trying to mark a review as helpful', err)) : console.log('you cant click more than once');
    setClickedYes(true);
  };

  // REPORT button needs to send an axios PUT request to ${url}/reviews/:review_id/report then(probably re-render) - maybe send back boolean flag
  const reportButton = (event) => {
    event.preventDefault();
    (reported === false) ? axios.put(`${props.url}${props.data.review_id.toString()}/report`, null, headers)
      .then(() => {
        console.log('successful Yes function');
        trackClick('report', 'Ratings and Reviews');

      })
      .catch((err) => console.log('there was an error trying to report a review', err)) : console.log('you cant report something twice, it shoulve dissapeared already, never to return');
    setReported(true);
  };
  const useStyles = makeStyles((theme) => ({
    photoContainer: {
      display: 'flex',
      justify: 'space-around',
      minHeight: '100px',
      maxHeight: '100px',
      minWidth: '500px',
      maxWidth: '500px',
    },
    photo: {
      display: 'flex',
      flexDirection: 'row',
      justify: 'space-around',
      height: '100px',
      minHeight: '100px',
      maxHeight: '100%',
      width: '100px',
      minWidth: '100px',
      maxWidth: '20%',
      // backgroundColor: 'brown',
    },
    paperHolder: {
      backgroundColor: '#f0f0f5',
      minHeight: '60px',
    },
    paper: {
      padding: '10px',
      backgroundColor: '#f0f0f5',
    },
    recommendation: {
      paddingTop: '15px',
      paddingBottom: '10px',
    },
    responseItem: {
      paddingLeft: '10px',
    },
    buttonGroup: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: '10px',
      paddingBottom: '7px',
    },
    button: {
      height: '12px'
    },
    mainText: {
      paddingBottom: '12px',
    },
  }));
  const classes = useStyles();
  const photos = props.data.photos.map((image) => {
    let pic = image.url;
    return (
      <Grid item key={image.id}>
        <Card >
          <CardMedia
            className={classes.photo}
            image={pic}
            title="user posted image"
          >
          </CardMedia>
        </Card>
      </Grid>
    );
  });
  // console.log(Array.isArray(photos));


  return (
    <div>
      {reported ? null :
        <Grid container>
          <Grid container direction="row" justify="space-between">
            <Grid item>
              <Rating
                name="Rating"
                value={Number(props.data.rating)}
                readOnly precision={0.25}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
              />
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing={1}>
                <Grid item>{props.data.reviewer_name},</Grid>
                <Grid item>{months[Number(month) - 1]} {day}, {year}</Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item direction="column" >
            <Grid item className={classes.mainText}><Typography variant="subtitle1">{props.data.summary}</Typography></Grid>
            <Grid item className={classes.mainText}><Typography variant="caption">{props.data.body}</Typography></Grid>
            {props.data.photos[0]
              ? <Grid container item className={classes.photoContainer} direction="row" spacing={1}>{photos}</Grid>
              : null}
            {props.data.recommend ?
              <Grid container item direction="row" alignItems="center" className={classes.recommendation} spacing={1}>
                <Grid item><CheckIcon>check</CheckIcon></Grid>
                <Grid item><Typography variant="caption">I recommend this product</Typography></Grid>
              </Grid>
              : null
            }
            <Grid item >
              {props.data.response ?
                // <Paper className={classes.paper}>
                <Grid item>
                  <Grid container item direction="column" className={classes.paper}>
                    <Grid item className={classes.responseItem}><Typography variant="subtitle2">Response</Typography></Grid>
                    <Grid item className={classes.responseItem}><Typography variant="caption">{props.data.response}</Typography></Grid>
                  </Grid>
                </Grid>
                // </Paper>
                : null
              }
            </Grid>
            <Grid item container direction="row" className={classes.buttonGroup}>
              <Typography variant="caption">Was this review helpful?</Typography>
              <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                <Button className={classes.button} onClick={() => {
                  yesButton(event);
                }}>
                  <Typography variant="caption">Yes</Typography>
                  ({clickedYes ? props.data.helpfulness + 1 : props.data.helpfulness})
                </Button>
                <Button className={classes.button} onClick={() => {
                  reportButton(event);
                }}>
                  <Typography variant="caption">Report</Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>}
    </div>
  );
};

export default ReviewItem;




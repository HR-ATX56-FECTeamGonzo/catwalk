import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Characteristics from './NewReviewCharacteristics.js';
import TextFields from './NewReviewTextFields.js';
import GITHUB_API_KEY from '../../config/config.js';
import { useDispatch, useSelector } from 'react-redux';
import trackClick from '../util.js';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Alert from '@material-ui/lab/Alert';

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews';
const headers = { headers: { 'Authorization': `${GITHUB_API_KEY}` } };


const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};

const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 650,
    height: 400,
    overflow: 'scroll',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  input: {
    minWidth: 300,
  },
  submit: {
    paddingTop: '15px',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  aboutTheForm: {
    display: 'flex',
    justifyContent: 'center',
    color: '#e4ba4e',
  }
}));

const NewReview = (props) => {

  const currentProductId = useSelector(state => state.currentProductId);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [charParams, setCharParams] = useState(null);
  // star value hooks
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(-1);
  // star value labels
  const labels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Average',
    4: 'Good',
    5: 'Great',
  };

  // do you reccomend this product? -- RADIO ARRAY
  const [recommend, setReccomend] = useState(null);
  const handleRadioChange = (event) => {
    setReccomend(event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
    trackClick('Make Review', 'Ratings and Reviews');
  };

  const handleClose = () => {
    setOpen(false);
  };

  // RadioArray handlers and hooks ------------------------------------------
  const [characteristicArray, setCharacteristicArray] = useState(null);
  const [size, setSize] = useState(null);
  const [sizeErr, setSizeErr] = useState(true);
  const [width, setWidth] = useState(null);
  const [widthErr, setWidthErr] = useState(true);
  const [comfort, setComfort] = useState(null);
  const [comfortErr, setComfortErr] = useState(true);
  const [quality, setQuality] = useState(null);
  const [qualityErr, setQualityErr] = useState(true);
  const [length, setLength] = useState(null);
  const [lengthErr, setLengthErr] = useState(true);
  const [fit, setFit] = useState(null);
  const [fitErr, setFitErr] = useState(true);
  const [characteristicsComplete, setCharacteristicsComplete] = useState(false);

  // textfield handlers and hooks --------------------------------------------
  const [summaryError, setSummaryError] = useState(true);
  const [summary, setSummary] = useState('');
  const [bodyError, setBodyError] = useState(true);
  const [body, setBody] = useState('');
  const [nameError, setNameError] = useState(true);
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState(true);
  const [email, setEmail] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  // submission handler and alert hooks
  const [isAlert, setIsAlert] = useState(true);
  const [isComplete, setIsComplete] = useState(null);
  const isFormReady = () => {
    if (!bodyError && rating !== null && recommend !== null && !nameError && !emailError && characteristicsComplete) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  };

  const handleSubmit = () => {
    console.log(recommend);
    let recommendation = recommend === 'true' ? true : false;
    const params = {
      'product_id': currentProductId,
      'rating': rating,
      'summary': summary,
      'body': body,
      'photos': uploadedPhotos,
      'recommend': recommendation,
      'name': name,
      'email': email,
      'characteristics': charParams
    };
    console.log('/reviews', params, headers);
    if (isComplete) {
      axios.post(url, params, headers)
        .then(() => {
          console.log('success!');
          props.setdoUpdateMetaData(props.doUpdateMetaData + 1);
          trackClick('submitted new form', 'Ratings and Reviews');
          // dispatch
        })
        .catch(() => console.log('there has been an error submitting your form'));
    }
  };
  const generateCharParams = () => {
    let char = props.currentCharacteristics;
    let arr = Object.keys(char);
    let result = {};
    for (let i = 0; i < arr.length; i++) {
      let string = '';
      string += char[arr[i]].id;
      if (arr[i] === 'Fit') {
        result[string] = Number(fit);
      } else if (arr[i] === 'Size') {
        result[string] = Number(size);
      } else if (arr[i] === 'Width') {
        result[string] = Number(width);
      } else if (arr[i] === 'Comfort') {
        result[string] = Number(comfort);
      } else if (arr[i] === 'Quality') {
        result[string] = Number(quality);
      } else if (arr[i] === 'Length') {
        result[string] = Number(length);
      }
    }
    setCharParams(result);
  };

  useEffect(() => {
    isFormReady();
    generateCharParams();
  }, [bodyError, nameError, emailError, sizeErr, widthErr, comfortErr, qualityErr, lengthErr, fitErr]);
  useEffect(() => {
    handleClose();
  }, [props.doUpdateMetaData]);
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Make Review
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <form>
            <Grid container>
              <Grid container item spacing={3} direction="column">
                <Grid container item direction="column" >
                  <Grid item>
                    <Typography className={classes.aboutTheForm} variant="h3">Write Your Review</Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.aboutTheForm} variant="subtitle1">About the [Product Name Here]</Typography>
                  </Grid>
                </Grid>
                <Grid item >
                  <Grid container item direction="row" className={classes.ratingRow} spacing={1}>
                    <Grid item>
                      <Typography component="legend">Rating</Typography>
                    </Grid>
                    <Grid item >
                      <Rating
                        name="starRating"
                        value={rating}
                        precision={1}
                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        onChange={(event) => {
                          setRating(Number(event.target.value));

                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                      />
                    </Grid>
                    {rating !== null && <Grid item><Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box></Grid>}
                  </Grid>
                </Grid>
                <Divider />
                <Grid item >
                  <Grid item>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Do you recommend this Product?</FormLabel>
                      <RadioGroup row aria-label="recommend" name="recommend" value={recommend} onChange={handleRadioChange}>
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
                <Divider />
                <Grid item>
                  <Characteristics
                    conditionalStuff={props.currentCharacteristics}
                    characteristicArray={characteristicArray}
                    size={size}
                    sizeErr={sizeErr}
                    setSize={setSize}
                    setSizeErr={setSizeErr}
                    width={width}
                    setWidth={setWidth}
                    widthErr={widthErr}
                    setWidthErr={setWidthErr}
                    comfort={comfort}
                    setComfort={setComfort}
                    comfortErr={comfortErr}
                    setComfortErr={setComfortErr}
                    quality={quality}
                    setQuality={setQuality}
                    qualityErr={qualityErr}
                    setQualityErr={setQualityErr}
                    length={length}
                    setLength={setLength}
                    lengthErr={lengthErr}
                    setLengthErr={setLengthErr}
                    fit={fit}
                    setFit={setFit}
                    fitErr={fitErr}
                    setFitErr={setFitErr}
                    setCharacteristicsComplete={setCharacteristicsComplete}
                  />
                </Grid>

                <Grid item>
                  <TextFields
                    summaryError={summaryError}
                    setSummaryError={setSummaryError}
                    bodyError={bodyError}
                    setBodyError={setBodyError}
                    nameError={nameError}
                    setNameError={setNameError}
                    summary={summary}
                    setSummary={setSummary}
                    body={body}
                    setBody={setBody}
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    emailError={emailError}
                    setEmailError={setEmailError}
                    uploadedPhotos={uploadedPhotos}
                    setUploadedPhotos={setUploadedPhotos}
                  />
                </Grid>
                <Divider />
                <Grid container item direction="row" spacing={1}>
                  <Grid item className={classes.submit}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit Review</Button>
                  </Grid>
                  <Grid item>
                    {isComplete === false ? <Alert severity="error">The form is still incomplete.</Alert> : <Alert severity="success">noice</Alert>}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default NewReview;

// product_id	integer	Required ID of the product to post the review for
// rating	int	Integer (1-5) indicating the review rating
// summary	text	Summary text of the review
// body	text	Continued or full text of the review
// recommend	bool	Value indicating if the reviewer recommends the product
// name	text	Username for question asker
// email	text	Email address for question asker
// photos	[text]	Array of text urls that link to images to be shown
// characteristics	object	Object of keys representing characteristic_id and values representing the review value for that characteristic. { "14": 5, "15": 5 //...}
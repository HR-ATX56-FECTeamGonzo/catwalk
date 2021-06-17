import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const TextFields = (props) => {
  const useStyles = makeStyles(theme => ({
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
    summaryText: {
      display: 'flex',
      justifyContent: 'center',
      color: 'grey',
      // backgroundColor: 'gold',
    },
    aboutTheForm: {
      display: 'flex',
      justifyContent: 'center',
      color: '#e4ba4e',
    },
    emailInput: {
      display: 'flex',
      alignItems: 'center',
    },
    upload: {
      display: 'none',
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
    photoContainer: {
      display: 'flex',
      justify: 'space-around',
      minHeight: '100px',
      maxHeight: '100px',
      minWidth: '500px',
      maxWidth: '500px',
    },
  }));
  const classes = useStyles();

  // textfield handlers and hooks
  // const [summaryError, setSummaryError] = useState(true);
  // const [summary, setSummary] = useState('');
  const handleSummaryChange = (event) => {
    props.setSummary(event);
  };
  const handleSummaryErrorChange = () => {
    if (0 < props.summary.length && props.summary.length < 59) {
      props.setSummaryError(false);
    } else if (props.summary.length === 0) {
      props.setSummaryError(true);
    }
  };


  // const [bodyError, setBodyError] = useState(true);
  // const [body, setBody] = useState('');
  const handleBodyChange = (event) => { // text field typing
    props.setBody(event);
  };
  const handleBodyErrorChange = () => { // after body is updated useEffect fires this
    if (props.body.length > 49) {
      props.setBodyError(false);
    } else if (49 >= props.body.length) {
      props.setBodyError(true);
    } else if (props.body.length > 1000) {
      props.setBodyError(true);
    }
  };

  // const [nameError, setNameError] = useState(true);
  // const [name, setName] = useState('');
  const handleNameChange = (event) => {
    props.setName(event);
  };
  const handleNameErrorChange = () => {
    if (0 < props.name.length && props.name.length < 59) {
      props.setNameError(false);
    } else if (name.length === 0) {
      props.setNameError(true);
    }
  };

  // const [emailError, setEmailError] = useState(true);
  // const [email, setEmail] = useState('');
  const handleEmailChange = (event) => {
    props.setEmail(event);
  };
  const handleEmailErrorChange = () => {
    let at = props.email.indexOf('@');
    let dot = props.email.indexOf('.');
    if ((at === -1 || dot === -1) || (dot < at)) {
      props.setEmailError(true);
    } else {
      props.setEmailError(false);
    }

    if (props.email.length === 0) {
      props.setEmailError(true);
    }
  };
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const handleUploadChange = (event) => {

    const url = URL.createObjectURL(event);
    // console.log(url)
    setUploadedPhotos(uploadedPhotos.concat(url));
  };

  const pics = uploadedPhotos.map((image) => {
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

  useEffect(() => {
    handleBodyErrorChange();
    handleSummaryErrorChange();
    handleNameErrorChange();
    handleEmailErrorChange();
  }, [props.body, props.summary, props.name, props.email, uploadedPhotos]);
  return (

    <Grid container item spacing={3} direction="column">
      <Grid item>
        <TextField
          error={props.summaryError}
          className={classes.input}
          id="outlined-multiline-static"
          label="summary"
          placeholder="Example: Best purchase ever!"
          multiline
          onChange={() => {
            handleSummaryChange(event.target.value);
          }}
          variant="outlined"
        />
      </Grid>
      <Divider />
      <Grid item>
        <TextField
          error={props.bodyError}
          className={classes.input}
          id="outlined-multiline-static"
          label="body"
          placeholder="Why did you like the product or not?"
          multiline
          fullWidth
          required
          value={props.body}
          onChange={() => {
            handleBodyChange(event.target.value);
            // handleBodyErrorChange();
          }}
          variant="outlined"
        />
        {props.body.length < 50
          ? <Typography className={classes.summaryText} variant="subtitle1">
            Minimum required characters left: {50 - props.body.length}
          </Typography>
          : <Typography className={classes.summaryText} variant="subtitle1">
            Minimum reached
          </Typography>}
      </Grid>
      <Divider />
      <Grid item>
        <input
          accept="image/*"
          className={classes.upload}
          id="contained-button-file"
          multiple
          onChange={() => { handleUploadChange(event.target.value); }}
          type="file"
        />
        {uploadedPhotos[0] ? <Grid container item className={classes.photoContainer}>{pics}</Grid> : null}
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
        {/* <input accept="image/*" className={classes.upload} id="icon-button-file" multiple type="file" />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
        </label> */}
      </Grid>
      <Grid item>
        <TextField
          error={props.nameError}
          className={classes.input}
          id="outlined-multiline-static"
          label="What is your nickname?"
          placeholder="Example: jackson11!"
          multiline
          required
          onChange={() => {
            handleNameChange(event.target.value);
          }}
          variant="outlined"
        />
        <Typography className={classes.summaryText} variant="subtitle1">
          For privacy reasons, do not use your full name or email address
        </Typography>
      </Grid>
      <Divider />
      <Grid container item direction="column">
        <Grid className={classes.emailInput} container item spacing={1} direction="row">
          <Grid item>
            <TextField
              error={props.emailError}
              className={classes.input}
              id="outlined-multiline-static"
              label="Your Email"
              placeholder="Example: jackson11@email.com"
              multiline
              required
              onChange={() => {
                handleEmailChange(event.target.value);
              }}
              variant="outlined"
            />
          </Grid>
          {props.emailError ? <Grid item><Alert severity="error">Invalid Email</Alert></Grid> : null}
        </Grid>
        <Typography className={classes.summaryText} variant="subtitle1">
          For authentication reasons, you will not be emailed
        </Typography>
      </Grid>
      <Divider />
    </Grid>
  );
};

export default TextFields;
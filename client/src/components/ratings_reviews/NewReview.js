import React from 'react';
import Characteristics from './NewReviewCharacteristics.js';


import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
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


// const NewReview = () => {
//   return (
//     <div>
//       <form>
// <input>name</input>
// <input>title</input>
// <input>body</input>
// <input>helpful</input>
// <imput>rating</imput>
//       </form>
//     </div>
//   );
// };

// export default NewReview;

// star value labels
const labels = {
  1: 'Poor',
  2: 'Fair',
  3: 'Average',
  4: 'Good',
  5: 'Great',
};

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
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
}));

export default function NewReview() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  // star value hooks
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  // do you reccomend this product?
  const [reccomend, setReccomend] = React.useState('');
  const handleRadioChange = (event) => {
    setReccomend(event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                          setRating(event.target.value);
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
                      <RadioGroup row aria-label="recommend" name="recommend" value={reccomend} onChange={handleRadioChange}>
                        <FormControlLabel value="1" control={<Radio />} label="Yes" />
                        <FormControlLabel value="2" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
                <Divider />
                <Grid item>
                  <Characteristics />
                </Grid>
                {/* <Grid item>
                  <TextField className={classes.input} id="standard-basic" label="name" />
                </Grid> */}
                {/* <Divider /> */}
                <Grid item>
                  <TextField className={classes.input} id="standard-basic" label="summary" />
                </Grid>
                <Divider />
                <Grid item>
                  <TextField className={classes.input} id="standard-basic" label="body" />
                </Grid>
                <Divider />
                <Grid item className={classes.submit}>
                  <Button variant="contained" color="primary">Submit Review</Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </div>
      </Modal>
    </div>
  );
}
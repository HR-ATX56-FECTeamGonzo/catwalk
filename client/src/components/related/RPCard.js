import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles({
  root: {
    maxWidth: 170,
    minHeight: 325,
    maxHeight: 325,
    border: '.5px solid black',
  },
  icon: {
    position: 'absolute',
    top: '0px',
    right: '12px'
  },
  media: {
    top: '1px',
    right: '1px',
    height: 200,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
  },
});

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

const RPCard = (props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        {props.style}
      </p>
    </div>
  );

  return (
    <Card className={classes.root}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      {/* <CardActionArea> */}
      <CardMedia className={classes.media} >
        {/**/}
        {/* props.imageUrl passing as undefined!! */}
        {/**/}
        <img src={props.imageUrl} alt={props.name}/>
        <IconButton onClick={handleOpen} className={classes.icon}>
          <StarBorderIcon />
        </IconButton>
      </CardMedia>
      {/* </CardActionArea> */}

      <CardContent>
        <Typography variant='caption' alight='left'>{props.category}</Typography> <br />
        <Typography variant='subtitle2' alight='left'>{props.name}</Typography>
        {/* need to strikethrough original price */}
        <Typography variant='caption' alight='left'>${props.salePrice ? props.salePrice : props.originalPrice}</Typography><br/>
        {/**/}
        {/* need to add star ratings, pulling from store */}
        {/**/}
        <Typography variant='caption' alight='left'>!! STAR RATINGS !!</Typography>

      </CardContent>
    </Card>
  );
};

export default RPCard;
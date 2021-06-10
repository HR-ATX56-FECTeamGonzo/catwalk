import React from 'react';
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

const useStyles = makeStyles({
  root: {
    maxWidth: 170,
    minHeight: 325,
    maxHeight: 325,
    border: '.5px solid black',
  },
  header: {
    position: 'absolute',
    top: '6px',
    right: '8px'
  },
  media: {
    top: '1px',
    right: '1px',
    height: 200,
  },
});

const RPCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media}>
          {/**/}
          {/* props.imageUrl passing as undefined!! */}
          {/**/}
          <img src={props.imageUrl} alt={props.name}/>
          {/**/}
          {/* need comparison modal on click */}
          {/**/}
          <StarBorderIcon className={classes.header}/>
        </CardMedia>
      </CardActionArea>

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
import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

import exampleData from '../../store/exampleData.js';

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
    width: 180,
  },
  paper: {
    position: 'absolute',
    width: 500,
    minHeight: 200,
    backgroundColor: 'white',
    border: '0.5px solid #000',
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
  },
  table: {
    maxWidth: 500,
  },
});

const OutfitCard = (props) => {
  const classes = useStyles();

  // useEffect(() => {
  // }, []);

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.media}>
        <img src={props.outfit.imageUrl} alt={props.outfit.name} />
      </CardActionArea>

      <CardContent>
        <Typography variant='subtitle2' alight='left'>{props.outfit.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default OutfitCard;
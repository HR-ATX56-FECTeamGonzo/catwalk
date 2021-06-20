import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import funcs from '../../redux-helpers/related/reduxRelatedProducts.js';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import RPCard from './RPCard.js';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'table',
    flexWrap: 'nowrap',
    justifyContent: 'start',
    overflow: 'hidden',
    width: '100%',
    margin: '0px auto'
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    minWidth: '1000px',
    maxWidth: '1000px'
  },
}));

const RPPassProps = ({data}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [RPCards, setRPCards] = useState(data);

  return (
    <div className={classes.root}>
      {/**/}
      {/* need to take away scroll bar and add arrows!! */}
      {/**/}
      <GridList className={classes.gridList} cols={4.5} spacing={5} cellHeight={340}>
        {RPCards.map((each, index) => (
          <GridListTile key={index}>
            <RPCard key={index}
              {...each}
            />
          </GridListTile>
        ))
        }
      </GridList>
    </div>
  );

};


export default RPPassProps;
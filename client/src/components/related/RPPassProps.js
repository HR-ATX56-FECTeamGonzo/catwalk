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
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    minWidth: '800px',
    maxWidth: '800px'
  },
}));

const RPPassProps = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [RPCards, setRPCards] = useState([]);

  const makeCards = () => {
    let arr = [];
    for (let i = 0; i < props.RPInfo.length; i++) {
      arr.push({});
    }
    for (let i = 0; i < arr.length; i++) {
      arr[i].id = props.RPInfo[i].id;
      arr[i].name = props.RPInfo[i].name;
      arr[i].category = props.RPInfo[i].category;
      arr[i].features = props.RPInfo[i].features;

      for (let k = 0; k < arr.length; k++) {
        if (props.RPMetaData[k].product_id === arr[i].id.toString()) {
          arr[i].metaData = props.RPMetaData[k].ratings;
        }
      }

      for (let m = 0; m < arr.length; m++) {
        if (props.RPStyles[m].product_id === arr[i].id.toString()) {
          for (let j = 0; j < props.RPStyles[m].results.length; j++) {
            if (props.RPStyles[m].results[j].photos[0].thumbnail_url) {
              arr[i].styleIndex = j;
              arr[i].style = props.RPStyles[m].results[j].name;
              arr[i].originalPrice = props.RPStyles[m].results[j].original_price;
              arr[i].salePrice = props.RPStyles[m].results[j].sale_price;
              arr[i].imageURL = props.RPStyles[m].results[j].photos[0].thumbnail_url;
              break;
            }

          }
          if (!arr[i].style) {
            arr[i].styleIndex = 0;
            arr[i].style = props.RPStyles[m].results[0].name;
            arr[i].originalPrice = props.RPStyles[m].results[0].original_price;
            arr[i].salePrice = props.RPStyles[m].results[0].sale_price;
            arr[i].imageURL = './noImage.png';
          }
        } else { continue; }
      }

    }
    setRPCards(arr);
  };

  useEffect(() => {
    makeCards();
  }, []);

  return (
    <div className={classes.root}>
      {/**/}
      {/* need to take away scroll bar and add arrows!! */}
      {/**/}
      <GridList className={classes.gridList} cols={3.5} spacing={5} cellHeight={340}>
        {RPCards.map((each, index) => (
          <GridListTile key={index}>
            <RPCard key={index}
              metaData={each.metaData}
              imageURL={each.imageURL}
              id={each.id}
              name={each.name}
              category={each.category}
              style={each.style}
              styleIndex={each.styleIndex}
              originalPrice={each.originalPrice}
              salePrice={each.salePrice}
              features={each.features}
            />
          </GridListTile>
        ))
        }
      </GridList>
    </div>
  );

};


export default RPPassProps;
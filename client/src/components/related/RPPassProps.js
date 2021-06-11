import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import RPCard from './RPCard.js';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'stretch',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    minWidth: '700px'
  },
}));

const RPPassProps = (props) => {
  const classes = useStyles();

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
      arr[i].metaData = props.RPMetaData[i].ratings;
      for (let j = 0; j < props.RPStyles[i].results.length; j++) {
        if (props.RPStyles[i].results[j].photos[0].thumbnail_url) {
          arr[i].style = props.RPStyles[i].results[j].name;
          arr[i].originalPrice = props.RPStyles[i].results[j].original_price;
          arr[i].salePrice = props.RPStyles[i].results[j].sale_price;
          arr[i].imageURL = props.RPStyles[i].results[j].photos[0].thumbnail_url;
        }
      }
      if (!arr[i].style) {
        arr[i].style = props.RPStyles[i].results[0].name;
        arr[i].originalPrice = props.RPStyles[i].results[0].original_price;
        arr[i].salePrice = props.RPStyles[i].results[0].sale_price;
        arr[i].imageURL = './no-image-available.png';
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
      <GridList className={classes.gridList} cols={3.5} spacing={18} cellHeight={340}>
        {/* {RPCards[props.RPInfo.length - 1] ? */}
        {RPCards.map((each, index) => (
          <GridListTile key={index}>
            <RPCard key={index}
              metaData={each.metaData}
              imageURL={each.imageURL}
              id={each.id}
              name={each.name}
              category={each.category}
              style={each.style}
              originalPrice={each.originalPrice}
              salePrice={each.salePrice}
              features={each.features}
            />
          </GridListTile>
        ))
        }
        {/* : null} */}
      </GridList>
    </div>
  );

};


export default RPPassProps;
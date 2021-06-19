import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import outfitFuncs from '../../redux-helpers/related/reduxOutfitList.js';
import funcs from '../../redux-helpers/related/reduxRelatedProducts.js';
import trackClick from '../util.js';

import axios from 'axios';
import GITHUB_API_KEY from '../../config/config.js';

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
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles({
  root: {
    minWidth: 180,
    maxWidth: 180,
    minHeight: 330,
    maxHeight: 330,
    border: '.5px solid #3d3d5c',
    borderRadius: 0,
  },
  icon: {
    position: 'absolute',
    top: '0px',
    right: '38px',
    color: '#3d3d5c',

  },
  media: {
    right: '11px',
    minHeight: 200,
    maxHeight: 200,
    width: 180,
  },
  table: {
    maxWidth: 500,
  },
  content: {
    backgroundColor: '#f0f0f5',
    height: 150,
  }
});


const OutfitCard = (props) => {
  const classes = useStyles();

  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx';
  const currentProduct = useSelector(state => {
    let {productData, currentProductId, styleData} = state;
    return {...productData, id: currentProductId, defaultStyle: styleData.defaultStyle};
  });
  console.log('from outfit card\n' + JSON.stringify(currentProduct));
  const currentProductStyleIndex = useSelector(state => {
    return state.currentProductStyleIndex;
  });
  const currentProductStars = useSelector(state => {
    return state.ratingData.average;
  });

  const dispatch = useDispatch();

  const handleDelete = (index) => {
    dispatch(outfitFuncs.deleteOutfit(index));
    trackClick('outfitListDelete', 'relatedProducts');
  };


  const handleAdd = () => {
    dispatch(outfitFuncs.addOutfit({
      id: currentProduct.id, name: currentProduct.name, category: currentProduct.category,
      styleName: currentProduct.defaultStyle.name,
      originalPrice: currentProduct.defaultStyle.original_price, salePrice: currentProduct.defaultStyle.sale_price, imageURL: currentProduct.defaultStyle.thumbnail_url,
      averageStars: currentProductStars
    }));
    trackClick('outfitListAddIcon', 'relatedProducts');
    // const id = productId.currentProductId.toString();
    // let { name, category, styleName, styleId, originalPrice, salePrice, imageURL, averageStars } = '';

    // const axiosInstance = axios.create({
    //   'headers': {
    //     'Authorization': `${GITHUB_API_KEY}`
    //   }
    // });

    // axios.all([
    //   axiosInstance.get(`${url}/products/${id}`),
    //   axiosInstance.get(`${url}/products/${id}/styles`),
    //   axiosInstance.get(`${url}/reviews/meta?product_id=${id}`)
    // ])
    //   .then(axios.spread((...results) => {
    //     const info = results[0].data;
    //     const styles = results[1].data;
    //     const metaData = results[2].data;
    //     // console.log(results[1].data.results);
    //     name = info.name;
    //     category = info.category;
    //     styleName = styles.results[currentProductStyleIndex].name;
    //     styleId = styles.results[currentProductStyleIndex].style_id;
    //     originalPrice = styles.results[currentProductStyleIndex].original_price;
    //     salePrice = styles.results[currentProductStyleIndex].sale_price;

    //     for (let i = 0; i < styles.results[currentProductStyleIndex].photos.length; i++) {
    //       if (styles.results[currentProductStyleIndex].photos[i].thumbnail_url) {
    //         imageURL = styles.results[currentProductStyleIndex].photos[i].thumbnail_url;
    //       }
    //     }

    //     if (!imageURL) {
    //       imageURL = './noImage.png';
    //     }

    //     const starRating = metaData.ratings;
    //     const oneStar = Number(starRating[1] || 0);
    //     const twoStar = Number(starRating[2] || 0);
    //     const threeStar = Number(starRating[3] || 0);
    //     const fourStar = Number(starRating[4] || 0);
    //     const fiveStar = Number(starRating[5] || 0);
    //     const totalStars = (oneStar + twoStar + threeStar + fourStar + fiveStar);
    //     const averageStarRating = (((oneStar) + (twoStar * 2) + (threeStar * 3) + (fourStar * 4) + (fiveStar * 5)) / totalStars);

    //     averageStars = averageStarRating;

    //   }))
    //   .then((results) => {
    //     dispatch(funcs.updateCurrentProductStars(averageStars));
    //     dispatch(outfitFuncs.addOutfit({ id, name, category, styleName, styleId, originalPrice, salePrice, imageURL, averageStars }));
    //     //console.log(props.outfit.imageURL);
    //     trackClick('outfitListAddIcon', 'relatedProducts');
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <Card className={classes.root} >
      {props.outfit.name !== 'Add to Outfit' ?
        <IconButton onClick={() => handleDelete(props.index)} className={classes.icon}>
          <HighlightOffIcon />
        </IconButton>
        : null}

      <CardMedia
        className={classes.media}
        onClick={props.outfit.name === 'Add to Outfit' ? () => handleAdd() : null}
      >
        {props.outfit.name !== 'Add to Outfit' ?
          <img src={props.outfit.imageURL} alt={props.outfit.name} className={classes.media} />
          : <img src='./addIcon.png' alt={props.outfit.name} className={classes.media} />
        }
      </CardMedia>

      <CardContent className={classes.content}>
        <Typography variant='caption' align='left'>{props.outfit.category}</Typography> <br />
        <Typography
          variant={props.outfit.name === 'Add to Outfit' ? 'h5' : 'subtitle2'}
          align={props.outfit.name === 'Add to Outfit' ? 'center' : 'left'}
        >
          {props.outfit.name}
        </Typography>
        <Typography variant='caption' align='left'>
          <span style={props.outfit.salePrice ? { 'textDecoration': 'line-through' } : null}>
            {props.outfit.originalPrice}
          </span>
          <span style={{ color: 'red' }}>
            {props.outfit.salePrice ? '$' + props.outfit.salePrice : null}
          </span>
        </Typography><br />
        {props.outfit.name !== 'Add to Outfit' ?
          <Rating size="small" name="averageStarRating" value={Number(currentProductStars.toFixed(1))} readOnly precision={0.25}
            emptyIcon={<StarBorderIcon fontSize="inherit" />} />
          : null}
      </CardContent>
    </Card >
  );
};

export default OutfitCard;
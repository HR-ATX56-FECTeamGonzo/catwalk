import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';


const RelatedProductCard = () => {
  useEffect(() => {
    return; //add any thing
  }); //optional second arg

  return (
    //
    // need to make a square
    //
    <div>
      {/* add image */}
      {/* add star action-modal */}
      <Typography variant='subtitle2' alight='left'>Category: </Typography>
      <Typography variant='h6' alight='left'>Expanded Product Name with Extra Text</Typography>
      <Typography variant='subtitle2' alight='left'>$Price</Typography>
      {/* add number of stars rating */}
    </div>
  );
};

export default RelatedProductCard;
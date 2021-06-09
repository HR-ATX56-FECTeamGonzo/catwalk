import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const RelatedProductCard = (props) => {
  return (
    <Paper
      className="Project"
      style={{
        backgroundColor: white,
      }}
      elevation={10}
    >
      <img src='https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'></img>
      <Typography variant='caption' alight='left'>Category: </Typography> <br />
      <Typography variant='subtitle2' alight='left'>{props.item.name}: {props.item.slogan}</Typography> <br />
      <Typography variant='caption' alight='left'>{props.item.default_price}</Typography>


      <Button className="CheckButton">
          Check it out!
      </Button>
    </Paper>
    // <Box
    //   border={1}
    //   borderColor="black"
    //   height={200}
    //   width={160}
    //   display="flex"
    //   justifyContent="center"
    //   alignItems="left"
    //   bgcolor="white"
    // >
    //   {/* add star action-modal */}
    //   <img src='https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'></img>
    //   <Typography variant='caption' alight='left'>Category: </Typography> <br />
    //   <Typography variant='subtitle2' alight='left'>Expanded Product Name with Extra Text</Typography> <br />
    //   <Typography variant='caption' alight='left'>$Price</Typography>
    //   {/* add number of stars rating */}
    // </Box>
  );
};

export default RelatedProductCard;
import React, {useState, useEffect} from 'react';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  // title: {
  //   color: theme.palette.primary.light,
  // },
  // titleBar: {
  //   background:
  //     'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  // },
}));

const OutfitList = () => {
  const classes = useStyles();

  const [outfit, setOutfit] = useState([]);

  useEffect(() => {
    setOutfit({imageURL: null, name: 'Add Outfit'});
  }, []);

  return (
    <div className={classes.root}>
      {/* <GridList className={classes.gridList} cols={2.5}>
        {/* {outfit.map((each, index) => (
          <GridListTile key={index}>
            <img src={each.imageURL} alt={each.name} />
            <GridListTileBar
              title={each.name}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${each.name}`}>
                  <AddIcon className={classes.title} />
                </IconButton>
              } */}
            {/* /> */}
          {/* </GridListTile> */}
      {/* //   ))} */}
      {/* // </GridList> */} */}
    </div>
  );

};

export default OutfitList;
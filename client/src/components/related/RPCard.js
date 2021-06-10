import React, {useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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

//functions for table
const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: 'black',
    color: 'white',
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'grey',
    },
  },
}))(TableRow);

//functions for modal
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

//RPCard function
const RPCard = (props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [comparisons, setComparisons] = useState([]);
  const [open, setOpen] = useState(false);

  const makeComparisons = () => {
    const CPFeaturesAll = exampleData.features;
    const RPFeaturesAll = props.features;
    const CPFeatureNames = CPFeaturesAll.map(each => each.feature);
    const RPFeatureNames = RPFeaturesAll.map(each => each.feature);
    let comparisons = [];
    let comparisonObj = {};

    CPFeaturesAll.forEach(each => {
      comparisonObj.feature = each.feature;
      comparisonObj.CPValue = each.value;
      if (RPFeatureNames.includes(each.feature)) {
        comparisonObj.RPValue = RPFeaturesAll[RPFeatureNames.indexOf(each.feature)].value;
        RPFeaturesAll.splice(RPFeatureNames.indexOf(each.feature), 1);
      } else {
        comparisonObj.RPValue = 'N/A';
      }
      comparisons.push(comparisonObj);
      comparisonObj = {};
    });

    RPFeaturesAll.forEach(each => {
      comparisonObj.feature = each.feature;
      comparisonObj.RPValue = each.value;
      comparisonObj.CPValue = 'N/A';
      comparisons.push(comparisonObj);
      comparisonObj = {};
    });

    const rows = comparisons.map(each => {
      return {selectedProduct: each.CPValue, feature: each.feature, relatedProduct: each.RPValue};
    });

    setComparisons(rows);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    makeComparisons();
  }, []);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant='caption' alight='left'>COMPARE</Typography> <br />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>{exampleData.name}</StyledTableCell>
              <StyledTableCell align='center'>Features</StyledTableCell>
              <StyledTableCell align='center'>{props.name}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comparisons.map((each, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align='center'>{each.selectedProduct}</StyledTableCell>
                <StyledTableCell align='center'>{each.feature}</StyledTableCell>
                <StyledTableCell align='center'>{each.relatedProduct}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
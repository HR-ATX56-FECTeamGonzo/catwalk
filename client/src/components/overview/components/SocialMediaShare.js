import React from 'react';
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, PinterestIcon, PinterestShareButton } from 'react-share';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '60px'
  }
});
const SocialMediaShare = () => {
  const classes = styles();
  const mediaUrl = useSelector(state => state.styleData.defaultStyle.thumbnail_url);
  const shareUrl = 'http://crouton.net';
  return (
    <Box className={classes.root}>
    <FacebookShareButton url={shareUrl}>
        <FacebookIcon size={16} round={true}/>
    </FacebookShareButton>
    <TwitterShareButton url={shareUrl}>
      <TwitterIcon size={16} round={true}/>
    </TwitterShareButton>
    <PinterestShareButton url={shareUrl} media={mediaUrl}>
      <PinterestIcon size={16} round={true}/>
    </PinterestShareButton>
    </Box>
  );
};

export default SocialMediaShare;
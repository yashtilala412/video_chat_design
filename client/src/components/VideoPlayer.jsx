import React, { useContext, useRef } from 'react';
import { Grid, Typography, Paper, Avatar, IconButton, makeStyles, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import { SocketContext } from '../Context';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  gridContainer: {
    justifyContent: 'right',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
    height: '100vh',
    overflowY: 'rlative',
    '&::-webkit-scrollbar': {
      width: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#888',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#555',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#f1f1f1',
    },
  },
  paper: {
    padding: '10px',
    margin: '10px',
    boxShadow: theme.shadows[5],
    elevation: 3,
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  fullScreenButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const VideoPlayerFullScreen = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const videoRef = useRef(null);

  const handleFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.mozRequestFullScreen) {
      videoRef.current.mozRequestFullScreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen();
    }
  };

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper} elevation={3}>
          <Grid item xs={12} md={6}>
            <div className={classes.nameContainer}>
              <Avatar className={classes.avatar}>{name ? name.charAt(0) : 'N'}</Avatar>
              <Typography variant={isSmallScreen ? 'h6' : 'h5'} gutterBottom>{name || 'Name'}</Typography>
            </div>
            <video ref={videoRef} playsInline muted ref={myVideo} autoPlay className={classes.video} />
            <IconButton className={classes.fullScreenButton} onClick={handleFullScreen}>
              <FullscreenIcon />
            </IconButton>
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper} elevation={3}>
          <Grid item xs={12} md={6}>
            <div className={classes.nameContainer}>
              <Avatar className={classes.avatar}>{call.name ? call.name.charAt(0) : 'N'}</Avatar>
              <Typography variant={isSmallScreen ? 'h7' : 'h8'} gutterBottom>{call.name || 'Name'}</Typography>
            </div>
            <video ref={videoRef} playsInline ref={userVideo} autoPlay className={classes.video} />
            <IconButton className={classes.fullScreenButton} onClick={handleFullScreen}>
              <FullscreenIcon />
            </IconButton>
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayerFullScreen;

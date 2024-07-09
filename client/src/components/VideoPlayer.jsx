import React, { useContext } from 'react';
import { Grid, Typography, Paper, Avatar, makeStyles, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

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
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    margin: '10px',
    boxShadow: theme.shadows[5], // Custom shadow
    elevation: 3, // Default elevation
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
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper} elevation={3}>
          <Grid item xs={12} md={6}>
            <div className={classes.nameContainer}>
              <Avatar className={classes.avatar}>{name ? name.charAt(0) : 'N'}</Avatar>
              <Typography variant={isSmallScreen ? 'h6' : 'h5'} gutterBottom>{name || 'Name'}</Typography>
            </div>
            <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper} elevation={3}>
          <Grid item xs={12} md={6}>
            <div className={classes.nameContainer}>
              <Avatar className={classes.avatar}>{call.name ? call.name.charAt(0) : 'N'}</Avatar>
              <Typography variant={isSmallScreen ? 'h6' : 'h5'} gutterBottom>{call.name || 'Name'}</Typography>
            </div>
            <video playsInline ref={userVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;

import React, { useState, useContext, useEffect } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper, Avatar, Switch, FormControlLabel } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';

import { SocketContext } from '../Context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  gridContainer: {
    width: '60%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '500px',
    margin: '35px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid black',
  },
  avatar: {
    backgroundColor: green[500],
  },
  avatarOffline: {
    backgroundColor: red[500],
  },
}));

const Sidebar = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser, callStatus } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const [callStartTime, setCallStartTime] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (callAccepted && !callEnded) {
      setCallStartTime(Date.now());
    } else {
      setCallStartTime(null);
    }
  }, [callAccepted, callEnded]);

  const getCallDuration = () => {
    if (!callStartTime) return '00:00';
    const duration = Math.floor((Date.now() - callStartTime) / 1000);
    const minutes = String(Math.floor(duration / 60)).padStart(2, '0');
    const seconds = String(duration % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">Account Info</Typography>
              <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
              <CopyToClipboard text={me} className={classes.margin}>
                <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
                  Copy Your ID
                </Button>
              </CopyToClipboard>
              <div className={classes.margin}>
                <Avatar className={callStatus === 'online' ? classes.avatar : classes.avatarOffline}>
                  {callStatus === 'online' ? 'O' : 'X'}
                </Avatar>
                <Typography variant="subtitle1">
                  {callStatus === 'online' ? 'Online' : 'Offline'}
                </Typography>
              </div>
              <FormControlLabel
                control={<Switch checked={isDarkTheme} onChange={() => setIsDarkTheme(!isDarkTheme)} />}
                label="Dark Theme"
                className={classes.margin}
              />
            </Grid>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">Make a call</Typography>
              <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
              {callAccepted && !callEnded ? (
                <div>
                  <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall} className={classes.margin}>
                    Hang Up
                  </Button>
                  <Typography variant="subtitle1" className={classes.margin}>
                    Call Duration: {getCallDuration()}
                  </Typography>
                </div>
              ) : (
                <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)} className={classes.margin}>
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};

export default Sidebar;

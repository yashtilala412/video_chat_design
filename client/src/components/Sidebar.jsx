import React, { useState, useContext, useEffect } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper, Avatar, Switch, FormControlLabel, Modal } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled, Call } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';

import { SocketContext } from '../Context';
// Assuming the notification sound file is located in the public directory
const notificationSound = new Audio('/notification.mp3');

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

    padding: 20,
    paper: {
      padding: '10px 20px',
      border: '2px solid black',
      borderRadius: '10px',
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
      transition: 'background-color 0.3s ease', // Added
      '&:hover': {                              // Added
        backgroundColor: theme.palette.grey[200], // Added
      },       
      buttonPrimary: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
        '& .MuiButton-startIcon': {           // Added
          fontSize: '2rem',                   // Added
        },                                    // Added
      },
      buttonSecondary: {
        backgroundColor: theme.palette.secondary.main,
        color: '#fff',
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark,
        },
        '& .MuiButton-startIcon': {           // Added
          fontSize: '2rem',                   // Added
        },                                    // Added
      },
      gridContainer: {
        width: '60%',
        gap: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
          flexDirection: 'column',
        },
        '& > div:hover': {                        // Added
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', // Added
        }, 
      // ... other styles
    }));


const Sidebar = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser, callStatus, isReceivingCall, answerCall } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const [callStartTime, setCallStartTime] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (callAccepted && !callEnded) {
      setCallStartTime(Date.now());
      notificationSound.play(); // Play sound on call acceptance
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
      <Modal
        open={isReceivingCall && !callAccepted}
        onClose={() => {}}
        className={classes.modal}
      >
        <div className={classes.modalContent}>
          <Typography variant="h6">Incoming Call</Typography>
          <Button variant="contained" color="primary" startIcon={<Call />} onClick={answerCall}>
            Answer
          </Button>
        </div>
      </Modal>
    </Container>
  );
};

export default Sidebar;

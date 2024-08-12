import React, { useContext, useRef, useState } from 'react';
import {
  Grid,
  Typography,
  Paper,
  Avatar,
  IconButton,
  makeStyles,
  useMediaQuery,
  Slider,
} from '@material-ui/core';
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
    justifyContent: 'middle',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row',
    },
    height: '100vh',
    overflowY: 'relative',
    '&::-webkit-scrollbar': {
      width: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#888',
      borderRadius: '8px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#555',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#f1f1f1',
    },
  },
  paper: {
    padding: '400px',
    margin: '200px',
    boxShadow: theme.shadows[6],
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
    position: 'relative',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const VideoPlayerFullScreen = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const [isBlurred, setIsBlurred] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [volume, setVolume] = useState(1);
  const [videoQuality, setVideoQuality] = useState("720p");
  const [muted, setMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [interfaceStyle, setInterfaceStyle] = useState({
    layout: "default",
    color: "#000",
  });
  const [subtitles, setSubtitles] = useState([]);

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

  const toggleBlur = () => {
    setIsBlurred((prev) => !prev);
  };

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
  };

  const handlePiP = () => {
    if (videoRef.current.requestPictureInPicture) {
      videoRef.current.requestPictureInPicture();
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      myVideo.current.srcObject = screenStream;
    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };

  const handleQualityChange = (event) => {
    setVideoQuality(event.target.value);
  };

  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  const handleRecord = () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      const options = { mimeType: "video/webm; codecs=vp9" };
      mediaRecorderRef.current = new MediaRecorder(myVideo.current.srcObject, options);
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const toggleChat = () => {
    setChatOpen((prev) => !prev);
  };

  const handleMessageSend = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const loadSubtitles = (lang) => {
    // Logic to load subtitles based on language
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
            <video
              ref={videoRef}
              playsInline
              muted={muted}
              ref={myVideo}
              autoPlay
              className={classes.video}
              style={{ filter: isBlurred ? "blur(5px)" : "none" }}
            />
            <IconButton className={classes.fullScreenButton} onClick={handleFullScreen}>
              <FullscreenIcon />
            </IconButton>
            <IconButton className={classes.fullScreenButton} onClick={toggleBlur}>
              {isBlurred ? "Unblur" : "Blur Background"}
            </IconButton>
            <div>
              <button onClick={() => handlePlaybackRateChange(0.5)}>0.5x</button>
              <button onClick={() => handlePlaybackRateChange(1)}>1x</button>
              <button onClick={() => handlePlaybackRateChange(1.5)}>1.5x</button>
              <button onClick={() => handlePlaybackRateChange(2)}>2x</button>
            </div>
            <IconButton className={classes.fullScreenButton} onClick={handlePiP}>
              PiP
            </IconButton>
            <IconButton className={classes.fullScreenButton} onClick={toggleDarkMode}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </IconButton>
            <IconButton className={classes.fullScreenButton} onClick={handleScreenShare}>
              Share Screen
            </IconButton>
            <div>
              <Typography id="volume-slider" gutterBottom>
                Volume
              </Typography>
              <Slider
                value={volume}
                onChange={handleVolumeChange}
                aria-labelledby="volume-slider"
                step={0.1}
                min={0}
                max={1}
              />
            </div>
            <div>
              <select onChange={handleQualityChange} value={videoQuality}>
                <option value="360p">360p</option>
                <option value="720p">720p</option>
                <option value="1080p">1080p</option>
              </select>
            </div>
            <IconButton className={classes.fullScreenButton} onClick={toggleMute}>
              {muted ? "Unmute" : "Mute"}
            </IconButton>
            <IconButton className={classes.fullScreenButton} onClick={handleRecord}>
              {isRecording ? "Stop Recording" : "Start Recording"}
            </IconButton>
            <IconButton className={classes.fullScreenButton} onClick={toggleChat}>
              {chatOpen ? "Close Chat" : "Open Chat"}
            </IconButton>
            {chatOpen && (
              <div className="chat-window">
                {/* Chat UI and messages */}
              </div>
            )}
            <div>
              <select onChange={(e) => loadSubtitles(e.target.value)}>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                {/* Additional languages */}
              </select>
            </div>
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper} elevation={3}>
          <Grid item xs={12} md={6}>
            <div className={classes.nameContainer}>
              <Avatar className={classes.avatar}>{call.name ? call.name.charAt(0) : 'N'}</Avatar>
              <Typography variant={isSmallScreen ? 'h7' : 'h3'} gutterBottom>{call.name || 'Name'}</Typography>
            </div>
            <video playsInline ref={userVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayerFullScreen;

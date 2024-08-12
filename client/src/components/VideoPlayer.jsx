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
    justifyContent: 'middle',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row',
    },
    height: '100vh',
    overflowY: 'rlative',
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
  const VideoPlayerFullScreen = () => {
    // ... existing code
    const [volume, setVolume] = useState(1);
  
    const handleVolumeChange = (event, newValue) => {
      setVolume(newValue);
    };
    const VideoPlayerFullScreen = () => {
      // ... existing code
      const [videoQuality, setVideoQuality] = useState("720p");
    
      const handleQualityChange = (event) => {
        setVideoQuality(event.target.value);
      };
      const VideoPlayerFullScreen = () => {
        // ... existing code
        const [muted, setMuted] = useState(false);
      
        const toggleMute = () => {
          setMuted((prev) => !prev);
        };
        const VideoPlayerFullScreen = () => {
          // ... existing code
          const [isRecording, setIsRecording] = useState(false);
          const mediaRecorderRef = useRef(null);
        
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
          const VideoPlayerFullScreen = () => {
            // ... existing code
            const [interfaceStyle, setInterfaceStyle] = useState({
              layout: "default",
              color: "#000",
            });
          
            const handleStyleChange = (newStyle) => {
              setInterfaceStyle(newStyle);
            };
            const VideoPlayerFullScreen = () => {
              // ... existing code
              const [subtitles, setSubtitles] = useState([]);
            
              const loadSubtitles = (lang) => {
                // Logic to load subtitles based on language
              };
            
              return (
                // ... existing code
                <div>
                  <select onChange={(e) => loadSubtitles(e.target.value)}>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    {/* Additional languages */}
                  </select>
                </div>
              );
            };
            
            return (
              // ... existing code
              <div style={{ backgroundColor: interfaceStyle.color }}>
                {/* Customize interface layout */}
              </div>
            );
          };
          
        
          return (
            // ... existing code
            <IconButton className={classes.fullScreenButton} onClick={handleRecord}>
              {isRecording ? "Stop Recording" : "Start Recording"}
            </IconButton>
          );
        };
        
        return (
          // ... existing code
          <IconButton className={classes.fullScreenButton} onClick={toggleMute}>
            {muted ? "Unmute" : "Mute"}
          </IconButton>
        );
      };
      
      return (
        // ... existing code
        <div>
          <select onChange={handleQualityChange} value={videoQuality}>
            <option value="360p">360p</option>
            <option value="720p">720p</option>
            <option value="1080p">1080p</option>
          </select>
        </div>
      );
    };
    
    return (
      // ... existing code
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
    );
  };
  
  return (
    // ... existing code
    <IconButton className={classes.fullScreenButton} onClick={handleScreenShare}>
      Share Screen
    </IconButton>
  );
};


  return (
    // ... existing code
    <IconButton className={classes.fullScreenButton} onClick={handlePiP}>
      PiP
    </IconButton>
  );
};

  const VideoPlayerFullScreen = () => {
  // ... existing code
  const [isBlurred, setIsBlurred] = useState(false);

  const toggleBlur = () => {
    setIsBlurred((prev) => !prev);
  };
const VideoPlayerFullScreen = () => {
  // ... existing code
  const [playbackRate, setPlaybackRate] = useState(1);

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
  };

  return (
    // ... existing code
    <div>
      <button onClick={() => handlePlaybackRateChange(0.5)}>0.5x</button>
      <button onClick={() => handlePlaybackRateChange(1)}>1x</button>
      <button onClick={() => handlePlaybackRateChange(1.5)}>1.5x</button>
      <button onClick={() => handlePlaybackRateChange(2)}>2x</button>
    </div>
  );
};

  return (
    <Grid container className={classes.gridContainer}>
      {/* ... existing code */}
      <IconButton className={classes.fullScreenButton} onClick={toggleBlur}>
        {isBlurred ? "Unblur" : "Blur Background"}
      </IconButton>
      <div style={{ filter: isBlurred ? "blur(5px)" : "none" }}>
        {/* Video components */}
      </div>
    </Grid>
  );
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
              <Typography variant={isSmallScreen ? 'h7' : 'h3'} gutterBottom>{call.name || 'Name'}</Typography>
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

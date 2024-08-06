// src/components/VideoPlayer.js
import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FullScreenButton from './FullScreenButton';
import VolumeControl from './VolumeControl';
import MuteButton from './MuteButton';

const useStyles = makeStyles((theme) => ({
  videoContainer: {
    position: 'relative',
    width: '100%',
    paddingTop: '56.25%', // 16:9 Aspect Ratio
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  controls: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    display: 'flex',
    alignItems: 'center',
  },
}));

const VideoPlayer = () => {
  const classes = useStyles();
  const videoRef = useRef(null);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) { // Firefox
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) { // Chrome, Safari & Opera
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) { // IE/Edge
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const handleVolumeChange = (newValue) => {
    setVolume(newValue);
    if (videoRef.current) {
      videoRef.current.volume = newValue / 100;
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div className={classes.videoContainer}>
      <video ref={videoRef} className={classes.video} controls muted={isMuted}>
        <source src="path_to_video.mp4" type="video/mp4" />
      </video>
      <div className={classes.controls}>
        <FullScreenButton onFullScreen={handleFullScreen} />
        <VolumeControl volume={volume} onVolumeChange={handleVolumeChange} />
        <MuteButton isMuted={isMuted} onMuteToggle={handleMuteToggle} />
      </div>
    </div>
  );
};

export default VideoPlayer;

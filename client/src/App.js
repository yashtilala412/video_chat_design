// src/components/VideoPlayer.js
import React, { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FullScreenButton from './FullScreenButton';
import VolumeControl from './VolumeControl';
import MuteButton from './MuteButton';
import PlaybackSpeedControl from './PlaybackSpeedControl';
import PlayPauseButton from './PlayPauseButton';
import CurrentTimeDisplay from './CurrentTimeDisplay';
import CaptionsToggleButton from './CaptionsToggleButton';

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
  const [speed, setSpeed] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [areCaptionsEnabled, setAreCaptionsEnabled] = useState(false);

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

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed;
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleToggleCaptions = () => {
    setAreCaptionsEnabled(!areCaptionsEnabled);
    if (videoRef.current) {
      const tracks = videoRef.current.textTracks;
      for (let i = 0; i < tracks.length; i++) {
        tracks[i].mode = areCaptionsEnabled ? 'disabled' : 'showing';
      }
    }
  };

  useEffect(() => {
    const updateCurrentTime = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('timeupdate', updateCurrentTime);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('timeupdate', updateCurrentTime);
      }
    };
  }, []);

  return (
    <div className={classes.videoContainer}>
      <video ref={videoRef} className={classes.video} controls muted={isMuted} playbackRate={speed}>
        <source src="path_to_video.mp4" type="video/mp4" />
        <track kind="captions" srcLang="en" src="path_to_captions.vtt" default />
      </video>
      <div className={classes.controls}>
        <PlayPauseButton isPlaying={isPlaying} onPlayPause={handlePlayPause} />
        <FullScreenButton onFullScreen={handleFullScreen} />
        <VolumeControl volume={volume} onVolumeChange={handleVolumeChange} />
        <MuteButton isMuted={isMuted} onMuteToggle={handleMuteToggle} />
        <PlaybackSpeedControl speed={speed} onSpeedChange={handleSpeedChange} />
        <CurrentTimeDisplay currentTime={currentTime} />
        <CaptionsToggleButton areCaptionsEnabled={areCaptionsEnabled} onToggleCaptions={handleToggleCaptions} />
      </div>
    </div>
  );
};

export default VideoPlayer;

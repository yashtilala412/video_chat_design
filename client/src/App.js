// src/components/PlayPauseButton.js
import React from 'react';
import { IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const PlayPauseButton = ({ isPlaying, onPlayPause }) => {
  return (
    <IconButton onClick={onPlayPause}>
      {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
    </IconButton>
  );
};

export default PlayPauseButton;

// src/components/MuteButton.js
import React from 'react';
import { IconButton } from '@material-ui/core';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

const MuteButton = ({ isMuted, onMuteToggle }) => {
  return (
    <IconButton onClick={onMuteToggle}>
      {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
    </IconButton>
  );
};

export default MuteButton;

// src/components/VolumeControl.js
import React from 'react';
import { IconButton, Slider } from '@material-ui/core';
import VolumeUp from '@material-ui/icons/VolumeUp';

const VolumeControl = ({ volume, onVolumeChange }) => {
  return (
    <div>
      <IconButton>
        <VolumeUp />
      </IconButton>
      <Slider
        value={volume}
        onChange={(e, newValue) => onVolumeChange(newValue)}
        aria-labelledby="volume-slider"
      />
    </div>
  );
};

export default VolumeControl;

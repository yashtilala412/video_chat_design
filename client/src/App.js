// src/components/SeekBar.js
import React from 'react';
import { Slider } from '@material-ui/core';

const SeekBar = ({ currentTime, duration, onSeek }) => {
  const handleChange = (event, newValue) => {
    onSeek(newValue);
  };

  return (
    <Slider
      value={currentTime}
      min={0}
      max={duration}
      onChange={handleChange}
      aria-labelledby="continuous-slider"
    />
  );
};

export default SeekBar;

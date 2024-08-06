// src/components/CurrentTimeDisplay.js
import React from 'react';
import { Typography } from '@material-ui/core';

const CurrentTimeDisplay = ({ currentTime }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return <Typography>{formatTime(currentTime)}</Typography>;
};

export default CurrentTimeDisplay;

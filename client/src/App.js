// src/components/FullScreenButton.js
import React from 'react';
import { IconButton } from '@material-ui/core';
import FullscreenIcon from '@material-ui/icons/Fullscreen';

const FullScreenButton = ({ onFullScreen }) => {
  return (
    <IconButton onClick={onFullScreen}>
      <FullscreenIcon />
    </IconButton>
  );
};

export default FullScreenButton;

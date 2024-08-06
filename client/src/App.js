// src/components/CaptionsToggleButton.js
import React from 'react';
import { IconButton } from '@material-ui/core';
import ClosedCaptionIcon from '@material-ui/icons/ClosedCaption';

const CaptionsToggleButton = ({ areCaptionsEnabled, onToggleCaptions }) => {
  return (
    <IconButton onClick={onToggleCaptions}>
      <ClosedCaptionIcon color={areCaptionsEnabled ? 'primary' : 'inherit'} />
    </IconButton>
  );
};

export default CaptionsToggleButton;

// src/components/PlaybackSpeedControl.js
import React from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import SpeedIcon from '@material-ui/icons/Speed';

const speeds = [0.5, 1.0, 1.5, 2.0];

const PlaybackSpeedControl = ({ speed, onSpeedChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (newSpeed) => {
    setAnchorEl(null);
    if (newSpeed !== undefined) {
      onSpeedChange(newSpeed);
    }
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <SpeedIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => handleClose()}>
        {speeds.map((s) => (
          <MenuItem key={s} onClick={() => handleClose(s)}>
            {s}x
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default PlaybackSpeedControl;

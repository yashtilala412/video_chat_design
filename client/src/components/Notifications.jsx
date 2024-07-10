import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { SocketContext } from '../Context';

const Notifications = () => {
  const { answerCall, declineCall, call, callAccepted, isMuted, toggleMute } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && !isMuted && (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <img src={call.avatar} alt={`${call.name}'s avatar`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
          <h1>{call.name} is calling:</h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
          <Button variant="contained" color="secondary" onClick={declineCall}>
            Decline
          </Button>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
        <Button variant="contained" onClick={toggleMute}>
          {isMuted ? 'Unmute Notifications' : 'Mute Notifications'}
        </Button>
      </div>
      {callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <Button variant="contained" color="secondary" onClick={leaveCall}>
            End Call
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;

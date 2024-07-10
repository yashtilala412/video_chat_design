import React, { useContext } from 'react';
import { Button, Badge } from '@material-ui/core';
import { SocketContext } from '../Context';

const Notifications = () => {
  const { answerCall, declineCall, call, callAccepted, isMuted, toggleMute, leaveCall, missedCalls } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && !isMuted && (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <img src={call.avatar} alt={`${call.name}'s avatar`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
          <div>
            <h1>{call.name} is calling:</h1>
            <p>Status: {call.status}</p>
            <p>Location: {call.location}</p>
          </div>
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
        <Badge badgeContent={missedCalls} color="secondary" style={{ marginLeft: '10px' }}>
          <p>Missed Calls</p>
        </Badge>
      </div>
      {callAccepted && (
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', position: 'absolute', right: '10px' }}>



           <Button variant="contained" color="secondary" onClick={leaveCall}>
            End Call
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;

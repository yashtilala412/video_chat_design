import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('https://warm-wildwood-81069.herokuapp.com');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    if (connectionRef.current) {
      connectionRef.current.destroy();
    }

    window.location.reload();
  };

  const declineCall = () => {
    setCall({});
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
  
        myVideo.current.srcObject = currentStream;
      });
  
    socket.on('me', (id) => setMe(id));
  
    socket.on('callUser', ({ from, name: callerName, signal, avatar }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal, avatar });
    });
  }, []);
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
  
        myVideo.current.srcObject = currentStream;
      });
  
    socket.on('me', (id) => setMe(id));
  
    socket.on('callUser', ({ from, name: callerName, signal, avatar, status, location }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal, avatar, status, location });
    });
  }, []);
    
  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      declineCall,
      isMuted,
      toggleMute,
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };

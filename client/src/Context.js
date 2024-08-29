const [recording, setRecording] = useState(false);
const mediaRecorderRef = useRef(null);
const recordedChunks = useRef([]);

const startRecording = () => {
  if (stream) {
    const options = { mimeType: 'video/webm; codecs=vp9' };
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks.current, {
        type: 'video/webm'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      a.href = url;
      a.download = 'recording.webm';
      a.click();
      window.URL.revokeObjectURL(url);
      recordedChunks.current = [];
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setRecording(true);
  }
};

const stopRecording = () => {
  if (mediaRecorderRef.current) {
    mediaRecorderRef.current.stop();
    setRecording(false);
  }
};
const pauseRecording = () => {
  if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
    mediaRecorderRef.current.pause();
    setRecording(false);
  }
};
const resumeRecording = () => {
  if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
    mediaRecorderRef.current.resume();
    setRecording(true);
  }
};
const [recordingQuality, setRecordingQuality] = useState("high");

const handleQualityChange = (quality) => {
  setRecordingQuality(quality);
  // Additional logic to handle stream quality adjustment
};
const [recordingTime, setRecordingTime] = useState(0);

useEffect(() => {
  let interval;
  if (recording) {
    interval = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  }
  return () => clearInterval(interval);
}, [recording]);
const [isMuted, setIsMuted] = useState(false);

const toggleMute = () => {
  stream.getAudioTracks()[0].enabled = !isMuted;
  setIsMuted(!isMuted);
};

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
    missedCalls,
    startScreenShare,
    messages,
    sendMessage,
    recording,
    startRecording,
    stopRecording, // Add recording methods
  }}>
    {children}
  </SocketContext.Provider>
);

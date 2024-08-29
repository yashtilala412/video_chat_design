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


const [countdown, setCountdown] = useState(3);

const startCountdown = () => {
  let count = 3;
  const timer = setInterval(() => {
    setCountdown(count);
    if (count === 0) {
      clearInterval(timer);
      startRecording();
    }
    count--;
  }, 1000);
};
const downloadAudio = () => {
  const audioChunks = recordedChunks.current.filter(chunk => chunk.type === 'audio/webm');
  const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
  const url = URL.createObjectURL(audioBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'audio.webm';
  a.click();
  window.URL.revokeObjectURL(url);
};
const [maxDuration, setMaxDuration] = useState(300); // seconds

useEffect(() => {
  if (recording && recordingTime >= maxDuration) {
    stopRecording();
  }
}, [recordingTime]);
const [filename, setFilename] = useState("recording.webm");

const downloadWithCustomFilename = () => {
  const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};
const [remainingTime, setRemainingTime] = useState(maxDuration);

useEffect(() => {
  if (recording) {
    setRemainingTime(maxDuration - recordingTime);
  }
}, [recordingTime]);
const [isFlipped, setIsFlipped] = useState(false);

const toggleVideoFlip = () => {
  myVideo.current.style.transform = isFlipped ? 'scaleX(1)' : 'scaleX(-1)';
  setIsFlipped(!isFlipped);
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

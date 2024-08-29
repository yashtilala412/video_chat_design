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
const [filter, setFilter] = useState("none");

const applyFilter = () => {
  myVideo.current.style.filter = filter;
};
const saveRecordingToServer = (blob) => {
  const formData = new FormData();
  formData.append('video', blob, 'recording.webm');
  fetch('/upload', {
    method: 'POST',
    body: formData,
  });
};
const captureScreenshot = () => {
  const videoElement = myVideo.current;
  const canvas = document.createElement('canvas');
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = 'screenshot.png';
  a.click();
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

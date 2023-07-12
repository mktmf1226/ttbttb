import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import socketIO from "../utils/socket";

const RecordingComponent = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingState, setRecordingState] = useState("");
  const [audioData, setAudioData] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null); // mediaRecorder 상태 추가

  let chunks = [];
  let interval;

  // 소켓으로 받아오는 정보 처리
  useEffect(() => {
    socketIO.initializeSocket();
  },[]);

  const handleSuccess = (stream) => {
    const mediaRecorderOptions = { mimeType: "audio/webm" };
    const recorder = new MediaRecorder(stream, mediaRecorderOptions);

    recorder.addEventListener("dataavailable", (event) => {
      chunks.push(event.data);
    });

    recorder.addEventListener("stop", () => {
      const audioBlob = new Blob(chunks, { type: "audio/webm" });
      setAudioData(audioBlob);
      console.log(audioData);

      // 서버로 audioBlob을 전송하는 코드를 작성하세요.
      // 예를 들어, fetch를 사용한다면:
      // const formData = new FormData();
      // formData.append("audioFile", audioBlob);
      // fetch("/save-audio", {
      //   method: "POST",
      //   body: formData,
      // });

      chunks = [];
    });

    setMediaRecorder(recorder); // mediaRecorder 상태 업데이트

    setRecordingState("recording");
    setIsRecording(true);
    recorder.start();

    interval = setInterval(() => {
      sendBufferedData();
    }, 5000);
  };

  const handleError = (error) => {
    console.error("Error accessing microphone:", error);
  };

  const sendBufferedData = () => {
    if (chunks.length > 0) {
      const audioBlob = new Blob(chunks, { type: "audio/webm" });

      // 서버로 audioBlob을 전송하는 코드를 작성하세요.
      // 예를 들어, fetch를 사용한다면:
      // const formData = new FormData();
      // formData.append("audioChunk", audioBlob);
      // fetch("/upload-audio-chunk", {
      //   method: "POST",
      //   body: formData,
      // });

      chunks = [];
    }
  };

  useEffect(() => {
    console.log("recordingState=", recordingState);
    console.log("isRecording=", isRecording);
  }, [isRecording, recordingState]);

  const stopRecording = () => {
    setRecordingState("");
    setIsRecording(false);

    console.log("stopped!");
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
    }

    clearInterval(interval);
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingState("recording");

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(handleSuccess)
      .catch(handleError);
  };

  return (
    <div>
      <button disabled={isRecording} onClick={startRecording}>
        Start Recording
      </button>
      <button disabled={!isRecording} onClick={stopRecording}>
        Stop Recording
      </button>
      <button
        disabled={!audioData}
        onClick={() => {
          const url = URL.createObjectURL(audioData);
          const link = document.createElement("a");
          link.href = url;
          link.download = "recorded_audio.webm";
          link.click();
        }}
      >
        Download Recorded Audio
      </button>
    </div>
  );
};

export default RecordingComponent;

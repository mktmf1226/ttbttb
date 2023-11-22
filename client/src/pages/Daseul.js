import React, { useEffect, useState, useRef } from "react";
import socket from "../utils/socket";

const RecordingComponent = () => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const audioDataRef = useRef(null);

  let interval;

  const handleRecStart = async () => {
    console.log("recStart event received");
    
    setIsRecording(true);
  
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      await handleSuccess(stream);
      console.log("Recording completed.");
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };
  
  const handleRecEnd = () => {
    console.log("recEnd event received");
    
    setIsRecording(false);
  
    console.log(mediaRecorderRef.current?.state);
  
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  
    clearInterval(interval);
  };

  // 소켓으로 받아오는 정보 처리
  useEffect(() => {
    socket.on("recStart", handleRecStart);
    socket.on("recEnd", handleRecEnd);

    return () => {
      socket.off("recStart", handleRecStart);
      socket.off("recEnd", handleRecEnd);
    };
  }, []);

  const handleSuccess = (stream) => {
    return new Promise((resolve, reject) => {
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
  
      const handleDataAvailable = (event) => {
        chunksRef.current.push(event.data);
      };
  
      const handleStop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });

        // socket으로 보내는 String 처리
        const base64String = await blobToBase64(audioBlob);
        console.log("base64String :", base64String);

        // // 디코딩하기
        // const audioBlob2 = base64ToBlob(base64String, "audio/webm");
        // console.log("audioBlob2 :",audioBlob2);

        // socket data
        const data = {
          audio : base64String,
          msg : "오디오1"
        };
        socket.emit("gotoapi", data);

        audioDataRef.current = audioBlob;
        // console.log(audioDataRef.current);
  
        chunksRef.current = [];
        resolve();
      };
  
      recorder.addEventListener("dataavailable", handleDataAvailable);
      recorder.addEventListener("stop", handleStop);
  
      mediaRecorderRef.current = recorder;
      recorder.start();
  
      interval = setInterval(() => {
        sendBufferedData();
      }, 5000);
    });
  };
  
  
  // 소켓 전송을 위한 Blob to Base64에 기반한 String 인코딩
  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // // 소켓 전송을 위한 Base64에 기반한 String to Blob 디코딩
  // function base64ToBlob(base64String, mimeType) {
  //   const byteCharacters = atob(base64String);
  //   const byteArrays = [];
  //   for (let i = 0; i < byteCharacters.length; i++) {
  //     byteArrays.push(byteCharacters.charCodeAt(i));
  //   }
  //   const byteArray = new Uint8Array(byteArrays);
  //   return new Blob([byteArray], { type: mimeType });
  // }

  const sendBufferedData = () => {
    if (chunksRef.current.length > 0) {
      const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });

      // 서버로 audioBlob을 전송하는 코드를 작성하세요.
      // 예를 들어, fetch를 사용한다면:
      // const formData = new FormData();
      // formData.append("audioChunk", audioBlob);
      // fetch("/upload-audio-chunk", {
      //   method: "POST",
      //   body: formData,
      // });

      chunksRef.current = [];
    }
  };

  const startRecording = async () => {
    setIsRecording(true);
  
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      await handleSuccess(stream);
      console.log("Recording completed.");
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };
  
  
  const stopRecording = () => {
    setIsRecording(false);
  
    console.log("stopped!");
    console.log(mediaRecorderRef.current?.state); // mediaRecorder 상태를 확인합니다.
  
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  
    clearInterval(interval);
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
        disabled={!audioDataRef.current}
        onClick={() => {
          const url = URL.createObjectURL(audioDataRef.current);
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

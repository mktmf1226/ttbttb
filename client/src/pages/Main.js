import React, { useEffect, useState, useRef } from "react";
import socket from "../utils/socket";
import axios from "axios";

import createFileName from "../utils/createFileName";
import Display from "./Display";

const Main = () => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  //   const audioDataRef = useRef(null);
  const [audioDataRef, setAudioDataRef] = useState(null);
  const [whisperResult, setWhisperResult] = useState("");
  const [spellsResult, setSpellsResult] = useState("");
  const [allResult, setAllResult] = useState([]);

  // 소켓으로 받아오는 정보 처리
  useEffect(() => {
    socket.on("recStart", startRecording);
    socket.on("recEnd", stopRecording);
    socket.on("dbSave", showAllSpells);
    socket.on("discard", deleteOneAndShowAllSpells);
    socket.on("saveFile", createDownloadFile);

    return () => {
      socket.off("recStart", startRecording);
      socket.off("recEnd", stopRecording);
      socket.off("dbSave", showAllSpells);
      socket.off("discard", deleteOneAndShowAllSpells);
      socket.off("saveFile", createDownloadFile);
    };
  }, []);

  useEffect(() => {
    // console.log("chunksRef.current", chunksRef.current);
    // console.log("allResult", allResult);
  }, [allResult]);

  const handleSuccess = (stream) => {
    return new Promise((resolve, reject) => {
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });

      const handleDataAvailable = (event) => {
        chunksRef.current.push(event.data);
        console.log(chunksRef.current);
      };

      const handleStop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });

        // 파일 저장 및 서버로 전송
        const fileName = createFileName();

        const filePath = `./public/audio/${fileName}`;

        const formData = new FormData();
        formData.append("file", audioBlob, filePath);
        console.log("file created at", filePath);

        try {
          const response1 = await axios.post("/transcribe/sendAudio", formData);
          // console.log("File uploaded successfully:", response.data);
          setWhisperResult(response1.data.whisperResult);

          // 맞춤법 검사 api로 보내기
          const response2 = await axios.post("/transcribe/sendSpells", {
            sentence: response1.data.whisperResult,
          });
          // console.log("11",response2.data.spellsResult);
          setSpellsResult(response2.data.spellsResult);

          // audioDataRef.current = audioBlob;
          setAudioDataRef(audioBlob);
          chunksRef.current = [];
        } catch (error) {
          console.error("Error uploading file:", error);
        }
        resolve();
      };

      recorder.addEventListener("dataavailable", handleDataAvailable);
      recorder.addEventListener("stop", handleStop);

      mediaRecorderRef.current = recorder;
      recorder.start();
    });
  };

  const startRecording = async () => {
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

  const stopRecording = () => {
    console.log("recEnd event received");

    setIsRecording(false);

    // console.log(mediaRecorderRef.current?.state);

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }
  };

  // dbSave
  const showAllSpells = async () => {
    console.log("dbSave");

    try {
      const response = await axios.get("/transcribe/selectAllSpells");
      console.log(response.data);

      const data = response.data.map((item) => {
        return item.check;
      });
      setAllResult(data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  // discard
  const deleteOneAndShowAllSpells = async () => {
    console.log("discard");

    try {
      const response = await axios.delete("/transcribe/delete");
      console.log(response.data);

      const data = response.data.map((item) => {
        return item.check;
      });
      setAllResult(data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  // saveFile
  const createDownloadFile = () => {
    console.log("saveFile");

    // 다운로드 링크 생성
    function downloadFile(content, filename) {
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    // 서버에서 받은 문자열과 파일명을 사용하여 다운로드 링크를 생성합니다.
    const serverResponse = "This is the content of the file.";
    const fileName = "example.txt";
    downloadFile(serverResponse, fileName);
  };

  return (
    <div className='Main'>
      <button disabled={isRecording} onClick={startRecording}>
        녹음 시작
      </button>
      <button disabled={!isRecording} onClick={stopRecording}>
        녹음 중지
      </button>
      <button
        // disabled={!audioDataRef.current}
        disabled={!audioDataRef}
        onClick={() => {
          //   const url = URL.createObjectURL(audioDataRef.current);
          const url = URL.createObjectURL(audioDataRef);
          const link = document.createElement("a");
          link.href = url;
          link.download = "recorded_audio.webm";
          link.click();
        }}
      >
        녹음파일 다운로드
      </button>
      <Display
        whisperResult={whisperResult}
        spellsResult={spellsResult}
        allResult={allResult}
      />
    </div>
  );
};

export default Main;

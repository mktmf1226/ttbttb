import React, { useEffect, useState, useRef } from "react";
import socket from "../utils/socket";
import axios from "axios";

import createFileName from "../utils/createFileName";
import Display from "./Display";

const Section = () => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  //   const audioDataRef = useRef(null);
  const [audioDataRef, setAudioDataRef] = useState(null);
  const [whisperResult, setWhisperResult] = useState("");
  const [spellsResult, setSpellsResult] = useState("");

  // 소켓으로 받아오는 정보 처리
  useEffect(() => {
    socket.on("recStart", startRecording);
    socket.on("recEnd", stopRecording);

    return () => {
      socket.off("recStart", startRecording);
      socket.off("recEnd", stopRecording);
    };
  }, []);

  useEffect(() => {
    // console.log("chunksRef.current", chunksRef.current);
  }, [whisperResult]);

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

    console.log(mediaRecorderRef.current?.state);

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }
  };
  return (
    <section className="text-gray-600 body-font">
      <div className="container flex flex-col items-center justify-center px-5 py-24 mx-auto">
        <div className="w-full text-center lg:w-2/3">
          <h1 className="mb-4 text-3xl font-medium text-gray-900 title-font sm:text-4xl">
            또박또박 STT 서비스
          </h1>
          <p className="mb-8 leading-relaxed">또박또박 STT 서비스 설명</p>
          <div className="flex justify-center mb-5">
            <button
              className="inline-flex px-6 py-2 text-lg text-white bg-green-500 border-0 rounded focus:outline-none hover:bg-green-600"
              disabled={isRecording}
              onClick={startRecording}
            >
              녹음 시작
            </button>
            <button
              className="inline-flex px-6 py-2 ml-4 text-lg text-gray-700 bg-gray-100 border-0 rounded focus:outline-none hover:bg-gray-200"
              disabled={!isRecording}
              onClick={stopRecording}
            >
              녹음 중지
            </button>
            <button
              className="inline-flex px-6 py-2 ml-4 text-lg text-white bg-green-500 border-0 rounded focus:outline-none hover:bg-green-600"
              disabled={!audioDataRef}
              onClick={() => {
                const url = URL.createObjectURL(audioDataRef);
                const link = document.createElement("a");
                link.href = url;
                link.download = "recorded_audio.webm";
                link.click();
              }}
            >
              파일 다운
            </button>
          </div>
          {/* <div>
            <button
              className="inline-flex px-6 py-2 mb-5 ml-4 text-lg text-white bg-green-500 border-0 rounded focus:outline-none hover:bg-green-600"
              disabled={isRecording}
              onClick={startRecording}
            >
              녹음파일 다운로드
            </button>
          </div> */}
          <Display whisperResult={whisperResult} spellsResult={spellsResult} />
        </div>
        {/* <img
          className="object-cover object-center w-5/6 mb-10 rounded lg:w-2/6 md:w-3/6"
          alt="hero"
          src="https://dummyimage.com/720x600"
        /> */}
      </div>
    </section>
  );
};

export default Section;

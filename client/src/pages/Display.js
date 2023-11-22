// import React, { useState } from "react";

export default function Display(props) {
  // const [whisperResult, setWhisperResult] = useState("");
  const { whisperResult } = props;
  const { spellsResult } = props;
  const { allResult } = props;
  const { isRecording } = props;

  if (isRecording) {
    return <div>녹음 중...!</div>;
  }
  return (
    <>
      <div className="Display">
        <div>
          {!whisperResult && !spellsResult ? (
            <></>
          ) : (
            <div className="p-5">
              <div className="mb-5">
                <p className="font-semibold">녹음 결과</p>
                <p>{whisperResult}</p>
              </div>
              <div className="mb-5">
                <p className="font-semibold">맞춤법 검사</p>
                <p>{spellsResult}</p>
              </div>
            </div>
          )}
        </div>
        <div>
          {/* {console.log("allResult", allResult)} */}
          {!allResult || allResult.length === 0 ? (
            <></>
          ) : (
            <>
              <div>
                <p className="mb-3 font-semibold">전체 문서</p>
                {/* <p>{allResult}</p> */}
                <div className="flex flex-col items-start p-3 border-4 border-double rounded-lg bg-stone-100">
                  {allResult.map((e, i) => (
                    <p key={i}>{e}</p>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

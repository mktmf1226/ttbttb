// import React, { useState } from "react";

export default function Display(props) {
  // const [whisperResult, setWhisperResult] = useState("");
  const { whisperResult } = props;
  const { spellsResult } = props;
  const { allResult } = props;

  return (
    <>
      <div className="Display">
        <div>
          {!whisperResult && !spellsResult ? (
            <></>
          ) : (
            <>
              <div>
                <p>녹음 중:</p>
                <p>{whisperResult}</p>
              </div>
              <div>
                <p>맞춤법 검사:</p>
                <p>{spellsResult}</p>
              </div>
              <div>
                <p>전체 문서:</p>
                <p>{allResult}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

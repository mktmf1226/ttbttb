import React, { useState } from "react";

export default function Display(props) {
    // const [whisperResult, setWhisperResult] = useState("");
    const { whisperResult } = props;
    const { spellsResult } = props;

  return (
    <>
      <div className='Display'>
        <div>
            <p>{whisperResult}</p>
            <p>{spellsResult}</p>
        </div>
      </div>
    </>
  );
}



import React, { useState } from "react";
import { startAudioCapture } from "../utils/captureAudio";

const Popup = () => {
  const [capturing, setCapturing] = useState(false);

  const handleToggle = () => {
    if (!capturing) {
      startAudioCapture();
    }
    setCapturing(!capturing);
  };

  return (
    <div className="p-4 w-64 text-center">
      <h1 className="text-lg font-bold">🎧 WebWhisper</h1>
      <button
        onClick={handleToggle}
        className="mt-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        {capturing ? "Stop Capture" : "Start Capture"}
      </button>
    </div>
  );
};

export default Popup;



// background.ts

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "capture-audio") {
    chrome.tabCapture.capture({ audio: true, video: false }, (stream) => {
      if (!stream) {
        console.error("Failed to capture tab audio:", chrome.runtime.lastError);
        return;
      }

      console.log("Captured tab audio stream:", stream);

      // Audio context test
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      setInterval(() => {
        analyser.getByteFrequencyData(dataArray);
        const avg =
          dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        console.log("Audio level:", avg);
      }, 500);
    });
  }
});


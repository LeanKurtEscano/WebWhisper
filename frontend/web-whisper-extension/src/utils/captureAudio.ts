export function startAudioCapture() {
  chrome.runtime.sendMessage({ type: "START_CAPTURE" }, (response) => {
    if (response?.success) {
      console.log("Audio capture started ✅");
    } else {
      console.error("Failed to capture audio ❌");
    }
  });
}

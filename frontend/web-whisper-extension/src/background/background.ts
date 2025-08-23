


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "START_CAPTURE") {
    chrome.tabCapture.capture({ audio: true, video: false }, (stream) => {
      if (stream) {
        console.log("Captured stream:", stream);
        sendResponse({ success: true });
      } else {
        sendResponse({ success: false });
      }
    });
    return true; 
  }
});

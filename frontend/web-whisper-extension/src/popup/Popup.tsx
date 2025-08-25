import React, { useState, useEffect } from "react";
import { Mic, MicOff, Volume2, Settings, FileText, AlertCircle, CheckCircle } from "lucide-react";

type Status = "idle" | "capturing" | "processing" | "completed" | "error";

interface PopupState {
  capturing: boolean;
  processing: boolean;
  summary: string;
  audioLevel: number;
  status: Status;
  tabTitle: string;
  duration: number;
}

const Popup: React.FC = () => {
  const [capturing, setCapturing] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>("");
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [status, setStatus] = useState<Status>("idle");
  const [tabTitle, setTabTitle] = useState<string>("Current Tab");
  const [duration, setDuration] = useState<number>(0);

  // Simulate audio level animation when capturing
  useEffect((): (() => void) => {
    // @ts-ignore
    let interval: NodeJS.Timeout;
    if (capturing) {
      interval = setInterval((): void => {
        setAudioLevel(Math.random() * 100);
        setDuration((prev: number) => prev + 1);
      }, 100);
    } else {
      setAudioLevel(0);
    }
    return (): void => {
      if (interval) clearInterval(interval);
    };
  }, [capturing]);

  const handleToggle = async (): Promise<void> => {
    if (!capturing) {
      setStatus("capturing");
      setCapturing(true);
      setDuration(0);
      setSummary("");
      chrome.runtime.sendMessage({ action: "capture-audio" });
    } else {

      //for simulation only after listening
      setCapturing(false);
      setStatus("processing");
      setProcessing(true);
      
      setTimeout((): void => {
        setProcessing(false);
        setStatus("completed");
        setSummary("This is a sample summary of the captured audio. The AI has processed the audio content and generated this concise summary of the main points discussed in the video or audio content.");
      }, 3000);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins: number = Math.floor(seconds / 60);
    const secs: number = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (): string => {
    switch (status) {
      case "capturing": return "text-red-500";
      case "processing": return "text-yellow-500";
      case "completed": return "text-green-500";
      case "error": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getStatusIcon = (): React.ReactNode => {
    switch (status) {
      case "capturing": return <Mic className="w-4 h-4" />;
      case "processing": return <div className="animate-spin w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full" />;
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "error": return <AlertCircle className="w-4 h-4" />;
      default: return <MicOff className="w-4 h-4" />;
    }
  };

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(summary);
      // Could add a toast notification here
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const handleSave = (): void => {
    // Implement save functionality
    console.log('Saving summary:', summary);
  };

  const handleSettings = (): void => {
    // Implement settings functionality
    console.log('Opening settings');
  };

  return (
    <div className="w-80 bg-gray-900 text-white font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/10 rounded-lg">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-lg">WebWhisper</h1>
              <p className="text-xs text-blue-100">AI Audio Summarizer</p>
            </div>
          </div>
          <button 
            onClick={handleSettings}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className={getStatusColor()}>
              {getStatusIcon()}
            </div>
            <span className="capitalize text-gray-300">
              {status === "idle" ? "Ready" : status}
            </span>
          </div>
          {capturing && (
            <div className="text-gray-400">
              {formatTime(duration)}
            </div>
          )}
        </div>
        
        {/* Audio Level Visualization */}
        {capturing && (
          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: 20 }, (_, i: number) => (
              <div
                key={i}
                className={`h-1 w-2 rounded-full transition-colors ${
                  i < (audioLevel / 100) * 20 ? 'bg-red-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Current Tab Info */}
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FileText className="w-4 h-4" />
            <span>Capturing from:</span>
          </div>
          <p className="text-sm font-medium mt-1 truncate">{tabTitle}</p>
        </div>

        {/* Control Button */}
        <button
          onClick={handleToggle}
          disabled={processing}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            capturing
              ? "bg-red-600 hover:bg-red-700 text-white"
              : processing
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg"
          }`}
          aria-label={capturing ? "Stop and summarize" : "Start capture"}
        >
          <div className="flex items-center justify-center gap-2">
            {processing ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full" />
                Processing...
              </>
            ) : capturing ? (
              <>
                <MicOff className="w-4 h-4" />
                Stop & Summarize
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                Start Capture
              </>
            )}
          </div>
        </button>

        {/* Summary Section */}
        {(summary || processing) && (
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-blue-400" />
              <h3 className="font-medium text-blue-400">AI Summary</h3>
            </div>
            
            {processing ? (
              <div className="space-y-2">
                <div className="h-3 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-700 rounded animate-pulse w-4/5"></div>
                <div className="h-3 bg-gray-700 rounded animate-pulse w-3/5"></div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-300 leading-relaxed">
                  {summary}
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={handleCopy}
                    className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                    aria-label="Copy summary"
                  >
                    Copy
                  </button>
                  <button 
                    onClick={handleSave}
                    className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                    aria-label="Save summary"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tips */}
        {status === "idle" && (
          <div className="text-xs text-gray-500 bg-gray-800/50 rounded p-3">
            💡 Click "Start Capture" to begin recording audio from this tab. The AI will summarize the content when you stop.
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
import React, { useState, useEffect } from "react";
import { FileText, Settings, Eye, Copy, Save, AlertCircle, CheckCircle, Sparkles, Clock, BarChart3, TrendingUp } from "lucide-react";
import { getStatusColor,getImportanceColor } from "../utils/status";
type Status = "idle" | "extracting" | "processing" | "completed" | "error";

interface KeyPoint {
  title: string;
  importance: "high" | "medium" | "low";
  category: string;
}

interface PopupState {
  extracting: boolean;
  processing: boolean;
  summary: string;
  keyPoints: KeyPoint[];
  status: Status;
  tabTitle: string;
  wordCount: number;
  processingTime: number;
}

const Popup: React.FC = () => {
  const [extracting, setExtracting] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>("");
  const [keyPoints, setKeyPoints] = useState<KeyPoint[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [tabTitle, setTabTitle] = useState<string>("Current Page");
  const [wordCount, setWordCount] = useState<number>(0);
  const [processingTime, setProcessingTime] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"summary" | "keypoints">("summary");

  // Simulate processing timer
  useEffect((): (() => void) => {
    let interval: NodeJS.Timeout;
    if (processing) {
      interval = setInterval((): void => {
        setProcessingTime((prev: number) => prev + 0.1);
      }, 100);
    } else {
      setProcessingTime(0);
    }
    return (): void => {
      if (interval) clearInterval(interval);
    };
  }, [processing]);

  const handleAnalyze = async (): Promise<void> => {
    // Reset state
    setSummary("");
    setKeyPoints([]);
    setWordCount(0);
    
    // Step 1: Extract content
    setStatus("extracting");
    setExtracting(true);
    
    // Simulate content extraction
    setTimeout(() => {
      setExtracting(false);
      setWordCount(Math.floor(Math.random() * 2000) + 500);
      
      // Step 2: Process with AI
      setStatus("processing");
      setProcessing(true);
      
      // Simulate AI processing
      setTimeout((): void => {
        setProcessing(false);
        setStatus("completed");
        
        // Mock results
        setSummary("This comprehensive article explores the rapidly evolving landscape of artificial intelligence and machine learning technologies. The content delves into breakthrough developments in natural language processing, examining how large language models are revolutionizing various industries from healthcare to finance. Key technical advances include improvements in model efficiency, reduced computational requirements, and enhanced reasoning capabilities. The piece also addresses critical ethical considerations surrounding AI deployment, including bias mitigation, privacy concerns, and the importance of responsible AI governance frameworks.");
        
        setKeyPoints([
          {
            title: "Large language models are achieving near-human performance in complex reasoning tasks",
            importance: "high",
            category: "Technology"
          },
          {
            title: "Healthcare AI applications are reducing diagnostic errors by 40%",
            importance: "high",
            category: "Healthcare"
          },
          {
            title: "New efficiency algorithms reduce model training costs by 60%",
            importance: "medium",
            category: "Economics"
          },
          {
            title: "Ethical AI frameworks becoming mandatory for enterprise deployment",
            importance: "high",
            category: "Ethics"
          },
          {
            title: "Edge computing enables real-time AI processing on mobile devices",
            importance: "medium",
            category: "Technology"
          },
          {
            title: "AI regulatory guidelines expected to be finalized by Q2 2025",
            importance: "medium",
            category: "Regulation"
          }
        ]);
      }, 2500);
    }, 800);
  };



  const getStatusIcon = (): React.ReactNode => {
    switch (status) {
      case "extracting": return <Eye className="w-4 h-4" />;
      case "processing": return <div className="animate-spin w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full" />;
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "error": return <AlertCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };


  const getCategoryColor = (category: string): string => {
    const colors = {
      "Technology": "bg-purple-500/10 text-purple-300",
      "Healthcare": "bg-green-500/10 text-green-300",
      "Economics": "bg-blue-500/10 text-blue-300",
      "Ethics": "bg-orange-500/10 text-orange-300",
      "Regulation": "bg-pink-500/10 text-pink-300"
    };
    return colors[category] || "bg-slate-500/10 text-slate-300";
  };

  const handleCopy = async (): Promise<void> => {
    try {
      const content = activeTab === "summary" 
        ? summary 
        : keyPoints.map(point => `• ${point.title}`).join("\n");
      await navigator.clipboard.writeText(content);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const handleSave = (): void => {
    console.log('Saving content:', { summary, keyPoints, tabTitle });
  };

  const handleSettings = (): void => {
    console.log('Opening settings');
  };

  const isProcessing = extracting || processing;
  const hasResults = status === "completed" && (summary || keyPoints.length > 0);

  return (
    <div className="w-full max-w-sm mx-auto bg-slate-900 text-slate-100 font-sans shadow-2xl border border-slate-700/50 h-screen max-h-[480px] flex flex-col">
     
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h1 className="font-bold text-base">PageWhisper</h1>
              <p className="text-xs text-purple-100/80">AI-Powered Analysis</p>
            </div>
          </div>
          <button 
            onClick={handleSettings}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 hover:scale-105"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

     
      <div className="bg-slate-800/80 backdrop-blur-sm px-3 py-2 border-b border-slate-700/50 flex-shrink-0">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className={getStatusColor(status)}>
              {getStatusIcon()}
            </div>
            <span className="text-slate-300 font-medium">
              {status === "idle" ? "Ready to analyze" : 
               status === "extracting" ? "Reading content..." :
               status === "processing" ? "Analyzing..." :
               "Analysis complete"}
            </span>
          </div>
          {processing && (
            <div className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3 h-3" />
              <span className="font-mono">{processingTime.toFixed(1)}s</span>
            </div>
          )}
        </div>
        
        
        {isProcessing && (
          <div className="mt-2">
            <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  extracting 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 w-1/3' 
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 w-full animate-pulse'
                }`}
              />
            </div>
          </div>
        )}
      </div>

     
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4 space-y-4">
         
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
              <FileText className="w-4 h-4" />
              <span>Current Page</span>
            </div>
            <p className="text-sm font-medium text-slate-200 truncate mb-1">{tabTitle}</p>
            {wordCount > 0 && (
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span>{wordCount.toLocaleString()} words</span>
                <span>•</span>
                <span>~{Math.ceil(wordCount / 200)} min read</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={handleAnalyze}
            disabled={isProcessing}
            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform ${
              isProcessing
                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {isProcessing ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full" />
                  {extracting ? "Extracting..." : "Processing..."}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze Page
                </>
              )}
            </div>
          </button>

          {/* Results Section */}
          {hasResults && (
            <div className="space-y-4">
              {/* Tab Navigation */}
              <div className="flex bg-slate-800/50 rounded-lg p-1 border border-slate-700/50">
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`flex-1 py-2.5 px-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    activeTab === "summary" 
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-sm" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Summary
                </button>
                <button
                  onClick={() => setActiveTab("keypoints")}
                  className={`flex-1 py-2.5 px-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    activeTab === "keypoints" 
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-sm" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  Key Points
                </button>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
                <div className="p-4 border-b border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {activeTab === "summary" ? (
                        <>
                          <FileText className="w-4 h-4 text-violet-400" />
                          <h3 className="font-semibold text-violet-400">AI Summary</h3>
                        </>
                      ) : (
                        <>
                          <TrendingUp className="w-4 h-4 text-fuchsia-400" />
                          <h3 className="font-semibold text-fuchsia-400">Key Points</h3>
                        </>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button 
                        onClick={handleCopy}
                        className="px-2 py-1 text-xs bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 rounded-md transition-colors border border-violet-500/20"
                      >
                        <Copy className="w-3 h-3 inline mr-1" />
                        Copy
                      </button>
                      <button 
                        onClick={handleSave}
                        className="px-2 py-1 text-xs bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-md transition-colors border border-slate-600/50"
                      >
                        <Save className="w-3 h-3 inline mr-1" />
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                
                
                <div className="h-64 overflow-y-auto p-4 custom-scrollbar">
                  {activeTab === "summary" ? (
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {summary}
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {keyPoints.map((point, index) => (
                        <div key={index} className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className={`w-2 h-2 rounded-full ${
                                point.importance === 'high' ? 'bg-red-400' :
                                point.importance === 'medium' ? 'bg-amber-400' : 'bg-blue-400'
                              }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-slate-200 leading-relaxed mb-2">
                                {point.title}
                              </p>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`px-2 py-0.5 text-xs rounded-md border ${getImportanceColor(point.importance)}`}>
                                  {point.importance}
                                </span>
                                <span className={`px-2 py-0.5 text-xs rounded-md ${getCategoryColor(point.category)}`}>
                                  {point.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Helpful Tip */}
          {status === "idle" && (
            <div className="text-xs text-slate-400 bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-300 mb-1">Ready to analyze</p>
                  <p>Extract key insights and generate an AI summary from the current page content.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgb(30 41 59 / 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(100 116 139);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(148 163 184);
        }
      `}</style>
    </div>
  );
};

export default Popup;
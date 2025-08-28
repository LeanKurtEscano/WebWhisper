import React from "react";
import { FileText, Eye, CheckCircle, AlertCircle } from "lucide-react";

// ---------- Status Helpers ----------
export const getStatusColor = (status: string): string => {
  switch (status) {
    case "extracting": return "text-blue-400";
    case "processing": return "text-amber-400";
    case "completed": return "text-emerald-400";
    case "error": return "text-red-400";
    default: return "text-slate-400"; // idle or unknown
  }
};


export const getImportanceColor = (importance: string): string => {
  switch (importance) {
    case "high": return "bg-red-500/20 text-red-300 border-red-500/30";
    case "medium": return "bg-amber-500/20 text-amber-300 border-amber-500/30";
    case "low": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    default: return "bg-slate-500/20 text-slate-300 border-slate-500/30";
  }
};

import React, { useState } from 'react';
import { Receipt, Upload, Eye, Trash2, ArrowRight, Check, AlertCircle, Calculator, Database, FileText, BarChart3, Sparkles, Star, Users, Building } from 'lucide-react';
import { receiptApiClient } from '../config/apiConfig';
const Generate: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState<{[key: string]: string}>({});

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    const newFiles = uploadedFiles.slice(0, 5 - files.length);
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // Generate previews for new files
    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews(prev => ({
          ...prev,
          [file.name]: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    const fileToRemove = files[index];
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => {
      const newPreviews = { ...prev };
      delete newPreviews[fileToRemove.name];
      return newPreviews;
    });
  };

  const handleAnalyze = async () => {
    if (files.length === 0) return;
    
    setIsLoading(true);
    try {
   
      const formData = new FormData();
      files.forEach(file => {
        formData.append('receipts', file);
      });
      
      const response = await receiptApiClient.post('/receipts', formData, {
        headers: {
           'Content-Type': 'multipart/form-data',
        },
      });
      
      if(response.status === 201) {
        // Handle successful response
      }
      
    } catch(error) {
       console.error("Error analyzing receipts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-300/15 to-indigo-500/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-slate-300/15 to-blue-500/15 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-indigo-400/40 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-slate-400/30 rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation Bar */}
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-slate-700 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <Receipt className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
                SmartBooks
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors">
                Analytics
              </button>
              <button className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors">
                Pricing
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-slate-700 to-blue-700 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                Sign In
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-50 to-blue-50 border border-blue-200/50 rounded-full px-4 py-2 mb-8">
            <Calculator className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">AI-Powered Bookkeeping Automation</span>
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-blue-800 bg-clip-text text-transparent mb-6 leading-tight">
            Smart Receipt &<br />
            <span className="relative">
              Invoice Analyzer
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-slate-400 to-blue-400 rounded-full"></div>
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Upload your receipts and invoices to get instant OCR extraction and AI-powered analysis. 
            Automatically categorize, extract data, and maintain organized financial records.
          </p>

          {/* Main Upload Card */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8">
              <div className="text-left mb-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload Receipts & Invoices</h2>
                <p className="text-slate-600">Drag and drop or click to upload up to 5 files (JPG, PNG, PDF)</p>
              </div>

              <div className="space-y-6">
                {/* Upload Zone */}
                <div className="relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={files.length >= 5}
                  />
                  <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                    files.length >= 5 
                      ? 'border-slate-300 bg-slate-50 cursor-not-allowed'
                      : 'border-blue-300 bg-blue-50/50 hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
                  }`}>
                    <Upload className={`w-12 h-12 mx-auto mb-4 ${files.length >= 5 ? 'text-slate-400' : 'text-blue-500'}`} />
                    <p className={`text-lg font-medium mb-2 ${files.length >= 5 ? 'text-slate-500' : 'text-slate-700'}`}>
                      {files.length >= 5 ? 'Maximum files reached' : 'Upload your receipts'}
                    </p>
                    <p className={`text-sm ${files.length >= 5 ? 'text-slate-400' : 'text-slate-500'}`}>
                      {files.length >= 5 
                        ? 'Remove files to upload more'
                        : `${5 - files.length} more files can be uploaded`
                      }
                    </p>
                  </div>
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border">
                        {previews[file.name] && (
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0">
                            <img 
                              src={previews[file.name]} 
                              alt="Preview" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 text-left">
                          <p className="font-medium text-slate-900 text-sm truncate">{file.name}</p>
                          <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={handleAnalyze}
                  disabled={files.length === 0 || isLoading}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-3 ${
                    files.length > 0 && !isLoading
                      ? 'bg-gradient-to-r from-slate-700 to-blue-700 hover:from-slate-800 hover:to-blue-800 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.02]'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing Receipts...
                    </>
                  ) : (
                    <>
                      <Eye className="w-5 h-5" />
                      Analyze Receipts
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-xs text-slate-500 text-center">
                  📊 Free tier includes 50 receipts per month • Automatic data extraction
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-16 opacity-60">
            <span className="text-sm font-medium text-slate-600">Trusted by 10,000+ businesses</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-sm text-slate-600 ml-2">4.9/5 accuracy rating</span>
            </div>
          </div>

          {/* Features Grid */}
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Automated bookkeeping made simple
            </h3>
            <p className="text-slate-600 mb-12 text-lg">
              Advanced OCR and AI technology to streamline your financial workflow
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="group bg-white/60 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-white/50">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-200">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">OCR Extraction</h4>
                <p className="text-slate-600 leading-relaxed">
                  Advanced optical character recognition extracts all text, amounts, dates, and vendor 
                  information from any receipt or invoice format.
                </p>
              </div>
              
              <div className="group bg-white/60 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-white/50">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-slate-500 to-slate-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-200">
                  <Calculator className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">AI Categorization</h4>
                <p className="text-slate-600 leading-relaxed">
                  Intelligent AI automatically categorizes expenses, identifies tax-deductible items, 
                  and suggests proper accounting codes for each transaction.
                </p>
              </div>
              
              <div className="group bg-white/60 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-white/50">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-200">
                  <Database className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">Auto-Storage</h4>
                <p className="text-slate-600 leading-relaxed">
                  Processed data is automatically stored in your database with proper indexing, 
                  making it searchable and ready for reporting and analysis.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-blue-800 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30m-8 0a8,8 0 1,1 16,0a8,8 0 1,1 -16,0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
              </div>
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-2">Streamlining bookkeeping globally</h3>
                  <p className="text-slate-200 text-lg">Join businesses who trust SmartBooks for automated financial record-keeping</p>
                </div>
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold mb-2 flex items-center justify-center gap-1">
                      <Receipt className="w-8 h-8 text-blue-300" />
                      5M+
                    </div>
                    <div className="text-slate-300">Receipts Processed</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2 flex items-center justify-center gap-1">
                      <Building className="w-8 h-8 text-emerald-300" />
                      15K+
                    </div>
                    <div className="text-slate-300">Active Businesses</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">99.2%</div>
                    <div className="text-slate-300">OCR Accuracy</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2 flex items-center justify-center gap-1">
                      <Sparkles className="w-8 h-8 text-amber-300" />
                      90%
                    </div>
                    <div className="text-slate-300">Time Saved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="max-w-6xl mx-auto mt-20">
            <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              Perfect for every business size
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-200/50">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Freelancers</h4>
                <p className="text-sm text-slate-600">Track expenses and organize receipts</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-200/50">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Building className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Small Business</h4>
                <p className="text-sm text-slate-600">Automate expense management</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-200/50">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Accountants</h4>
                <p className="text-sm text-slate-600">Process client documents efficiently</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-200/50">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-amber-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Enterprises</h4>
                <p className="text-sm text-slate-600">Scale financial data processing</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-3xl mx-auto mt-20 text-center">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Ready to automate your bookkeeping?
            </h3>
            <p className="text-xl text-slate-600 mb-8">
              Join thousands of businesses using SmartBooks to transform their financial record-keeping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-slate-700 to-blue-700 text-white font-bold rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1">
                Start Free Trial
              </button>
              <button className="px-8 py-4 border-2 border-slate-300 text-slate-700 font-bold rounded-2xl hover:border-slate-400 hover:bg-slate-50 transition-all">
                View Demo
              </button>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              Trusted by businesses from startups to Fortune 500 companies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;
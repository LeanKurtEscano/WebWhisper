import React, { useState } from 'react';
import { BookOpen, Brain, Search, Download, ArrowRight, Check, AlertCircle, Lightbulb, FileText, BarChart3, Sparkles, Star, Users } from 'lucide-react';
import { scraperApiClient } from '../config/apiConfig';

const Generate: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const validateUrl = (input: string) => {
    try {
      new URL(input);
      return input.startsWith('http://') || input.startsWith('https://');
    } catch {
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    setIsValid(validateUrl(value));
  };

  const handleGenerate = async () => {
    if (!isValid) return;
    
    setIsLoading(true);
    try {
      const response = await scraperApiClient.post('/insights', {url: url });
      if(response.status === 200) {
    
      }

    } catch(error) {
       console.error("Error fetching insights:", error);
    }
 
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
                PageWhisper
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors">
                Research Tools
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
            <Brain className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">AI-Powered Research Intelligence</span>
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-blue-800 bg-clip-text text-transparent mb-6 leading-tight">
            Your Research Assistant            <br />
            <span className="relative">
              Assistant
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-slate-400 to-blue-400 rounded-full"></div>
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Transform any webpage into structured insights. PageWhisper analyzes, summarizes, and extracts 
            key information to accelerate your research and decision-making process.
          </p>

          {/* Main Research Card */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8">
              <div className="text-left mb-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Analyze Any Webpage</h2>
                <p className="text-slate-600">Enter a URL to get AI-powered insights and structured analysis</p>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="relative">
                    <input
                      type="url"
                      value={url}
                      onChange={handleUrlChange}
                      placeholder="https://research-article.com"
                      className={`w-full px-6 py-4 pr-12 text-lg border-2 rounded-2xl transition-all duration-200 focus:outline-none ${
                        url && isValid 
                          ? 'border-green-300 bg-green-50/50 focus:border-green-500' 
                          : url && !isValid 
                          ? 'border-red-300 bg-red-50/50 focus:border-red-500'
                          : 'border-slate-200 bg-slate-50/50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100'
                      }`}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      {url && isValid && <Check className="w-6 h-6 text-green-500" />}
                      {url && !isValid && <AlertCircle className="w-6 h-6 text-red-500" />}
                    </div>
                  </div>
                  {url && !isValid && (
                    <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Please enter a valid URL starting with http:// or https://
                    </p>
                  )}
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!isValid || isLoading}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-3 ${
                    isValid && !isLoading
                      ? 'bg-gradient-to-r from-slate-700 to-blue-700 hover:from-slate-800 hover:to-blue-800 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.02]'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing Content...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Start Analysis
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-xs text-slate-500 text-center">
                  📚 Free tier includes 50 analyses per month • No credit card required
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-16 opacity-60">
            <span className="text-sm font-medium text-slate-600">Trusted by researchers at 500+ institutions</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-sm text-slate-600 ml-2">4.8/5 researcher rating</span>
            </div>
          </div>

          {/* Features Grid */}
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Advanced research capabilities at your fingertips
            </h3>
            <p className="text-slate-600 mb-12 text-lg">
              Powered by cutting-edge AI to enhance your research workflow
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="group bg-white/60 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-white/50">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-200">
                  <Lightbulb className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">Smart Insights</h4>
                <p className="text-slate-600 leading-relaxed">
                  AI extracts key findings, main arguments, and critical data points from any webpage. 
                  Get instant understanding of complex content.
                </p>
              </div>
              
              <div className="group bg-white/60 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-white/50">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-slate-500 to-slate-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-200">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">Research Summaries</h4>
                <p className="text-slate-600 leading-relaxed">
                  Generate comprehensive summaries with citations, methodology analysis, 
                  and structured takeaways for academic and professional research.
                </p>
              </div>
              
              <div className="group bg-white/60 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-white/50">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-200">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">Data Visualization</h4>
                <p className="text-slate-600 leading-relaxed">
                  Transform textual information into charts, graphs, and visual insights. 
                  Make complex data accessible and presentation-ready.
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
                  <h3 className="text-3xl font-bold mb-2">Accelerating research worldwide</h3>
                  <p className="text-slate-200 text-lg">Join academics, analysts, and researchers who trust PageWhisper</p>
                </div>
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold mb-2 flex items-center justify-center gap-1">
                      <FileText className="w-8 h-8 text-blue-300" />
                      2M+
                    </div>
                    <div className="text-slate-300">Pages Analyzed</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2 flex items-center justify-center gap-1">
                      <Users className="w-8 h-8 text-emerald-300" />
                      25K+
                    </div>
                    <div className="text-slate-300">Active Researchers</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">95%</div>
                    <div className="text-slate-300">Accuracy Rate</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2 flex items-center justify-center gap-1">
                      <Sparkles className="w-8 h-8 text-amber-300" />
                      80%
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
              Perfect for every type of researcher
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-200/50">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Academics</h4>
                <p className="text-sm text-slate-600">Literature reviews and research synthesis</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-200/50">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Analysts</h4>
                <p className="text-sm text-slate-600">Market research and trend analysis</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-200/50">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Consultants</h4>
                <p className="text-sm text-slate-600">Client research and industry insights</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-200/50">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-6 h-6 text-amber-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Journalists</h4>
                <p className="text-sm text-slate-600">Fact-checking and source analysis</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-3xl mx-auto mt-20 text-center">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Ready to accelerate your research?
            </h3>
            <p className="text-xl text-slate-600 mb-8">
              Join thousands of researchers using PageWhisper to transform how they analyze and understand web content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-slate-700 to-blue-700 text-white font-bold rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1">
                Start Free Research
              </button>
              <button className="px-8 py-4 border-2 border-slate-300 text-slate-700 font-bold rounded-2xl hover:border-slate-400 hover:bg-slate-50 transition-all">
                View Demo
              </button>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              Used by researchers at Harvard, MIT, Stanford, and 500+ other institutions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;
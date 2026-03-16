import React, { useState } from 'react';
import { Card } from '../components/Card';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Search, 
  Zap,
  ArrowRight,
  Target,
  FileCheck,
  Shield,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';

export const ProposalReview: React.FC = () => {
  const { branding, deals } = useApp();
  const { showToast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedDealId, setSelectedDealId] = useState(deals[0]?.id || '');
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setShowAnalysis(false);
    showToast("Uploading and auditing proposal...", "info");
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowAnalysis(true);
      showToast("Proposal analysis complete!", "success");
    }, 3000);
  };

  const analysisResults = {
    score: 64,
    strengths: [
      "Excellent technical specification for guard tour system",
      "Clear pricing breakdown for armed vs unarmed services",
      "Strong company background and insurance documentation"
    ],
    weaknesses: [
      "Value proposition is too generic; doesn't mention the client's specific vandalism issues",
      "Executive summary is too long (3 pages); should be 1 page",
      "Missing specific response time SLAs for the parking lot patrol"
    ],
    aiSuggestions: [
      "Rewrite paragraph 4 to specifically mention the '3x monthly vandalism' pain point identified in discovery.",
      "Move the 'Technology Integration' section before the 'Pricing' section to build more value.",
      "Add a 'Performance Guarantee' clause to differentiate from the incumbent provider."
    ]
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Proposal Review</h1>
          <p className="text-slate-400 text-sm mt-1">AI-powered audit for security service proposals.</p>
        </div>
        <div className="flex gap-3">
           <select 
              value={selectedDealId}
              onChange={(e) => setSelectedDealId(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              style={{ '--tw-ring-color': branding.primaryColor } as React.CSSProperties}
           >
             {deals.map(deal => (
               <option key={deal.id} value={deal.id}>{deal.title}</option>
             ))}
           </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <Card className="lg:col-span-1 flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-slate-800 bg-slate-900/20">
          <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 text-slate-400">
            <Upload size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-2">Upload Proposal Draft</h3>
          <p className="text-slate-500 text-sm max-w-xs mb-8">
            Upload your PDF or Word proposal to get an instant AI audit and value-framing score.
          </p>
          <button 
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95 text-white disabled:opacity-50`}
            style={{ backgroundColor: branding.primaryColor }}
          >
            {isAnalyzing ? (
              <RefreshCw size={18} className="animate-spin" />
            ) : (
              <FileText size={18} />
            )}
            {isAnalyzing ? 'Analyzing...' : 'Analyze Proposal'}
          </button>
        </Card>

        {/* Analysis Results */}
        <div className="lg:col-span-2 space-y-6">
          {!showAnalysis && !isAnalyzing ? (
            <div className="h-full flex flex-col items-center justify-center p-12 border border-slate-800 rounded-2xl text-slate-500 bg-slate-900/10">
              <Search size={48} className="mb-4 opacity-20" />
              <p className="text-lg font-medium">Proposal audit results will appear here</p>
              <p className="text-sm">Upload a draft to see how it stacks up against client needs.</p>
            </div>
          ) : isAnalyzing ? (
            <div className="h-full flex flex-col items-center justify-center p-12 border border-slate-800 rounded-2xl bg-slate-900/40">
              <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-6" />
              <p className="text-lg font-bold text-slate-200">AI Audit in Progress</p>
              <p className="text-sm text-slate-400">Scanning for compliance and value-framing gaps...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Proposal Strength Score" icon={<TrendingUp size={18} />}>
                  <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="transition-all duration-1000"
                                style={{ stroke: branding.primaryColor, strokeDasharray: 251.2, strokeDashoffset: 251.2 - (251.2 * analysisResults.score) / 100 }} />
                      </svg>
                      <span className="absolute text-xl font-bold text-white">{analysisResults.score}%</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Your proposal is <span className="text-white font-bold">above average</span> but lacks specific value framing for this client's pain points.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card title="Key Strengths" icon={<CheckCircle2 size={18} className="text-emerald-400" />}>
                  <ul className="space-y-3">
                    {analysisResults.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <Card title="Critical Weaknesses" icon={<AlertCircle size={18} className="text-rose-400" />}>
                <div className="space-y-3">
                  {analysisResults.weaknesses.map((w, i) => (
                    <div key={i} className="p-3 rounded-lg bg-rose-500/5 border border-rose-500/10 text-sm text-slate-300 flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                        !
                      </div>
                      {w}
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="AI Content Suggestions" icon={<Zap size={18} className="text-indigo-400" />}>
                <div className="space-y-3">
                  {analysisResults.aiSuggestions.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 group hover:border-indigo-500/30 transition-all">
                      <p className="text-sm text-slate-200 font-medium">{s}</p>
                      <ArrowRight size={16} className="text-indigo-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* How it works section */}
      <Card title="How Proposal AI Works" icon={<Info size={18} />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-blue-400">
              <FileCheck size={24} />
            </div>
            <h4 className="font-bold text-slate-100">Semantic Audit</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              We analyze the language of your proposal to ensure it matches the professional tone and technical requirements expected in enterprise security.
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-emerald-400">
              <Target size={24} />
            </div>
            <h4 className="font-bold text-slate-100">Pain Point Alignment</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              The AI cross-references your proposal against the discovery call notes to verify that every identified client pain point is addressed with a solution.
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-rose-400">
              <Shield size={24} />
            </div>
            <h4 className="font-bold text-slate-100">Compliance Check</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              We automatically verify that all required legal, insurance, and certification documents are mentioned and correctly positioned in the proposal.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

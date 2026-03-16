import React, { useState } from 'react';
import { Card } from '../components/Card';
import { 
  Heart, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingDown, 
  TrendingUp, 
  Clock, 
  Users, 
  ShieldCheck,
  Zap,
  ArrowRight,
  Info,
  Activity,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';

export const DealHealthChecker: React.FC = () => {
  const { branding, deals } = useApp();
  const { showToast } = useToast();
  const [selectedDealId, setSelectedDealId] = useState(deals[0]?.id || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const selectedDeal = deals.find(d => d.id === selectedDealId);

  const handleRunCheck = () => {
    setIsAnalyzing(true);
    setShowAnalysis(false);
    showToast("Running predictive health audit...", "info");
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowAnalysis(true);
      showToast("Health check complete!", "success");
    }, 2500);
  };

  const healthData = {
    score: 72,
    status: 'Healthy',
    risks: [
      { type: 'Stakeholder', message: 'No direct contact with the CFO yet.', severity: 'medium' },
      { type: 'Timeline', message: 'Decision date has slipped twice in 30 days.', severity: 'high' },
      { type: 'Competition', message: 'Incumbent provider has a 10-year relationship.', severity: 'low' }
    ],
    positiveSignals: [
      "Facility Manager has attended 3 demos.",
      "Technical requirements are 100% aligned with our tech stack.",
      "Client requested a site visit for next Tuesday."
    ],
    actionPlan: [
      "Schedule a brief intro call with the CFO to discuss ROI.",
      "Confirm the new decision timeline in writing by EOD.",
      "Prepare a 'Transition Success Plan' to mitigate incumbent relationship risk."
    ]
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Deal Health Checker</h1>
          <p className="text-slate-400 text-sm mt-1">Predictive risk analysis for your active security deals.</p>
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
           <button 
            onClick={handleRunCheck}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-lg active:scale-95 text-white disabled:opacity-50"
            style={{ backgroundColor: branding.primaryColor }}
          >
            {isAnalyzing ? <RefreshCw size={18} className="animate-spin" /> : <Heart size={18} />}
            {isAnalyzing ? 'Analyzing...' : 'Run Health Check'}
          </button>
        </div>
      </div>

      {isAnalyzing ? (
        <div className="flex flex-col items-center justify-center p-20 border border-slate-800 rounded-3xl bg-slate-900/40">
          <div className="w-20 h-20 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-8" />
          <h3 className="text-xl font-bold text-slate-200">AI Health Audit in Progress</h3>
          <p className="text-sm text-slate-400">Scanning CRM data, stakeholder engagement, and timeline velocity...</p>
        </div>
      ) : !showAnalysis ? (
        <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-slate-800 rounded-3xl text-slate-500 bg-slate-900/10">
          <Heart size={64} className="mb-6 opacity-10" />
          <h3 className="text-xl font-bold text-slate-300">Select a deal to check its health</h3>
          <p className="text-sm mt-2">Our AI will analyze engagement, stakeholders, and timeline risks.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Health Score */}
          <Card className="lg:col-span-1 flex flex-col items-center justify-center py-10 text-center">
            <div className="relative w-40 h-40 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="transition-all duration-1000"
                        style={{ stroke: branding.primaryColor, strokeDasharray: 439.8, strokeDashoffset: 439.8 - (439.8 * healthData.score) / 100 }} />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-white">{healthData.score}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Health Score</span>
              </div>
            </div>
            <div className="px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-4">
              {healthData.status}
            </div>
            <p className="text-sm text-slate-400 max-w-[200px]">
              This deal is trending <span className="text-emerald-400 font-bold">upward</span> since last week.
            </p>
          </Card>

          {/* Risk Indicators */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Risk Indicators" icon={<AlertTriangle size={18} className="text-rose-400" />}>
                <div className="space-y-4">
                  {healthData.risks.map((risk, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        risk.severity === 'high' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 
                        risk.severity === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                      }`} />
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">{risk.type}</p>
                        <p className="text-sm text-slate-200">{risk.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Positive Signals" icon={<CheckCircle2 size={18} className="text-emerald-400" />}>
                <div className="space-y-4">
                  {healthData.positiveSignals.map((signal, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={12} />
                      </div>
                      <p className="text-sm text-slate-300">{signal}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card title="AI Strategic Action Plan" icon={<Zap size={18} className="text-indigo-400" />}>
              <div className="space-y-3">
                {healthData.actionPlan.map((action, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 group hover:border-indigo-500/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                      <p className="text-sm text-slate-200 font-medium">{action}</p>
                    </div>
                    <ArrowRight size={16} className="text-indigo-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Analysis Methodology */}
      <Card title="How Deal Health is Calculated" icon={<Info size={18} />}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <Users size={20} className="text-blue-400 mb-3" />
            <h5 className="text-sm font-bold text-slate-100 mb-1">Stakeholder Depth</h5>
            <p className="text-xs text-slate-500 leading-relaxed">
              We analyze the number and seniority of contacts engaged in the deal vs. typical enterprise security buying committees.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <Clock size={20} className="text-amber-400 mb-3" />
            <h5 className="text-sm font-bold text-slate-100 mb-1">Velocity & Momentum</h5>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tracking the time between stages and frequency of interactions to detect stalls or accelerated interest.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <ShieldCheck size={20} className="text-emerald-400 mb-3" />
            <h5 className="text-sm font-bold text-slate-100 mb-1">Qualification Fit</h5>
            <p className="text-xs text-slate-500 leading-relaxed">
              Matching client requirements against our specific service types and technology capabilities.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <TrendingUp size={20} className="text-indigo-400 mb-3" />
            <h5 className="text-sm font-bold text-slate-100 mb-1">Sentiment Analysis</h5>
            <p className="text-xs text-slate-500 leading-relaxed">
              AI-driven analysis of email and call notes to detect subtle shifts in client tone or urgency.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

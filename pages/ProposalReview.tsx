import React, { useState } from 'react';
import { Card, CardHeader } from '../components/Card';
import { ScoreGauge } from '../components/ScoreGauge';
import { FileText, Zap, XCircle, Check, Copy } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ProposalReview: React.FC = () => {
  const { showToast } = useToast();
  const [proposalText, setProposalText] = useState('');
  const [clientType, setClientType] = useState('Corporate');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = () => {
    if (!proposalText.trim()) return;

    setIsAnalyzing(true);
    setResult(null);
    
    // Simulate API processing time
    setTimeout(() => {
        const textLen = proposalText.length;
        const score = textLen > 100 ? 8.2 : 5.4;
        
      setResult({
        score: score,
        weakAreas: [
          'Value proposition is generic ("we are the best") rather than specific outcomes.',
          `Lack of social proof or relevant case studies for a ${clientType} client.`,
          'Technical jargon used without explanation.'
        ],
        missingInfo: [
          'Detailed training protocols for specific site risks.',
          'Clear escalation path for emergencies.'
        ],
        improvements: [
          'Change "We provide guards" to "We provide risk mitigation specialists".',
          'Add a specific section on your mobile reporting app technology.'
        ],
        improvedSnippet: "Instead of focusing on hours, our solution focuses on coverage continuity. We utilize AI-driven scheduling to ensure zero gaps in coverage, backed by our 15-minute response guarantee for any on-site incidents."
      });
      setIsAnalyzing(false);
      showToast("Proposal analysis complete", "success");
    }, 1800);
  };

  const copyToClipboard = () => {
      if (result?.improvedSnippet) {
          navigator.clipboard.writeText(result.improvedSnippet);
          showToast("Copied to clipboard", "info");
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <FileText className="text-indigo-500" /> Proposal Intelligence Review
          </h1>
          <p className="text-slate-400 mt-1">Improve proposal quality, value framing, and professionalism.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 h-[calc(100vh-12rem)] min-h-[600px]">
        {/* Input Column */}
        <div className="flex flex-col h-full space-y-4">
           <Card className="flex-1 flex flex-col p-0 overflow-hidden shadow-lg">
             <div className="p-4 border-b border-slate-800 bg-slate-900 flex items-center gap-4">
               <select 
                  value={clientType}
                  onChange={(e) => setClientType(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Corporate">Corporate Client</option>
                  <option value="Industrial">Industrial / Manufacturing</option>
                  <option value="HOA">Residential / HOA</option>
                  <option value="Retail">Retail / Public Space</option>
                </select>
                <span className="text-xs text-slate-500 ml-auto font-mono">
                   {proposalText.length} chars
                </span>
             </div>
             <textarea 
                value={proposalText}
                onChange={(e) => setProposalText(e.target.value)}
                placeholder="Paste your full proposal text here... e.g., 'We propose to supply 2 armed guards...'"
                className="flex-1 w-full bg-slate-950/50 p-6 text-slate-300 placeholder-slate-600 focus:outline-none resize-none font-mono text-sm leading-relaxed border-none"
              />
              <div className="p-4 bg-slate-900 border-t border-slate-800">
                <button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !proposalText}
                  className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                    isAnalyzing || !proposalText 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                  }`}
                >
                  {isAnalyzing ? (
                     <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Analyzing Document...
                     </span>
                  ) : 'Analyze Proposal'}
                </button>
              </div>
           </Card>
        </div>

        {/* Output Column */}
        <div className="h-full overflow-y-auto pr-1 pb-6">
          {result ? (
             <div className="space-y-6 animate-fade-in">
                {/* Score Card */}
                <Card className="flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-800 border-indigo-500/30">
                   <div>
                      <h3 className="text-lg font-bold text-slate-100">Overall Quality</h3>
                      <p className="text-sm text-slate-400">Based on industry standards for {clientType}</p>
                   </div>
                   <ScoreGauge score={result.score} max={10} />
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <Card className="border-t-4 border-t-rose-500 h-full">
                      <h4 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
                        <XCircle size={18} className="text-rose-500" /> Weak Areas
                      </h4>
                      <ul className="space-y-3">
                        {result.weakAreas.map((item: string, i: number) => (
                           <li key={i} className="text-sm text-slate-400 leading-snug pl-4 border-l-2 border-slate-800">
                              {item}
                           </li>
                        ))}
                      </ul>
                   </Card>

                   <Card className="border-t-4 border-t-amber-500 h-full">
                      <h4 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
                        <Zap size={18} className="text-amber-500" /> What is Missing
                      </h4>
                      <ul className="space-y-3">
                        {result.missingInfo.map((item: string, i: number) => (
                           <li key={i} className="text-sm text-slate-400 leading-snug pl-4 border-l-2 border-slate-800">
                              {item}
                           </li>
                        ))}
                      </ul>
                   </Card>
                </div>

                <Card className="border-indigo-500/30 bg-indigo-900/10">
                   <CardHeader title="Recommended Rewrite" description="Try this phrasing for better impact:" />
                   <div className="bg-slate-900/80 rounded-lg p-5 border border-indigo-500/20 relative group">
                      <div className="absolute top-0 right-0 p-2 opacity-20">
                         <Zap size={40} />
                      </div>
                      <p className="text-indigo-200 italic text-sm leading-relaxed pr-8">
                         "{result.improvedSnippet}"
                      </p>
                      <button 
                        onClick={copyToClipboard}
                        className="mt-4 text-xs font-bold text-indigo-400 hover:text-white bg-indigo-500/10 hover:bg-indigo-500 px-3 py-1.5 rounded transition-colors flex items-center gap-2 uppercase tracking-wider"
                      >
                         <Copy size={12} /> Copy to clipboard
                      </button>
                   </div>
                </Card>
             </div>
          ) : (
             <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50 border-2 border-dashed border-slate-800 rounded-xl">
                <FileText size={64} strokeWidth={1} className="mb-4" />
                <p>Waiting for proposal text...</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
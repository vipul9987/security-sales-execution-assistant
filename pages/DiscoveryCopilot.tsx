import React, { useState } from 'react';
import { Card, CardHeader } from '../components/Card';
import { ScoreGauge } from '../components/ScoreGauge';
import { Mic, CheckCircle2, AlertCircle, Sparkles, MessageSquare } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const DiscoveryCopilot: React.FC = () => {
  const { showToast } = useToast();
  const [notes, setNotes] = useState('');
  const [propertyType, setPropertyType] = useState('Mall / Retail');
  const [clientRole, setClientRole] = useState('Property Manager');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = () => {
    if (!notes.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);
    
    const delay = 1500;

    // Dynamic generation based on inputs
    setTimeout(() => {
      const isShort = notes.length < 50;
      const score = isShort ? 4.5 : 7.8;
      
      const missingAreas = [];
      if (!notes.toLowerCase().includes('budget')) missingAreas.push('Budget Confirmation - No specific budget range was detected.');
      if (!notes.toLowerCase().includes('timeline') && !notes.toLowerCase().includes('start date')) missingAreas.push('Implementation Timeline - Start date is vague.');
      missingAreas.push(`Decision Process - Did not confirm if the ${clientRole} is the sole signer.`);

      setResult({
        score: score,
        missingAreas: missingAreas,
        followUps: [
          `As a ${clientRole}, how does security liability specifically impact your insurance premiums?`,
          `Have you handled security for a ${propertyType} before, or is this your first time managing this vendor type?`,
          'What is the cost of inaction if you don\'t replace your current guard service?'
        ],
        summary: `Discovery call analysis for a ${propertyType} managed by a ${clientRole}. ${isShort ? 'The notes provided are very brief, suggesting a lack of depth in the conversation.' : 'Good coverage of operational pain points, but financial qualification is weak.'} The prospect seems focused on reliability.`
      });
      setIsAnalyzing(false);
      showToast("Discovery analysis completed", "success");
    }, delay);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Mic className="text-blue-500" /> Discovery Call Copilot
          </h1>
          <p className="text-slate-400 mt-1">Paste your rough call notes and get structured feedback.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <Card className="h-full flex flex-col">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase">Property Type</label>
                <select 
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option>Mall / Retail</option>
                  <option>Hospital / Healthcare</option>
                  <option>Residential / HOA</option>
                  <option>Warehouse / Industrial</option>
                  <option>Corporate Office</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase">Client Role</label>
                <select 
                  value={clientRole}
                  onChange={(e) => setClientRole(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option>Property Manager</option>
                  <option>Facility Manager</option>
                  <option>Owner / CEO</option>
                  <option>Head of Security</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6 flex-1 flex flex-col">
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase">Call Notes</label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Paste your raw notes here... e.g., 'Client complained about current guards sleeping on duty. Needs 24/7 coverage. Concerned about liability...'"
                className="w-full flex-1 min-h-[200px] bg-slate-800 border border-slate-700 rounded-lg p-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none font-mono text-sm leading-relaxed"
              />
            </div>

            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !notes}
              className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                isAnalyzing || !notes 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Analyzing Context...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Analyze Discovery
                </>
              )}
            </button>
          </Card>
        </div>

        {/* Output Section */}
        <div className="h-full">
          {result ? (
            <div className="space-y-6 animate-fade-in h-full">
              <Card className="border-l-4 border-l-blue-500 h-full">
                <CardHeader 
                  title="Analysis Result" 
                  action={<ScoreGauge score={result.score} label="Quality Score" />}
                />
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-blue-500" /> Professional Summary
                  </h4>
                  <p className="text-sm text-slate-400 bg-slate-950/50 p-4 rounded-md border border-slate-800 leading-relaxed italic">
                    "{result.summary}"
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-rose-400 mb-3 flex items-center gap-2">
                      <AlertCircle size={16} /> Missing Discovery Areas
                    </h4>
                    <ul className="space-y-2">
                      {result.missingAreas.map((area: string, i: number) => (
                        <li key={i} className="text-sm text-slate-300 flex items-start gap-3 bg-rose-500/5 p-2 rounded border border-rose-500/10">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                      <MessageSquare size={16} /> Smart Follow-Up Questions
                    </h4>
                    <div className="space-y-3">
                      {result.followUps.map((q: string, i: number) => (
                        <div key={i} className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3 text-sm text-emerald-100/90 flex gap-3 shadow-sm">
                           <span className="font-bold text-emerald-500/50 shrink-0">Q{i+1}</span>
                           {q}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <div className="h-full border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center text-slate-500 p-12 text-center bg-slate-900/30">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 text-slate-600 shadow-inner">
                <Mic size={40} />
              </div>
              <h3 className="text-xl font-medium text-slate-300">Ready to Analyze</h3>
              <p className="max-w-xs mt-3 text-sm leading-relaxed">Paste your discovery notes on the left. The AI will identify missing opportunities and suggest power questions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
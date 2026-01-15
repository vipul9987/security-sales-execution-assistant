import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Tooltip } from '../components/Tooltip';
import { Activity, ShieldAlert, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const DealHealthChecker: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    propertyType: 'Residential',
    decisionMakerIdentified: 'Yes',
    daysSinceInteraction: '3',
    proposalSent: 'Yes',
    objections: '',
    urgency: 'Medium',
    competitors: 'Yes'
  });

  const [result, setResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Reset result if user changes input to encourage re-evaluation
    if (result) setResult(null); 
  };

  const handleReset = () => {
    setFormData({
        propertyType: 'Residential',
        decisionMakerIdentified: 'Yes',
        daysSinceInteraction: '',
        proposalSent: 'Yes',
        objections: '',
        urgency: 'Medium',
        competitors: 'No'
    });
    setResult(null);
    showToast("Form reset", "info");
  };

  const calculateHealth = () => {
    setIsAnalyzing(true);
    setResult(null);

    // Realistic delay for analysis feeling
    setTimeout(() => {
      const objectionsExist = formData.objections.trim().length > 0;
      const days = parseInt(formData.daysSinceInteraction || '0');
      
      let status = 'Strong';
      let probability = 75;
      let reasoning = '';
      let nextActions = [];
      
      // LOGIC IMPLEMENTATION
      
      // 1. Likely Lost Condition: No DM and Ghosted > 7 Days
      if (formData.decisionMakerIdentified === 'No' && days > 7) {
        status = 'Likely Lost';
        probability = 15;
        reasoning = 'Critically low engagement. Lacking a decision maker combined with over a week of silence indicates the prospect has likely moved on or deprioritized this.';
        nextActions = [
           'Send a "break-up" email (e.g., "Should I close this file?") to trigger a response.',
           'Call the main office line to identify the correct stakeholder.',
           'Do not invest more time in proposal customization until contact is re-established.'
        ];
      } 
      // 2. At Risk Condition: Objections AND Competitors
      else if (objectionsExist && formData.competitors === 'Yes') {
        status = 'At Risk';
        probability = 40;
        reasoning = `The deal is precarious. The client has voiced concerns ("${formData.objections.substring(0, 30)}...") and is actively shopping competitors. They are looking for a reason to say no.`;
        nextActions = [
           'Schedule a "barrier removal" call specifically to address the objection.',
           'Prepare a competitor comparison sheet highlighting your unique strengths.',
           'Offer a limited-time incentive for signing this week.'
        ];
      }
      // 3. Strong Condition: High Urgency + DM Identified
      else if (formData.urgency === 'High' && formData.decisionMakerIdentified === 'Yes') {
        status = 'Strong';
        probability = 85;
        reasoning = 'Excellent momentum. High urgency from the client combined with direct access to the decision maker is the perfect recipe for a close.';
        nextActions = [
           'Send the contract immediately via Docusign.',
           'Propose a tentative start date to assume the sale.',
           'Ask: "Is there anything preventing you from signing today?"'
        ];
      }
      // 4. Moderate/Default
      else {
        status = 'Moderate';
        probability = 60;
        reasoning = 'The deal is stable but lacks urgency. You have some engagement, but no clear buying signal has been triggered yet.';
        nextActions = [
           'Send a relevant case study for a ' + formData.propertyType + ' property.',
           'Propose a site walkthrough if not already completed.',
           'Check in via text message for a quicker response.'
        ];
      }

      setResult({
        status,
        probability,
        reasoning,
        nextActions
      });
      setIsAnalyzing(false);
      showToast("Deal analysis complete", "success");
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
            <Activity className="text-rose-500" /> Deal Health Checker
          </h1>
          <p className="text-slate-400 mt-2 text-sm max-w-2xl leading-relaxed">
            Evaluate deal risk and get clear next actions based on prospect behavior and engagement metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Form Section */}
          <div className="xl:col-span-7">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/50">
                 <h3 className="text-lg font-semibold text-slate-100">Deal Parameters</h3>
                 <button 
                    onClick={handleReset}
                    className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 px-3 py-1.5 hover:bg-slate-800 rounded-lg"
                 >
                    <RefreshCw size={12} /> Reset Form
                 </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                 <div>
                    <label className="label-text">
                      Property Type
                      <Tooltip text="The primary category of the facility requiring security services." />
                    </label>
                    <div className="relative">
                      <select 
                        className="input-field appearance-none"
                        value={formData.propertyType}
                        onChange={(e) => handleChange('propertyType', e.target.value)}
                      >
                         <option>Residential</option>
                         <option>Commercial</option>
                         <option>Industrial</option>
                         <option>Retail</option>
                         <option>Event</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                 </div>

                 <div>
                    <label className="label-text">
                      Decision Maker Identified?
                      <Tooltip text="Have you confirmed exactly who has the final authority to sign the contract?" />
                    </label>
                    <div className="relative">
                      <select 
                        className="input-field appearance-none"
                        value={formData.decisionMakerIdentified}
                        onChange={(e) => handleChange('decisionMakerIdentified', e.target.value)}
                      >
                         <option>Yes</option>
                         <option>No</option>
                         <option>Unsure</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                 </div>

                 <div>
                    <label className="label-text">
                      Last Interaction (Days ago)
                      <Tooltip text="Number of days since the last two-way communication (email, call, or meeting)." />
                    </label>
                    <input 
                      type="number" 
                      min="0"
                      className="input-field"
                      placeholder="e.g. 3"
                      value={formData.daysSinceInteraction}
                      onChange={(e) => handleChange('daysSinceInteraction', e.target.value)}
                    />
                 </div>

                 <div>
                    <label className="label-text">
                      Proposal Sent?
                      <Tooltip text="Has the formal pricing and scope of work document been delivered?" />
                    </label>
                    <div className="relative">
                      <select 
                        className="input-field appearance-none"
                        value={formData.proposalSent}
                        onChange={(e) => handleChange('proposalSent', e.target.value)}
                      >
                         <option>Yes</option>
                         <option>No</option>
                         <option>Drafting</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                 </div>

                 <div>
                    <label className="label-text">
                      Client Urgency
                      <Tooltip text="How quickly does the client need to deploy services on-site?" />
                    </label>
                    <div className="relative">
                      <select 
                        className="input-field appearance-none"
                        value={formData.urgency}
                        onChange={(e) => handleChange('urgency', e.target.value)}
                      >
                         <option>High</option>
                         <option>Medium</option>
                         <option>Low</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                 </div>

                 <div>
                    <label className="label-text">
                      Competitors Involved?
                      <Tooltip text="Are other security guard companies actively bidding on this contract?" />
                    </label>
                    <div className="relative">
                      <select 
                        className="input-field appearance-none"
                        value={formData.competitors}
                        onChange={(e) => handleChange('competitors', e.target.value)}
                      >
                         <option>Yes</option>
                         <option>No</option>
                         <option>Unknown</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                 </div>

                 <div className="md:col-span-2">
                    <label className="label-text">
                      Objections Raised (Optional)
                      <Tooltip text="Any specific concerns mentioned by the client (e.g., price, reputation, timing)." />
                    </label>
                    <input 
                      type="text" 
                      className="input-field"
                      placeholder="e.g. Price too high, current contract not expired..."
                      value={formData.objections}
                      onChange={(e) => handleChange('objections', e.target.value)}
                    />
                 </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <button 
                  onClick={calculateHealth}
                  disabled={isAnalyzing}
                  className="w-full bg-slate-100 hover:bg-white text-slate-900 font-bold py-4 rounded-lg shadow-lg shadow-white/5 transition-all active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 text-sm uppercase tracking-wide"
                >
                  {isAnalyzing ? (
                     <>
                        <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                        Evaluating...
                     </>
                  ) : (
                     <>
                        <Zap size={18} className="fill-current" />
                        Evaluate Deal Health
                     </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="xl:col-span-5 h-full">
             {result ? (
               <div className="space-y-4 animate-fade-in h-full flex flex-col">
                  {/* Status Card */}
                  <div className={`rounded-xl p-8 text-center border transition-all duration-500 relative overflow-hidden ${
                    result.status === 'Strong' ? 'bg-slate-900 border-emerald-500/30' : 
                    result.status === 'Moderate' ? 'bg-slate-900 border-blue-500/30' :
                    result.status === 'At Risk' ? 'bg-slate-900 border-amber-500/30' : 
                    'bg-slate-900 border-rose-500/30'
                  }`}>
                     <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${
                         result.status === 'Strong' ? 'from-emerald-500 to-transparent' : 
                         result.status === 'Moderate' ? 'from-blue-500 to-transparent' :
                         result.status === 'At Risk' ? 'from-amber-500 to-transparent' : 
                         'from-rose-500 to-transparent'
                     }`}></div>

                     <h2 className={`text-4xl font-bold mb-3 tracking-tight ${
                       result.status === 'Strong' ? 'text-emerald-400' : 
                       result.status === 'Moderate' ? 'text-blue-400' :
                       result.status === 'At Risk' ? 'text-amber-400' : 
                       'text-rose-400'
                     }`}>{result.status}</h2>
                     <p className="text-slate-400 text-xs uppercase tracking-[0.2em] font-bold mb-8">Deal Status</p>
                     
                     <div className="relative inline-flex items-center justify-center">
                        <svg className="w-32 h-32 transform -rotate-90">
                           <circle className="text-slate-800" strokeWidth="8" stroke="currentColor" fill="transparent" r="56" cx="64" cy="64" />
                           <circle 
                              className={`${
                                 result.status === 'Strong' ? 'text-emerald-500' : 
                                 result.status === 'Moderate' ? 'text-blue-500' :
                                 result.status === 'At Risk' ? 'text-amber-500' : 
                                 'text-rose-500'
                              } transition-all duration-1000 ease-out`} 
                              strokeWidth="8" 
                              strokeDasharray={351.8}
                              strokeDashoffset={351.8 - (351.8 * result.probability) / 100}
                              strokeLinecap="round"
                              stroke="currentColor" 
                              fill="transparent" 
                              r="56" cx="64" cy="64" 
                           />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-3xl font-bold text-slate-100">{result.probability}%</span>
                        </div>
                     </div>
                     <p className="text-slate-500 text-xs mt-4 font-medium">Close Probability</p>
                  </div>

                  {/* Analysis & Actions */}
                  <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col gap-6">
                      <div className="pl-4 border-l-2 border-blue-500">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">AI Analysis</h4>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            {result.reasoning}
                        </p>
                      </div>
                      
                      <div className="pt-6 border-t border-slate-800/50">
                        <h4 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                            <ArrowRight size={14} className="text-blue-500" /> Recommended Next Steps
                        </h4>
                        <div className="space-y-4">
                            {result.nextActions.map((action: string, i: number) => (
                                <div key={i} className="flex gap-3 text-sm text-slate-300">
                                    <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-[10px] font-bold text-slate-400 mt-0.5">
                                        {i + 1}
                                    </div>
                                    <p className="leading-snug">{action}</p>
                                </div>
                            ))}
                        </div>
                      </div>
                  </div>
               </div>
             ) : (
                <div className="h-full bg-slate-900 border border-slate-800 rounded-xl flex flex-col items-center justify-center text-slate-500 p-8 text-center min-h-[500px]">
                   <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 ring-1 ring-slate-700/50">
                        <ShieldAlert size={40} className="text-slate-600" />
                   </div>
                   <h3 className="text-lg font-medium text-slate-300">Ready to Analyze</h3>
                   <p className="max-w-xs mt-3 text-sm leading-relaxed text-slate-500">
                        Fill out the deal parameters on the left to generate a comprehensive risk assessment and action plan.
                   </p>
                </div>
             )}
          </div>

        </div>

        <style>{`
          .label-text {
            display: flex;
            align-items: center;
            font-size: 0.70rem;
            font-weight: 600;
            color: #94a3b8;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .input-field {
            width: 100%;
            background-color: #1e293b; /* Slate 850 for inputs */
            border: 1px solid #334155;
            border-radius: 0.5rem;
            padding: 0.75rem 1rem;
            color: #f1f5f9;
            font-size: 0.875rem;
            transition: all 0.2s;
          }
          .input-field:focus {
            outline: none;
            border-color: #3b82f6;
            background-color: #0f172a; /* Darker on focus */
            box-shadow: 0 0 0 1px #3b82f6;
          }
          .input-field::placeholder {
              color: #64748b;
          }
        `}</style>
    </div>
  );
};
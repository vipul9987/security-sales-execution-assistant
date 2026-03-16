import React, { useState } from 'react';
import { Card } from '../components/Card';
import { 
  Mic, 
  Play, 
  Square, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  MessageSquare, 
  Shield, 
  Zap,
  ArrowRight,
  Target,
  FileText,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { motion, AnimatePresence } from 'motion/react';

export const DiscoveryCopilot: React.FC = () => {
  const { branding, deals } = useApp();
  const { showToast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedDealId, setSelectedDealId] = useState(deals[0]?.id || '');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);

  const transcriptLines = [
    "Rep: Thanks for taking the time to speak with us today about your security needs.",
    "Client: Of course. We've been having some issues with our current provider lately.",
    "Rep: I'm sorry to hear that. Can you tell me more about those issues?",
    "Client: Well, the response times are just too slow. We had an incident in the parking lot last week and it took them 45 minutes to arrive.",
    "Rep: 45 minutes is definitely too long for an active incident. Was there any damage?",
    "Client: Yes, two cars were vandalized. This is happening about 2-3 times a month now.",
    "Rep: That's a significant concern. Do you have any real-time reporting or monitoring in place currently?",
    "Client: Not really. We just get a paper report at the end of the week.",
    "Rep: I see. That makes it hard to react quickly. Who else is involved in the decision-making process for a new provider?",
    "Client: I'm the facility manager, so I'll make the recommendation, but the CFO has the final say."
  ];

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      let i = 0;
      setTranscript([]);
      interval = setInterval(() => {
        if (i < transcriptLines.length) {
          setTranscript(prev => [...prev, transcriptLines[i]]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setShowAnalysis(false);
    showToast("Recording started...", "info");
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsAnalyzing(true);
    showToast("Processing call audio...", "info");
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowAnalysis(true);
      showToast("Analysis complete!", "success");
    }, 2500);
  };

  const analysisResults = {
    completeness: 78,
    painPoints: [
      "Current provider has slow response times (avg 45 mins)",
      "Vandalism in parking lot occurring 2-3 times per month",
      "No real-time reporting for incident management"
    ],
    missingQuestions: [
      "What is the specific budget range for this fiscal year?",
      "Who is the final signatory for the security contract?",
      "Are there any specific insurance requirements for mobile patrol?"
    ],
    aiRecommendations: [
      "Highlight our 15-minute response guarantee in the proposal.",
      "Bundle mobile patrol with the static guard service to address parking lot issues.",
      "Demo the real-time reporting dashboard to the facility manager."
    ]
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Discovery Copilot</h1>
          <p className="text-slate-400 text-sm mt-1">Real-time AI assistance for security discovery calls.</p>
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
        {/* Recording Control */}
        <Card className="lg:col-span-1 flex flex-col items-center justify-center py-12 text-center">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${isRecording ? 'animate-pulse scale-110 shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 'bg-slate-800'}`}
               style={{ backgroundColor: isRecording ? '#ef4444' : undefined }}>
            <Mic size={40} className={isRecording ? 'text-white' : 'text-slate-400'} />
          </div>
          
          <h3 className="text-xl font-bold text-slate-100 mb-2">
            {isRecording ? 'Listening to Call...' : isAnalyzing ? 'Analyzing Audio...' : 'Ready for Discovery'}
          </h3>
          <p className="text-slate-400 text-sm max-w-xs mb-8">
            {isRecording ? 'Capturing audio and identifying key security themes...' : 'Start recording your discovery call to get real-time insights and risk analysis.'}
          </p>
          
          <button 
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            disabled={isAnalyzing}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95 text-white disabled:opacity-50 disabled:cursor-not-allowed`}
            style={{ backgroundColor: isRecording ? '#ef4444' : branding.primaryColor }}
          >
            {isAnalyzing ? <RefreshCw size={18} className="animate-spin" /> : isRecording ? <Square size={18} /> : <Play size={18} />}
            {isAnalyzing ? 'Analyzing...' : isRecording ? 'Stop Recording' : 'Start Discovery Call'}
          </button>

          {isRecording && (
            <div className="mt-8 w-full max-w-md bg-slate-950 rounded-xl border border-slate-800 p-4 text-left h-48 overflow-y-auto scroll-smooth">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Transcript</span>
              </div>
              <div className="space-y-3">
                {transcript.map((line, i) => (
                  <motion.p 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs text-slate-400 leading-relaxed"
                  >
                    <span className={line.startsWith('Rep:') ? 'text-indigo-400 font-bold' : 'text-emerald-400 font-bold'}>
                      {line.split(':')[0]}:
                    </span>
                    {line.split(':')[1]}
                  </motion.p>
                ))}
                <div id="transcript-end" />
              </div>
            </div>
          )}
        </Card>

        {/* Analysis Results */}
        <div className="lg:col-span-2 space-y-6">
          {!showAnalysis && !isAnalyzing ? (
            <div className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500 bg-slate-900/20">
              <Zap size={48} className="mb-4 opacity-20" />
              <p className="text-lg font-medium">Analysis will appear here</p>
              <p className="text-sm">Complete a call to see AI-driven insights.</p>
            </div>
          ) : isAnalyzing ? (
            <div className="h-full flex flex-col items-center justify-center p-12 border border-slate-800 rounded-2xl bg-slate-900/40">
              <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-6" />
              <p className="text-lg font-bold text-slate-200">AI Engine Processing</p>
              <p className="text-sm text-slate-400">Identifying pain points and risk factors...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Discovery Completeness" icon={<Target size={18} />}>
                  <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="transition-all duration-1000"
                                style={{ stroke: branding.primaryColor, strokeDasharray: 251.2, strokeDashoffset: 251.2 - (251.2 * analysisResults.completeness) / 100 }} />
                      </svg>
                      <span className="absolute text-xl font-bold text-white">{analysisResults.completeness}%</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Your discovery covers most key areas. Focus on the <span className="text-white font-bold">missing questions</span> to reach 100%.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card title="Detected Pain Points" icon={<AlertCircle size={18} className="text-rose-400" />}>
                  <ul className="space-y-3">
                    {analysisResults.painPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <Card title="Missing Critical Questions" icon={<MessageSquare size={18} className="text-amber-400" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysisResults.missingQuestions.map((q, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-300 flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                        {i + 1}
                      </div>
                      {q}
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="AI Strategic Recommendations" icon={<Zap size={18} className="text-indigo-400" />}>
                <div className="space-y-3">
                  {analysisResults.aiRecommendations.map((rec, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 group hover:border-indigo-500/30 transition-all">
                      <p className="text-sm text-slate-200 font-medium">{rec}</p>
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
      <Card title="How Discovery AI Works" icon={<Info size={18} />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-blue-400">
              <Mic size={24} />
            </div>
            <h4 className="font-bold text-slate-100">Natural Language Processing</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Our AI listens to your conversation and transcribes it in real-time, identifying key security terminology and client concerns.
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-emerald-400">
              <Shield size={24} />
            </div>
            <h4 className="font-bold text-slate-100">Risk Pattern Matching</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              We compare client pain points against our database of thousands of security incidents to identify hidden risks they may not have mentioned.
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-amber-400">
              <FileText size={24} />
            </div>
            <h4 className="font-bold text-slate-100">Gap Analysis</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              The system cross-references your call against enterprise-standard discovery frameworks to ensure no critical qualification data is missed.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

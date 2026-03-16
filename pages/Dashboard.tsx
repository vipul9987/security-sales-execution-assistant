import React from 'react';
import { Card } from '../components/Card';
import { Activity, FileCheck, AlertTriangle, TrendingUp, ArrowUpRight, ArrowDownRight, Clock, Shield, Info, Users, Briefcase, Mic } from 'lucide-react';
import { PageView } from '../types';
import { useToast } from '../context/ToastContext';
import { useApp } from '../context/AppContext';

interface DashboardProps {
  onNavigate: (page: PageView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const { branding, deals, currentUser, team } = useApp();

  const metrics = [
    { label: 'Active Deals', value: deals.length.toString(), icon: Activity, change: '+2', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { label: 'Proposals Sent', value: '8', icon: FileCheck, change: '+4', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: 'Deals At Risk', value: deals.filter(d => d.healthScore < 40).length.toString(), icon: AlertTriangle, change: '-1', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
    { label: 'Team Size', value: team.length.toString(), icon: Users, change: '+1', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  ];

  const recentActivity = [
    { id: 1, type: 'discovery', title: 'Mall Complex Security Audit', time: '2h ago', status: 'Good' },
    { id: 2, type: 'proposal', title: 'Downtown Office Tower', time: '5h ago', status: 'Review' },
    { id: 3, type: 'health', title: 'Westside Logistics Hub', time: '1d ago', status: 'At Risk' },
    { id: 4, type: 'discovery', title: 'North Hills HOA', time: '2d ago', status: 'Excellent' },
  ];

  const weeklyPerformance = [40, 65, 45, 80, 55, 90, 70];

  return (
    <div className="space-y-8 pb-8 animate-fade-in">
      {/* Welcome Banner */}
      <div 
        className={`relative overflow-hidden rounded-2xl p-8 shadow-xl border border-white/5 bg-gradient-to-r ${branding.gradientTheme}`}
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-40 h-40 rounded-full bg-black/10 blur-2xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back, {currentUser?.name.split(' ')[0]}.</h1>
          <p className="text-white/80 mt-2 max-w-xl text-lg">
            Your sales pipeline is active. You have <span className="text-white font-semibold">{deals.filter(d => d.healthScore < 40).length} deals at risk</span> and <span className="text-white font-semibold">3 proposals</span> pending review.
          </p>
          <div className="mt-6 flex gap-3">
             <button 
                onClick={() => onNavigate(PageView.DEAL_HEALTH)}
                className="bg-white text-slate-900 hover:bg-slate-50 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-lg shadow-black/20 active:scale-95"
             >
               View At-Risk Deals
             </button>
             <button 
                onClick={() => onNavigate(PageView.DISCOVERY)}
                className="bg-black/20 hover:bg-black/30 text-white border border-white/20 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all backdrop-blur-md active:scale-95"
             >
               New Analysis
             </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className={`hover:border-slate-600 transition-all duration-300 cursor-default group hover:-translate-y-1 hover:shadow-lg`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{metric.label}</p>
                <h3 className="text-3xl font-bold text-slate-100 mt-3 tracking-tight">{metric.value}</h3>
              </div>
              <div 
                className={`p-3 rounded-xl border group-hover:scale-110 transition-transform duration-300`}
                style={{ backgroundColor: `${branding.primaryColor}1a`, borderColor: `${branding.primaryColor}33` }}
              >
                <metric.icon size={22} style={{ color: branding.primaryColor }} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-slate-500 font-medium">
              <span className={`flex items-center ${metric.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'} mr-2 bg-slate-800/50 px-1.5 py-0.5 rounded`}>
                {metric.change.startsWith('+') ? <ArrowUpRight size={14} className="mr-0.5" /> : <ArrowDownRight size={14} className="mr-0.5" />}
                {metric.change}%
              </span>
              <span>vs last week</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="h-full">
             <div className="flex items-center justify-between mb-6">
               <h3 className="font-semibold text-slate-100 flex items-center gap-2">
                 <Clock size={18} className="text-slate-400" /> Recent Activity
               </h3>
               <button 
                onClick={() => showToast("Full history not available in demo mode", "info")}
                className="text-xs font-medium hover:opacity-80 transition-colors uppercase tracking-wide"
                style={{ color: branding.primaryColor }}
               >
                 View History
               </button>
             </div>
             
             <div className="space-y-3">
               {recentActivity.map((item) => (
                 <div key={item.id} className="group flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/30 transition-all duration-200 cursor-pointer">
                   <div className="flex items-center gap-4">
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                       item.type === 'discovery' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                       item.type === 'proposal' ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                     }`}>
                       {item.type === 'discovery' ? <Activity size={20} /> : 
                        item.type === 'proposal' ? <FileCheck size={20} /> : <AlertTriangle size={20} />}
                     </div>
                     <div>
                       <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{item.title}</h4>
                       <p className="text-xs text-slate-500 capitalize mt-0.5">{item.type} Review • {item.time}</p>
                     </div>
                   </div>
                   <div className="text-right">
                     <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                       item.status === 'Good' || item.status === 'Excellent' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                       item.status === 'At Risk' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                     }`}>
                       {item.status}
                     </span>
                   </div>
                 </div>
               ))}
             </div>
          </Card>

          {/* AI Analysis Explanation Section */}
          <Card title="How AI Analysis Works" icon={<Info size={18} />}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Mic size={20} />
                </div>
                <h4 className="font-bold text-slate-100 text-sm">Discovery Analysis</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Detects missing risk questions, evaluates discovery completeness, and identifies specific security pain points.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <FileCheck size={20} />
                </div>
                <h4 className="font-bold text-slate-100 text-sm">Proposal Analysis</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Identifies weak value framing, flags generic language, and suggests stronger positioning for security services.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
                  <Activity size={20} />
                </div>
                <h4 className="font-bold text-slate-100 text-sm">Deal Health</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Detects stalled deals, evaluates decision maker engagement, and predicts closing probability based on historical data.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Side Panel & Chart */}
        <div className="space-y-6">
          {/* Weekly Performance Mock Chart */}
          <Card>
            <div className="mb-6">
              <h3 className="font-semibold text-slate-100">Weekly Performance</h3>
              <p className="text-xs text-slate-400 mt-1">Activity score over last 7 days</p>
            </div>
            
            <div className="flex items-end justify-between h-32 gap-2 mt-4">
              {weeklyPerformance.map((height, i) => (
                <div key={i} className="flex flex-col items-center gap-2 w-full group cursor-pointer" onClick={() => showToast(`Score: ${height}/100`, "info")}>
                  <div className="relative w-full flex items-end justify-center h-full">
                     <div 
                        className={`w-full max-w-[24px] rounded-t-sm transition-all duration-500 group-hover:opacity-80 ${i === 5 ? 'shadow-[0_0_15px_-3px_rgba(59,130,246,0.5)]' : 'bg-slate-700'}`} 
                        style={{ height: `${height}%`, backgroundColor: i === 5 ? branding.primaryColor : undefined }}
                     ></div>
                  </div>
                  <span className={`text-[10px] font-medium ${i === 5 ? '' : 'text-slate-600'}`} style={i === 5 ? { color: branding.primaryColor } : {}}>
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Pro Tip Card */}
          <div 
            className={`rounded-xl p-6 text-white relative overflow-hidden shadow-lg group hover:shadow-xl transition-all`}
            style={{ backgroundColor: branding.secondaryColor }}
          >
             <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
             <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-black/10 blur-2xl"></div>
             
             <div className="flex items-center gap-2 mb-3 relative z-10">
               <Shield size={18} className="text-white/70" />
               <span className="text-xs font-bold text-white/70 uppercase tracking-wider">AI Insight</span>
             </div>
             
             <p className="text-white/90 text-sm leading-relaxed relative z-10 font-medium">
               "Proposals sent within 24 hours of discovery calls have a <span className="text-white font-bold decoration-2 underline-offset-2 underline decoration-white/30">40% higher close rate</span> for retail clients."
             </p>

             <button 
                onClick={() => onNavigate(PageView.PROPOSAL)}
                className="mt-6 w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors relative z-10 active:scale-95"
             >
               Generate Proposal
             </button>
          </div>

          {/* CRM Sync Status */}
          <Card className="bg-emerald-500/5 border-emerald-500/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                <Briefcase size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">CRM Status</p>
                <p className="text-sm font-semibold text-slate-200">HubSpot Sync Enabled</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

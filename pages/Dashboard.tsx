import React from 'react';
import { Card } from '../components/Card';
import { Activity, FileCheck, AlertTriangle, TrendingUp, ArrowUpRight, ArrowDownRight, Clock, Shield } from 'lucide-react';
import { PageView } from '../types';
import { useToast } from '../context/ToastContext';

interface DashboardProps {
  onNavigate: (page: PageView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { showToast } = useToast();

  const metrics = [
    { label: 'Active Deals Reviewed', value: '12', icon: Activity, change: '+2', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { label: 'Proposals Analyzed', value: '8', icon: FileCheck, change: '+4', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: 'Deals At Risk', value: '4', icon: AlertTriangle, change: '-1', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
    { label: 'Discovery Quality Avg', value: '6.8', icon: TrendingUp, change: '+0.5', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  ];

  const recentActivity = [
    { id: 1, type: 'discovery', title: 'Mall Complex Security Audit', time: '2h ago', status: 'Good' },
    { id: 2, type: 'proposal', title: 'Downtown Office Tower', time: '5h ago', status: 'Review' },
    { id: 3, type: 'health', title: 'Westside Logistics Hub', time: '1d ago', status: 'At Risk' },
    { id: 4, type: 'discovery', title: 'North Hills HOA', time: '2d ago', status: 'Excellent' },
  ];

  // Mock data for simple bar chart visualization
  const weeklyPerformance = [40, 65, 45, 80, 55, 90, 70];

  return (
    <div className="space-y-8 pb-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-8 shadow-xl border border-white/5">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-40 h-40 rounded-full bg-indigo-500/20 blur-2xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back, John.</h1>
          <p className="text-blue-100/80 mt-2 max-w-xl text-lg">
            Your sales pipeline needs attention. You have <span className="text-white font-semibold">4 deals at risk</span> and <span className="text-white font-semibold">3 proposals</span> pending review.
          </p>
          <div className="mt-6 flex gap-3">
             <button 
                onClick={() => onNavigate(PageView.DEAL_HEALTH)}
                className="bg-white text-blue-900 hover:bg-blue-50 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-lg shadow-black/20 active:scale-95"
             >
               View At-Risk Deals
             </button>
             <button 
                onClick={() => onNavigate(PageView.DISCOVERY)}
                className="bg-blue-800/50 hover:bg-blue-800/70 text-white border border-blue-400/30 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors backdrop-blur-md active:scale-95"
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
              <div className={`p-3 rounded-xl ${metric.bg} ${metric.border} border group-hover:scale-110 transition-transform duration-300`}>
                <metric.icon className={metric.color} size={22} />
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
                className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wide"
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
                        className={`w-full max-w-[24px] rounded-t-sm transition-all duration-500 group-hover:opacity-80 ${i === 5 ? 'bg-blue-500 shadow-[0_0_15px_-3px_rgba(59,130,246,0.5)]' : 'bg-slate-700'}`} 
                        style={{ height: `${height}%` }}
                     ></div>
                  </div>
                  <span className={`text-[10px] font-medium ${i === 5 ? 'text-blue-400' : 'text-slate-600'}`}>
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Pro Tip Card */}
          <div className="rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white relative overflow-hidden shadow-lg group hover:shadow-indigo-500/20 transition-all">
             <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
             <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-black/10 blur-2xl"></div>
             
             <div className="flex items-center gap-2 mb-3 relative z-10">
               <Shield size={18} className="text-indigo-200" />
               <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">AI Insight</span>
             </div>
             
             <p className="text-indigo-50 text-sm leading-relaxed relative z-10 font-medium">
               "Proposals sent within 24 hours of discovery calls have a <span className="text-white font-bold decoration-2 underline-offset-2 underline decoration-indigo-300/50">40% higher close rate</span> for retail clients."
             </p>

             <button 
                onClick={() => onNavigate(PageView.PROPOSAL)}
                className="mt-6 w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors relative z-10 active:scale-95"
             >
               Generate Proposal
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
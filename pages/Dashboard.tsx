import React from 'react';
import { Card } from '../components/Card';
import { 
  Activity, 
  FileCheck, 
  AlertTriangle, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  Shield, 
  Info, 
  Users, 
  Briefcase, 
  Mic,
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';
import { PageView } from '../types';
import { useToast } from '../context/ToastContext';
import { useApp } from '../context/AppContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { motion } from 'motion/react';

interface DashboardProps {
  onNavigate: (page: PageView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const { branding, deals, currentUser, team, setSelectedDealId } = useApp();
  const [searchTerm, setSearchTerm] = React.useState('');

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

  const pipelineData = [
    { name: 'Discovery', count: deals.filter(d => d.status === 'Discovery').length, color: '#6366f1' },
    { name: 'Proposal', count: deals.filter(d => d.status === 'Proposal').length, color: '#14b8a6' },
    { name: 'Negotiation', count: deals.filter(d => d.status === 'Negotiation').length, color: '#f59e0b' },
    { name: 'Closed Won', count: deals.filter(d => d.status === 'Closed Won').length, color: '#10b981' },
  ];

  const topPerformers = team.slice(0, 3).map(member => ({
    ...member,
    deals: deals.filter(d => d.ownerId === member.id).length,
    value: deals.filter(d => d.ownerId === member.id).reduce((acc, d) => acc + d.value, 0)
  })).sort((a, b) => b.value - a.value);

  const filteredDeals = deals.filter(deal => 
    deal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-8">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className={`hover:border-slate-600 transition-all duration-300 cursor-default group hover:-translate-y-1 hover:shadow-lg h-full`}>
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
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Pipeline Overview" icon={<TrendingUp size={18} />}>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#f1f5f9' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {pipelineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Top Performers" icon={<Users size={18} />}>
          <div className="space-y-4">
            {topPerformers.map((performer, idx) => (
              <div key={performer.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold border border-slate-700">
                    {performer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{performer.name}</h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">{performer.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">${(performer.value / 1000).toFixed(0)}k</p>
                  <p className="text-[10px] text-slate-500">{performer.deals} deals</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Deal List Section */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h3 className="font-semibold text-slate-100 flex items-center gap-2">
            <Briefcase size={18} className="text-slate-400" /> Active Pipeline
          </h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <input 
                type="text" 
                placeholder="Search deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 w-48"
              />
            </div>
            <button className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
              <Filter size={14} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="pb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Deal Name</th>
                <th className="pb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Value</th>
                <th className="pb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="pb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Health</th>
                <th className="pb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Owner</th>
                <th className="pb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredDeals.map((deal) => (
                <tr 
                  key={deal.id} 
                  className="group hover:bg-slate-900/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedDealId(deal.id)}
                >
                  <td className="py-4">
                    <div className="font-bold text-sm text-slate-200 group-hover:text-white transition-colors">{deal.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{deal.leadSource}</div>
                  </td>
                  <td className="py-4">
                    <div className="text-sm font-semibold text-slate-300">${(deal.value / 1000).toFixed(0)}k</div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      deal.status === 'Proposal' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      deal.status === 'Negotiation' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      deal.status === 'Closed Won' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {deal.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${deal.healthScore > 70 ? 'bg-emerald-500' : deal.healthScore > 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                          style={{ width: `${deal.healthScore}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{deal.healthScore}%</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500">
                        {team.find(t => t.id === deal.ownerId)?.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs text-slate-400">{team.find(t => t.id === deal.ownerId)?.name.split(' ')[0]}</span>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <ChevronRight size={16} className="text-slate-700 group-hover:text-slate-400 transition-colors inline" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

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
                 <div 
                  key={item.id} 
                  className="group flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/30 transition-all duration-200 cursor-pointer"
                  onClick={() => setSelectedDealId('d1')} // Mock navigation
                 >
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

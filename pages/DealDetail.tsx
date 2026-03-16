import React from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { 
  ArrowLeft, 
  DollarSign, 
  Clock, 
  Users, 
  Shield, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  MessageSquare,
  Calendar,
  ChevronRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import { PageView, LeadSource } from '../types';
import { motion } from 'motion/react';

export const DealDetail: React.FC = () => {
  const { deals, selectedDealId, setSelectedDealId, branding, team, serviceTypes } = useApp();
  
  const deal = deals.find(d => d.id === selectedDealId);
  
  if (!deal) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400">
        <AlertCircle size={48} className="mb-4 opacity-20" />
        <p>Deal not found</p>
        <button 
          onClick={() => setSelectedDealId(null)}
          className="mt-4 text-blue-400 hover:underline"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const owner = team.find(t => t.id === deal.ownerId);
  const selectedServices = serviceTypes.filter(s => deal.serviceTypes.includes(s.id));

  const timeline = [
    { date: '2026-03-10', event: 'Initial Discovery Call', status: 'Completed', icon: MessageSquare },
    { date: '2026-03-12', event: 'Risk Assessment Audit', status: 'Completed', icon: Shield },
    { date: '2026-03-15', event: 'Proposal Generated', status: 'Completed', icon: FileText },
    { date: '2026-03-18', event: 'Stakeholder Review', status: 'Upcoming', icon: Users },
    { date: '2026-03-25', event: 'Contract Negotiation', status: 'Upcoming', icon: DollarSign },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-12"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSelectedDealId(null)}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Deal Details</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                deal.status === 'Proposal' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                deal.status === 'Negotiation' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                deal.status === 'Closed Won' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                {deal.status}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">{deal.title}</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm font-semibold hover:bg-slate-700 transition-colors">
            Edit Deal
          </button>
          <button 
            className="px-4 py-2 rounded-lg text-white text-sm font-semibold shadow-lg transition-all active:scale-95"
            style={{ backgroundColor: branding.primaryColor }}
          >
            Sync with CRM
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Stats & Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-slate-900/50">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Annual Value</p>
              <h3 className="text-2xl font-bold text-white">${deal.value.toLocaleString()}</h3>
              <div className="mt-2 flex items-center text-[10px] text-emerald-400 font-bold">
                <TrendingUp size={12} className="mr-1" /> +12% from initial estimate
              </div>
            </Card>
            <Card className="bg-slate-900/50">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Weekly Hours</p>
              <h3 className="text-2xl font-bold text-white">{deal.weeklyHours}h</h3>
              <p className="text-[10px] text-slate-500 mt-2 font-medium">24/7 Coverage required</p>
            </Card>
            <Card className="bg-slate-900/50">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Health Score</p>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-white">{deal.healthScore}%</h3>
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${deal.healthScore > 70 ? 'bg-emerald-500' : deal.healthScore > 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                    style={{ width: `${deal.healthScore}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 font-medium">Based on 12 engagement factors</p>
            </Card>
          </div>

          {/* Stakeholders */}
          <Card title="Stakeholders" icon={<Users size={18} />}>
            <div className="space-y-4">
              {deal.stakeholders.map((person) => (
                <div key={person.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{person.name}</h4>
                      <p className="text-xs text-slate-500">{person.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Authority</p>
                      <span className={`text-xs font-semibold ${
                        person.authorityLevel === 'Decision Maker' ? 'text-emerald-400' : 'text-slate-300'
                      }`}>
                        {person.authorityLevel}
                      </span>
                    </div>
                    <div className="flex gap-2">
                       <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                         <MessageSquare size={16} />
                       </button>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 border border-dashed border-slate-700 rounded-xl text-xs font-bold text-slate-500 hover:border-slate-500 hover:text-slate-400 transition-all">
                + Add Stakeholder
              </button>
            </div>
          </Card>

          {/* Service Requirements */}
          <Card title="Service Requirements" icon={<Shield size={18} />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedServices.map(service => (
                <div key={service.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Shield size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{service.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Technical Requirements</h4>
              <div className="flex flex-wrap gap-2">
                {deal.techRequirements.map((req, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300">
                    {req}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Timeline & Owner */}
        <div className="space-y-6">
          {/* Deal Owner */}
          <Card>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Deal Owner</h4>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-lg">
                {owner?.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="font-bold text-white">{owner?.name}</h4>
                <p className="text-xs text-slate-500">{owner?.role}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Region</p>
                <p className="text-xs text-slate-300 font-medium">{owner?.region}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Lead Source</p>
                <p className="text-xs text-slate-300 font-medium">{deal.leadSource}</p>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card title="Deal Timeline" icon={<Calendar size={18} />}>
            <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-slate-800">
              {timeline.map((item, i) => (
                <div key={i} className="relative pl-10">
                  <div className={`absolute left-0 top-0 w-10 h-10 rounded-full border-4 border-slate-900 flex items-center justify-center z-10 ${
                    item.status === 'Completed' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'
                  }`}>
                    <item.icon size={16} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{item.event}</h4>
                      <span className="text-[10px] text-slate-500 font-medium">{item.date}</span>
                    </div>
                    <p className={`text-xs mt-1 ${item.status === 'Completed' ? 'text-emerald-500/70' : 'text-slate-500'}`}>
                      {item.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Activity size={18} />
                </div>
                <span className="text-sm font-bold text-slate-200">Run Health Audit</span>
              </div>
              <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                  <FileText size={18} />
                </div>
                <span className="text-sm font-bold text-slate-200">Review Proposal</span>
              </div>
              <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

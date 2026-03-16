import React from 'react';
import { 
  LayoutDashboard, 
  Mic, 
  FileText, 
  Activity, 
  Settings, 
  ShieldCheck,
  Building2,
  Users,
  Layers,
  Briefcase,
  DollarSign,
  GraduationCap,
  Link as LinkIcon,
  MessageSquare,
  Beaker,
  X
} from 'lucide-react';
import { PageView } from '../types';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  activePage: PageView;
  onNavigate: (page: PageView) => void;
  isOpen?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate, isOpen = false }) => {
  const { branding, currentUser, qaMode } = useApp();

  const platformItems = [
    { id: PageView.DASHBOARD, label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: PageView.DEAL_PIPELINE, label: 'Deal Pipeline', icon: <Briefcase size={20} /> },
    { id: PageView.DISCOVERY, label: 'Discovery Copilot', icon: <Mic size={20} /> },
    { id: PageView.PROPOSAL, label: 'Proposal Review', icon: <FileText size={20} /> },
    { id: PageView.DEAL_HEALTH, label: 'Deal Health Checker', icon: <Activity size={20} /> },
    { id: PageView.COMPANIES, label: 'Companies', icon: <Building2 size={20} /> },
    { id: PageView.MESSAGING, label: 'Messaging', icon: <MessageSquare size={20} /> },
  ];

  const managementItems = [
    { id: PageView.TEAM, label: 'Team', icon: <Users size={20} /> },
    { id: PageView.VERTICALS, label: 'Verticals', icon: <Layers size={20} /> },
    { id: PageView.SERVICE_TYPES, label: 'Service Types', icon: <ShieldCheck size={20} /> },
    { id: PageView.PRICING_MODELS, label: 'Pricing Models', icon: <DollarSign size={20} /> },
    { id: PageView.TRAINING, label: 'Training', icon: <GraduationCap size={20} /> },
    { id: PageView.CRM_INTEGRATIONS, label: 'CRM Integrations', icon: <LinkIcon size={20} /> },
  ];

  const getActiveStyles = (id: PageView) => {
    if (activePage === id) {
      return {
        background: `rgba(${parseInt(branding.primaryColor.slice(1, 3), 16)}, ${parseInt(branding.primaryColor.slice(3, 5), 16)}, ${parseInt(branding.primaryColor.slice(5, 7), 16)}, 0.1)`,
        color: branding.primaryColor,
        borderColor: `rgba(${parseInt(branding.primaryColor.slice(1, 3), 16)}, ${parseInt(branding.primaryColor.slice(3, 5), 16)}, ${parseInt(branding.primaryColor.slice(5, 7), 16)}, 0.2)`
      };
    }
    return {};
  };

  return (
    <>
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 h-full shrink-0
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
          md:translate-x-0 md:static md:flex md:flex-col
        `}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div 
              className="p-1.5 rounded-lg shadow-lg"
              style={{ backgroundColor: branding.primaryColor, boxShadow: `0 10px 15px -3px rgba(${parseInt(branding.primaryColor.slice(1, 3), 16)}, ${parseInt(branding.primaryColor.slice(3, 5), 16)}, ${parseInt(branding.primaryColor.slice(5, 7), 16)}, 0.2)` }}
            >
              <ShieldCheck className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-slate-100 leading-none tracking-tight text-sm truncate max-w-[140px]">
                {branding.companyName}
              </h1>
              <span className="text-[10px] font-medium opacity-70" style={{ color: branding.primaryColor }}>
                {branding.companyTagline}
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3 mt-2">
            Platform
          </div>
          {platformItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={getActiveStyles(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                activePage === item.id
                  ? 'border'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <span className={`transition-colors ${activePage === item.id ? '' : 'text-slate-500 group-hover:text-slate-300'}`} style={activePage === item.id ? { color: branding.primaryColor } : {}}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}

          <div className="pt-6">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">
              Management
            </div>
            {managementItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={getActiveStyles(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  activePage === item.id
                    ? 'border'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span className={`transition-colors ${activePage === item.id ? '' : 'text-slate-500 group-hover:text-slate-300'}`} style={activePage === item.id ? { color: branding.primaryColor } : {}}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-6">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">
              System
            </div>
            <button
              onClick={() => onNavigate(PageView.SETTINGS)}
              style={getActiveStyles(PageView.SETTINGS)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                activePage === PageView.SETTINGS
                  ? 'border'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Settings size={20} className={activePage === PageView.SETTINGS ? '' : 'text-slate-500 group-hover:text-slate-300'} style={activePage === PageView.SETTINGS ? { color: branding.primaryColor } : {}} />
              Branding & Settings
            </button>

            {qaMode && (
              <button
                onClick={() => onNavigate(PageView.QA)}
                style={getActiveStyles(PageView.QA)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group mt-2 ${
                  activePage === PageView.QA
                    ? 'border'
                    : 'text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10'
                }`}
              >
                <Beaker size={20} className={activePage === PageView.QA ? '' : 'text-indigo-500 group-hover:text-indigo-400'} style={activePage === PageView.QA ? { color: branding.primaryColor } : {}} />
                QA Control Panel
              </button>
            )}
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
            <div 
              className={`w-8 h-8 rounded-full bg-gradient-to-tr ${branding.gradientTheme} flex items-center justify-center text-xs font-bold text-white shadow-lg`}
            >
              {currentUser?.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium text-slate-200 truncate">{currentUser?.name}</span>
              <span className="text-xs text-slate-500 truncate">{currentUser?.role}</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

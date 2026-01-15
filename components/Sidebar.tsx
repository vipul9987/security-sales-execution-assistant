import React from 'react';
import { 
  LayoutDashboard, 
  Mic, 
  FileText, 
  Activity, 
  Settings, 
  ShieldCheck,
  Building2,
  X
} from 'lucide-react';
import { PageView } from '../types';

interface SidebarProps {
  activePage: PageView;
  onNavigate: (page: PageView) => void;
  isOpen?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate, isOpen = false }) => {
  const navItems = [
    { id: PageView.DASHBOARD, label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: PageView.DISCOVERY, label: 'Discovery Copilot', icon: <Mic size={20} /> },
    { id: PageView.PROPOSAL, label: 'Proposal Review', icon: <FileText size={20} /> },
    { id: PageView.DEAL_HEALTH, label: 'Deal Health Checker', icon: <Activity size={20} /> },
    { id: PageView.COMPANIES, label: 'Companies', icon: <Building2 size={20} /> },
  ];

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
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-slate-100 leading-none tracking-tight">Security Sales</h1>
              <span className="text-xs text-blue-400 font-medium">Execution Assistant</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3 mt-2">
            Platform
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                activePage === item.id
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <span className={`transition-colors ${activePage === item.id ? 'text-blue-500' : 'text-slate-500 group-hover:text-slate-300'}`}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}

          <div className="pt-8">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">
              System
            </div>
            <button
              onClick={() => onNavigate(PageView.SETTINGS)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                activePage === PageView.SETTINGS
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Settings size={20} className={activePage === PageView.SETTINGS ? 'text-blue-500' : 'text-slate-500 group-hover:text-slate-300'} />
              Settings
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-lg">
              JD
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium text-slate-200 truncate">John Doe</span>
              <span className="text-xs text-slate-500 truncate">Sales Manager</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
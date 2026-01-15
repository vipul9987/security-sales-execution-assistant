import React, { useState } from 'react';
import { Bell, Search, HelpCircle, Menu } from 'lucide-react';
import { PageView } from '../types';
import { useToast } from '../context/ToastContext';

interface HeaderProps {
  activePage: PageView;
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onMenuClick }) => {
  const { showToast } = useToast();
  const [searchValue, setSearchValue] = useState('');

  const getPageTitle = (page: PageView) => {
    switch (page) {
      case PageView.DASHBOARD: return 'Dashboard';
      case PageView.DISCOVERY: return 'Discovery Copilot';
      case PageView.PROPOSAL: return 'Proposal Review';
      case PageView.DEAL_HEALTH: return 'Deal Health Checker';
      case PageView.COMPANIES: return 'Companies';
      case PageView.SETTINGS: return 'Settings';
      default: return '';
    }
  };

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      showToast(`Searching for "${searchValue}"...`, "info");
      setSearchValue('');
    }
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden text-slate-400 hover:text-slate-200 p-1 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-lg font-semibold text-slate-100 tracking-tight">{getPageTitle(activePage)}</h2>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <div className="relative hidden md:block group">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search deals..." 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
            className="bg-slate-800/50 border border-slate-700 text-sm rounded-lg pl-9 pr-4 py-1.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 w-64 placeholder-slate-500 transition-all"
          />
        </div>
        
        <button 
          onClick={() => showToast("You have 3 unread notifications", "info")}
          className="text-slate-400 hover:text-slate-200 transition-colors relative p-2 hover:bg-slate-800 rounded-full"
        >
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-900"></span>
        </button>
        
        <button 
          onClick={() => showToast("Help center opened", "info")}
          className="text-slate-400 hover:text-slate-200 transition-colors p-2 hover:bg-slate-800 rounded-full"
        >
          <HelpCircle size={20} />
        </button>
      </div>
    </header>
  );
};
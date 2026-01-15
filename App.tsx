import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { DiscoveryCopilot } from './pages/DiscoveryCopilot';
import { ProposalReview } from './pages/ProposalReview';
import { DealHealthChecker } from './pages/DealHealthChecker';
import { Companies } from './pages/Companies';
import { PageView } from './types';
import { ToastProvider } from './context/ToastContext';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageView>(PageView.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNavigate = (page: PageView) => {
    setActivePage(page);
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activePage) {
      case PageView.DASHBOARD:
        return <Dashboard onNavigate={handleNavigate} />;
      case PageView.DISCOVERY:
        return <DiscoveryCopilot />;
      case PageView.PROPOSAL:
        return <ProposalReview />;
      case PageView.DEAL_HEALTH:
        return <DealHealthChecker />;
      case PageView.COMPANIES:
        return <Companies />;
      case PageView.SETTINGS:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
            <h2 className="text-xl font-semibold mb-2">Settings</h2>
            <p>User preferences and API configurations would go here.</p>
          </div>
        );
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <ToastProvider>
      <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
        {/* Mobile sidebar overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <Sidebar 
          activePage={activePage} 
          onNavigate={handleNavigate}
          isOpen={isSidebarOpen}
        />
        
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header 
            activePage={activePage} 
            onMenuClick={() => setIsSidebarOpen(true)}
          />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
            <div className="max-w-7xl mx-auto w-full">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
};

export default App;
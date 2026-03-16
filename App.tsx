import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { DiscoveryCopilot } from './pages/DiscoveryCopilot';
import { ProposalReview } from './pages/ProposalReview';
import { DealHealthChecker } from './pages/DealHealthChecker';
import { Companies } from './pages/Companies';
import { Team } from './pages/Team';
import { Verticals } from './pages/Verticals';
import { ServiceTypes } from './pages/ServiceTypes';
import { PricingModels } from './pages/PricingModels';
import { Training } from './pages/Training';
import { CRMIntegrations } from './pages/CRMIntegrations';
import { Messaging } from './pages/Messaging';
import { BrandingSettings } from './pages/BrandingSettings';
import { QAPanel } from './pages/QAPanel';
import { PageView } from './types';
import { ToastProvider } from './context/ToastContext';
import { AppProvider, useApp } from './context/AppContext';

const AppContent: React.FC = () => {
  const { branding, setQAMode } = useApp();
  const [activePage, setActivePage] = useState<PageView>(PageView.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Listen for /qa route
  React.useEffect(() => {
    const checkPath = () => {
      if (window.location.pathname === '/qa') {
        setActivePage(PageView.QA);
        setQAMode(true);
      }
    };
    checkPath();
    window.addEventListener('popstate', checkPath);
    return () => window.removeEventListener('popstate', checkPath);
  }, [setQAMode]);

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
      case PageView.TEAM:
        return <Team />;
      case PageView.VERTICALS:
        return <Verticals />;
      case PageView.SERVICE_TYPES:
        return <ServiceTypes />;
      case PageView.PRICING_MODELS:
        return <PricingModels />;
      case PageView.TRAINING:
        return <Training />;
      case PageView.CRM_INTEGRATIONS:
        return <CRMIntegrations />;
      case PageView.MESSAGING:
        return <Messaging />;
      case PageView.SETTINGS:
        return <BrandingSettings />;
      case PageView.QA:
        return <QAPanel />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
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
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AppProvider>
  );
};

export default App;

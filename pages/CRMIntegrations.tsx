import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Link as LinkIcon, CheckCircle2, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const CRMIntegrations: React.FC = () => {
  const { crmIntegrations, setCRMIntegrations, branding } = useApp();
  const { showToast } = useToast();
  const [isSyncing, setIsSyncing] = useState(false);
  const [loadingCRM, setLoadingCRM] = useState<string | null>(null);

  const crms = [
    { name: 'HubSpot', logo: 'https://www.vectorlogo.zone/logos/hubspot/hubspot-icon.svg', description: 'Sync deals, companies, and contacts automatically.' },
    { name: 'Salesforce', logo: 'https://www.vectorlogo.zone/logos/salesforce/salesforce-icon.svg', description: 'Enterprise-grade CRM integration for large teams.' },
    { name: 'Zoho', logo: 'https://www.vectorlogo.zone/logos/zoho/zoho-icon.svg', description: 'Seamlessly connect your Zoho CRM workspace.' },
    { name: 'Pipedrive', logo: 'https://www.vectorlogo.zone/logos/pipedrive/pipedrive-icon.svg', description: 'Sales-focused CRM integration for high-velocity teams.' },
  ];

  const handleToggle = (name: string) => {
    setLoadingCRM(name);
    const isConnecting = !crmIntegrations[name];
    
    showToast(`${isConnecting ? 'Connecting' : 'Disconnecting'} ${name}...`, 'info');

    setTimeout(() => {
      const newState = { ...crmIntegrations, [name]: isConnecting };
      setCRMIntegrations(newState);
      setLoadingCRM(null);
      showToast(`${name} integration ${isConnecting ? 'enabled' : 'disabled'}`, isConnecting ? 'success' : 'info');
    }, 1500);
  };

  const handleSyncAll = () => {
    setIsSyncing(true);
    showToast("Syncing data across all connected CRMs...", "info");
    
    setTimeout(() => {
      setIsSyncing(false);
      showToast("Global CRM sync complete!", "success");
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">CRM Integrations</h2>
          <p className="text-slate-400">Connect your existing CRM to sync deal intelligence and automate workflows.</p>
        </div>
        <button 
          onClick={handleSyncAll}
          disabled={isSyncing}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw size={18} className={isSyncing ? 'animate-spin' : ''} />
          {isSyncing ? 'Syncing...' : 'Sync All Data'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {crms.map((crm) => (
          <div key={crm.name} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all group relative overflow-hidden">
            {loadingCRM === crm.name && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                <RefreshCw size={32} className="text-indigo-500 animate-spin" />
              </div>
            )}
            
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white p-2 flex items-center justify-center shadow-lg">
                  <img src={crm.logo} alt={crm.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">{crm.name}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {crmIntegrations[crm.name] ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
                        <CheckCircle2 size={10} />
                        Connected
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <AlertCircle size={10} />
                        Disconnected
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center h-6">
                <button
                  onClick={() => handleToggle(crm.name)}
                  disabled={loadingCRM === crm.name}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none disabled:opacity-50 ${
                    crmIntegrations[crm.name] ? '' : 'bg-slate-800'
                  }`}
                  style={crmIntegrations[crm.name] ? { backgroundColor: branding.primaryColor } : {}}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      crmIntegrations[crm.name] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              {crm.description}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              <button className="text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest flex items-center gap-1.5">
                Configure Mapping
                <ExternalLink size={12} />
              </button>
              {crmIntegrations[crm.name] && (
                <span className="text-[10px] font-medium text-slate-500 italic">
                  Last sync: 12 minutes ago
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <Card title="Integration Logs" icon={<LinkIcon size={18} />}>
        <div className="space-y-4">
          {[
            { event: 'Deal Synced', crm: 'HubSpot', detail: 'City Hospital Security Expansion', time: '12 mins ago', status: 'success' },
            { event: 'Contact Updated', crm: 'HubSpot', detail: 'Dr. Robert Chen', time: '45 mins ago', status: 'success' },
            { event: 'Sync Failed', crm: 'Salesforce', detail: 'Authentication Error', time: '2 hours ago', status: 'error' },
          ].map((log, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-slate-800/50 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <div>
                  <p className="text-sm font-semibold text-slate-200">{log.event}</p>
                  <p className="text-xs text-slate-500">{log.crm} • {log.detail}</p>
                </div>
              </div>
              <span className="text-xs text-slate-500">{log.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

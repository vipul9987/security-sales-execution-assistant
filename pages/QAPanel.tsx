import React, { useState } from 'react';
import { Card } from '../components/Card';
import { 
  Beaker, 
  Play, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Database, 
  Trash2, 
  Bug,
  RefreshCw,
  Terminal,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { UserRole, LeadSource, QAStatus, QAStatusValue, SystemErrorType } from '../types';

export const QAPanel: React.FC = () => {
  const { 
    qaStatuses, 
    updateQAStatus, 
    errors, 
    clearErrors,
    setTeam,
    setDeals,
    setVerticals,
    setBranding,
    branding,
    team,
    deals,
    verticals
  } = useApp();
  const { showToast } = useToast();
  const [isRunningAll, setIsRunningAll] = useState(false);

  const modules = [
    { id: 'COMPANIES', name: 'Companies', description: 'CRUD operations for client companies.' },
    { id: 'TEAM', name: 'Team Hierarchy', description: 'Role assignments and reporting lines.' },
    { id: 'VERTICALS', name: 'Verticals', description: 'Industry-specific risk/service mapping.' },
    { id: 'DEALS', name: 'Deals', description: 'Deal lifecycle and financial tracking.' },
    { id: 'STAKEHOLDERS', name: 'Stakeholders', description: 'Influence mapping and contact management.' },
    { id: 'DISCOVERY', name: 'Discovery Copilot', description: 'AI-driven call note analysis.' },
    { id: 'PROPOSAL', name: 'Proposal Review', description: 'AI-powered document auditing.' },
    { id: 'DEAL_HEALTH', name: 'Deal Health', description: 'Predictive risk evaluation.' },
    { id: 'MESSAGING', name: 'Messaging', description: 'Internal broadcasts and 1:1 chats.' },
    { id: 'PRICING', name: 'Pricing Models', description: 'Rate calculation and service pricing.' },
    { id: 'BRANDING', name: 'Branding', description: 'Dynamic theme and identity application.' },
    { id: 'CRM', name: 'CRM Integration', description: 'Third-party data synchronization.' }
  ];

  const runTest = async (moduleId: string) => {
    showToast(`Running test for ${moduleId}...`, 'info');
    
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Randomly pass or fail for demo purposes, but mostly pass
    const success = Math.random() > 0.1;
    updateQAStatus(moduleId, 'Functional Integration', success ? QAStatusValue.PASS : QAStatusValue.FAIL);
    
    if (success) {
      showToast(`${moduleId} test passed!`, 'success');
    } else {
      showToast(`${moduleId} test failed!`, 'error');
      // Log a mock error
      console.error(`QA Test Failure: ${moduleId} module failed state reconciliation.`);
    }
  };

  const runAllTests = async () => {
    setIsRunningAll(true);
    showToast("Starting full system audit...", "info");
    for (const mod of modules) {
      await runTest(mod.id);
    }
    setIsRunningAll(false);
    showToast("Full system audit complete", "success");
  };

  const clearAllTests = () => {
    modules.forEach(mod => updateQAStatus(mod.id, 'Functional Integration', QAStatusValue.NOT_TESTED));
    showToast("All test statuses cleared.", "info");
  };

  const generateMockData = () => {
    // Generate 5 more deals
    const newDeals = Array.from({ length: 5 }).map((_, i) => ({
      id: `mock-d-${Date.now()}-${i}`,
      companyId: Math.floor(Math.random() * 10) + 1,
      title: `Mock Security Project ${i + 1}`,
      value: Math.floor(Math.random() * 500000) + 50000,
      weeklyHours: Math.floor(Math.random() * 168) + 40,
      status: ['Discovery', 'Proposal', 'Negotiation'][Math.floor(Math.random() * 3)] as any,
      healthScore: Math.floor(Math.random() * 40) + 60,
      leadSource: LeadSource.REFERRAL,
      serviceTypes: ['1', '2'],
      techRequirements: ['AI Cameras', 'Mobile Patrol'],
      stakeholders: [],
      ownerId: team[Math.floor(Math.random() * team.length)].id,
      pricingModelId: '1',
      crmSynced: Math.random() > 0.5,
      createdAt: new Date().toISOString()
    }));

    setDeals([...deals, ...newDeals]);
    showToast("Generated 5 mock deals", "success");
  };

  const triggerError = () => {
    // Intentionally trigger an error
    try {
      // @ts-ignore
      const x = undefined.property;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
            <Beaker className="text-indigo-400" /> QA Control Panel
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manual testing and system monitoring dashboard.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={clearAllTests}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-bold text-sm transition-all"
          >
            <RefreshCw size={16} />
            Clear Statuses
          </button>
          <button 
            onClick={runAllTests}
            disabled={isRunningAll}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-sm transition-all disabled:opacity-50"
          >
            {isRunningAll ? <RefreshCw size={16} className="animate-spin" /> : <Play size={16} />}
            Run Full System Audit
          </button>
          <button 
            onClick={generateMockData}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-bold text-sm transition-all"
          >
            <Database size={16} />
            Generate Mock Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Test Suite */}
        <div className="xl:col-span-2 space-y-6">
          <Card title="Module Test Suite" icon={<ShieldCheck size={18} className="text-indigo-400" />}>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-800">
                    <th className="pb-3 pl-2">Module</th>
                    <th className="pb-3">Test Name</th>
                    <th className="pb-3">Expected Result</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {modules.map((mod) => {
                    const status = qaStatuses.find(s => s.moduleId === mod.id);
                    return (
                      <tr key={mod.id} className="group hover:bg-slate-800/30 transition-colors">
                        <td className="py-4 pl-2">
                          <div className="font-bold text-slate-200">{mod.name}</div>
                          <div className="text-xs text-slate-500">{mod.description}</div>
                        </td>
                        <td className="py-4 text-sm text-slate-400">Functional Integration</td>
                        <td className="py-4 text-sm text-slate-400 italic">State updates correctly</td>
                        <td className="py-4">
                          {!status ? (
                            <span className="px-2 py-1 rounded text-[10px] font-bold bg-slate-800 text-slate-500 uppercase">Not Tested</span>
                          ) : status.status === 'Pass' ? (
                            <span className="px-2 py-1 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500 uppercase flex items-center gap-1 w-fit">
                              <CheckCircle2 size={10} /> Pass
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded text-[10px] font-bold bg-rose-500/10 text-rose-500 uppercase flex items-center gap-1 w-fit">
                              <XCircle size={10} /> Fail
                            </span>
                          )}
                        </td>
                        <td className="py-4 text-right pr-2">
                          <button 
                            onClick={() => runTest(mod.id)}
                            className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all"
                            title="Run Test"
                          >
                            <Play size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Error Monitor */}
        <div className="space-y-6">
          <Card title="System Error Monitor" icon={<Bug size={18} className="text-rose-400" />}>
            <div className="flex flex-col h-[600px]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  {errors.length} Errors Logged
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={triggerError}
                    className="text-[10px] font-bold text-rose-400 hover:text-rose-300 uppercase tracking-wider"
                  >
                    Trigger Test Error
                  </button>
                  <button 
                    onClick={clearErrors}
                    className="text-[10px] font-bold text-slate-500 hover:text-slate-300 uppercase tracking-wider flex items-center gap-1"
                  >
                    <Trash2 size={10} /> Clear
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {errors.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-600 opacity-50">
                    <Terminal size={48} className="mb-4" />
                    <p className="text-sm">No system errors detected.</p>
                  </div>
                ) : (
                  errors.map((err) => (
                    <div key={err.id} className="p-3 rounded-lg bg-rose-500/5 border border-rose-500/10 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 text-rose-400">
                          <AlertCircle size={14} />
                          <span className="text-xs font-bold font-mono truncate">{err.message}</span>
                        </div>
                        <span className="text-[10px] text-slate-600 shrink-0">
                          {new Date(err.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      {err.stack && (
                        <pre className="text-[10px] text-slate-500 font-mono bg-black/20 p-2 rounded overflow-x-auto">
                          {err.stack.split('\n').slice(0, 3).join('\n')}
                        </pre>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </Card>

          <Card title="QA Visual Indicators" icon={<Zap size={18} className="text-amber-400" />}>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-sm text-slate-300 font-medium">Working / Passed</span>
                </div>
                <span className="text-xs font-bold text-emerald-500">100% Logic</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-sm text-slate-300 font-medium">Partially Working</span>
                </div>
                <span className="text-xs font-bold text-amber-500">Mock State</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-rose-500/5 border border-rose-500/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="text-sm text-slate-300 font-medium">Broken / Failed</span>
                </div>
                <span className="text-xs font-bold text-rose-500">Error State</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

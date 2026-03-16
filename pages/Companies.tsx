import React, { useState } from 'react';
import { Card } from '../components/Card';
import { 
  Search, 
  Plus, 
  Filter, 
  ChevronRight,
  Briefcase,
  Target,
  Users,
  Shield,
  Clock,
  Mail,
  Phone,
  CheckCircle2,
  Trash2,
  Edit2,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Deal, Stakeholder, LeadSource } from '../types';
import { useToast } from '../context/ToastContext';
import { Modal } from '../components/Modal';

export const Companies: React.FC = () => {
  const { deals, setDeals, branding, team } = useApp();
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [newDeal, setNewDeal] = useState<Partial<Deal>>({
    title: '',
    value: 0,
    weeklyHours: 0,
    status: 'Discovery',
    healthScore: 70,
    leadSource: LeadSource.WEBSITE,
    serviceTypes: [],
    techRequirements: [],
    stakeholders: [],
    ownerId: team[0]?.id || '',
    pricingModelId: '1',
    crmSynced: false
  });

  const filteredDeals = deals.filter(deal => 
    deal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsDetailModalOpen(true);
  };

  const handleDeleteDeal = (id: string) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      setDeals(deals.filter(d => d.id !== id));
      showToast("Deal deleted successfully", "success");
      setIsDetailModalOpen(false);
    }
  };

  const handleAddDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeal.title || !newDeal.value) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const deal: Deal = {
        ...newDeal as Deal,
        id: `d-${Date.now()}`,
        companyId: Math.floor(Math.random() * 1000),
        createdAt: new Date().toISOString()
      };
      setDeals([deal, ...deals]);
      setIsSubmitting(false);
      setIsAddModalOpen(false);
      setNewDeal({
        title: '',
        value: 0,
        weeklyHours: 0,
        status: 'Discovery',
        healthScore: 70,
        leadSource: LeadSource.WEBSITE,
        serviceTypes: [],
        techRequirements: [],
        stakeholders: [],
        ownerId: team[0]?.id || '',
        pricingModelId: '1',
        crmSynced: false
      });
      showToast("New deal created successfully", "success");
    }, 1000);
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (score >= 50) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Deals & Pipeline</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your security sales pipeline and client intelligence.</p>
        </div>
        <button 
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-lg active:scale-95 text-white"
          style={{ backgroundColor: branding.primaryColor }}
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={18} />
          New Deal
        </button>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search deals..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
              style={{ '--tw-ring-color': branding.primaryColor } as React.CSSProperties}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:bg-slate-800 transition-colors text-sm font-medium">
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="pb-4 font-semibold text-slate-400 text-xs uppercase tracking-wider pl-4">Deal Title</th>
                <th className="pb-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">Status</th>
                <th className="pb-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">Value (ACV)</th>
                <th className="pb-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">Weekly Hours</th>
                <th className="pb-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">Health</th>
                <th className="pb-4 font-semibold text-slate-400 text-xs uppercase tracking-wider text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredDeals.map((deal) => (
                <tr key={deal.id} className="group hover:bg-slate-800/20 transition-colors">
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700 group-hover:border-slate-600 transition-colors">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-100 group-hover:text-white transition-colors">{deal.title}</div>
                        <div className="text-xs text-slate-500">Created {new Date(deal.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-slate-300 bg-slate-800/50 px-2 py-1 rounded border border-slate-700">
                      {deal.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="text-sm font-medium text-slate-200">
                      ${deal.value.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="text-sm text-slate-400 flex items-center gap-1">
                      <Clock size={14} />
                      {deal.weeklyHours} hrs
                    </div>
                  </td>
                  <td className="py-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getHealthColor(deal.healthScore)}`}>
                      {deal.healthScore}%
                    </div>
                  </td>
                  <td className="py-4 text-right pr-4">
                    <button 
                      onClick={() => handleViewDeal(deal)}
                      className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-all"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Deal Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create New Deal">
        <form onSubmit={handleAddDeal} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Deal Title</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                value={newDeal.title}
                onChange={(e) => setNewDeal({...newDeal, title: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Annual Value ($)</label>
              <input 
                type="number" 
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                value={newDeal.value}
                onChange={(e) => setNewDeal({...newDeal, value: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Weekly Hours</label>
              <input 
                type="number" 
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                value={newDeal.weeklyHours}
                onChange={(e) => setNewDeal({...newDeal, weeklyHours: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Lead Source</label>
              <select 
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                value={newDeal.leadSource}
                onChange={(e) => setNewDeal({...newDeal, leadSource: e.target.value as LeadSource})}
              >
                {Object.values(LeadSource).map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button"
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors text-sm font-bold"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg text-white font-bold text-sm shadow-lg shadow-black/20 flex items-center gap-2"
              style={{ backgroundColor: branding.primaryColor }}
            >
              {isSubmitting && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {isSubmitting ? 'Creating...' : 'Create Deal'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Deal Detail Modal */}
      <Modal 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)} 
        title="Deal Intelligence"
      >
        {selectedDeal && (
          <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedDeal.title}</h2>
                <p className="text-slate-400 flex items-center gap-2 mt-1">
                  <Target size={16} /> ACV: ${selectedDeal.value.toLocaleString()}
                </p>
              </div>
              <div className={`px-4 py-2 rounded-xl border text-center ${getHealthColor(selectedDeal.healthScore)}`}>
                <div className="text-2xl font-bold">{selectedDeal.healthScore}%</div>
                <div className="text-[10px] uppercase font-bold tracking-widest opacity-70">Health Score</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Weekly Hours</p>
                <p className="text-lg font-bold text-white">{selectedDeal.weeklyHours} hrs</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Lead Source</p>
                <p className="text-lg font-bold text-white capitalize">{selectedDeal.leadSource}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Status</p>
                <p className="text-lg font-bold text-white">{selectedDeal.status}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">CRM Status</p>
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm mt-1">
                  <CheckCircle2 size={14} /> {selectedDeal.crmSynced ? 'Synced' : 'Not Synced'}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex justify-between gap-3">
              <button 
                className="px-4 py-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-colors text-sm font-bold flex items-center gap-2"
                onClick={() => handleDeleteDeal(selectedDeal.id)}
              >
                <Trash2 size={16} /> Delete Deal
              </button>
              <div className="flex gap-3">
                <button 
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors text-sm font-bold"
                  onClick={() => setIsDetailModalOpen(false)}
                >
                  Close
                </button>
                <button 
                  className="px-4 py-2 rounded-lg text-white font-bold text-sm shadow-lg shadow-black/20 flex items-center gap-2"
                  style={{ backgroundColor: branding.primaryColor }}
                  onClick={() => showToast("Edit Deal feature coming soon", "info")}
                >
                  <Edit2 size={16} /> Edit Deal
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

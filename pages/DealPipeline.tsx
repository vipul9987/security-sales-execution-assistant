import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar, 
  DollarSign, 
  Clock, 
  User, 
  Building2,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Clock3,
  TrendingUp,
  Trash2,
  Edit2,
  X
} from 'lucide-react';
import { Card } from '../components/Card';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { Deal, LeadSource, Stakeholder } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DealPipeline: React.FC = () => {
  const { deals, setDeals, companies, verticals, team, serviceTypes, branding } = useApp();
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Deal>>({
    title: '',
    companyId: undefined,
    verticalId: '',
    value: 0,
    weeklyHours: 0,
    status: 'Open',
    stage: 'Discovery',
    leadSource: LeadSource.WEBSITE,
    serviceTypes: [],
    techRequirements: [],
    stakeholders: [],
    ownerId: '',
    pricingModelId: '1',
    proposalText: '',
    discoveryNotes: '',
    lastInteraction: new Date().toISOString(),
    competitors: []
  });

  const filteredDeals = deals.filter(deal => 
    deal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    open: deals.filter(d => d.status === 'Open').length,
    pending: deals.filter(d => d.status === 'Pending').length,
    closed: deals.filter(d => d.status === 'Closed').length,
    atRisk: deals.filter(d => d.status === 'At Risk').length,
  };

  const handleSave = () => {
    if (!formData.title || !formData.companyId || !formData.ownerId) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    if (editingDeal) {
      setDeals(deals.map(d => d.id === editingDeal.id ? { ...editingDeal, ...formData } as Deal : d));
      showToast('Deal updated successfully', 'success');
    } else {
      const newDeal: Deal = {
        ...formData,
        id: `d-${Date.now()}`,
        healthScore: 70,
        crmSynced: false,
        createdAt: new Date().toISOString(),
      } as Deal;
      setDeals([newDeal, ...deals]);
      showToast('Deal created successfully', 'success');
    }
    setIsModalOpen(false);
    setEditingDeal(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      companyId: undefined,
      verticalId: '',
      value: 0,
      weeklyHours: 0,
      status: 'Open',
      stage: 'Discovery',
      leadSource: LeadSource.WEBSITE,
      serviceTypes: [],
      techRequirements: [],
      stakeholders: [],
      ownerId: '',
      pricingModelId: '1',
      proposalText: '',
      discoveryNotes: '',
      lastInteraction: new Date().toISOString(),
      competitors: []
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      setDeals(deals.filter(d => d.id !== id));
      showToast('Deal deleted', 'info');
    }
  };

  const openEditModal = (deal: Deal) => {
    setEditingDeal(deal);
    setFormData(deal);
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Pending': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Closed': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'At Risk': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return <TrendingUp size={14} />;
      case 'Pending': return <Clock3 size={14} />;
      case 'Closed': return <CheckCircle2 size={14} />;
      case 'At Risk': return <AlertCircle size={14} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Deal Pipeline</h1>
          <p className="text-slate-400 text-sm">Manage and track your security service opportunities.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setEditingDeal(null); setIsModalOpen(true); }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-red-500/20"
          style={{ backgroundColor: branding.primaryColor, color: 'white' }}
        >
          <Plus size={18} />
          Create Deal
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Open', count: stats.open, color: 'text-blue-400' },
          { label: 'Pending', count: stats.pending, color: 'text-amber-400' },
          { label: 'Closed', count: stats.closed, color: 'text-emerald-400' },
          { label: 'At Risk', count: stats.atRisk, color: 'text-rose-400' },
        ].map((stat) => (
          <Card key={stat.label} className="p-4 flex flex-col items-center justify-center text-center">
            <span className={cn("text-2xl font-bold", stat.color)}>{stat.count}</span>
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">{stat.label}</span>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search deals by title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:bg-slate-800 transition-colors">
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Deal List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredDeals.length > 0 ? (
          filteredDeals.map((deal) => {
            const company = companies.find(c => c.id === deal.companyId);
            const owner = team.find(t => t.id === deal.ownerId);
            const vertical = verticals.find(v => v.id === deal.verticalId);

            return (
              <Card key={deal.id} className="p-0 overflow-hidden group hover:border-slate-700 transition-all">
                <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-slate-100 group-hover:text-red-400 transition-colors">{deal.title}</h3>
                          <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 uppercase", getStatusColor(deal.status))}>
                            {getStatusIcon(deal.status)}
                            {deal.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <Building2 size={14} />
                            {company?.name || 'Unknown Company'}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-700" />
                          <span className="flex items-center gap-1">
                            <Layers size={14} />
                            {vertical?.name || 'General'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => openEditModal(deal)}
                          className="p-2 text-slate-500 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(deal.id)}
                          className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Value (ACV)</span>
                        <div className="flex items-center gap-1 text-slate-200 font-semibold">
                          <DollarSign size={14} className="text-emerald-500" />
                          {deal.value.toLocaleString()}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Weekly Hours</span>
                        <div className="flex items-center gap-1 text-slate-200 font-semibold">
                          <Clock size={14} className="text-blue-400" />
                          {deal.weeklyHours} hrs
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Sales Owner</span>
                        <div className="flex items-center gap-1 text-slate-200 font-semibold">
                          <User size={14} className="text-amber-400" />
                          {owner?.name || 'Unassigned'}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Health Score</span>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden max-w-[60px]">
                            <div 
                              className={cn("h-full rounded-full", deal.healthScore > 70 ? "bg-emerald-500" : deal.healthScore > 40 ? "bg-amber-500" : "bg-rose-500")}
                              style={{ width: `${deal.healthScore}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-300">{deal.healthScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-12 bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl">
            <Briefcase size={48} className="mx-auto text-slate-700 mb-4" />
            <h3 className="text-lg font-medium text-slate-300">No deals found</h3>
            <p className="text-slate-500 text-sm">Try adjusting your search or create a new deal.</p>
          </div>
        )}
      </div>

      {/* Deal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-100">
                {editingDeal ? 'Edit Deal' : 'Create New Deal'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-200">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Deal Title *</label>
                    <input 
                      type="text" 
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                      placeholder="e.g. Downtown Plaza Security"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Company *</label>
                    <select 
                      value={formData.companyId}
                      onChange={(e) => setFormData({ ...formData, companyId: Number(e.target.value) })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    >
                      <option value="">Select Company</option>
                      {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Vertical</label>
                    <select 
                      value={formData.verticalId}
                      onChange={(e) => setFormData({ ...formData, verticalId: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    >
                      <option value="">Select Vertical</option>
                      {verticals.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">ACV ($)</label>
                      <input 
                        type="number" 
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Weekly Hours</label>
                      <input 
                        type="number" 
                        value={formData.weeklyHours}
                        onChange={(e) => setFormData({ ...formData, weeklyHours: Number(e.target.value) })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Sales Owner *</label>
                    <select 
                      value={formData.ownerId}
                      onChange={(e) => setFormData({ ...formData, ownerId: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    >
                      <option value="">Select Owner</option>
                      {team.map(t => <option key={t.id} value={t.id}>{t.name} ({t.role})</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lead Source</label>
                    <select 
                      value={formData.leadSource}
                      onChange={(e) => setFormData({ ...formData, leadSource: e.target.value as LeadSource })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    >
                      {Object.values(LeadSource).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Deal Status</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    >
                      <option value="Open">Open</option>
                      <option value="Pending">Pending</option>
                      <option value="Closed">Closed</option>
                      <option value="At Risk">At Risk</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Deal Stage</label>
                    <select 
                      value={formData.stage}
                      onChange={(e) => setFormData({ ...formData, stage: e.target.value as any })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    >
                      <option value="Discovery">Discovery</option>
                      <option value="Proposal">Proposal</option>
                      <option value="Negotiation">Negotiation</option>
                      <option value="Closed Won">Closed Won</option>
                      <option value="Closed Lost">Closed Lost</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Security Services</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {serviceTypes.map(st => (
                      <label key={st.id} className="flex items-center gap-2 p-2 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors">
                        <input 
                          type="checkbox" 
                          checked={formData.serviceTypes?.includes(st.id)}
                          onChange={(e) => {
                            const current = formData.serviceTypes || [];
                            if (e.target.checked) {
                              setFormData({ ...formData, serviceTypes: [...current, st.id] });
                            } else {
                              setFormData({ ...formData, serviceTypes: current.filter(id => id !== st.id) });
                            }
                          }}
                          className="rounded border-slate-600 text-red-600 focus:ring-red-500/50 bg-slate-900"
                        />
                        <span className="text-sm text-slate-300">{st.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Discovery Notes</label>
                  <textarea 
                    value={formData.discoveryNotes}
                    onChange={(e) => setFormData({ ...formData, discoveryNotes: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 h-24 resize-none"
                    placeholder="Key findings from discovery calls..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Proposal Text</label>
                  <textarea 
                    value={formData.proposalText}
                    onChange={(e) => setFormData({ ...formData, proposalText: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 h-32 resize-none"
                    placeholder="Main proposal content..."
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-800 flex items-center justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-slate-400 hover:text-slate-200 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-6 py-2 rounded-lg font-bold shadow-lg shadow-red-500/20"
                style={{ backgroundColor: branding.primaryColor, color: 'white' }}
              >
                {editingDeal ? 'Update Deal' : 'Create Deal'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

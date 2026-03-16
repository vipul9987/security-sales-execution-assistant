import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Layers, Plus, Edit2, Trash2, ShieldAlert, Briefcase, X, Search } from 'lucide-react';
import { Vertical } from '../types';
import { useToast } from '../context/ToastContext';
import { Modal } from '../components/Modal';

export const Verticals: React.FC = () => {
  const { verticals, setVerticals, branding } = useApp();
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newVertical, setNewVertical] = useState<Partial<Vertical>>({
    name: '',
    description: '',
    typicalRisks: [],
    typicalServices: []
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVertical.name || !newVertical.description) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const vertical: Vertical = {
        id: `v-${Date.now()}`,
        name: newVertical.name!,
        description: newVertical.description!,
        typicalRisks: newVertical.typicalRisks || [],
        typicalServices: newVertical.typicalServices || []
      };
      setVerticals([...verticals, vertical]);
      setIsSubmitting(false);
      setIsAdding(false);
      setNewVertical({ name: '', description: '', typicalRisks: [], typicalServices: [] });
      showToast('Vertical added successfully!', 'success');
    }, 1000);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this vertical?')) {
      setVerticals(verticals.filter(v => v.id !== id));
      showToast('Vertical removed successfully!', 'info');
    }
  };

  const filteredVerticals = verticals.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Vertical Market Management</h2>
          <p className="text-slate-400">Define and manage industry verticals to tailor your security solutions.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: branding.primaryColor }}
        >
          <Plus size={18} />
          Add Vertical
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
        <input
          type="text"
          placeholder="Search verticals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVerticals.map((vertical) => (
          <div key={vertical.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col group">
            <div className="p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-xl bg-slate-950 text-slate-400 group-hover:text-white transition-colors">
                  <Layers size={20} />
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-slate-500 hover:text-blue-400 transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(vertical.id)}
                    className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">{vertical.name}</h3>
              <p className="text-sm text-slate-400 line-clamp-2 mb-4">{vertical.description}</p>
              
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    <ShieldAlert size={12} />
                    Typical Risks
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {vertical.typicalRisks.map((risk, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 text-[10px] font-medium border border-red-500/20">
                        {risk}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    <Briefcase size={12} />
                    Guard Services
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {vertical.typicalServices.map((service, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-medium border border-blue-500/20">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-950/50 border-t border-slate-800 text-center">
              <button className="text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest">
                View Vertical Strategy
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isAdding} onClose={() => setIsAdding(false)} title="Add New Vertical">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Vertical Name</label>
            <input
              type="text"
              required
              value={newVertical.name || ''}
              onChange={(e) => setNewVertical({ ...newVertical, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors"
              placeholder="e.g. Logistics & Warehousing"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
            <textarea
              required
              value={newVertical.description || ''}
              onChange={(e) => setNewVertical({ ...newVertical, description: e.target.value })}
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors"
              placeholder="Describe the vertical and its security needs..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Typical Risks (comma separated)</label>
              <input
                type="text"
                onChange={(e) => setNewVertical({ ...newVertical, typicalRisks: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '') })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors"
                placeholder="Theft, Fire, Vandalism"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Typical Services (comma separated)</label>
              <input
                type="text"
                onChange={(e) => setNewVertical({ ...newVertical, typicalServices: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '') })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors"
                placeholder="Armed Guard, Patrol"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-lg font-bold text-slate-400 hover:text-slate-100 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg font-bold text-white transition-all hover:opacity-90 active:scale-95 text-sm shadow-lg flex items-center gap-2"
              style={{ backgroundColor: branding.primaryColor }}
            >
              {isSubmitting && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {isSubmitting ? 'Creating...' : 'Create Vertical'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Briefcase, Plus, Edit2, Trash2, X, Info } from 'lucide-react';
import { ServiceType } from '../types';
import { useToast } from '../context/ToastContext';

export const ServiceTypes: React.FC = () => {
  const { serviceTypes, setServiceTypes, branding } = useApp();
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [newService, setNewService] = useState<Partial<ServiceType>>({});

  const handleAdd = () => {
    if (newService.name && newService.description) {
      const service: ServiceType = {
        id: Math.random().toString(36).substr(2, 9),
        name: newService.name,
        description: newService.description
      };
      setServiceTypes([...serviceTypes, service]);
      setIsAdding(false);
      setNewService({});
      showToast('Service type added successfully!', 'success');
    }
  };

  const handleDelete = (id: string) => {
    setServiceTypes(serviceTypes.filter(s => s.id !== id));
    showToast('Service type removed!', 'info');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Service Type Configuration</h2>
          <p className="text-slate-400">Configure the core security services your company offers.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: branding.primaryColor }}
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {serviceTypes.map((service) => (
          <div key={service.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl hover:border-slate-700 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 text-slate-500 hover:text-blue-400 transition-colors">
                <Edit2 size={14} />
              </button>
              <button 
                onClick={() => handleDelete(service.id)}
                className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-slate-950 text-slate-400 group-hover:text-white transition-colors">
                <Briefcase size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-100 mb-1">{service.name}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 flex items-start gap-4">
        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
          <Info size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-1">Service Intelligence</h4>
          <p className="text-sm text-slate-400">These service types are used across the platform to categorize deals, calculate pricing models, and generate tailored discovery questions for your sales team.</p>
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl animate-slide-in">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-100">Add Service Type</h3>
              <button onClick={() => setIsAdding(false)} className="text-slate-500 hover:text-slate-200 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Service Name</label>
                <input
                  type="text"
                  value={newService.name || ''}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="e.g. K9 Security"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                <textarea
                  value={newService.description || ''}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Describe the service..."
                />
              </div>
            </div>
            <div className="p-6 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 rounded-lg font-medium text-slate-400 hover:text-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-6 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90 active:scale-95"
                style={{ backgroundColor: branding.primaryColor }}
              >
                Add Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

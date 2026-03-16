import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { DollarSign, Plus, Edit2, Trash2, X, Calculator, Clock, Calendar, Shield } from 'lucide-react';
import { PricingModel } from '../types';
import { useToast } from '../context/ToastContext';

export const PricingModels: React.FC = () => {
  const { pricingModels, setPricingModels, branding } = useApp();
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [newModel, setNewModel] = useState<Partial<PricingModel>>({
    standardRate: 0,
    overtimeRate: 0,
    holidayRate: 0,
    mobilePatrolRate: 0,
    armedGuardRate: 0,
    unarmedGuardRate: 0
  });

  const handleAdd = () => {
    if (newModel.name) {
      const model: PricingModel = {
        id: Math.random().toString(36).substr(2, 9),
        name: newModel.name,
        standardRate: Number(newModel.standardRate) || 0,
        overtimeRate: Number(newModel.overtimeRate) || 0,
        holidayRate: Number(newModel.holidayRate) || 0,
        mobilePatrolRate: Number(newModel.mobilePatrolRate) || 0,
        armedGuardRate: Number(newModel.armedGuardRate) || 0,
        unarmedGuardRate: Number(newModel.unarmedGuardRate) || 0
      };
      setPricingModels([...pricingModels, model]);
      setIsAdding(false);
      setNewModel({ standardRate: 0, overtimeRate: 0, holidayRate: 0, mobilePatrolRate: 0, armedGuardRate: 0, unarmedGuardRate: 0 });
      showToast('Pricing model created successfully!', 'success');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Pricing Model Configuration</h2>
          <p className="text-slate-400">Define your company's standard pricing structures for different service levels.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: branding.primaryColor }}
        >
          <Plus size={18} />
          Create Model
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pricingModels.map((model) => (
          <div key={model.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all group">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-950 text-slate-400 group-hover:text-white transition-colors">
                  <Calculator size={20} />
                </div>
                <h3 className="font-bold text-slate-100">{model.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-500 hover:text-blue-400 transition-colors">
                  <Edit2 size={16} />
                </button>
                <button className="p-2 text-slate-500 hover:text-red-400 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <Clock size={12} />
                  Standard
                </div>
                <p className="text-xl font-bold text-slate-100">${model.standardRate}<span className="text-xs text-slate-500 font-normal ml-1">/hr</span></p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <Clock size={12} />
                  Overtime
                </div>
                <p className="text-xl font-bold text-slate-100">${model.overtimeRate}<span className="text-xs text-slate-500 font-normal ml-1">/hr</span></p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <Calendar size={12} />
                  Holiday
                </div>
                <p className="text-xl font-bold text-slate-100">${model.holidayRate}<span className="text-xs text-slate-500 font-normal ml-1">/hr</span></p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <Shield size={12} />
                  Armed
                </div>
                <p className="text-xl font-bold text-slate-100">${model.armedGuardRate}<span className="text-xs text-slate-500 font-normal ml-1">/hr</span></p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <Shield size={12} />
                  Unarmed
                </div>
                <p className="text-xl font-bold text-slate-100">${model.unarmedGuardRate}<span className="text-xs text-slate-500 font-normal ml-1">/hr</span></p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <Calculator size={12} />
                  Patrol
                </div>
                <p className="text-xl font-bold text-slate-100">${model.mobilePatrolRate}<span className="text-xs text-slate-500 font-normal ml-1">/hr</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl animate-slide-in">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-100">Create Pricing Model</h3>
              <button onClick={() => setIsAdding(false)} className="text-slate-500 hover:text-slate-200 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Model Name</label>
                <input
                  type="text"
                  value={newModel.name || ''}
                  onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="e.g. West Coast Standard 2026"
                />
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Standard Rate ($)</label>
                  <input
                    type="number"
                    value={newModel.standardRate}
                    onChange={(e) => setNewModel({ ...newModel, standardRate: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Overtime Rate ($)</label>
                  <input
                    type="number"
                    value={newModel.overtimeRate}
                    onChange={(e) => setNewModel({ ...newModel, overtimeRate: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Holiday Rate ($)</label>
                  <input
                    type="number"
                    value={newModel.holidayRate}
                    onChange={(e) => setNewModel({ ...newModel, holidayRate: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Armed Rate ($)</label>
                  <input
                    type="number"
                    value={newModel.armedGuardRate}
                    onChange={(e) => setNewModel({ ...newModel, armedGuardRate: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Unarmed Rate ($)</label>
                  <input
                    type="number"
                    value={newModel.unarmedGuardRate}
                    onChange={(e) => setNewModel({ ...newModel, unarmedGuardRate: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Mobile Patrol ($)</label>
                  <input
                    type="number"
                    value={newModel.mobilePatrolRate}
                    onChange={(e) => setNewModel({ ...newModel, mobilePatrolRate: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
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
                Create Model
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

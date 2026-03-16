import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { GraduationCap, Plus, FileText, Video, File, Search, Filter, Clock, CheckCircle2, X, Upload, RefreshCw } from 'lucide-react';
import { TrainingMaterial } from '../types';
import { useToast } from '../context/ToastContext';

export const Training: React.FC = () => {
  const { training, setTraining, branding, currentUser } = useApp();
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    type: 'PDF',
    category: 'Discovery'
  });

  const categories = ['All', 'Discovery', 'Objections', 'Risk', 'Proposal'];

  const filteredTraining = training.filter(t => 
    (filterCategory === 'All' || t.category === filterCategory) &&
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText size={20} />;
      case 'Video': return <Video size={20} />;
      default: return <File size={20} />;
    }
  };

  const handleUpload = () => {
    if (!newMaterial.title.trim()) {
      showToast("Please enter a title", "error");
      return;
    }

    setIsUploading(true);
    showToast("Uploading material...", "info");

    setTimeout(() => {
      const material: TrainingMaterial = {
        id: Date.now().toString(),
        title: newMaterial.title,
        type: newMaterial.type as any,
        category: newMaterial.category,
        url: '#'
      };

      setTraining([...training, material]);
      setIsUploading(false);
      setIsAdding(false);
      setNewMaterial({ title: '', type: 'PDF', category: 'Discovery' });
      showToast('Material uploaded successfully!', 'success');
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Sales Training & Enablement</h2>
          <p className="text-slate-400">Access training materials and best practices to improve your sales execution.</p>
        </div>
        {currentUser?.role !== 'Sales Representative' && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: branding.primaryColor }}
          >
            <Plus size={18} />
            Upload Material
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search training materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-sm"
            style={{ '--tw-ring-color': branding.primaryColor } as React.CSSProperties}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap border transition-all ${
                filterCategory === cat
                  ? 'bg-slate-800 border-slate-700 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
              style={filterCategory === cat ? { borderColor: branding.primaryColor, color: branding.primaryColor } : {}}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTraining.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all group flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-xl bg-slate-950 text-slate-400 group-hover:text-white transition-colors">
                  {getIcon(item.type)}
                </div>
                <span className="px-2 py-1 rounded bg-slate-950 text-slate-500 text-[10px] font-bold uppercase tracking-widest border border-slate-800">
                  {item.type}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-white transition-colors">{item.title}</h3>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{item.category}</p>
              
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  15 min
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-emerald-500" />
                  Completed
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-950/50 border-t border-slate-800">
              <button 
                onClick={() => showToast(`Opening ${item.title}...`, 'info')}
                className="w-full py-2 rounded-lg text-sm font-bold transition-all hover:opacity-90"
                style={{ backgroundColor: `${branding.primaryColor}20`, color: branding.primaryColor }}
              >
                View Material
              </button>
            </div>
          </div>
        ))}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl animate-slide-in">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-100">Upload Training Material</h3>
              <button onClick={() => setIsAdding(false)} className="text-slate-500 hover:text-slate-200 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  value={newMaterial.title}
                  onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors"
                  style={{ '--tw-ring-color': branding.primaryColor } as React.CSSProperties}
                  placeholder="e.g. Closing Techniques"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Type</label>
                  <select 
                    value={newMaterial.type}
                    onChange={(e) => setNewMaterial({...newMaterial, type: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors"
                    style={{ '--tw-ring-color': branding.primaryColor } as React.CSSProperties}
                  >
                    <option value="PDF">PDF</option>
                    <option value="Video">Video</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
                  <select 
                    value={newMaterial.category}
                    onChange={(e) => setNewMaterial({...newMaterial, category: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors"
                    style={{ '--tw-ring-color': branding.primaryColor } as React.CSSProperties}
                  >
                    <option value="Discovery">Discovery</option>
                    <option value="Objections">Objections</option>
                    <option value="Risk">Risk</option>
                    <option value="Proposal">Proposal</option>
                  </select>
                </div>
              </div>
              <div className="border-2 border-dashed border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-slate-700 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload size={20} className="text-slate-500" />
                </div>
                <p className="text-sm font-medium text-slate-300">Click to select file</p>
                <p className="text-xs text-slate-500 mt-1">Max file size: 50MB</p>
              </div>
            </div>
            <div className="p-6 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setIsAdding(false)}
                disabled={isUploading}
                className="px-4 py-2 rounded-lg font-medium text-slate-400 hover:text-slate-100 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={isUploading || !newMaterial.title.trim()}
                className="px-6 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 flex items-center gap-2"
                style={{ backgroundColor: branding.primaryColor }}
              >
                {isUploading && <RefreshCw size={18} className="animate-spin" />}
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

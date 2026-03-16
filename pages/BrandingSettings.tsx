import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Save, Upload, Palette, Type, Globe, RefreshCw } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const BrandingSettings: React.FC = () => {
  const { branding, setBranding } = useApp();
  const { showToast } = useToast();
  const [localBranding, setLocalBranding] = useState(branding);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    showToast('Saving branding settings...', 'info');
    
    setTimeout(() => {
      setBranding(localBranding);
      setIsSaving(false);
      showToast('Branding settings updated successfully!', 'success');
    }, 1500);
  };

  const colors = [
    { name: 'Red (Default)', primary: '#ef4444', secondary: '#991b1b', gradient: 'from-red-600 to-red-900' },
    { name: 'Blue', primary: '#3b82f6', secondary: '#1e40af', gradient: 'from-blue-600 to-blue-900' },
    { name: 'Emerald', primary: '#10b981', secondary: '#065f46', gradient: 'from-emerald-600 to-emerald-900' },
    { name: 'Indigo', primary: '#6366f1', secondary: '#3730a3', gradient: 'from-indigo-600 to-indigo-900' },
    { name: 'Amber', primary: '#f59e0b', secondary: '#92400e', gradient: 'from-amber-600 to-amber-900' },
    { name: 'Slate', primary: '#64748b', secondary: '#1e293b', gradient: 'from-slate-600 to-slate-900' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Branding Settings</h2>
          <p className="text-slate-400">Customize the platform to match your corporate identity.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
          style={{ backgroundColor: branding.primaryColor }}
        >
          {isSaving ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Company Information" icon={<Globe size={18} />}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Company Name</label>
                <input
                  type="text"
                  value={localBranding.companyName}
                  onChange={(e) => setLocalBranding({ ...localBranding, companyName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors"
                  style={{ '--tw-ring-color': branding.primaryColor } as React.CSSProperties}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Company Tagline</label>
                <input
                  type="text"
                  value={localBranding.companyTagline}
                  onChange={(e) => setLocalBranding({ ...localBranding, companyTagline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors"
                  style={{ '--tw-ring-color': branding.primaryColor } as React.CSSProperties}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Email Footer Signature</label>
                <textarea
                  value={localBranding.emailFooter}
                  onChange={(e) => setLocalBranding({ ...localBranding, emailFooter: e.target.value })}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors"
                  style={{ '--tw-ring-color': branding.primaryColor } as React.CSSProperties}
                />
              </div>
            </div>
          </Card>

          <Card title="Visual Identity" icon={<Palette size={18} />}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-3">Primary Theme Color</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setLocalBranding({ 
                        ...localBranding, 
                        primaryColor: c.primary, 
                        secondaryColor: c.secondary,
                        gradientTheme: c.gradient
                      })}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        localBranding.primaryColor === c.primary 
                          ? 'border-white bg-slate-800 shadow-lg' 
                          : 'border-slate-800 bg-slate-900 hover:bg-slate-800'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full shadow-inner" style={{ backgroundColor: c.primary }} />
                      <span className="text-sm font-medium text-slate-200">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1 text-xs uppercase tracking-wider">Custom Primary</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={localBranding.primaryColor}
                      onChange={(e) => setLocalBranding({ ...localBranding, primaryColor: e.target.value })}
                      className="h-10 w-12 bg-transparent border-none cursor-pointer"
                    />
                    <input
                      type="text"
                      value={localBranding.primaryColor}
                      onChange={(e) => setLocalBranding({ ...localBranding, primaryColor: e.target.value })}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      style={{ '--tw-ring-color': branding.primaryColor } as React.CSSProperties}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1 text-xs uppercase tracking-wider">Custom Secondary</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={localBranding.secondaryColor}
                      onChange={(e) => setLocalBranding({ ...localBranding, secondaryColor: e.target.value })}
                      className="h-10 w-12 bg-transparent border-none cursor-pointer"
                    />
                    <input
                      type="text"
                      value={localBranding.secondaryColor}
                      onChange={(e) => setLocalBranding({ ...localBranding, secondaryColor: e.target.value })}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      style={{ '--tw-ring-color': branding.primaryColor } as React.CSSProperties}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Live Preview" icon={<Upload size={18} />}>
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Sidebar Preview</p>
                <div className="w-full bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
                  <div className="p-3 border-b border-slate-800 flex items-center gap-2">
                    <div className="p-1 rounded bg-white/10" style={{ backgroundColor: localBranding.primaryColor }}>
                      <div className="w-3 h-3 bg-white rounded-sm" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-white leading-none">{localBranding.companyName}</span>
                      <span className="text-[8px] opacity-70" style={{ color: localBranding.primaryColor }}>{localBranding.companyTagline}</span>
                    </div>
                  </div>
                  <div className="p-2 space-y-1">
                    <div className="h-6 rounded bg-white/5 flex items-center px-2 gap-2 border border-white/10" style={{ color: localBranding.primaryColor, backgroundColor: `${localBranding.primaryColor}1a` }}>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: localBranding.primaryColor }} />
                      <div className="w-12 h-1.5 rounded bg-current opacity-50" />
                    </div>
                    <div className="h-6 rounded hover:bg-white/5 flex items-center px-2 gap-2">
                      <div className="w-2 h-2 rounded-full bg-slate-700" />
                      <div className="w-16 h-1.5 rounded bg-slate-700" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Button Preview</p>
                <div className="flex flex-wrap gap-2">
                  <button 
                    className="px-3 py-1.5 rounded text-xs font-bold text-white shadow-lg"
                    style={{ backgroundColor: localBranding.primaryColor }}
                  >
                    Primary Action
                  </button>
                  <button 
                    className="px-3 py-1.5 rounded text-xs font-bold border"
                    style={{ borderColor: localBranding.primaryColor, color: localBranding.primaryColor }}
                  >
                    Outline
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Logo Upload</p>
                <div className="border-2 border-dashed border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-slate-700 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Upload size={20} className="text-slate-500" />
                  </div>
                  <p className="text-sm font-medium text-slate-300">Click to upload logo</p>
                  <p className="text-xs text-slate-500 mt-1">PNG, SVG or JPG (max 2MB)</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

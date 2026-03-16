import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { 
  Users, 
  UserPlus, 
  Mail, 
  MapPin, 
  Shield, 
  ChevronRight, 
  BarChart3, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Trash2,
  X 
} from 'lucide-react';
import { UserRole, TeamMember } from '../types';
import { useToast } from '../context/ToastContext';
import { Modal } from '../components/Modal';

export const Team: React.FC = () => {
  const { team, setTeam, branding, deals } = useApp();
  const { showToast } = useToast();
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newMember, setNewMember] = useState<Partial<TeamMember>>({
    role: UserRole.SALES_REP,
    region: 'North America'
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.email) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const member: TeamMember = {
        id: `tm-${Date.now()}`,
        name: newMember.name!,
        email: newMember.email!,
        role: newMember.role as UserRole,
        managerId: newMember.managerId,
        region: newMember.region || 'North America'
      };
      setTeam([...team, member]);
      setIsSubmitting(false);
      setIsAddingMember(false);
      setNewMember({ role: UserRole.SALES_REP, region: 'North America' });
      showToast('Team member added successfully!', 'success');
    }, 1000);
  };

  const handleDeleteMember = (id: string) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      setTeam(team.filter(m => m.id !== id));
      showToast('Team member removed', 'success');
    }
  };

  // Leadership Dashboard Stats
  const stats = [
    { label: 'Total Deals', value: deals.length.toString(), icon: <BarChart3 size={20} />, color: 'blue' },
    { label: 'Open Deals', value: deals.filter(d => d.status !== 'Closed Won' && d.status !== 'Closed Lost').length.toString(), icon: <TrendingUp size={20} />, color: 'emerald' },
    { label: 'Closed Won', value: deals.filter(d => d.status === 'Closed Won').length.toString(), icon: <CheckCircle2 size={20} />, color: 'indigo' },
    { label: 'Deals at Risk', value: deals.filter(d => d.healthScore < 40).length.toString(), icon: <AlertCircle size={20} />, color: 'red' },
  ];

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.VP_SALES: return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case UserRole.SALES_MANAGER: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case UserRole.SALES_REP: return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Sales Team Hierarchy</h2>
          <p className="text-slate-400">Manage your sales organization and track performance across the hierarchy.</p>
        </div>
        <button
          onClick={() => setIsAddingMember(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: branding.primaryColor }}
        >
          <UserPlus size={18} />
          Add Member
        </button>
      </div>

      {/* Leadership Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm hover:border-slate-700 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-xl bg-slate-950 text-slate-400 group-hover:text-white transition-colors`}>
                {stat.icon}
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-slate-100">{stat.value}</span>
              <span className="text-sm text-slate-400">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card title="Team Members" icon={<Users size={18} />}>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="pb-4 font-semibold text-slate-400 text-sm pl-2">Member</th>
                    <th className="pb-4 font-semibold text-slate-400 text-sm">Role</th>
                    <th className="pb-4 font-semibold text-slate-400 text-sm">Region</th>
                    <th className="pb-4 font-semibold text-slate-400 text-sm">Manager</th>
                    <th className="pb-4 text-right pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {team.map((member) => (
                    <tr key={member.id} className="group hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 pl-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${branding.gradientTheme} flex items-center justify-center text-xs font-bold text-white shadow-md`}>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-200">{member.name}</span>
                            <span className="text-xs text-slate-500">{member.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getRoleBadgeColor(member.role)}`}>
                          {member.role}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                          <MapPin size={14} />
                          {member.region}
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-sm text-slate-400">
                          {member.managerId ? team.find(t => t.id === member.managerId)?.name : '—'}
                        </span>
                      </td>
                      <td className="py-4 text-right pr-2">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleDeleteMember(member.id)}
                            className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                          <button className="p-2 text-slate-500 hover:text-slate-200 transition-colors">
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Organization Structure" icon={<Shield size={18} />}>
            <div className="space-y-6 relative before:absolute before:left-4 before:top-8 before:bottom-8 before:w-px before:bg-slate-800">
              {team.filter(m => m.role === UserRole.VP_SALES).map(vp => (
                <div key={vp.id} className="relative pl-10">
                  <div className="absolute left-0 top-3 w-8 h-px bg-slate-800" />
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 shadow-sm">
                    <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">{vp.role}</p>
                    <p className="text-sm font-semibold text-slate-200">{vp.name}</p>
                  </div>
                  
                  <div className="mt-4 space-y-4 relative before:absolute before:left-[-24px] before:top-0 before:bottom-0 before:w-px before:bg-slate-800">
                    {team.filter(m => m.managerId === vp.id).map(mgr => (
                      <div key={mgr.id} className="relative pl-6">
                        <div className="absolute left-[-24px] top-4 w-6 h-px bg-slate-800" />
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
                          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">{mgr.role}</p>
                          <p className="text-sm font-semibold text-slate-200">{mgr.name}</p>
                        </div>

                        <div className="mt-4 space-y-2 relative before:absolute before:left-[-16px] before:top-0 before:bottom-0 before:w-px before:bg-slate-800">
                          {team.filter(m => m.managerId === mgr.id).map(rep => (
                            <div key={rep.id} className="relative pl-4">
                              <div className="absolute left-[-16px] top-3 w-4 h-px bg-slate-800" />
                              <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-800">
                                <p className="text-xs font-medium text-slate-300">{rep.name}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Modal isOpen={isAddingMember} onClose={() => setIsAddingMember(false)} title="Add Team Member">
        <form onSubmit={handleAddMember} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
            <input
              type="text"
              required
              value={newMember.name || ''}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors"
              placeholder="e.g. John Doe"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
            <input
              type="email"
              required
              value={newMember.email || ''}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors"
              placeholder="john@secureguard.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Role</label>
              <select
                value={newMember.role}
                onChange={(e) => setNewMember({ ...newMember, role: e.target.value as UserRole })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors"
              >
                <option value={UserRole.VP_SALES}>VP of Sales</option>
                <option value={UserRole.SALES_MANAGER}>Sales Manager</option>
                <option value={UserRole.SALES_REP}>Sales Representative</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Region</label>
              <input
                type="text"
                value={newMember.region || ''}
                onChange={(e) => setNewMember({ ...newMember, region: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors"
                placeholder="e.g. West Coast"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Manager</label>
            <select
              value={newMember.managerId || ''}
              onChange={(e) => setNewMember({ ...newMember, managerId: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors"
            >
              <option value="">No Manager</option>
              {team.filter(m => m.role !== UserRole.SALES_REP).map(m => (
                <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsAddingMember(false)}
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
              {isSubmitting ? 'Adding...' : 'Add Member'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

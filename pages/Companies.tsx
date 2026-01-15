import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Modal } from '../components/Modal';
import { Plus, Building2, Search, Mail, User, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import { Company } from '../types';
import { useToast } from '../context/ToastContext';

export const Companies: React.FC = () => {
  const { showToast } = useToast();
  
  // -- State --
  const [companies, setCompanies] = useState<Company[]>([
    { id: 1, name: "Guardian Mall Services", contactPerson: "Sarah Connor", email: "sarah@guardian.com", status: "Active" },
    { id: 2, name: "Tech Park Security", contactPerson: "John Doe", email: "john@techpark.com", status: "Trial" },
    { id: 3, name: "Westside Logistics", contactPerson: "Mike Ross", email: "m.ross@westside.com", status: "Active" },
    { id: 4, name: "City Center Lofts", contactPerson: "Jane Smith", email: "jane@citycenter.com", status: "Active" },
    { id: 5, name: "Harbor Event Space", contactPerson: "Bill Turner", email: "bill@harbor.com", status: "Trial" },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    status: 'Active'
  });

  // -- Handlers --

  const resetForm = () => {
    setFormData({ name: '', contactPerson: '', email: '', status: 'Active' });
    setIsEditing(false);
    setCurrentId(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (company: Company) => {
    setFormData({
      name: company.name,
      contactPerson: company.contactPerson,
      email: company.email,
      status: company.status
    });
    setCurrentId(company.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const openDeleteModal = (id: number) => {
    setCurrentId(id);
    setIsDeleteModalOpen(true);
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Company Name is required";
    if (!formData.contactPerson.trim()) return "Contact Person is required";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) return "Valid Email is required";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      showToast(error, 'error');
      return;
    }

    if (isEditing && currentId) {
      // Update existing
      setCompanies(prev => prev.map(c => c.id === currentId ? { ...c, ...formData, status: formData.status as 'Active' | 'Trial' } : c));
      showToast("Company updated successfully", "success");
    } else {
      // Add new
      const newCompany: Company = {
        id: Date.now(),
        name: formData.name,
        contactPerson: formData.contactPerson,
        email: formData.email,
        status: formData.status as 'Active' | 'Trial'
      };
      setCompanies(prev => [newCompany, ...prev]);
      showToast("Company added successfully", "success");
    }
    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (currentId) {
      setCompanies(prev => prev.filter(c => c.id !== currentId));
      showToast("Company deleted", "info");
      setIsDeleteModalOpen(false);
      setCurrentId(null);
    }
  };

  // -- Render Helpers --

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Building2 className="text-blue-500" /> Companies
          </h1>
          <p className="text-slate-400 mt-1">Manage your client list and track status.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Plus size={18} />
          Add New Company
        </button>
      </div>

      {/* Main Content */}
      <Card noPadding className="overflow-hidden min-h-[400px] flex flex-col border border-slate-800 shadow-xl">
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center gap-3">
          <Search size={18} className="text-slate-500" />
          <input 
            type="text" 
            placeholder="Search by company or contact..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none focus:outline-none text-sm text-slate-200 placeholder-slate-500 w-full"
          />
        </div>

        {/* Table or Empty State */}
        {companies.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-12">
            <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4 ring-1 ring-slate-700">
               <Building2 size={32} className="text-slate-600" />
            </div>
            <h3 className="text-lg font-medium text-slate-300">No companies added yet</h3>
            <p className="max-w-xs mt-2 text-sm text-center mb-6 text-slate-500">Start building your client database to track proposals and deal health.</p>
            <button 
              onClick={openAddModal}
              className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center gap-1 transition-colors"
            >
              Add your first company <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        ) : filteredCompanies.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Company Name</th>
                  <th className="px-6 py-4">Contact Person</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="group hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 text-slate-200 font-medium">
                      {company.name}
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-slate-600" /> {company.contactPerson}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-slate-600" /> {company.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${
                        company.status === 'Active' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {company.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => openEditModal(company)}
                          className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-blue-400 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => openDeleteModal(company.id)}
                          className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
           <div className="p-12 text-center text-slate-500">
             <Search size={32} className="mx-auto mb-4 opacity-20" />
             <p>No companies found matching "{searchTerm}"</p>
           </div>
        )}
      </Card>

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={isEditing ? "Edit Company" : "Add New Company"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Company Name</label>
            <input 
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-slate-600 transition-all"
              placeholder="e.g. Acme Security"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Contact Person</label>
            <input 
              type="text"
              value={formData.contactPerson}
              onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-slate-600 transition-all"
              placeholder="e.g. John Doe"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Email Address</label>
            <input 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-slate-600 transition-all"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Status</label>
            <div className="relative">
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 appearance-none transition-all"
              >
                <option value="Active">Active</option>
                <option value="Trial">Trial</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div className="pt-6 flex gap-3">
             <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-lg font-medium transition-colors border border-slate-700"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
            >
              {isEditing ? "Save Changes" : "Create Company"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Company"
      >
        <div className="text-center pt-2">
          <div className="w-14 h-14 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-5 ring-1 ring-rose-500/20">
             <AlertTriangle className="text-rose-500" size={28} />
          </div>
          <h4 className="text-lg font-semibold text-white mb-2">Are you sure?</h4>
          <p className="text-slate-400 mb-8 leading-relaxed text-sm">
            You are about to delete this company. This action cannot be undone and will remove all associated proposals and health checks.
          </p>
          <div className="flex gap-3">
             <button 
              onClick={() => setIsDeleteModalOpen(false)}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-lg font-medium transition-colors border border-slate-700"
            >
              No, Keep It
            </button>
            <button 
              onClick={handleDelete}
              className="flex-1 bg-rose-600 hover:bg-rose-500 text-white py-3 rounded-lg font-medium transition-colors shadow-lg shadow-rose-500/20"
            >
              Yes, Delete It
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
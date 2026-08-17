import React, { useState, useEffect } from 'react';
import {
  Wrench,
  Plus,
  Edit2,
  Trash2,
  Search,
  Save,
  X,
  CheckCircle2,
} from 'lucide-react';
import { fetchServices, addService, updateService, deleteService, clearAllServices } from '@/lib/firebase/servicesService';
import Button from '@/components/ui/Button';
import Input from '@/components/forms/Input';
import Textarea from '@/components/forms/Textarea';

export function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [modalError, setModalError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    hinglishHeadline: '',
    description: '',
    image: '/images/services/aluminium-fabrication.jpg',
    featured: false,
    scopeOfWork: ['Site measurement & requirement analysis', 'Precision cutting & fabrication', 'Site installation & sealing'],
  });

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await fetchServices();
      setServices(data);
    } catch (e) {
      console.error('Error loading services:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleClearAll = async () => {
    if (!window.confirm('Kya aap sabhi demo/existing services ko permanently delete karna chahte hain?')) {
      return;
    }
    try {
      setLoading(true);
      await clearAllServices();
      setServices([]);
    } catch (e) {
      console.error('Error clearing services:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      title: '',
      hinglishHeadline: '',
      description: '',
      image: '/images/services/aluminium-fabrication.jpg',
      featured: false,
      scopeOfWork: ['Site measurement & requirement analysis', 'Precision cutting & fabrication', 'Site installation & sealing'],
    });
    setModalError('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (srv) => {
    setEditingService(srv);
    setFormData({
      title: srv.title || '',
      hinglishHeadline: srv.hinglishHeadline || '',
      description: srv.description || '',
      image: srv.image || '/images/services/aluminium-fabrication.jpg',
      featured: Boolean(srv.featured),
      scopeOfWork: Array.isArray(srv.scopeOfWork) ? srv.scopeOfWork : [],
    });
    setModalError('');
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setModalError('Service title enter karna zaroori hai.');
      return;
    }

    try {
      setIsSaving(true);
      if (editingService) {
        const updated = await updateService(editingService.id, formData);
        setServices((prev) =>
          prev.map((s) => (s.id === editingService.id ? { ...s, ...updated } : s))
        );
      } else {
        const created = await addService(formData);
        setServices((prev) => [created, ...prev]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving service:', err);
      setModalError(err.message || 'Service save karne mein dikkat aayi.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Kya aap is service ko permanently delete karna chahte hain?')) {
      return;
    }
    try {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (e) {
      console.error('Failed to delete service:', e);
    }
  };

  const filteredServices = services.filter((s) => {
    const term = searchTerm.toLowerCase();
    return (
      !term ||
      s.title?.toLowerCase().includes(term) ||
      s.description?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6 font-intern">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-mono-300 pb-6">
        <div>
          <span className="font-mono text-xs text-mono-500 uppercase tracking-widest block">
            [SERVICE EXECUTION CATALOG]
          </span>
          <h1 className="text-heading-xl font-bold text-mono-950">
            Manage Fabrication & Installation Services
          </h1>
          <p className="text-body-sm text-mono-600 mt-1">
            Configure available technical execution services, scope of work workflows, and craftsmanship details.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {services.length > 0 && (
            <Button
              variant="secondary"
              size="md"
              onClick={handleClearAll}
              className="text-red-700 hover:text-red-900 border-red-300 hover:bg-red-50"
            >
              Purge Demo Data
            </Button>
          )}
          <Button
            variant="primary"
            size="md"
            onClick={handleOpenAdd}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Nayi Service Add Karein
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 bg-mono-0 border border-mono-300 rounded-xs flex items-center justify-between shadow-subtle">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search services by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-mono-50 border border-mono-300 rounded-xs text-xs focus:outline-none focus:ring-2 focus:ring-mono-950"
          />
          <Search className="w-4 h-4 text-mono-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-mono-0 border border-mono-300 rounded-xs shadow-subtle overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs font-mono text-mono-400 uppercase tracking-wider">
            Loading services...
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="py-16 text-center text-body-sm text-mono-500">
            Koi service nahi mili. Nayi service add karne ke liye upar button dabayein.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-intern">
              <thead className="bg-mono-50 border-b border-mono-200 font-mono uppercase text-mono-500 text-[0.7rem]">
                <tr>
                  <th className="py-3.5 px-4">Image</th>
                  <th className="py-3.5 px-4">Service Title & Headline</th>
                  <th className="py-3.5 px-4">Scope Steps</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mono-200">
                {filteredServices.map((srv) => (
                  <tr key={srv.id} className="hover:bg-mono-50/70 transition-colors">
                    <td className="py-3.5 px-4 align-top w-20">
                      <img
                        src={srv.image || '/images/services/aluminium-fabrication.jpg'}
                        alt={srv.title}
                        className="w-16 h-12 object-cover rounded-xs border border-mono-200 bg-mono-100"
                      />
                    </td>

                    <td className="py-3.5 px-4 align-top max-w-sm">
                      <span className="font-semibold text-mono-950 block text-sm">
                        {srv.title}
                      </span>
                      <p className="text-[0.72rem] text-mono-600 line-clamp-1 mt-0.5">
                        {srv.hinglishHeadline || srv.description}
                      </p>
                    </td>

                    <td className="py-3.5 px-4 align-top">
                      <span className="font-mono text-xs text-mono-800">
                        {srv.scopeOfWork?.length || 0} Workflow Steps
                      </span>
                    </td>

                    <td className="py-3.5 px-4 align-top">
                      {srv.featured ? (
                        <span className="font-mono text-[0.68rem] px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xs font-semibold uppercase">
                          Homepage
                        </span>
                      ) : (
                        <span className="font-mono text-[0.68rem] text-mono-400">
                          Overview only
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 align-top text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(srv)}
                          className="p-1.5 bg-mono-100 hover:bg-mono-200 text-mono-950 rounded-xs transition-colors"
                          title="Edit Service"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(srv.id)}
                          className="p-1.5 text-mono-400 hover:text-red-600 rounded-xs transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-modal bg-mono-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in font-intern"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-mono-0 border border-mono-300 rounded-xs shadow-floating p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-mono-200 pb-4">
              <div>
                <span className="font-mono text-xs text-mono-400 uppercase tracking-widest block">
                  [{editingService ? 'EDIT SERVICE SCOPE' : 'ADD NEW SERVICE'}]
                </span>
                <h3 className="text-heading-md font-bold text-mono-950">
                  {editingService ? `Edit: ${editingService.title}` : 'Nayi Service Create Karein'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-mono-500 hover:text-mono-950 rounded-xs"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs font-mono">
                {modalError}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <Input
                id="srv-title"
                label="Service Title *"
                placeholder="e.g. Custom Aluminium Fabrication & Glazing"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />

              <Input
                id="srv-headline"
                label="Hinglish Summary"
                placeholder="e.g. Precision CNC cutting, heavy-gauge sections aur clean weather sealing."
                value={formData.hinglishHeadline}
                onChange={(e) => setFormData({ ...formData, hinglishHeadline: e.target.value })}
              />

              <Input
                id="srv-image"
                label="Image URL or Path"
                placeholder="/images/services/aluminium-fabrication.jpg"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />

              <Textarea
                id="srv-desc"
                label="Detailed Description"
                placeholder="Full description of tools, craftsmen experience, and material standards..."
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />

              <div className="flex items-center gap-6 p-4 bg-mono-50 border border-mono-200 rounded-xs">
                <label className="flex items-center gap-2 text-xs font-mono text-mono-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded-xs border-mono-300 text-mono-950 focus:ring-mono-950"
                  />
                  <span>Featured on Homepage</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-mono-200">
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSaving}
                  leftIcon={<Save className="w-4 h-4" />}
                >
                  {editingService ? 'Save Changes' : 'Service Publish Karein'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminServices;

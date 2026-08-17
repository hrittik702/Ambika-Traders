import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Trash2,
  Shield,
  ShieldAlert,
  Mail,
  Lock,
  X,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { fetchAdmins, addAdminAccount, deleteAdminAccount } from '@/lib/firebase/authService';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/forms/Input';

export function AdminUsers() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    role: 'admin',
  });

  const loadAdmins = async () => {
    try {
      setLoading(true);
      const list = await fetchAdmins();
      setAdmins(list);
    } catch (e) {
      console.error('Error fetching admins:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const handleOpenAdd = () => {
    setFormData({
      email: '',
      password: '',
      displayName: '',
      role: 'admin',
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = formData.email.trim().toLowerCase();
    if (!cleanEmail) {
      setError('Gmail / Email address enter karna zaroori hai.');
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      setError('Password minimum 6 characters ka hona chahiye.');
      return;
    }

    try {
      setIsSaving(true);
      const created = await addAdminAccount({
        email: cleanEmail,
        password: formData.password,
        displayName: formData.displayName.trim() || cleanEmail.split('@')[0],
        role: formData.role,
      });

      setSuccessMsg(`Naya admin account (${cleanEmail}) create ho gaya hai.`);
      setIsModalOpen(false);
      await loadAdmins();
    } catch (err) {
      console.error('Error adding admin:', err);
      setError(err.message || 'Admin account create karne mein dikkat aayi.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAdmin = async (admin) => {
    if (admin.email.toLowerCase() === currentUser?.email?.toLowerCase()) {
      alert('Aap apna khud ka active logged-in admin account delete nahi kar sakte.');
      return;
    }

    if (admin.email.toLowerCase() === 'alphavishwakarma9@gmail.com') {
      alert('Primary Superadmin account protected hai aur delete nahi kiya ja sakta.');
      return;
    }

    if (!window.confirm(`Kya aap "${admin.email}" ka admin access permanently revoke karna chahte hain?`)) {
      return;
    }

    try {
      await deleteAdminAccount(admin.uid || admin.id);
      setAdmins((prev) => prev.filter((a) => (a.uid || a.id) !== (admin.uid || admin.id)));
      setSuccessMsg(`Admin account (${admin.email}) remove kar diya gaya.`);
    } catch (e) {
      console.error('Error deleting admin:', e);
    }
  };

  return (
    <div className="space-y-6 font-intern">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-mono-300 pb-6">
        <div>
          <span className="font-mono text-xs text-mono-500 uppercase tracking-widest block">
            [ACCESS CONTROL & PERMISSIONS]
          </span>
          <h1 className="text-heading-xl font-bold text-mono-950">
            Administrative Team Accounts
          </h1>
          <p className="text-body-sm text-mono-600 mt-1">
            Manage authorized Gmail accounts and passwords with access to quotations, product inventory, and services.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleOpenAdd}
          leftIcon={<UserPlus className="w-4 h-4" />}
        >
          Naya Admin Account Add Karein
        </Button>
      </div>

      {successMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-xs flex items-center justify-between">
          <span>{successMsg}</span>
          <button type="button" onClick={() => setSuccessMsg('')} className="text-emerald-950">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Admin Users Table */}
      <div className="bg-mono-0 border border-mono-300 rounded-xs shadow-subtle overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs font-mono text-mono-400 uppercase tracking-wider">
            Loading administrative team accounts...
          </div>
        ) : admins.length === 0 ? (
          <div className="py-16 text-center text-body-sm text-mono-500">
            Koi secondary admin account nahi mila. Naya admin add karne ke liye upar button dabayein.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-intern">
              <thead className="bg-mono-50 border-b border-mono-200 font-mono uppercase text-mono-500 text-[0.7rem]">
                <tr>
                  <th className="py-3.5 px-4">Admin Name & Profile</th>
                  <th className="py-3.5 px-4">Registered Gmail / Email</th>
                  <th className="py-3.5 px-4">Role & Clearance</th>
                  <th className="py-3.5 px-4">Created Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mono-200">
                {admins.map((adm) => {
                  const isCurrent = adm.email.toLowerCase() === currentUser?.email?.toLowerCase();
                  const isSuper = adm.role === 'superadmin' || adm.email.toLowerCase() === 'alphavishwakarma9@gmail.com';

                  return (
                    <tr key={adm.uid || adm.id || adm.email} className="hover:bg-mono-50/70 transition-colors">
                      {/* Name */}
                      <td className="py-4 px-4 align-middle">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-mono-950 text-mono-0 flex items-center justify-center font-bold font-mono text-xs">
                            {(adm.displayName || adm.email).charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-semibold text-mono-950 block text-sm">
                              {adm.displayName || 'Admin Member'}
                            </span>
                            {isCurrent && (
                              <span className="text-[0.68rem] font-mono text-emerald-600 font-bold">
                                (You / Active Session)
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-4 align-middle font-mono text-mono-800">
                        {adm.email}
                      </td>

                      {/* Role */}
                      <td className="py-4 px-4 align-middle">
                        <span
                          className={`font-mono text-xs px-2.5 py-1 rounded-xs uppercase tracking-wider font-semibold inline-flex items-center gap-1.5 ${
                            isSuper
                              ? 'bg-mono-950 text-mono-0'
                              : 'bg-mono-100 text-mono-800 border border-mono-300'
                          }`}
                        >
                          {isSuper ? <ShieldAlert className="w-3 h-3 text-amber-300" /> : <Shield className="w-3 h-3" />}
                          {isSuper ? 'Super Admin' : 'Admin'}
                        </span>
                      </td>

                      {/* Created */}
                      <td className="py-4 px-4 align-middle font-mono text-mono-500 text-[0.75rem]">
                        {adm.createdAt ? new Date(adm.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        }) : 'Initial'}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 align-middle text-right">
                        {!isSuper && !isCurrent ? (
                          <button
                            type="button"
                            onClick={() => handleDeleteAdmin(adm)}
                            className="p-1.5 text-mono-400 hover:text-red-600 rounded-xs transition-colors"
                            title="Revoke Admin Access"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        ) : (
                          <span className="text-[0.7rem] font-mono text-mono-400">
                            {isSuper ? 'Permanent Superadmin' : 'Active'}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Admin Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-modal bg-mono-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in font-intern"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-mono-0 border border-mono-300 rounded-xs shadow-floating p-6 md:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-mono-200 pb-4">
              <div>
                <span className="font-mono text-xs text-mono-400 uppercase tracking-widest block">
                  [SECURITY PROVISIONING]
                </span>
                <h3 className="text-heading-md font-bold text-mono-950">
                  Naya Admin Account Add Karein
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

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs font-mono">
                {error}
              </div>
            )}

            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <Input
                id="admin-name"
                label="Admin Display Name"
                placeholder="e.g. Rohit Workshop Manager"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              />

              <Input
                id="admin-email"
                label="Gmail / Email Address *"
                type="email"
                placeholder="e.g. rohit.ambika@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <Input
                id="admin-password"
                label="Login Password (Min 6 Characters) *"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-mono-700 mb-2">
                  Role & Clearance *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-mono-50 border border-mono-300 rounded-xs text-xs font-intern focus:outline-none focus:ring-2 focus:ring-mono-950"
                >
                  <option value="admin">Standard Admin (Manage Quotes, Products & Services)</option>
                  <option value="superadmin">Superadmin (Full Access + Add More Admins)</option>
                </select>
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
                  Admin Account Create Karein
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;

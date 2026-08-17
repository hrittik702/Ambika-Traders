import React, { useState, useEffect } from 'react';
import {
  Inbox,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Trash2,
  CheckCircle2,
  Clock,
  ChevronDown,
  Eye,
  X,
  FileText,
} from 'lucide-react';
import { fetchEnquiries, updateEnquiryStatus, deleteEnquiry } from '@/lib/firebase/enquiriesService';
import Button from '@/components/ui/Button';

export function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      const data = await fetchEnquiries();
      setEnquiries(data);
    } catch (e) {
      console.error('Error fetching enquiries:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateEnquiryStatus(id, newStatus);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (e) {
      console.error('Failed to update status:', e);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Kya aap is quotation request ko permanently delete karna chahte hain?')) {
      return;
    }
    try {
      await deleteEnquiry(id);
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
    } catch (e) {
      console.error('Failed to delete enquiry:', e);
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !term ||
      e.customer?.name?.toLowerCase().includes(term) ||
      e.customer?.phone?.includes(term) ||
      e.customer?.email?.toLowerCase().includes(term) ||
      e.customer?.address?.toLowerCase().includes(term) ||
      e.id?.toLowerCase().includes(term);

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 font-intern">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-mono-300 pb-6">
        <div>
          <span className="font-mono text-xs text-mono-500 uppercase tracking-widest block">
            [LEAD MANAGEMENT & QUOTATIONS]
          </span>
          <h1 className="text-heading-xl font-bold text-mono-950">
            Customer Quotations & Enquiries
          </h1>
          <p className="text-body-sm text-mono-600 mt-1">
            Customer requests from quotation cart and contact forms with full site addresses and item specifications.
          </p>
        </div>

        <button
          type="button"
          onClick={loadEnquiries}
          className="text-xs font-mono text-mono-600 hover:text-mono-950 underline self-start md:self-auto"
        >
          ↻ Refresh List
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-mono-0 border border-mono-300 rounded-xs flex flex-col md:flex-row gap-4 items-center justify-between shadow-subtle">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by name, mobile, address, ref ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-mono-50 border border-mono-300 rounded-xs text-xs font-intern focus:outline-none focus:ring-2 focus:ring-mono-950"
          />
          <Search className="w-4 h-4 text-mono-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none">
          {['all', 'pending', 'contacted', 'in_progress', 'completed'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xs whitespace-nowrap transition-colors ${
                statusFilter === status
                  ? 'bg-mono-950 text-mono-0 font-semibold'
                  : 'bg-mono-100 text-mono-700 hover:bg-mono-200'
              }`}
            >
              {status.replace('_', ' ')} (
              {status === 'all'
                ? enquiries.length
                : enquiries.filter((e) => e.status === status).length}
              )
            </button>
          ))}
        </div>
      </div>

      {/* Table / List View */}
      <div className="bg-mono-0 border border-mono-300 rounded-xs shadow-subtle overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs font-mono text-mono-400 uppercase tracking-wider">
            Loading customer quotations...
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <p className="text-body text-mono-600 font-medium">Koi matching quotation nahi mili.</p>
            <p className="text-xs text-mono-400 font-mono">Filters clear karein ya search term change karein.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-intern">
              <thead className="bg-mono-50 border-b border-mono-200 font-mono uppercase text-mono-500 text-[0.7rem]">
                <tr>
                  <th className="py-3.5 px-4">Ref ID & Time</th>
                  <th className="py-3.5 px-4">Customer Details</th>
                  <th className="py-3.5 px-4">Site / Delivery Address</th>
                  <th className="py-3.5 px-4">Items / Request Scope</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mono-200">
                {filteredEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-mono-50/70 transition-colors">
                    {/* Ref */}
                    <td className="py-4 px-4 align-top font-mono">
                      <span className="font-bold text-mono-950 block">{enq.id}</span>
                      <span className="text-[0.68rem] text-mono-500 block mt-1">
                        {enq.createdAt ? new Date(enq.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        }) : 'Recent'}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-4 align-top">
                      <span className="font-semibold text-mono-950 block text-sm">
                        {enq.customer?.name}
                      </span>
                      <div className="space-y-1 mt-1 text-[0.75rem] text-mono-600">
                        <a href={`tel:${enq.customer?.phone}`} className="hover:underline flex items-center gap-1">
                          <Phone className="w-3 h-3 text-mono-400" />
                          {enq.customer?.phone}
                        </a>
                        <a href={`mailto:${enq.customer?.email}`} className="hover:underline flex items-center gap-1">
                          <Mail className="w-3 h-3 text-mono-400" />
                          {enq.customer?.email}
                        </a>
                      </div>
                    </td>

                    {/* Address */}
                    <td className="py-4 px-4 align-top max-w-xs">
                      <div className="flex items-start gap-1.5 text-mono-700">
                        <MapPin className="w-3.5 h-3.5 text-mono-950 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{enq.customer?.address || 'N/A'}</span>
                      </div>
                    </td>

                    {/* Items */}
                    <td className="py-4 px-4 align-top">
                      <span className="font-semibold text-mono-950 block font-mono">
                        {enq.items?.length || 0} {enq.items?.length === 1 ? 'Item' : 'Items'}
                      </span>
                      <div className="mt-1 space-y-0.5">
                        {enq.items?.slice(0, 2).map((it, idx) => (
                          <div key={idx} className="text-[0.7rem] text-mono-600 truncate max-w-xs">
                            • {it.title || it.name} (Qty: {it.quantity || 1})
                          </div>
                        ))}
                        {enq.items?.length > 2 && (
                          <span className="text-[0.68rem] text-mono-400 font-mono">
                            +{enq.items.length - 2} more items...
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 align-top">
                      <select
                        value={enq.status || 'pending'}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                        className={`text-xs font-mono font-semibold px-2.5 py-1.5 rounded-xs border uppercase tracking-wider focus:outline-none ${
                          enq.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : enq.status === 'contacted'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : enq.status === 'in_progress'
                            ? 'bg-purple-50 text-purple-800 border-purple-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 align-top text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedEnquiry(enq)}
                          className="p-1.5 bg-mono-100 hover:bg-mono-200 text-mono-950 rounded-xs transition-colors"
                          title="View Full Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={`https://wa.me/${(enq.customer?.phone || '').replace(/\D/g, '')}?text=${encodeURIComponent(`Namaste ${enq.customer?.name || ''}, Ambika Traders se aapke quotation (Ref: ${enq.id}) ke regarding message kar rahe hain.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-mono-950 hover:bg-mono-800 text-mono-0 rounded-xs transition-colors"
                          title="Chat on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDelete(enq.id)}
                          className="p-1.5 text-mono-400 hover:text-red-600 rounded-xs transition-colors"
                          title="Delete"
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

      {/* Details Modal */}
      {selectedEnquiry && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-modal bg-mono-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in font-intern"
          onClick={() => setSelectedEnquiry(null)}
        >
          <div
            className="w-full max-w-2xl bg-mono-0 border border-mono-300 rounded-xs shadow-floating p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-mono-200 pb-4">
              <div>
                <span className="font-mono text-xs text-mono-400 uppercase tracking-widest block">
                  [QUOTATION SPECIFICATION & CUSTOMER PROFILE]
                </span>
                <h3 className="text-heading-md font-bold text-mono-950">
                  Ref ID: {selectedEnquiry.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 text-mono-500 hover:text-mono-950 rounded-xs"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-mono-50 border border-mono-200 rounded-xs text-xs font-intern">
              <div>
                <span className="font-mono text-[0.7rem] text-mono-500 uppercase block">Customer Name</span>
                <span className="font-bold text-sm text-mono-950">{selectedEnquiry.customer?.name}</span>
              </div>
              <div>
                <span className="font-mono text-[0.7rem] text-mono-500 uppercase block">Mobile Phone</span>
                <a href={`tel:${selectedEnquiry.customer?.phone}`} className="font-mono font-bold text-sm text-mono-950 hover:underline">
                  {selectedEnquiry.customer?.phone}
                </a>
              </div>
              <div>
                <span className="font-mono text-[0.7rem] text-mono-500 uppercase block">Email Address</span>
                <span className="font-mono text-mono-950">{selectedEnquiry.customer?.email}</span>
              </div>
              <div>
                <span className="font-mono text-[0.7rem] text-mono-500 uppercase block">Status</span>
                <span className="font-mono uppercase font-semibold text-mono-950">{selectedEnquiry.status}</span>
              </div>
              <div className="md:col-span-2 pt-2 border-t border-mono-200">
                <span className="font-mono text-[0.7rem] text-mono-500 uppercase block">Site / Delivery Address</span>
                <p className="text-mono-950 font-medium mt-0.5">{selectedEnquiry.customer?.address}</p>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-mono-500 uppercase tracking-wider block">
                [ITEMS INCLUDED IN QUOTATION]
              </span>
              <div className="divide-y divide-mono-200 border border-mono-200 rounded-xs overflow-hidden">
                {selectedEnquiry.items?.map((it, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between text-xs bg-mono-0">
                    <div>
                      <span className="font-semibold text-mono-950 block">{it.title || it.name}</span>
                      <span className="font-mono text-[0.7rem] text-mono-500">{it.category || it.itemType}</span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="font-bold text-mono-950">Qty: {it.quantity || 1}</span>
                      <span className="block text-[0.7rem] text-mono-500">{it.price || 'Custom Quote'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Notes */}
            {selectedEnquiry.notes && (
              <div className="p-4 bg-mono-50 border border-mono-200 rounded-xs space-y-1">
                <span className="font-mono text-[0.7rem] text-mono-500 uppercase block">
                  Customer Project Notes / Requirements:
                </span>
                <p className="text-xs text-mono-800 leading-relaxed">{selectedEnquiry.notes}</p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-mono-200">
              <a
                href={`https://wa.me/${(selectedEnquiry.customer?.phone || '').replace(/\D/g, '')}?text=${encodeURIComponent(`Namaste ${selectedEnquiry.customer?.name || ''}, Ambika Traders se aapke quotation (Ref: ${selectedEnquiry.id}) ke regarding discuss karna chahte hain.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-mono-950 text-mono-0 text-xs font-semibold rounded-xs hover:bg-mono-850 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Par Chat Karein</span>
              </a>

              <Button
                variant="secondary"
                size="md"
                onClick={() => setSelectedEnquiry(null)}
              >
                Close Window
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminEnquiries;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  Package,
  Wrench,
  Users,
  ArrowUpRight,
  Phone,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
} from 'lucide-react';
import { fetchEnquiries, updateEnquiryStatus } from '@/lib/firebase/enquiriesService';
import { fetchProducts } from '@/lib/firebase/productsService';
import { fetchServices } from '@/lib/firebase/servicesService';
import { isFirebaseConfigured } from '@/lib/firebase/config';
import Button from '@/components/ui/Button';

export function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [enqList, prodList, srvList] = await Promise.all([
          fetchEnquiries(),
          fetchProducts(),
          fetchServices(),
        ]);
        setEnquiries(enqList);
        setProducts(prodList);
        setServices(srvList);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleQuickStatusChange = async (enquiryId, newStatus) => {
    try {
      await updateEnquiryStatus(enquiryId, newStatus);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === enquiryId ? { ...e, status: newStatus } : e))
      );
    } catch (e) {
      console.error('Failed to update status:', e);
    }
  };

  const pendingCount = enquiries.filter((e) => e.status === 'pending').length;
  const contactedCount = enquiries.filter((e) => e.status === 'contacted').length;

  return (
    <div className="space-y-8 font-intern">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-mono-300 pb-6">
        <div>
          <span className="font-mono text-xs text-mono-500 uppercase tracking-widest block">
            [OPERATIONS CONTROL & REVENUE METRICS]
          </span>
          <h1 className="text-heading-xl font-bold text-mono-950">
            Administrative Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/products">
            <Button variant="secondary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Naya Product Add Karein
            </Button>
          </Link>
          <Link to="/admin/enquiries">
            <Button variant="primary" size="sm" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
              Sabhi Orders Dekhein
            </Button>
          </Link>
        </div>
      </div>

      {/* Backend Status Banner if unconfigured */}
      {!isFirebaseConfigured && (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded-xs flex items-start gap-3 text-amber-900 text-xs">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold uppercase font-mono tracking-wider block">
              [FIREBASE SETUP IN PROGRESS — LOCAL MODE ACTIVE]
            </span>
            <p>
              Aapka dashboard local fallback mode mein chal raha hai. Google Firebase Console se <code>.env</code> file mein API keys daalte hi live Firestore sync enable ho jayega.
            </p>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Quotes */}
        <div className="p-6 bg-mono-0 border border-mono-300 rounded-xs shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-mono-500">
            <span className="font-mono text-xs uppercase tracking-wider">Total Quotations</span>
            <Inbox className="w-5 h-5 text-mono-950" />
          </div>
          <div className="text-display-md font-bold text-mono-950">
            {enquiries.length}
          </div>
          <span className="text-xs font-mono text-mono-500">Customer requests registered</span>
        </div>

        {/* Pending Action */}
        <div className="p-6 bg-mono-950 text-mono-0 border border-mono-900 rounded-xs shadow-card space-y-2">
          <div className="flex items-center justify-between text-mono-400">
            <span className="font-mono text-xs uppercase tracking-wider">Pending Action</span>
            <Clock className="w-5 h-5 text-mono-0" />
          </div>
          <div className="text-display-md font-bold text-mono-0">
            {pendingCount}
          </div>
          <span className="text-xs font-mono text-mono-300">Requires customer call/quote</span>
        </div>

        {/* Active Products */}
        <div className="p-6 bg-mono-0 border border-mono-300 rounded-xs shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-mono-500">
            <span className="font-mono text-xs uppercase tracking-wider">Active Catalog</span>
            <Package className="w-5 h-5 text-mono-950" />
          </div>
          <div className="text-display-md font-bold text-mono-950">
            {products.length}
          </div>
          <span className="text-xs font-mono text-mono-500">Products in database</span>
        </div>

        {/* Active Services */}
        <div className="p-6 bg-mono-0 border border-mono-300 rounded-xs shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-mono-500">
            <span className="font-mono text-xs uppercase tracking-wider">Services Scope</span>
            <Wrench className="w-5 h-5 text-mono-950" />
          </div>
          <div className="text-display-md font-bold text-mono-950">
            {services.length}
          </div>
          <span className="text-xs font-mono text-mono-500">Execution workflows</span>
        </div>
      </div>

      {/* Recent Quotation Orders Table */}
      <div className="bg-mono-0 border border-mono-300 rounded-xs shadow-subtle overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between border-b border-mono-200 pb-4">
          <div>
            <h2 className="text-heading-md font-bold text-mono-950">
              Recent Quotations & Enquiries
            </h2>
            <span className="text-xs font-mono text-mono-500">
              Direct customer requests from cart and contact forms
            </span>
          </div>

          <Link
            to="/admin/enquiries"
            className="text-xs font-mono text-mono-950 font-semibold hover:underline flex items-center gap-1"
          >
            View All ({enquiries.length})
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs font-mono text-mono-400 uppercase tracking-wider">
            Loading database records...
          </div>
        ) : enquiries.length === 0 ? (
          <div className="py-12 text-center text-body-sm text-mono-500">
            Abhi tak koi customer enquiry receive nahi hui hai. Website par test quote submit karein.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-intern">
              <thead className="bg-mono-50 border-b border-mono-200 font-mono uppercase text-mono-500 text-[0.7rem]">
                <tr>
                  <th className="py-3 px-4">Customer Details</th>
                  <th className="py-3 px-4">Site / Address</th>
                  <th className="py-3 px-4">Items Requested</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Instant Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mono-200">
                {enquiries.slice(0, 5).map((enq) => (
                  <tr key={enq.id} className="hover:bg-mono-50/70 transition-colors">
                    {/* Customer */}
                    <td className="py-4 px-4 align-top">
                      <span className="font-semibold text-mono-950 block text-sm">
                        {enq.customer?.name || 'Customer'}
                      </span>
                      <div className="flex items-center gap-2 mt-1 font-mono text-[0.72rem] text-mono-600">
                        <a href={`tel:${enq.customer?.phone}`} className="hover:underline flex items-center gap-1">
                          <Phone className="w-3 h-3 text-mono-400" />
                          {enq.customer?.phone}
                        </a>
                      </div>
                    </td>

                    {/* Address */}
                    <td className="py-4 px-4 align-top max-w-xs">
                      <p className="text-mono-700 line-clamp-2 leading-relaxed">
                        {enq.customer?.address || 'Address not provided'}
                      </p>
                    </td>

                    {/* Items */}
                    <td className="py-4 px-4 align-top">
                      <span className="font-semibold text-mono-950 block font-mono">
                        {enq.items?.length || 0} {enq.items?.length === 1 ? 'Item' : 'Items'}
                      </span>
                      <p className="text-[0.7rem] text-mono-500 truncate max-w-xs">
                        {enq.items?.map((i) => i.title || i.name).join(', ')}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 align-top">
                      <select
                        value={enq.status || 'pending'}
                        onChange={(e) => handleQuickStatusChange(enq.id, e.target.value)}
                        className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-xs border uppercase tracking-wider focus:outline-none ${
                          enq.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : enq.status === 'contacted'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
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
                    <td className="py-4 px-4 align-top text-right space-x-2">
                      <a
                        href={`https://wa.me/${(enq.customer?.phone || '').replace(/\D/g, '')}?text=${encodeURIComponent(`Namaste ${enq.customer?.name || ''}, Ambika Traders se quotation ke regarding call/chat kar rahe hain.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-mono-950 text-mono-0 font-mono text-[0.7rem] rounded-xs hover:bg-mono-800 transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

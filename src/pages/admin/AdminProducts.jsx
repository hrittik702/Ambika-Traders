import React, { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
  X,
  Image as ImageIcon,
  Save,
  Tag,
} from 'lucide-react';
import { fetchProducts, addProduct, updateProduct, deleteProduct, clearAllProducts } from '@/lib/firebase/productsService';
import { productCategories } from '@/data/productCategories';
import Button from '@/components/ui/Button';
import Input from '@/components/forms/Input';
import Textarea from '@/components/forms/Textarea';
import Select from '@/components/forms/Select';

export function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [modalError, setModalError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    categoryId: 'cat-doors-windows',
    categoryName: 'Aluminium Doors & Windows',
    hinglishHeadline: '',
    description: '',
    price: 'Price on Enquiry',
    image: '/images/products/slim-sliding-window.jpg',
    featured: false,
    status: 'active',
    features: ['Heavy gauge aluminium profile', 'Weather resistant sealings'],
    specs: { 'Aluminium Grade': '6063-T6', 'Finish': 'Matte Anodized' },
  });

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
    } catch (e) {
      console.error('Error fetching products:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleClearAll = async () => {
    if (!window.confirm('Kya aap sabhi demo/existing products ko permanently delete karna chahte hain?')) {
      return;
    }
    try {
      setLoading(true);
      await clearAllProducts();
      setProducts([]);
    } catch (e) {
      console.error('Error clearing products:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      categoryId: 'cat-doors-windows',
      categoryName: 'Aluminium Doors & Windows',
      hinglishHeadline: '',
      description: '',
      price: 'Price on Enquiry',
      image: '/images/products/slim-sliding-window.jpg',
      featured: false,
      status: 'active',
      features: ['Heavy gauge aluminium profile', 'Weather resistant sealings'],
      specs: { 'Aluminium Grade': '6063-T6', 'Finish': 'Matte Anodized' },
    });
    setModalError('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name || '',
      categoryId: prod.categoryId || 'cat-doors-windows',
      categoryName: prod.categoryName || 'Aluminium Doors & Windows',
      hinglishHeadline: prod.hinglishHeadline || '',
      description: prod.description || '',
      price: prod.price || 'Price on Enquiry',
      image: prod.image || '/images/products/slim-sliding-window.jpg',
      featured: Boolean(prod.featured),
      status: prod.status || 'active',
      features: Array.isArray(prod.features) ? prod.features : [],
      specs: prod.specs || {},
    });
    setModalError('');
    setIsModalOpen(true);
  };

  const handleCategoryChange = (e) => {
    const catId = e.target.value;
    const catObj = productCategories.find((c) => c.id === catId);
    setFormData((prev) => ({
      ...prev,
      categoryId: catId,
      categoryName: catObj ? catObj.name : 'General Category',
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setModalError('Product ka naam enter karna zaroori hai.');
      return;
    }

    try {
      setIsSaving(true);
      if (editingProduct) {
        const updated = await updateProduct(editingProduct.id, formData);
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? { ...p, ...updated } : p))
        );
      } else {
        const created = await addProduct(formData);
        setProducts((prev) => [created, ...prev]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving product:', err);
      setModalError(err.message || 'Product save karne mein dikkat aayi.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Kya aap is product ko catalog se permanently delete karna chahte hain?')) {
      return;
    }
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      console.error('Failed to delete product:', e);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCat = categoryFilter === 'all' || p.categoryId === categoryFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !term ||
      p.name?.toLowerCase().includes(term) ||
      p.categoryName?.toLowerCase().includes(term) ||
      p.description?.toLowerCase().includes(term);

    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 font-intern">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-mono-300 pb-6">
        <div>
          <span className="font-mono text-xs text-mono-500 uppercase tracking-widest block">
            [PRODUCT CATALOG INVENTORY]
          </span>
          <h1 className="text-heading-xl font-bold text-mono-950">
            Manage Products & Systems
          </h1>
          <p className="text-body-sm text-mono-600 mt-1">
            Add, update, or remove aluminium fenestration, glass partitions, and sanitaryware products in the live catalog.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {products.length > 0 && (
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
            Naya Product Add Karein
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-mono-0 border border-mono-300 rounded-xs flex flex-col md:flex-row gap-4 items-center justify-between shadow-subtle">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search products by title, spec..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-mono-50 border border-mono-300 rounded-xs text-xs focus:outline-none focus:ring-2 focus:ring-mono-950"
          />
          <Search className="w-4 h-4 text-mono-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xs whitespace-nowrap ${
              categoryFilter === 'all'
                ? 'bg-mono-950 text-mono-0 font-semibold'
                : 'bg-mono-100 text-mono-700 hover:bg-mono-200'
            }`}
          >
            All ({products.length})
          </button>
          {productCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xs whitespace-nowrap ${
                categoryFilter === cat.id
                  ? 'bg-mono-950 text-mono-0 font-semibold'
                  : 'bg-mono-100 text-mono-700 hover:bg-mono-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-mono-0 border border-mono-300 rounded-xs shadow-subtle overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs font-mono text-mono-400 uppercase tracking-wider">
            Loading products catalog...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-body-sm text-mono-500">
            Koi product nahi mila. Naya product add karne ke liye upar button dabayein.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-intern">
              <thead className="bg-mono-50 border-b border-mono-200 font-mono uppercase text-mono-500 text-[0.7rem]">
                <tr>
                  <th className="py-3.5 px-4">Image</th>
                  <th className="py-3.5 px-4">Product Name & Summary</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price Tag</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mono-200">
                {filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-mono-50/70 transition-colors">
                    {/* Image */}
                    <td className="py-3.5 px-4 align-top w-20">
                      <img
                        src={prod.image || '/images/products/slim-sliding-window.jpg'}
                        alt={prod.name}
                        className="w-16 h-12 object-cover rounded-xs border border-mono-200 bg-mono-100"
                      />
                    </td>

                    {/* Title */}
                    <td className="py-3.5 px-4 align-top max-w-sm">
                      <span className="font-semibold text-mono-950 block text-sm">
                        {prod.name}
                      </span>
                      <p className="text-[0.72rem] text-mono-600 line-clamp-1 mt-0.5">
                        {prod.hinglishHeadline || prod.description}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 align-top">
                      <span className="font-mono text-xs px-2 py-0.5 bg-mono-100 text-mono-800 rounded-xs">
                        {prod.categoryName}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 align-top font-mono font-medium text-mono-900">
                      {prod.price || 'Price on Enquiry'}
                    </td>

                    {/* Featured */}
                    <td className="py-3.5 px-4 align-top">
                      {prod.featured ? (
                        <span className="font-mono text-[0.68rem] px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xs font-semibold uppercase">
                          Homepage Hero
                        </span>
                      ) : (
                        <span className="font-mono text-[0.68rem] text-mono-400">
                          Catalog only
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 align-top text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(prod)}
                          className="p-1.5 bg-mono-100 hover:bg-mono-200 text-mono-950 rounded-xs transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(prod.id)}
                          className="p-1.5 text-mono-400 hover:text-red-600 rounded-xs transition-colors"
                          title="Delete Product"
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

      {/* Add / Edit Modal */}
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
                  [{editingProduct ? 'EDIT CATALOG ITEM' : 'ADD NEW CATALOG ITEM'}]
                </span>
                <h3 className="text-heading-md font-bold text-mono-950">
                  {editingProduct ? `Edit: ${editingProduct.name}` : 'Naya Product Create Karein'}
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
                id="prod-name"
                label="Product Name *"
                placeholder="e.g. Slim Profile 3-Track Sliding Window"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-mono-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={handleCategoryChange}
                    className="w-full px-3.5 py-2.5 bg-mono-50 border border-mono-300 rounded-xs text-xs font-intern focus:outline-none focus:ring-2 focus:ring-mono-950"
                  >
                    {productCategories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  id="prod-price"
                  label="Price Tag / Indicator"
                  placeholder="e.g. Price on Enquiry or ₹450 / sq.ft"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              <Input
                id="prod-image"
                label="Image URL or Path"
                placeholder="/images/products/slim-sliding-window.jpg"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />

              <Input
                id="prod-headline"
                label="Hinglish Summary / Headline"
                placeholder="e.g. Heavy-duty wind resistance aur smooth ball-bearing roller movement."
                value={formData.hinglishHeadline}
                onChange={(e) => setFormData({ ...formData, hinglishHeadline: e.target.value })}
              />

              <Textarea
                id="prod-description"
                label="Detailed Description"
                placeholder="Complete architectural specifications and durability details..."
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />

              {/* Toggles */}
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
                  {editingProduct ? 'Save Changes' : 'Product Publish Karein'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;

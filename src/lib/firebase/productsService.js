import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';

const LOCAL_PRODUCTS_KEY = 'ambika_local_products';

const DEMO_PRODUCT_IDS = [
  'prod-slim-sliding-window',
  'prod-casement-door-system',
  'prod-acoustic-glass-partition',
  'prod-premium-sanitary-suite',
  'prod-modular-kitchen-profile',
  'prod-sliding-wardrobe-system',
  'prod-gypsum-grid-ceiling',
];

const getLocalProducts = () => {
  try {
    const raw = localStorage.getItem(LOCAL_PRODUCTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Filter out any legacy demo products automatically
    const cleaned = Array.isArray(parsed)
      ? parsed.filter((p) => !DEMO_PRODUCT_IDS.includes(p.id))
      : [];
    if (cleaned.length !== parsed.length) {
      localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(cleaned));
    }
    return cleaned;
  } catch {
    return [];
  }
};

const saveLocalProducts = (products) => {
  localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
};

/**
 * Fetch all products (from Firestore or local database)
 * 100% Real data added by Admin
 */
export async function fetchProducts() {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const list = snapshot.docs
        .map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }))
        .filter((p) => !DEMO_PRODUCT_IDS.includes(p.id));
      return list;
    } catch (e) {
      console.warn('[Firebase] fetchProducts error, falling back to local store:', e);
    }
  }

  return getLocalProducts();
}

/**
 * Fetch single product by ID or Slug
 */
export async function fetchProductById(idOrSlug) {
  if (DEMO_PRODUCT_IDS.includes(idOrSlug)) return null;

  if (isFirebaseConfigured && db) {
    try {
      const docSnap = await getDoc(doc(db, 'products', idOrSlug));
      if (docSnap.exists() && !DEMO_PRODUCT_IDS.includes(docSnap.id)) {
        return { id: docSnap.id, ...docSnap.data() };
      }
    } catch {
      // Continue to query-based match
    }
  }

  const all = await fetchProducts();
  return all.find((p) => p.id === idOrSlug || p.slug === idOrSlug) || null;
}

/**
 * Create a new product (Admin only)
 */
export async function addProduct(productData) {
  const slug = productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const id = productData.id || `prod-${Date.now()}`;

  const newProduct = {
    ...productData,
    id,
    slug,
    status: productData.status || 'active',
    featured: Boolean(productData.featured),
    features: Array.isArray(productData.features) ? productData.features : [],
    specs: productData.specs || {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    const docRef = doc(db, 'products', id);
    await setDoc(docRef, {
      ...newProduct,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return newProduct;
  }

  const products = getLocalProducts();
  products.unshift(newProduct);
  saveLocalProducts(products);
  return newProduct;
}

/**
 * Update an existing product
 */
export async function updateProduct(id, productData) {
  const updatedAt = new Date().toISOString();

  if (isFirebaseConfigured && db) {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, {
      ...productData,
      updatedAt: serverTimestamp(),
    });
    return { id, ...productData, updatedAt };
  }

  const products = getLocalProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...productData, updatedAt };
    saveLocalProducts(products);
    return products[index];
  }

  throw new Error(`Product with ID ${id} not found.`);
}

/**
 * Delete a product
 */
export async function deleteProduct(id) {
  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, 'products', id));
    return true;
  }

  const products = getLocalProducts().filter((p) => p.id !== id);
  saveLocalProducts(products);
  return true;
}

/**
 * Purge all products (used for clean reset)
 */
export async function clearAllProducts() {
  localStorage.removeItem(LOCAL_PRODUCTS_KEY);
  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDocs(collection(db, 'products'));
      for (const d of snapshot.docs) {
        await deleteDoc(doc(db, 'products', d.id));
      }
    } catch (e) {
      console.warn('Error clearing products in firestore:', e);
    }
  }
}

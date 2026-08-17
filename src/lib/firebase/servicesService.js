import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';

const LOCAL_SERVICES_KEY = 'ambika_local_services';

const DEMO_SERVICE_IDS = [
  'srv-aluminium-fabrication',
  'srv-custom-sliding-partitions',
  'srv-interior-execution',
  'srv-false-ceiling-installation',
  'srv-renovation-execution',
  'srv-architectural-planning',
];

const getLocalServices = () => {
  try {
    const raw = localStorage.getItem(LOCAL_SERVICES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    const cleaned = Array.isArray(parsed)
      ? parsed.filter((s) => !DEMO_SERVICE_IDS.includes(s.id))
      : [];
    if (cleaned.length !== parsed.length) {
      localStorage.setItem(LOCAL_SERVICES_KEY, JSON.stringify(cleaned));
    }
    return cleaned;
  } catch {
    return [];
  }
};

const saveLocalServices = (services) => {
  localStorage.setItem(LOCAL_SERVICES_KEY, JSON.stringify(services));
};

/**
 * Fetch all services (from Firestore or local store)
 * 100% Real data added by Admin
 */
export async function fetchServices() {
  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDocs(collection(db, 'services'));
      const list = snapshot.docs
        .map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }))
        .filter((s) => !DEMO_SERVICE_IDS.includes(s.id));
      return list;
    } catch (e) {
      console.warn('[Firebase] fetchServices error, using local data:', e);
    }
  }

  return getLocalServices();
}

/**
 * Fetch single service by ID or Slug
 */
export async function fetchServiceById(idOrSlug) {
  if (DEMO_SERVICE_IDS.includes(idOrSlug)) return null;

  if (isFirebaseConfigured && db) {
    try {
      const docSnap = await getDoc(doc(db, 'services', idOrSlug));
      if (docSnap.exists() && !DEMO_SERVICE_IDS.includes(docSnap.id)) {
        return { id: docSnap.id, ...docSnap.data() };
      }
    } catch {
      // Continue to query-based match
    }
  }

  const all = await fetchServices();
  return all.find((s) => s.id === idOrSlug || s.slug === idOrSlug) || null;
}

/**
 * Create a new service (Admin only)
 */
export async function addService(serviceData) {
  const slug = serviceData.slug || serviceData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const id = serviceData.id || `srv-${Date.now()}`;

  const newService = {
    ...serviceData,
    id,
    slug,
    status: serviceData.status || 'active',
    featured: Boolean(serviceData.featured),
    scopeOfWork: Array.isArray(serviceData.scopeOfWork) ? serviceData.scopeOfWork : [],
    features: Array.isArray(serviceData.features) ? serviceData.features : [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    const docRef = doc(db, 'services', id);
    await setDoc(docRef, {
      ...newService,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return newService;
  }

  const services = getLocalServices();
  services.unshift(newService);
  saveLocalServices(services);
  return newService;
}

/**
 * Update an existing service
 */
export async function updateService(id, serviceData) {
  const updatedAt = new Date().toISOString();

  if (isFirebaseConfigured && db) {
    const docRef = doc(db, 'services', id);
    await updateDoc(docRef, {
      ...serviceData,
      updatedAt: serverTimestamp(),
    });
    return { id, ...serviceData, updatedAt };
  }

  const services = getLocalServices();
  const index = services.findIndex((s) => s.id === id);
  if (index !== -1) {
    services[index] = { ...services[index], ...serviceData, updatedAt };
    saveLocalServices(services);
    return services[index];
  }

  throw new Error(`Service with ID ${id} not found.`);
}

/**
 * Delete a service
 */
export async function deleteService(id) {
  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, 'services', id));
    return true;
  }

  const services = getLocalServices().filter((s) => s.id !== id);
  saveLocalServices(services);
  return true;
}

/**
 * Purge all services
 */
export async function clearAllServices() {
  localStorage.removeItem(LOCAL_SERVICES_KEY);
  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDocs(collection(db, 'services'));
      for (const d of snapshot.docs) {
        await deleteDoc(doc(db, 'services', d.id));
      }
    } catch (e) {
      console.warn('Error clearing services in firestore:', e);
    }
  }
}

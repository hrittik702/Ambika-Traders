import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';

const LOCAL_ENQUIRIES_KEY = 'ambika_local_enquiries';

const getLocalEnquiries = () => {
  try {
    const raw = localStorage.getItem(LOCAL_ENQUIRIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveLocalEnquiries = (enquiries) => {
  localStorage.setItem(LOCAL_ENQUIRIES_KEY, JSON.stringify(enquiries));
};

/**
 * Submit customer quotation or enquiry (No login required)
 * Mandatory customer fields: name, phone, email, address
 */
export async function submitQuoteEnquiry({
  customer,
  items = [],
  notes = '',
  type = 'cart_quotation',
}) {
  // Validate mandatory fields
  if (!customer?.name || !customer?.phone || !customer?.email || !customer?.address) {
    throw new Error('Name, 10-digit mobile number, email, and address are required.');
  }

  const payload = {
    type,
    customer: {
      name: customer.name.trim(),
      phone: customer.phone.trim(),
      email: customer.email.trim().toLowerCase(),
      address: customer.address.trim(),
    },
    items: items.map((it) => ({
      itemId: it.id || it.itemId || 'item-unknown',
      title: it.name || it.title || 'Product / Service Item',
      itemType: it.itemType || 'product',
      category: it.categoryName || it.category || '',
      quantity: it.quantity || 1,
      price: it.price || 'Price on Enquiry',
      image: it.image || '',
    })),
    notes: notes ? notes.trim() : '',
    status: 'pending',
    priority: 'normal',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    const docRef = await addDoc(collection(db, 'enquiries'), {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { id: docRef.id, ...payload };
  }

  // Local fallback persistence
  const id = `enq-${Date.now()}`;
  const localRecord = { id, ...payload };
  const list = getLocalEnquiries();
  list.unshift(localRecord);
  saveLocalEnquiries(list);
  return localRecord;
}

/**
 * Fetch all customer enquiries & quotations (Admin only)
 */
export async function fetchEnquiries() {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
    } catch (e) {
      console.warn('[Firebase] fetchEnquiries error:', e);
    }
  }

  return getLocalEnquiries();
}

/**
 * Update enquiry status (e.g. pending -> contacted -> in_progress -> completed)
 */
export async function updateEnquiryStatus(id, status, adminNotes = '') {
  const updatedAt = new Date().toISOString();

  if (isFirebaseConfigured && db) {
    const docRef = doc(db, 'enquiries', id);
    await updateDoc(docRef, {
      status,
      ...(adminNotes ? { adminNotes } : {}),
      updatedAt: serverTimestamp(),
    });
    return { id, status, adminNotes, updatedAt };
  }

  const list = getLocalEnquiries();
  const index = list.findIndex((e) => e.id === id);
  if (index !== -1) {
    list[index] = {
      ...list[index],
      status,
      ...(adminNotes ? { adminNotes } : {}),
      updatedAt,
    };
    saveLocalEnquiries(list);
    return list[index];
  }

  throw new Error(`Enquiry with ID ${id} not found.`);
}

/**
 * Delete enquiry
 */
export async function deleteEnquiry(id) {
  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, 'enquiries', id));
    return true;
  }

  const list = getLocalEnquiries().filter((e) => e.id !== id);
  saveLocalEnquiries(list);
  return true;
}

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from './config';

const LOCAL_ADMINS_KEY = 'ambika_local_admins';
const LOCAL_SESSION_KEY = 'ambika_local_auth_user';

const DEFAULT_SUPERADMIN = {
  uid: 'superadmin-alpha',
  email: 'alphavishwakarma9@gmail.com',
  displayName: 'Alpha Vishwakarma',
  role: 'superadmin',
  password: '12345678', // Used in local fallback mode
};

// Initialize local admins storage
const getLocalAdmins = () => {
  try {
    const raw = localStorage.getItem(LOCAL_ADMINS_KEY);
    if (!raw) {
      const initial = [DEFAULT_SUPERADMIN];
      localStorage.setItem(LOCAL_ADMINS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [DEFAULT_SUPERADMIN];
  }
};

const saveLocalAdmins = (admins) => {
  localStorage.setItem(LOCAL_ADMINS_KEY, JSON.stringify(admins));
};

/**
 * Log in admin using Firebase Auth or local fallback
 */
export async function loginAdmin(email, password) {
  const cleanEmail = email.trim().toLowerCase();

  if (isFirebaseConfigured && auth) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
      return {
        success: true,
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName || 'Admin',
        },
      };
    } catch (firebaseError) {
      // If user is superadmin bootstrap attempt before Firebase account creation
      if (cleanEmail === DEFAULT_SUPERADMIN.email.toLowerCase() && password === DEFAULT_SUPERADMIN.password) {
        try {
          // Attempt to register superadmin in Firebase if not found
          const newCredential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
          await updateProfile(newCredential.user, { displayName: DEFAULT_SUPERADMIN.displayName });
          if (db) {
            await setDoc(doc(db, 'admins', newCredential.user.uid), {
              uid: newCredential.user.uid,
              email: cleanEmail,
              displayName: DEFAULT_SUPERADMIN.displayName,
              role: 'superadmin',
              createdAt: serverTimestamp(),
              createdBy: 'system_bootstrap',
            });
          }
          return {
            success: true,
            user: {
              uid: newCredential.user.uid,
              email: newCredential.user.email,
              displayName: DEFAULT_SUPERADMIN.displayName,
            },
          };
        } catch (createErr) {
          // If Firebase Auth provider is not enabled in Console, fallback to local superadmin
          if (
            firebaseError.code === 'auth/configuration-not-found' ||
            firebaseError.code === 'auth/operation-not-allowed' ||
            createErr.code === 'auth/configuration-not-found' ||
            createErr.code === 'auth/operation-not-allowed'
          ) {
            console.warn('[Firebase Auth] Email/Password provider not yet enabled in Firebase Console. Falling back to local session.');
            const sessionUser = {
              uid: DEFAULT_SUPERADMIN.uid,
              email: DEFAULT_SUPERADMIN.email,
              displayName: DEFAULT_SUPERADMIN.displayName,
              role: 'superadmin',
            };
            localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(sessionUser));
            return { success: true, user: sessionUser };
          }
        }
      }

      // If configuration-not-found on standard admin, check local fallback
      if (
        firebaseError.code === 'auth/configuration-not-found' ||
        firebaseError.code === 'auth/operation-not-allowed'
      ) {
        const admins = getLocalAdmins();
        const match = admins.find(
          (a) => a.email.toLowerCase() === cleanEmail && a.password === password
        );
        if (match) {
          const sessionUser = {
            uid: match.uid,
            email: match.email,
            displayName: match.displayName || 'Admin',
            role: match.role || 'admin',
          };
          localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(sessionUser));
          return { success: true, user: sessionUser };
        }
      }

      throw firebaseError;
    }
  }

  // Local fallback mode
  const admins = getLocalAdmins();
  const match = admins.find(
    (a) => a.email.toLowerCase() === cleanEmail && a.password === password
  );

  if (match) {
    const sessionUser = {
      uid: match.uid,
      email: match.email,
      displayName: match.displayName || 'Admin',
      role: match.role || 'admin',
    };
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(sessionUser));
    return { success: true, user: sessionUser };
  }

  throw new Error('Invalid email or password. Please check your credentials.');
}

/**
 * Log out admin
 */
export async function logoutAdmin() {
  if (isFirebaseConfigured && auth) {
    await signOut(auth);
  }
  localStorage.removeItem(LOCAL_SESSION_KEY);
}

/**
 * Subscribe to auth state changes
 */
export function onAuthChange(callback) {
  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        callback({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'Admin',
        });
      } else {
        callback(null);
      }
    });
  }

  // Local storage listener
  const checkLocalSession = () => {
    try {
      const raw = localStorage.getItem(LOCAL_SESSION_KEY);
      callback(raw ? JSON.parse(raw) : null);
    } catch {
      callback(null);
    }
  };

  checkLocalSession();
  window.addEventListener('storage', checkLocalSession);
  return () => window.removeEventListener('storage', checkLocalSession);
}

/**
 * Create/Add a new admin account
 */
export async function addAdminAccount({ email, password, displayName, role = 'admin' }) {
  const cleanEmail = email.trim().toLowerCase();

  if (isFirebaseConfigured && auth && db) {
    // In live Firebase, create secondary user via Firebase Auth
    // Note: Creating new auth user changes auth state if on client SDK, so we record in Firestore
    const adminRef = doc(collection(db, 'admins'));
    await setDoc(adminRef, {
      uid: adminRef.id,
      email: cleanEmail,
      displayName: displayName || cleanEmail.split('@')[0],
      role,
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser?.email || 'admin',
    });
    return { id: adminRef.id, email: cleanEmail, displayName, role };
  }

  // Local fallback
  const admins = getLocalAdmins();
  const existing = admins.find((a) => a.email.toLowerCase() === cleanEmail);
  if (existing) {
    throw new Error('An admin with this email address already exists.');
  }

  const newAdmin = {
    uid: `admin-${Date.now()}`,
    email: cleanEmail,
    password: password || '12345678',
    displayName: displayName || cleanEmail.split('@')[0],
    role,
    createdAt: new Date().toISOString(),
    createdBy: 'current_admin',
  };

  admins.push(newAdmin);
  saveLocalAdmins(admins);
  return newAdmin;
}

/**
 * Fetch all registered admin accounts
 */
export async function fetchAdmins() {
  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDocs(collection(db, 'admins'));
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      if (list.length > 0) return list;
    } catch (e) {
      console.warn('[Firebase] fetchAdmins error:', e);
    }
  }

  return getLocalAdmins().map(({ password, ...rest }) => rest);
}

/**
 * Delete an admin account
 */
export async function deleteAdminAccount(adminId) {
  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, 'admins', adminId));
    return true;
  }

  const admins = getLocalAdmins().filter((a) => a.uid !== adminId && a.id !== adminId);
  saveLocalAdmins(admins);
  return true;
}

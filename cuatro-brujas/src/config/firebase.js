import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Configurar servicios con ajustes para móviles
export const auth = getAuth(app);
export const db = getFirestore(app);

// Configuración especial para móviles
if (typeof window !== 'undefined') {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    console.log('📱 Configurando Firebase para dispositivo móvil');

    // Configurar timeouts más largos para conexiones móviles
    // Esto ayuda con conexiones lentas o inestables
    import('firebase/firestore').then(({ enableNetwork, disableNetwork }) => {
      // Opcional: configuraciones adicionales para móviles
    });
  }
}

// Email del admin autorizado
export const ADMIN_EMAIL = "admin@cuatrobrujas.app";

export default app;

import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  orderBy, 
  limit, 
  getDocs 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Generar código aleatorio de 6 caracteres
export const generateCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Crear nuevo código de acceso
export const createAccessCode = async (userData) => {
  try {
    const code = generateCode();
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // +7 días

    const accessCodeData = {
      code,
      name: userData.name,
      email: userData.email,
      whatsapp: userData.whatsapp || '',
      used: false,
      createdAt: serverTimestamp(),
      expiresAt: expirationDate,
      type: 'general'
    };

    const docRef = await addDoc(collection(db, 'accessCodes'), accessCodeData);
    
    return {
      success: true,
      code,
      id: docRef.id,
      data: accessCodeData
    };
  } catch (error) {
    console.error('Error creating access code:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Obtener últimos códigos creados
export const getRecentCodes = async () => {
  try {
    const q = query(
      collection(db, 'accessCodes'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
    
    const querySnapshot = await getDocs(q);
    const codes = [];
    
    querySnapshot.forEach((doc) => {
      codes.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return codes;
  } catch (error) {
    console.error('Error fetching recent codes:', error);
    return [];
  }
};

// Formatear fecha para mostrar
export const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
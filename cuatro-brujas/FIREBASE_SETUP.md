# 🔥 Configuración de Firebase para Panel Administrativo

## 📋 Pasos para Configurar Firebase

### 1. Crear Proyecto en Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto llamado "Cuatro Brujas"
3. Habilita Google Analytics (opcional)

### 2. Configurar Authentication
1. En la consola de Firebase → Authentication → Get Started
2. Habilitar **Email/Password** como método de autenticación
3. Crear usuario admin:
   - Email: `admin@cuatrobrujas.app`
   - Password: [tu contraseña segura]

### 3. Configurar Firestore Database
1. En la consola de Firebase → Firestore Database → Create database
2. Comenzar en modo **producción**
3. Crear las siguientes reglas de seguridad:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura/escritura solo a usuarios autenticados
    match /accessCodes/{document} {
      allow read, write: if request.auth != null && request.auth.token.email == "admin@cuatrobrujas.app";
    }
  }
}
```

### 4. Obtener Configuración
1. Ve a Project Settings (⚙️) → General
2. En "Your apps" → Add app → Web app
3. Registra la app con nombre "Cuatro Brujas Web"
4. Copia la configuración `firebaseConfig`

### 5. Actualizar Código
Reemplaza el contenido en `src/config/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "tu-api-key-aqui",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-project-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};
```

### 6. Variables de Entorno (Opcional pero Recomendado)
Crea un archivo `.env.local`:

```env
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-project-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=tu-app-id
```

Y actualiza `firebase.js` para usar variables de entorno:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## 🎯 Funcionalidades Disponibles

### Panel Admin (`/admin`)
- ✅ Login seguro solo para `admin@cuatrobrujas.app`
- ✅ Generación de códigos de 6 caracteres
- ✅ Almacenamiento en Firestore
- ✅ Envío por Email (mailto)
- ✅ Envío por WhatsApp
- ✅ Historial de códigos generados
- ✅ Protección de rutas

### Validación de Códigos (`/viaje-mistico`)
- ✅ Conecta con Firestore para validar códigos
- ✅ Marca códigos como usados
- ✅ Verifica expiración (7 días)
- ✅ Fallback a códigos hardcodeados si Firebase falla

## 🔐 Seguridad

- Solo el email `admin@cuatrobrujas.app` puede acceder al panel
- Códigos se marcan como usados después de validarse
- Expiración automática a los 7 días
- Reglas de Firestore restrictivas

## 🚀 Despliegue

1. Configura las variables de entorno en Vercel
2. Las reglas de Firestore ya incluyen el dominio de producción
3. El panel funcionará en: `tu-dominio.com/admin`

¡Listo para usar! 🎉
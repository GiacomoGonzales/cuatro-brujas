# 🛠️ Utilidades de Desarrollo - Códigos de Acceso

## 📋 Funciones Disponibles

### `createTestAccessCode()`
Crea automáticamente un código de acceso de prueba en Firestore.

**Características del código generado:**
- **Código:** `PRUEBA123`
- **Estado:** No usado (`used: false`)
- **Tipo:** General (`type: "general"`)
- **Expiración:** 30 días desde la creación
- **Lectura ID:** Vacío (válido para cualquier lectura)

**Uso:**
```javascript
// En la consola del navegador
createTestAccessCode()
```

**Respuesta esperada:**
```
✅ Código de prueba 'PRUEBA123' creado correctamente en Firestore.
📄 ID del documento: [firebase-document-id]
```

### `checkCodeExists(code)`
Verifica si un código específico existe en Firestore.

**Uso:**
```javascript
// Verificar si existe un código
await checkCodeExists("PRUEBA123")
// Retorna: true o false
```

### `cleanTestCodes()`
Elimina todos los códigos de prueba de Firestore (útil para limpiar después de las pruebas).

**Uso:**
```javascript
// Limpiar códigos de prueba
cleanTestCodes()
```

**Respuesta esperada:**
```
🧹 X códigos de prueba eliminados
```

## 🔧 Configuración de Firebase

Para que las funciones funcionen con Firestore real, debes:

1. **Configurar Firebase** en `src/utils/accessCodes.js`:
```javascript
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-project-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};
```

2. **Instalar Firebase** (si no está instalado):
```bash
npm install firebase
```

3. **Configurar reglas de Firestore** para permitir escritura en la colección `accessCodes`.

## 📊 Códigos de Prueba Predefinidos

Mientras no esté configurado Firebase, el sistema incluye estos códigos de prueba:

| Código | Estado | Expiración | Tipo | Notas |
|--------|--------|------------|------|-------|
| `BRUJA2025` | ✅ Válido | 2025-12-31 | lectura_semanal | - |
| `MAGIA123` | ✅ Válido | 2025-06-30 | general | - |
| `HAMBURGUESA` | ❌ Usado | 2025-12-31 | lectura_semanal | Ya utilizado |
| `EXPIRADO` | ❌ Expirado | 2024-12-31 | general | Fecha pasada |
| `PRUEBA123` | ✅ Válido | +30 días | general | Generado por utilidad |

## 🚀 Flujo de Desarrollo

1. **Abrir la aplicación** en el navegador
2. **Abrir DevTools** (F12)
3. **Ir a la consola**
4. **Ejecutar:** `createTestAccessCode()`
5. **Probar el código** en `/viaje-mistico` con `PRUEBA123`
6. **Limpiar después:** `cleanTestCodes()` (opcional)

## 📱 Integración con la App

Las funciones están automáticamente disponibles cuando la aplicación se carga, gracias a la importación en `main.jsx`.

El código `PRUEBA123` está integrado con el sistema de validación existente y funcionará tanto en modo simulación como con Firestore real.
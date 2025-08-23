# 🔐 Sistema de Control de Sesiones - Una Lectura por Código

## 📋 Descripción

Este sistema evita que un cliente pueda hacer múltiples lecturas con el mismo código de acceso, asegurando que cada código permita solo **una consulta por sesión**.

## 🔧 Cómo Funciona

### 1. **Validación de Código**
- Al ingresar un código válido, se guarda la información de la sesión
- Se almacena: código usado, hora de inicio, estado de lectura

### 2. **Control de Acceso**
- Todas las páginas de lectura verifican si ya se completó una consulta
- Si ya hay una lectura completada, redirige automáticamente

### 3. **Marcado de Lectura Completada**
- Al acceder a cualquier página de consulta (bruja o tarot), se marca como completada
- La lectura se considera "usada" inmediatamente al entrar

### 4. **Página de Confirmación**
- Muestra información de la lectura realizada
- Explica que necesita un nuevo código para otra consulta
- Opciones para volver al inicio o cerrar sesión

## 🛠️ Archivos Modificados

### Nuevos Archivos
- `src/services/sessionService.js` - Servicio principal de control de sesiones
- `src/pages/LecturaCompletadaPage.jsx` - Página de confirmación

### Archivos Modificados
- `src/pages/IngresarCodigoPage.jsx` - Usa nuevo servicio de sesiones
- `src/pages/ViajeMísticoPage.jsx` - Usa nuevo servicio de sesiones
- `src/pages/LecturasPage.jsx` - Verifica si ya completó lectura
- `src/pages/ConsultaPage.jsx` - Marca lectura como completada
- `src/pages/TarotLecturaPage.jsx` - Marca lectura como completada
- `src/routes/index.jsx` - Agrega nueva ruta

## 🔄 Flujo de Usuario

```
1. Cliente ingresa código → Sesión iniciada
2. Cliente elige bruja → Lectura marcada como completada
3. Si intenta actualizar página → Redirigido a confirmación
4. Si intenta nueva lectura → Redirigido a confirmación
5. Para nueva lectura → Necesita nuevo código
```

## 🧪 Modo Desarrollo

### Código Permanente (PRUEBA123)
- Permite múltiples lecturas para testing
- Incluye botón "Reiniciar Sesión" en página de confirmación
- Se resetea automáticamente para permitir nuevas pruebas

### Funciones de Desarrollo
```javascript
// Verificar estado de sesión
console.log(sessionStorage.getItem('brujaSession'));

// Limpiar sesión manualmente
import { clearSession } from './services/sessionService';
clearSession();

// Reiniciar código permanente
import { resetPermanentCodeSession } from './services/sessionService';
resetPermanentCodeSession();
```

## 📊 Datos de Sesión

La sesión almacena:
```json
{
  "accessValidated": true,
  "accessCode": "CODIGO123",
  "sessionStartTime": "2025-01-XX...",
  "lecturaCompleted": true,
  "lecturaCompletedAt": "2025-01-XX...",
  "brujaConsultada": "elvira",
  "tipoLectura": "consulta",
  "codeData": { ... }
}
```

## ⚡ Características

- ✅ **Una lectura por código**: Evita múltiples consultas
- ✅ **Persistente**: Funciona aunque se actualice la página
- ✅ **Automático**: No requiere intervención manual
- ✅ **Desarrollo-friendly**: Códigos permanentes para testing
- ✅ **Información clara**: Página explicativa para el usuario
- ✅ **Retrocompatible**: Mantiene compatibilidad con sistema existente

## 🚀 Producción

En producción:
1. Remover o comentar códigos permanentes
2. Todos los códigos serán de un solo uso
3. El sistema funcionará automáticamente
4. Los clientes verán la página de confirmación al intentar múltiples lecturas

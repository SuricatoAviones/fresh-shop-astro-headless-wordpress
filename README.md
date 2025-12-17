# Quiosco App — Astro + Headless WordPress 🧋✨

**Quiosco App** es un frontend construido con **Astro** (React + Vue híbrido) diseñado como un proyecto *headless* que consume una instalación de **WordPress** a través de su **REST API** y autenticación JWT. Ideal para kioscos/tiendas que manejan productos con precios fijos o variables, órdenes y un panel de administración sencillo.

---

## 📋 Tabla de contenido
1. Features ✨  
2. Tecnologías 🔧  
3. Requisitos previos ✅  
4. Instalación y ejecución 🏃‍♂️  
5. Variables de entorno 🔒  
6. Scripts disponibles ⚙️  
7. Arquitectura y Endpoints API 🧭  
8. Autenticación y flujo JWT 🔐  
9. Panel de administración 🛠️  
10. Notas sobre WordPress (requisitos) 📝  
11. Contribuciones & Licencia 📄  
12. Contacto 📬

---

## ✨ Features
- Interfaz pública para ver productos, categorías y detalles.  
- Soporta precios fijos y variables (chico/mediano/grande).  
- Carrito y creación de órdenes (se crean como posts personalizados en WP).  
- Área de administración para crear/editar/eliminar productos y gestionar órdenes.  
- Integración JWT (cookie HTTP-only `FRESHCOFFEE_TOKEN`).  
- Validaciones en servidor con Zod y acciones con `astro:actions`.

---

## 🔧 Tecnologías
- Astro  
- React, Vue (componentes)  
- TailwindCSS  
- Pinia / Zustand (estado)  
- Zod (validación)  
- fetch + JWT para la comunicación con WordPress

---

## ✅ Requisitos previos
- Node.js (recomendado >= 18)  
- npm  
- Una instalación de WordPress con:
  - Plugin de JWT Authentication (endpoint `jwt-auth/v1/token`)  
  - Post types/ACF para `freshcoffee_products` y `freshcoffee_order`  
  - Endpoint custom `freshcoffee/v1/api/filter-orders` (u equivalente) para filtrar órdenes

---

## 🚀 Instalación & ejecución

1. Clona el repositorio:
```bash
git clone <tu-repo> && cd quiosco-app-astro
```

2. Instala dependencias:
```bash
npm install
```

3. Copia/edita variables de entorno:
```bash
cp .env.development .env
# edita según tu entorno
```

4. Ejecuta en desarrollo:
```bash
npm run dev
# abre http://localhost:4321
```

5. Build / Preview:
```bash
npm run build
npm run preview
```

---

## 🔒 Variables de entorno (ejemplo)
Coloca en tu `.env` o `.env.development`:

```env
API_URL=http://localhost:10016/wp-json/wp/v2
AUTH_URL=http://localhost:10016/wp-json/jwt-auth/v1/token
SITE_URL=http://localhost:10016
GUEST_USER=cliente
GUEST_PASSWORD="v1QB PhVn HUAj 1HMx IrlD R5k9"
```

- **API_URL**: Base para rutas WP (productos, órdenes, usuarios).  
- **AUTH_URL**: Endpoint JWT.  
- **SITE_URL**: URL del sitio WP (usado por algunos endpoints).  
- **GUEST_USER/GUEST_PASSWORD**: credenciales para inicio como invitado.

---

## ⚙️ Scripts (desde `package.json`)
- `npm run dev` — Servidor de desarrollo  
- `npm run build` — Compila para producción  
- `npm run preview` — Previsualizar build

---

## 🧭 Arquitectura & Endpoints
- Endpoints proxy internos:
  - `src/pages/api/products/[id].ts` — Proxy a `freshcoffee_products/:id`  
  - `src/pages/api/orders/[status].ts` — Filtra órdenes por estado (`freshcoffee/v1/api/filter-orders`)
- Acciones (Astro Actions):
  - `src/actions/auth.ts`: `signIn`, `signInAsGuest`, `signOut`  
  - `src/actions/products.ts`: `addProduct`, `updateProduct`, `deleteProduct`  
  - `src/actions/orders.ts`: `createOrder`, `updateStatus`
- Cookie: `FRESHCOFFEE_TOKEN` (token JWT)

Ejemplo: crear orden envía `POST` con la estructura de la orden y usa `Authorization: Bearer <token>`.

---

## 🔐 Autenticación (JWT)
- Login contra `AUTH_URL` y guardar `token` en cookie HTTP-only `FRESHCOFFEE_TOKEN`.  
- `verifySession` en `src/auth/dal.ts` consulta `/users/me` para validar el token.

---

## 🛠 Panel de administración
- Rutas bajo `/admin`:
  - Ver y filtrar órdenes por estado (solo administradores pueden cambiar estado).  
  - CRUD de productos (subida de imágenes, manejo ACF).  
- Validación de formularios con Zod y mensajes de éxito devueltos por las acciones.

---

## 📝 Notas importantes en WordPress
Para funcionar correctamente, el WP debe:
- Tener post types y ACF fields para `freshcoffee_products` y `freshcoffee_order`.  
- Permitir JWT Auth (`jwt-auth/v1/token`).  
- Exponer un endpoint para filtrar órdenes por estado (o usar el existente que el proyecto espera).

> ⚠️ Si usas HTTPS en producción, asegúrate de usar URLs `https://` en `API_URL` y `AUTH_URL`.

---

## 📦 Deploy & Producción
- Define `.env.production` con las URLs reales de WP.  
- Configura variables de entorno en tu host (Vercel/Netlify/etc.).  
- Asegura TLS si tu WP está en HTTPS.

---

## 🤝 Contribuciones
- Haz fork → branch → PR.  
- Ejecuta `npm run dev` y valida antes de abrir PR.

---

## 📄 Licencia
Si no hay licencia en el repo, considera **MIT**. 

---


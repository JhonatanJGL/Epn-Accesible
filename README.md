# ♿ EPN Accesible

Plataforma web para consultar, gestionar y reservar espacios accesibles (parqueaderos, asientos preferenciales, ascensores y rutas/rampas) dentro del campus de la Escuela Politécnica Nacional.

**🔗 Demo en vivo:** [epn-accesible-uio.web.app](https://epn-accesible-uio.web.app)

---

## 📋 Tabla de contenidos

- [Sobre el proyecto](#-sobre-el-proyecto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologías](#-tecnologías)
- [Capturas](#-capturas)
- [Instalación](#-instalación)
- [Variables de entorno](#-variables-de-entorno)
- [Scripts disponibles](#-scripts-disponibles)
- [Despliegue](#-despliegue)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Equipo](#-equipo)

---

## 🎯 Sobre el proyecto

**EPN Accesible** nace como un proyecto curricular para facilitar la movilidad de personas con discapacidad dentro del campus universitario. La aplicación permite ubicar espacios accesibles en un mapa interactivo, consultar su disponibilidad en tiempo real y reservarlos por franjas horarias, evitando aglomeraciones y garantizando su uso a quienes realmente los necesitan.

## ✨ Funcionalidades

- 🗺️ **Mapa interactivo** de zonas y espacios accesibles del campus (parqueaderos, asientos, ascensores, rutas y rampas).
- 📅 **Sistema de reservas** por fecha y horario, con liberación automática del espacio una vez vencida la reserva.
- 🔐 **Autenticación de usuarios** para gestionar reservas personales.
- 📊 **Panel de estadísticas** de uso de los espacios.
- 🖼️ **Galería** de instalaciones accesibles.
- 📱 **PWA (Progressive Web App)**: instalable y con soporte offline básico.
- 🤖 **ChatBot** de asistencia para resolver dudas de los usuarios.

## 🛠️ Tecnologías

| Categoría | Tecnología |
|---|---|
| Frontend | [React 19](https://react.dev/) + [Vite](https://vite.dev/) |
| Backend / BaaS | [Firebase](https://firebase.google.com/) (Auth, Firestore, Hosting) |
| Mapas | [Leaflet](https://leafletjs.com/) + React-Leaflet |
| Animaciones | [Framer Motion](https://www.framer.com/motion/), [AOS](https://michalsnik.github.io/aos/) |
| UI / UX | React Router, React Tabs, React Toastify, Swiper |
| CI/CD | GitHub Actions → Firebase Hosting |

## 📸 Capturas

<img width="1352" height="608" alt="image" src="https://github.com/user-attachments/assets/46eebdaa-1a5c-4f9c-92ed-3dce88c5b15e" />

<img width="1353" height="608" alt="image" src="https://github.com/user-attachments/assets/8fd9bad0-6dc8-4e73-bb0c-5f6490c1aed3" />

<img width="1354" height="609" alt="image" src="https://github.com/user-attachments/assets/88be31b2-9009-48aa-95d9-8efd21445513" />

<img width="1350" height="607" alt="image" src="https://github.com/user-attachments/assets/9a585604-a292-4952-9eb6-547b0e659079" />

<img width="1352" height="643" alt="image" src="https://github.com/user-attachments/assets/7e796f11-a211-4331-bad0-e61510dd51be" />

<img width="1353" height="609" alt="image" src="https://github.com/user-attachments/assets/e8dc9438-8733-485c-add5-2a71a78e297b" />

<img width="1351" height="610" alt="image" src="https://github.com/user-attachments/assets/2a99cc53-b78c-4af8-bf25-d059f5ae2cac" />


## 🚀 Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/Jordy1199/Proyecto-React.git
cd Proyecto-React
npm install
```

Levanta el entorno de desarrollo:

```bash
npm run dev
```

La app quedará disponible en `http://localhost:5173`.

## 🔑 Variables de entorno

El proyecto usa Firebase, por lo que necesitas tu propia configuración. Crea un archivo `.env` en la raíz (o revisa `src/firebase/firebaseConfig.js`) con tus credenciales de Firebase:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

## 📜 Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Levanta el servidor de desarrollo |
| `npm run build` | Genera la build de producción en `dist/` |
| `npm run preview` | Previsualiza la build de producción localmente |
| `npm run lint` | Corre ESLint sobre el proyecto |

## ☁️ Despliegue

El despliegue está automatizado con **GitHub Actions**:

- Cada `push` a `main` despliega automáticamente a producción: [epn-accesible-uio.web.app](https://epn-accesible-uio.web.app)
- Cada Pull Request genera un canal de previsualización temporal en Firebase Hosting.

Para desplegar manualmente:

```bash
npm run build
firebase deploy --only hosting
```

## 📂 Estructura del proyecto

```
src/
├── assets/          # Imágenes, íconos y recursos estáticos
├── components/       # Componentes reutilizables (header, footer, reservas, galería, etc.)
├── context/          # Contextos de React (estado global)
├── data/             # Datos y lógica de negocio (espacios, disponibilidad, reservas)
├── firebase/          # Configuración de Firebase
├── hooks/            # Custom hooks (useAuth, useReservations, etc.)
├── layout/           # Layouts generales de la app
├── pages/            # Vistas principales (Home, Reservas, Galería, Servicios, etc.)
└── routes/           # Definición de rutas de la aplicación
```

## 👥 Equipo

Proyecto desarrollado como parte del curso de Diseño de Interfaces – Escuela Politécnica Nacional (EPN).

- Jordy Cajas
- Gregory Araujo
- Cristhian Veliz
- Jhonatan Guacapiña

---

<p align="center">Hecho con 💙 para una universidad más accesible</p>

# 🌐 Aplicativo Web — WeatherEnergyNode

Este módulo contiene el [**aplicativo web**](https://prueba-74889.web.app/) del proyecto **WeatherEnergyNode**, un sistema diseñado para la **visualización, análisis y monitoreo en tiempo real** de datos ambientales y energéticos obtenidos desde múltiples nodos basados en **ESP32**.

El aplicativo web fue desarrollado utilizando **Next.js**, **Tailwind CSS**, **shadcn/ui** y se aloja en **Firebase Hosting**, ofreciendo una interfaz moderna, responsiva y modular, optimizada tanto para dispositivos móviles como para escritorio.

---

## 🚀 Características principales

- **Dashboard en tiempo real:** visualización interactiva de variables climáticas y eléctricas mediante gráficos y widgets dinámicos.
- **Conexión directa con Firebase Realtime Database:** los datos de los sensores se actualizan automáticamente.
- **Descarga de datos históricos:** los usuarios pueden exportar datos de los sistemas meteorológicos y de adquisición de energía eléctrica en **CSV o JSON** para análisis posterior.
- **Interfaz modular y profesional:** uso de **shadcn/ui** para componentes como tarjetas, tablas, botones y modales, garantizando un diseño limpio y consistente.
- **Barra lateral y navegación intuitiva:** permite acceder a secciones como Dashboard, Descripción, Autores y otras secciones del proyecto.
- **Colores institucionales:** paleta basada en rojo, gris y blanco, siguiendo la identidad visual de la *Universidad Francisco de Paula Santander*.
- **Hosting seguro y gratuito en Firebase.**

---

## 🗂️ Estructura del proyecto web

Este proyecto utiliza **Next.js**, **Firebase**, y **TypeScript**. A continuación se describe la estructura principal del repositorio:

### 📁 Carpetas

- `.firebase/` — Configuración y caché del CLI de Firebase
- `.next/` — Archivos generados por Next.js durante el build
- `node_modules/` — Dependencias del proyecto instaladas vía npm
- `out/` — Salida del build estático (`next export`)
- `public/` — Archivos estáticos accesibles desde el navegador (imágenes, íconos, etc.)
- `src/` — Código fuente principal (componentes, páginas, lógica de negocio)

---

### 📄 Archivos clave

| Archivo                | Descripción                                                                 |
|------------------------|------------------------------------------------------------------------------|
| `.firebaserc`          | Configuración de proyectos Firebase                                          |
| `.firebase.json`       | Reglas de hosting, funciones, etc.                                           |
| `.gitignore`           | Exclusión de archivos sensibles o generados                                 |
| `.next.config.js`      | Configuración personalizada de Next.js                                       |
| `.eslintrc.json`       | Reglas de linting para mantener estilo de código                            |
| `next-env.d.ts`        | Tipado automático para Next.js con TypeScript                                |
| `package.json`         | Dependencias, scripts y metadatos del proyecto                               |
| `package-lock.json`    | Versión exacta de dependencias instaladas                                    |
| `postcss.config.js`    | Configuración de PostCSS (ej. Tailwind CSS)                                  |
| `tsconfig.json`        | Configuración de compilación TypeScript                                      |
---


---

## 🛠️ Tecnologías utilizadas

| Componente               | Descripción                                                                 |
|---------------------------|------------------------------------------------------------------------------|
| **Next.js**              | Framework de React para el desarrollo del frontend y enrutamiento eficiente. |
| **Tailwind CSS**         | Framework CSS para el diseño visual moderno y adaptable.                     |
| **shadcn/ui**            | Librería de componentes UI para interfaces limpias y consistentes.           |
| **Firebase Hosting**     | Servicio para alojar y publicar el sitio web.                                 |
| **Firebase Realtime DB** | Base de datos en tiempo real usada para mostrar los datos de los sensores.   |

---

## 🧠 Estructura visual y componentes

### 🧩 Encabezado

- Nombre de la aplicación
- Título del proyecto
- Logotipo institucional

### 📚 Barra lateral

- Navegación entre secciones:
  - Dashboard
  - Descripción
  - Autores
  - Otros módulos

### 📊 Contenido principal

- Panel con:
  - Gráficos en tiempo real de variables climáticas y energéticas
  - Tablas con historial de datos
  - Botones para descargar datos en CSV
  - Componentes interactivos de `shadcn/ui`:
    - Modales
    - Tarjetas
    - Botones
    - Dropdowns

### 📎 Pie de página

- Créditos y referencias institucionales

---

## 📥 Descarga de datos

Los usuarios pueden descargar los datos históricos de:

- **Sistema meteorológico**: temperatura, humedad, presión, radiación solar, etc.
- **Sistema de energía eléctrica**: voltaje, corriente, potencia, energía acumulada

### 📁 Formatos disponibles

- **CSV**: para análisis en Excel, Google Sheets o software estadístico

### 🧪 Ejemplo de uso en la interfaz

1. Seleccionar rango de fechas
2. Presionar botón **Descargar CSV** y seleecioinas la fecha de interés
3. El archivo se descarga automáticamente con los datos filtrados

---

## 🏗️ Estado del desarrollo

- ✅ Estructura base del proyecto
- ✅ Integración con Firebase
- ✅ Dashboard interactivo con gráficos y tablas
- ✅ Funcionalidad de descarga de datos
- ✅ Uso de componentes de `shadcn/ui` para interfaz profesional
- ✅ Integración completa con todos los nodos de sensores

---

**WeatherEnergyNode** — Proyecto de monitoreo inteligente de variables ambientales y energéticas con interfaz web profesional y descarga de datos.

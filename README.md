# Proyecto de Tesis — Sistema Integrado de Monitoreo Ambiental, Energético y Domótica UFPS

## 📘 Descripción general

Este proyecto corresponde al desarrollo de una **plataforma integral de monitoreo y control** para el edificio de Aulas Generales de la **Universidad Francisco de Paula Santander (UFPS)**.
Combina módulos de **estación meteorológica**, **monitoreo energético** y **domótica**, integrados a una **plataforma web interactiva** con visualización de datos en tiempo real.

---

## Componentes del sistema

### 1. Estación Meteorológica

* Microcontrolador: **ESP32**
* Sensores: temperatura, humedad, radiación solar, velocidad del viento, material particulado (PM1.0, PM2.5, PM4.0, PM10) e índice VOC.
* Funcionalidad: recolección y envío de datos a **Firebase Realtime Database**.
* Mecanismo de respaldo: almacenamiento temporal en memoria interna cuando no hay conexión a internet.

### 2. Módulo de Monitoreo Energético

* Microcontrolador: **ESP32**
* Sensor: medidor Eastron SDM630MTC (RS485)
* Funcionalidad: medición de variables eléctricas del edificio, envío a Firebase y almacenamiento local en caso de pérdida de conexión.

### 3. Módulos de Domótica

* Módulo **transmisor**: detecta presencia y envía señal.
* Módulo **receptor**: acciona dispositivos eléctricos del salón.
* Tecnología: comunicación inalámbrica entre módulos basados en ESP32.

### 4. Plataforma Web

* Framework: **Next.js**
* Estilo: **Tailwind CSS + shadcn/ui**
* Funcionalidades:

  * Visualización de datos meteorológicos y energéticos en tiempo real.
  * Gráficas interactivas con **Plotly.js**.
  * Panel principal de control (Dashboard).
  * Integración con Firebase Hosting y Database.

---

## Estructura del Repositorio

Cada subcarpeta incluye su propio `README.md` explicando su función y configuración.

```
firmware/          → Códigos de los ESP32
web_app/           → Página web del sistema
database/          → Estructura y configuración de Firebase
docs/              → Documentación técnica y diagramas
media/             → Imágenes, videos y capturas del sistema
```

---

##  Infraestructura general

El sistema opera bajo el siguiente flujo:

1. **Captura de datos** desde sensores (ambientales y eléctricos).
2. **Transmisión** mediante ESP32 hacia Firebase Realtime Database.
3. **Visualización y control** a través de la página web alojada en Firebase Hosting.
4. **Respaldo local** en memoria interna del ESP32 cuando no hay conexión.

---

## Tecnologías principales

* **ESP32** (Programado en PlatformIO / Arduino)
* **Firebase Realtime Database & Hosting**
* **Next.js + Tailwind CSS + shadcn**
* **Plotly.js** (gráficas interactivas)
* **C++ / JavaScript / HTML / CSS**

---

##  Autores

* Mayker Beltrán
  *Ingeniería Electrónica — Universidad Francisco de Paula Santander (UFPS)*
* Mayker Beltrán
  *Ingeniería Electrónica — Universidad Francisco de Paula Santander (UFPS)*
* Mayker Beltrán
  *Ingeniería Electrónica — Universidad Francisco de Paula Santander (UFPS)*
* Mayker Beltrán
  *Ingeniería Electrónica — Universidad Francisco de Paula Santander (UFPS)*

---

##  Licencia

Este proyecto se distribuye bajo la licencia **MIT**, permitiendo su uso académico y de investigación.

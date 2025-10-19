# Estación Meteorológica — weatherEnergyNode

**Carpeta:** `firmware/estacion_meteorologica/`  
**Propósito:** Firmware para el nodo de estación meteorológica basado en ESP32. Lee sensores ambientales cuyas variables sos material particulado, velocidad de viento, temperatura, humedad, radiación solar. Procesa y valida lecturas, almacena temporalmente en LittleFS cuando no hay conexión y sincroniza los datos a Firebase (Realtime Database).

---

## Contenido de la carpeta
```plaintext
.
├── .pio/                  # Archivos generados por PlatformIO (compilación, dependencias)
├── .vscode/              # Configuración de VS Code (opcional)
├── include/              # Cabeceras compartidas (.h)
├── lib/                  # Librerías locales empaquetadas
├── src/                  # Código fuente principal (.cpp)
├── test/                 # Pruebas unitarias (PlatformIO + Unity)
├── .gitignore            # Exclusión de archivos sensibles y temporales
└── platformio.ini        # Configuración del entorno PlatformIO
```


---

## Resumen funcional
- Inicializa y mantiene la conexión Wi-Fi.
- Lee sensores ambientales periódicamente: temperatura, humedad, VOC, PM, radiación solar, velovidad del viento.
- Guarda registros en **LittleFS** si la conexión a Firebase falla.
- Reintenta y sincroniza registros pendientes cuando la conexión se restablece.

---

## Hardware soportado (ejemplos)
- **Microcontrolador:** ESP32.
- **Sensores (ejemplos):**
  - SEN54
  - Apogee SP110
  - QS-FS201
  - 
![Diagrama de elementos ambientales](docs/Elementos/Elementos_ambiental.svg)

- Conversor análogo digital ADC1115
- Conexiones recomendadas:
  - I²C: SDA → pin I2C SDA del ESP32, SCL → pin I2C SCL. Usar resistencias pull-up si el módulo no las incluye.
  - Alimentación: respetar corriente y vooltajes de los sensores.
  - GND común.

> **Nota:** Verifica el datasheet de tu sensor para valores exactos de conexión y consumo.

---

## Requisitos de software
- Visual Studio Code + PlatformIO IDE (recomendado).
- PlatformIO Core (CLI) opcional: `pio`.
- Librerías (añadir en `lib_deps` en `platformio.ini`):
  - `mobizt/Firebase Arduino Client` (si usas Firebase).
  - `lorol/LittleFS_esp32` o `SPIFFS`.
  - `bblanchon/ArduinoJson`.
  - Librería del sensor (p. ej. `sensirion/Sensirion I2C SEN5X`).
  - `Adafruit Unified Sensor` (si aplica).

---

## Archivo de ejemplo: `platformio.ini`
```ini
[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino
monitor_speed = 115200

lib_deps =
  mobizt/Firebase Arduino Client@^4.4.14
  lorol/LittleFS_esp32@^1.0.6
  bblanchon/ArduinoJson@^6.18.5
  sensirion/Sensirion I2C SEN5X@^1.0.0

; Ajustar particiones si requiere LittleFS o OTA
; board_build.partitions = default
```
## 🔐 Manejo de credenciales (importante)

- **NO versionar archivos con credenciales reales.**
- Añadir a `.gitignore` los archivos que contengan datos sensibles, por ejemplo:

  ```gitignore
  src/secrets.h
  config_local.json
  ```
  ## 📤 Formato de datos enviado a Firebase (ejemplo)

Se recomienda enviar un **objeto JSON por medición**, incluyendo una marca de tiempo en formato **ISO 8601** (`YYYY-MM-DD HH:mm:ss`) o **epoch**. Esto facilita la trazabilidad, orden cronológico y compatibilidad con bases de datos.

### 🧾 Ejemplo de payload

```json
{
  "AmbientHumidity": "47.35",
  "AmbientTemperature": "33.97",
  "Irradiance": 0,
  "MassConcentrationPm10p0": 1.8,
  "MassConcentrationPm1p0": 1.7,
  "MassConcentrationPm2p5": 1.8,
  "MassConcentrationPm4p0": 1.8,
  "SolarRadiationVoltage": 0,
  "VocIndex": "59.00",
  "WindSpeed": 0.080051,
  "timestamp": "2025-10-19 12:32:09"
}
```
## 💾 Almacenamiento local (LittleFS)

- Guardar registros en formato **JSON**, ya sea línea por línea o como archivos de logs rotativos.
- Política sugerida:
  - Máximo **N registros** o **M MB**.
  - Envío de registros desde el más antiguo al más reciente al reconectar.
  - Confirmación de entrega antes de borrar localmente.
  - Implementar compactación periódica si el espacio es limitado.

---

## 🔄 Flujo de operación (resumen)

1. **Arranque**  
   Inicializar hardware, buses I²C, sistema de archivos (FS) y conexión Wi-Fi.

2. **Sincronización**  
   Si hay conexión Wi-Fi → sincronizar registros pendientes almacenados localmente.

3. **Ciclo de muestreo**  
   Leer sensores → aplicar filtrado → validar datos → almacenar y/o emitir.

4. **Envío a Firebase**  
   Si el envío falla → guardar localmente y reintentar con política de *backoff* exponencial.

5. **Opcional**  
   Exponer un endpoint local para configuración o diagnóstico.

---

## 🧪 Compilar y flashear

### Desde PlatformIO (Visual Studio Code)

1. Abrir la carpeta `firmware/estacion_meteorologica` en VS Code.
2. Ir a PlatformIO → **Build (✓)** para compilar.
3. Conectar el ESP32 por USB → **Upload (→)** para subir el firmware.
4. Abrir **Monitor** para revisar los logs en tiempo real.

## 🧪 Tests y CI recomendados

### 🧪 Tests unitarios con PlatformIO + Unity (`test/`)

- Parser de mensajes del sensor
- Serialización JSON
- Lógica de reintentos y almacenamiento

### ⚙️ CI con GitHub Actions

- Crear un workflow que ejecute `pio run` en cada Pull Request (PR)
- Opcional:
  - Checks de estilo con `clang-format`
  - Ejecución automática de tests unitarios

---

## 🐞 Troubleshooting (problemas habituales)

### 🔌 Sensor no responde (I²C)

- Verificar conexiones **SDA/SCL** y **GND común**
- Comprobar resistencias **pull-up**
- Usar **scanner I²C** para confirmar dirección del dispositivo

### 📉 Lecturas erráticas o fuera de rango

- Aplicar filtros (ej. **mediana**)
- Comprobar calibración de sensores

### 🔐 Conexión a Firebase falla (TLS)

- Verificar **reloj del dispositivo (NTP)** — una fecha incorrecta rompe TLS
- Confirmar valores de `FIREBASE_HOST` y credenciales

### 💾 LittleFS lleno

- Implementar **rotación de archivos** y límites de almacenamiento
- Registrar y revisar logs de uso del sistema de archivos

### 🚫 Upload/Flasheo falla

- Revisar **drivers USB**, puerto correcto y permisos (Linux/Mac)
- Probar con `esptool` si persiste el problema

---

## 🧾 Buenas prácticas

- Mantener **separación de capas**: sensores, comunicación, almacenamiento
- Usar **retries con backoff exponencial** para operaciones de red
- Manejar errores de forma explícita y registrar con niveles (`DEBUG`, `INFO`, `WARN`, `ERROR`)
- No bloquear el **loop principal**; usar timers o tareas FreeRTOS para muestreo y envío
- Documentar pines y conexiones en `docs/`


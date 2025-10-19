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

build_flags =
  -D APP_NAME=\"EstacionMeteorologica\"
  -D WIFI_SSID=\"YOUR_SSID\"
  -D WIFI_PASSWORD=\"YOUR_PASSWORD\"
  -D FIREBASE_HOST=\"your-project.firebaseio.com\"
  -D FIREBASE_AUTH=\"<NO_COMMITAR_AQUI>\"

; Ajustar particiones si requiere LittleFS o OTA
; board_build.partitions = default

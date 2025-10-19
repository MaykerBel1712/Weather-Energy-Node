Esta carpeta contiene el código fuente para los microcontroladores ESP32 del proyecto.  
Incluye las siguientes subcarpetas:
- `estacion_meteorologica/`: Código de la estación meteorológica.
- `monitoreo_energia/`: Código para el monitoreo energético.
- `domotica/`: Código relacionado con el control y automatización.
  
Contiene todo el código que se ejecuta en los microcontroladores (principalmente ESP32) del proyecto: estación meteorológica, monitoreo de energía y módulos de domótica. Este README.md documenta la estructura, dependencias, configuración, compilación, despliegue, buenas prácticas y resolución de problemas para los subproyectos de firmware.

📁 Estructura recomendada
```
firmware/
├── estacion_meteorologica/
│   ├── src/
│   │   ├── main.cpp
│   │   ├── sensores.cpp
│   │   └── firebase.cpp
│   ├── include/
│   ├── lib/
│   ├── test/
│   ├── platformio.ini
│   └── README.md
│
├── monitoreo_energia/
│   ├── src/
│   │   ├── main.cpp
│   │   ├── eastron.cpp
│   │   └── firebase.cpp
│   ├── include/
│   ├── lib/
│   ├── platformio.ini
│   └── README.md
│
└── domotica/
    ├── modulo_receptor/
    ├── modulo_transmisor/
    └── README.md
```

## 🧭 Resumen de responsabilidades por subproyecto

- **`estacion_meteorologica/`**  
  Lectura y procesamiento de sensores ambientales (ej. SEN54), muestreo, filtrado y envío de datos a Firebase.  
  Almacenamiento temporal en LittleFS cuando no hay conectividad.

- **`monitoreo_energia/`**  
  Comunicación RS485/Modbus con medidor Eastron SDM630MTC; lectura de magnitudes eléctricas, cálculo/registro y envío a Firebase.

- **`domotica/`**  
  Comunicación entre módulos transmisor/receptor, gestión de actuadores (relés, PWM), reglas locales y comunicación con la red.

---

## 🛠 Requisitos (software & hardware)

### 💻 Software recomendado

- Visual Studio Code + extensión PlatformIO IDE  
- PlatformIO Core (`pio`) para CLI (opcional)  
- Git  
- (Opcional) `esptool.py` para flasheos manuales

### 📚 Librerías sugeridas (`lib_deps`)

- `mobizt/Firebase Arduino Client Library for ESP8266 and ESP32`  
- `lorol/LittleFS_esp32` o `SPIFFS`  
- `ArduinoJson`  
- `Adafruit Unified Sensor` (si aplica)  
- `sensirion/Sensirion I2C SEN5X` (SEN54)  
- `ModbusMaster` (o equivalente) para RS485/Modbus  
- `AsyncTCP` / `ESPAsyncWebServer` (si se ofrece interfaz web/OTA)

### 🔌 Hardware típico

- ESP32 (modelo según disponibilidad y uso)  
- Sensor SEN54 (VOC, PM, humedad, temperatura)  
- Eastron SDM630MTC (salida RS485)  
- Conversor RS485 ↔ TTL / USB-RS485  
- Componentes de alimentación y protección (reguladores, divisores, optoaisladores si aplica)

## 🔐 Manejo de credenciales y seguridad

- **No subir credenciales, claves o `serviceAccount` al repositorio público.**
- Mantener un archivo de ejemplo (`config_example.h` o `config_example.json`) con *placeholders* y documentar el formato.
- Añadir a `.gitignore` los archivos que contengan credenciales:

  ```gitignore
  /firmware/*/src/secrets.h
  /firmware/*/src/config_local.json
- Documentar en cada subproyecto dónde colocar las credenciales (p. ej. src/secrets.h) y cómo formatearlas.

## 🧩 Archivos y módulos clave (qué hacen)

- `src/main.cpp` — Inicialización del hardware, conectividad y loop/RTOS principal.
- `src/sensores.*` — Lectura, calibración y filtrado de sensores ambientales.
- `src/eastron.*` — Implementación de lectura Modbus/RS485 y parsing de registros.
- `src/firebase.*` — Funciones de conexión, reintentos y escritura/lectura en Firebase.
- `include/` — Cabeceras y definiciones compartidas (pinout, estructuras).
- `lib/` — Librerías locales empaquetadas.
- `test/` — Pruebas unitarias (PlatformIO + Unity).
- `platformio.ini` — Configuración del entorno y dependencias.

---

## 📦 Compilar y subir

### En Visual Studio Code (PlatformIO UI)

1. Abrir la carpeta del subproyecto (`firmware/estacion_meteorologica`)
2. Ir a PlatformIO → **Build (✓)** para compilar
3. Conectar el ESP32 por USB → **Upload (→)** para subir
4. Abrir **Monitor** para ver la salida serial

### 🖥️ En terminal (PlatformIO CLI)

```bash
cd firmware/estacion_meteorologica
pio run              # compilar
pio run -t upload    # compilar y subir
pio device monitor   # abrir monitor serial
# o con velocidad específica:
pio device monitor -b 115200
```

## 🔁 Almacenamiento local y sincronización

- Usar **LittleFS** para persistir mediciones cuando no hay red.
- Política recomendada: límite de almacenamiento (N registros o X MB) y orden por timestamp.
- Al restablecer la conexión: reenviar registros pendientes en orden cronológico y marcarlos/borrarlos tras confirmación.

---

## 🔌 Comunicación RS485 (Eastron SDM630MTC)

- Usar librería **Modbus** (por ejemplo `ModbusMaster`)
- Controlar pin **DE/RE** del transceiver: nivel alto para transmitir, bajo para recibir
- Configurar **baudrate**, **parity** y **timeouts** de acuerdo al manual del medidor
- Validar **CRC** y manejar reintentos/timeouts; introducir **delays** entre peticiones si el bus lo requiere

---

## 🔄 Actualizaciones OTA (opcional)

- Integrar `ArduinoOTA` o un servidor de actualización seguro (HTTPS + autenticación)

### Consideraciones

- Particiones (espacio para OTA)
- Seguridad: firma/validación del binario
- Mecanismo de rollback si la actualización falla

---

## 🧪 Tests y CI

### 🧪 Tests

- Usar **PlatformIO + Unity** para unit tests en `test/`
- Priorizar pruebas para:
  - Parsing Modbus
  - Serialización/deserialización JSON
  - Lógica de reintentos y compactación de registros

### ⚙️ CI (recomendado)

- Crear workflow en `.github/workflows/ci.yml` que ejecute `pio run` en cada subproyecto para validar compilación en PRs
- Añadir checks opcionales: `clang-format`, `linting` y ejecución de tests

---

## 🐞 Troubleshooting (problemas comunes)

- **Errores de dependencias**: borrar `.pio/libdeps` y recompilar; fijar versiones en `lib_deps`
- **TLS/HTTPS falla al conectar a Firebase**: verificar fecha/hora del dispositivo (NTP)
- **Lecturas Modbus erráticas**: revisar DE/RE, GND común, niveles lógicos, CRC, delays entre peticiones y baudrate
- **Particiones insuficientes**: ajustar `board_build.partitions` en `platformio.ini`
- **Upload falla**: revisar drivers USB, permisos y puerto COM; probar con `esptool` si es necesario

---

## ✅ Checklist antes de un Pull Request (PR)

- [ ] El subproyecto compila localmente (`pio run`)
- [ ] No se incluyen credenciales en el commit
- [ ] `platformio.ini` actualizado si se añadieron dependencias
- [ ] README del subproyecto actualizado y coherente
- [ ] Tests añadidos/actualizados cuando aplique
- [ ] Diagramas de conexión actualizados en `docs/diagramas/` cuando cambie hardware

---

## 🧾 Buenas prácticas de desarrollo

- Separar responsabilidades: adquisición, comunicación, almacenamiento y lógica
- Documentar APIs públicas en `.h` (descripción, parámetros, retornos)
- Implementar políticas de reintentos con **backoff exponencial** para operaciones de red
- Registrar logs con niveles (`DEBUG`, `INFO`, `WARN`, `ERROR`) y posibilidad de reducir verbosidad en producción
- Mantener formato y estilo de código consistentes (usar `clang-format` o similar)

---



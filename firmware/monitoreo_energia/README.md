# Monitoreo de Energía — weatherEnergyNode

**Carpeta:** `firmware/monitoreo_energia/`  
**Propósito:** Firmware para el nodo de monitoreo energético basado en ESP32. Lee un medidor eléctrico (Eastron SDM630MTC) mediante RS485/Modbus, procesa lecturas (voltaje, corriente, potencia, energía entre otras), almacena temporalmente en LittleFS y sincroniza con Firebase (Realtime Database).

---
## 📁 Contenido 
```plaintext
.
├── .pio/                 # Archivos generados por PlatformIO (compilación, dependencias)
├── .vscode/              # Configuración de VS Code (opcional)
├── include/              # Cabeceras compartidas (.h)
├── lib/                  # Librerías locales empaquetadas
├── src/                  # Código fuente principal (.cpp)
├── test/                 # Pruebas unitarias (PlatformIO + Unity)
├── .gitignore            # Exclusión de archivos sensibles y temporales
└── platformio.ini        # Configuración del entorno PlatformIO
```

---

## 🔎 Resumen funcional
- Comunica con el medidor Eastron SDM630MTC (u otro compatible Modbus RTU) vía RS485.
- Solicita registros periódicamente (tensión, corriente, potencia instantánea, energía acumulada, factor de potencia, etc.).
- Guarda lecturas en LittleFS si falla la conexión a la nube.
- Envía datos a Firebase, con reintentos y política de backoff.
- Opcional: expone endpoint local para diagnóstico y configuración.

---

## 🛠 Requisitos (software & librerías)

### Software recomendado
- Visual Studio Code + PlatformIO IDE.
- PlatformIO Core (`pio`) opcional.
- Git.

### Librerías sugeridas (`lib_deps`)
- `paulstoffregen/ModbusMaster` (o `ArduinoModbus` / `SimpleModbusMaster` según preferencia)
- `mobizt/Firebase Arduino Client` (si se usa Firebase)
- `lorol/LittleFS_esp32` o `SPIFFS`
- `bblanchon/ArduinoJson`
- `AsyncTCP` / `ESPAsyncWebServer` (opcional, para interfaz/OTA)

> Fija versiones en `platformio.ini` para evitar rupturas futuras.

---

## 🔌 Hardware y conexiones RS485
- **Medidor:** Eastron SDM630MTC (RS485).
- **Transceiver RS485:** módulo MAX485, ADM485 u otro compatible.
- **Conexiones básicas:**
  - A (A) ↔ A del transceiver
  - B (B) ↔ B del transceiver
  - GND común entre ESP32 y transceiver
  - DE/RE del transceiver controlado por GPIO del ESP32 (por ejemplo `GPIO_NUM`) — alto = transmisión, bajo = recepción
- **Alimentación:** respetar tensiones y aislar si es necesario.

---

## ⚙️ Ejemplo de `platformio.ini`
```ini
[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino
monitor_speed = 115200

lib_deps =
  paulstoffregen/ModbusMaster@^2.0.4
  mobizt/Firebase Arduino Client@^4.4.14
  lorol/LittleFS_esp32@^1.0.6
  bblanchon/ArduinoJson@^6.18.5

; Ajusta board y particiones según necesidad
```
## 📐 Configuración Modbus — parámetros típicos

Estos parámetros deben ajustarse según el modelo del medidor ( **Eastron SDM630MTC**) y las condiciones del bus RS485.

- **ID del dispositivo (slave)**: `1` (configurable según el medidor)
- **Baudrate**: `9600` (o `2400` / `19200` según el dispositivo)
- **Paridad**: `Even` / `None` (según el medidor)
- **Stop bits**: `1`
- **Timeouts**:
  - Configurar timeout de lectura apropiado (ej. `200–500 ms`)
  - Implementar reintentos en caso de fallo
- **Registros a leer**:
  - Usar direcciones según el manual del Eastron
  - Ejemplos comunes:
    - Tensiones por fase
    - Corrientes
    - Potencia activa
    - Energía total acumulada

> Se recomienda validar el CRC de cada respuesta y aplicar **delays entre peticiones** si el bus lo requiere para evitar colisiones o lecturas incompletas.

## 🧾 Formato de datos enviado a Firebase (ejemplo)

Se recomienda estructurar los datos por `timestamp`, enviando cada medición como un objeto JSON que contenga los registros relevantes del dispositivo.

### 📦 Estructura sugerida

```json
{
  "deviceId": "medidor_01",
  "timestamp": "2025-10-19T12:30:00",
  "data": {
    "V1": "0x0000",
    "V2": "0x0002",
    "V3": "0x0004",

    "I1": "0x0006",
    "I2": "0x0008",
    "I3": "0x000A",
    "IN": "0x00E0",

    "PA1": "0x000C",
    "PA2": "0x000E",
    "PA3": "0x0010",
    "PAT": "0x0034",

    "VA1": "0x0012",
    "VA2": "0x0014",
    "VA3": "0x0016",
    "VAT": "0x0038",

    "PR1": "0x0018",
    "PR2": "0x001A",
    "PR3": "0x001C",
    "PRT": "0x003C",

    "FP1": "0x001E",
    "FP2": "0x0020",
    "FP3": "0x0022",
    "FPT": "0x003E",

    "Prom_volts_L_N": "0x002A",
    "Prom_I_L": "0x002E",
    "Suma_I_L": "0x0030",

    "F": "0x0046",

    "ETI": "0x0048",
    "ETE": "0x004A",
    "kVArhTI": "0x004C",
    "kVArhTE": "0x004E",

    "T_KVAh": "0x0050",
    "T_Ah": "0x0052",

    "Demanda_PTS_W": "0x0054",
    "Demanda_Max_PTS_VA": "0x0056",
    "Demanda_TS_VA": "0x0064",

    "V_1_2": "0x00C8",
    "V_2_3": "0x00CA",
    "V_3_1": "0x00CC",
    "V_prom_L_L": "0x00CE",

    "VTHD_LN_1": "0x00EA",
    "VTHD_LN_2": "0x00EC",
    "VTHD_LN_3": "0x00EE",
    "Prom_VTHD_LN": "0x00F8",

    "ITHD_1": "0x00F0",
    "ITHD_2": "0x00F2",
    "ITHD_3": "0x00F4",
    "ITHD_Prom": "0x00FA",

    "Demanda_I1": "0x0102",
    "Demanda_I2": "0x0104",
    "Demanda_I3": "0x0106",
    "Demanda_Max_I1": "0x0108",
    "Demanda_Max_I2": "0x010A",
    "Demanda_Max_I3": "0x010C",

    "VTHD_1_2": "0x014E",
    "VTHD_2_3": "0x0150",
    "VTHD_3_1": "0x0152",
    "Prom_VTHD_L_L": "0x0154",

    "Tkwh": "0x0156",
    "Tkvarh": "0x0158"
  }
}

```
## 💾 Almacenamiento local (LittleFS)

- Guardar mensajes en formato **JSON**, ya sea como líneas independientes o mediante archivos rotativos.
- **Política recomendada**:
  - Límite en número de registros (ej. `2000`) o tamaño total (ej. `2 MB`)
  - Reintentos periódicos de envío
  - Confirmación de entrega antes de borrar localmente
  - Orden de envío: del **más antiguo al más reciente**

> Se recomienda implementar compactación o rotación si el espacio disponible es limitado, y registrar métricas de uso del sistema de archivos.

---

## 🧪 Compilar y flashear

### Desde Visual Studio Code (PlatformIO UI)

1. Abrir la carpeta `firmware/monitoreo_energia`
2. Ir a PlatformIO → **Build (✓)** para compilar
3. Conectar el ESP32 por USB → **Upload (→)** para flashear
4. Abrir **Monitor serial** para revisar los logs en tiempo real

## 🔁 Estrategia de reintentos y backoff

- Reintento simple con límite (ej. **3 intentos**) para lecturas Modbus
- Para envío a Firebase, usar **backoff exponencial**:
  - Ejemplo: `1s`, `2s`, `4s`, `8s`
  - Máximo: **5 intentos**
- Marcar y persistir errores no recuperables para análisis posterior (logs)

---

## 🔧 Depuración y logs

- Implementar niveles de log: `DEBUG`, `INFO`, `WARN`, `ERROR`
- Logs de Modbus:
  - Mostrar peticiones/respuestas en hexadecimal **solo en nivel DEBUG**
- Contabilizar métricas clave:
  - Número de lecturas
  - Fallos Modbus
  - Fallos de envío
  - Uso y tamaño del sistema de archivos (FS)

---

## ⚠️ Seguridad y protección

- Evitar exponer credenciales por endpoints no autenticados
- Proteger acceso físico a la interfaz RS485 si está en instalaciones públicas
- Para instalaciones críticas:
  - Considerar **aislamiento galvánico** entre el medidor y el ESP32

---

## 🐞 Troubleshooting (problemas comunes)

### 📡 No hay respuesta del medidor

- Revisar **ID del dispositivo** y conexiones **A/B**
- Confirmar **GND común**
- Verificar **Baudrate**, **Parity** y **Stop bits**
- Probar con software o convertidor RS485 externo

### 🔄 Lecturas corruptas / CRC falla

- Verificar cableado, terminación del bus y resistencias de pull-up / terminadores

### 📉 Datos inconsistentes

- Aumentar **timeouts**
- Añadir **reintentos**
- Validar rangos físicos esperados

### 💾 LittleFS lleno

- Implementar **rotación** y limpieza automática
- Aumentar particiones si es necesario

### 🔐 Upload a Firebase falla (TLS)

- Verificar **reloj del dispositivo (NTP)** y credenciales

### 🔁 Problemas de DE/RE (transceiver RS485)

- Asegurar control correcto del pin **DE/RE**
- Respetar tiempos entre toggle y transmisión

---

## ✅ Checklist antes de abrir un Pull Request (PR)

- [ ] Compila correctamente (`pio run`)
- [ ] No se incluyen credenciales en el commit
- [ ] `platformio.ini` actualizado si se agregan librerías
- [ ] Documentación del subproyecto actualizada
- [ ] Tests añadidos/actualizados (si aplica)
- [ ] Diagrama de conexión en `docs/` actualizado si hubo cambios de hardware

---

## 🧾 Tests y CI

### 🧪 Tests unitarios con PlatformIO + Unity

- Parser de respuestas Modbus
- Serialización JSON
- Lógica de reintentos


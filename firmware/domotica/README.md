# Domótica — weatherEnergyNode

**Carpeta:** `firmware/domotica/`  
**Propósito:** Firmware para el subsistema de domótica del proyecto. Está compuesto por **dos módulos**:

- `modulo_transmisor/` — detector de presencia (PIR + radar).  
- `modulo_receptor/` — actuador que conmuta cargas mediante **3 SSR de 25 A** instalados en el tablero del salón.

**Comunicación entre módulos:** Bluetooth Low Energy (BLE).  

---

## 📁 Estructura

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
- **Transmisor (detector)**:
  - Lee señales de **PIR** y **sensor radar**.
  - Realiza filtrado y lógica de fusión ( PIR+radar para mayor certeza).
  - Envía evento(s) y estado por **BLE** al receptor.
  - Indicadores LED y botón de test/calibración.

- **Receptor (actuador)**:
  - Mantiene enlace BLE con el transmisor.
  - Recibe comandos / eventos y acciona los **3 SSR (25 A)** para conmutar cargas del salón.
  - Implementa seguridad básica: validación origen, ACKs y límites.
  - Proporciona modo manual (botón local) y estado de salida.

---

## Hardware y conexiones (puntos claves)

### Sensores (transmisor)
- **PIR**: detecta cambios de radiación térmica.
- **Radar**: detecta movimiento incluso detrás de obstáculos y con mejor sensibilidad para movimientos lentos.
- Uso combinado:
  - PIR confirma presencia humana por calor.
  - Radar detecta movimiento hasta en condiciones donde PIR falla (por ejemplo: movimiento lento o detrás de vidrio).
  - Lógica típica: `presence = (PIR && radar_recent) || (radar_strong && debounce)` para reducir falsos positivos.

### Actuadores (receptor)
- **3 x SSR (25 A)** instalados en el tablero para conmutar las cargas del salón (iluminación, ventilación, otro circuito).
- **Nota importante sobre SSRs**:
  - Elegir SSRs adecuados al tipo de carga (resistiva vs inductiva). Para cargas inductivas/motores conviene SSRs con especificaciones y/o usar contactores mecánicos.
  - SSR tipo **zero-cross**: recomendado para cargas resistivas (iluminación LED simple) — no sirve para control por fase (no dimming por ángulo de fase).
  - SSRs **disipan calor**: dimensionar disipadores y/o ventilación. Revisar la pérdida de tensión del SSR (typ. 1–2 V) y calcular disipación `P = V_drop * I`.
  - Asegurar que la SSR acepta **entrada de control a 3.3 V** (muchos aceptan 3–32 V). Si no, usar un driver (transistor/MOSFET o optoacoplador).
  - Proveer **fusibles/interruptores** y protección por canal en el tablero (cada SSR + carga con su protección).

### Alimentaciones y puesta a tierra
- **Cada SSR y cada carga** debe disponer de su alimentación y protección adecuada. Si las cargas son de red (mains), usar conductores con sección adecuada a la corriente esperada y protecciones diferenciales/termomagnéticas conforme a normativa local.
- **Conductor recomendado (orientativo):** para corrientes hasta 25 A se suele usar cableificación ≥ 2.5 mm²; por seguridad y según normativa local preferir 4 mm² para 25 A continuos especialmente si hay temperatura ambiente alta o conductores agrupados. Verifica normas eléctricas locales.
- **GND común de control:** Si el SSR requiere referencia común para la señal de control y el ESP32 comparte alimentación con el driver, conectar GND de control; si SSR entrada es aislada ópticamente, seguir las recomendaciones del fabricante.
- **Seguridad:** aislamiento galvánico, bornes bien aislados, canalización adecuada y señalización.

---

## Seguridad eléctrica (imprescindible)
- Trabajos en 110/220 V CA deben ser realizados por personal calificado.
- Instalar **fusibles/interruptores automáticos** por canal (dimensionados al consumo de la carga).
- Poner **protección diferencial (RCD)** en el tablero si hay exposiciones en salones.
- Usar **bornes y canalización** apropiada, y protección mecánica para los SSR.
- Añadir **MOVs / supresores** si hay riesgo de sobretensiones en cargas inductivas.
- Documentar esquemas y etiquetar cada canal en el tablero.

---

## BLE — diseño de comunicación (GATT + recomendaciones)

### Roles
- **Transmisor (detector)** → **Periférico (advertising)** o periférico con servicio GATT.  
- **Receptor (actuador)** → **Central** que se conecta al periférico y suscribe/lee características.

### Recomendación operativa
- Usar **advertising** para eventos puntuales (muy bajo consumo y sin conexión) o GATT con notificaciones si se necesita ACK y control bidireccional.
- Para confiabilidad y ACKs usar **GATT + Notificaciones** (conexión establecida entre módulos).

## 🔐 Seguridad BLE

- Usar **emparejamiento y bonding** si es necesario, para evitar conexiones indeseadas o no autorizadas.
- Minimizar la exposición de **characteristics de escritura** sin autenticación.
- Considerar el uso de **encriptación BLE Secure Connections** si existe riesgo físico de manipulación del dispositivo.

> Se recomienda revisar las políticas de seguridad del stack BLE utilizado (ej. NimBLE, Bluedroid) y validar que los permisos de acceso estén correctamente configurados para cada characteristic.

## 🧠 Lógica sugerida de detección (PIR + radar)

### 🔧 Variables

- `pir_raw` (boolean)
- `radar_raw` (boolean)
- `last_pir_time`
- `last_radar_time`

---

### 📋 Algoritmo básico

1. **Leer sensores**
2. **Aplicar debounce**  
   Ignorar cambios menores a `T_debounce` (ej. `200–500 ms`)
3. **Confirmación de presencia**
   - Si `pir_raw == true` **y** `radar_raw == true` → **presencia confirmada** (alta confianza)
   - Si solo `radar_raw == true` → marcar como `possible_presence`, esperar ventana `T_confirm` (ej. `2–5 s`) para confirmar
   - Si solo `pir_raw == true` → confirmar si `radar_raw` reporta movimiento en ventana corta (reduce falsos positivos por calor ambiental)
4. **Acción tras detección**
   - Si presencia confirmada:
     - Enviar evento BLE
     - Activar salida local (ej. LED)
     - Si receptor responde `ACK` → accionar SSRs según políticas
5. **Auto-off por inactividad**
   - Apagar salidas después de `N` minutos sin eventos

---

> Esta lógica combina detección térmica (PIR) y microondas (radar) para mejorar la confiabilidad en entornos con ruido térmico o movimiento leve. Se recomienda ajustar `T_debounce` y `T_confirm` según el entorno físico y el tipo de aplicación.

## ✅ Pruebas y validación

### 🧪 Tests unitarios (PlatformIO + Unity)

- Parser de payload BLE
- Lógica de debounce y fusión PIR + radar
- Simulación de reintentos y recepción de ACK

### 🔧 Tests hardware

- Validar que los SSRs cortan correctamente y soportan la carga medida sin sobrecalentamiento
- Medir corriente de entrada al SSR LED para verificar si la salida GPIO es suficiente

### 🧪 Pruebas de campo

- Colocar el sistema en condiciones reales del salón para ajustar sensibilidad y temporizadores
- Verificar alcance BLE y efectos de obstáculos físicos

---

## 🐞 Troubleshooting (problemas frecuentes)

### 📡 No hay conexión BLE

- Verificar que ambos módulos usen el mismo canal y stack compatible (NimBLE vs Bluedroid)
- Comprobar emparejamiento y bonding

### 🚨 Falsos positivos en detección

- Ajustar sensibilidad del PIR
- Refinar lógica de confirmación combinada con radar
- Agregar ventana temporal de confirmación y filtrado por duración de evento

### 🔥 SSRs se calientan

- Verificar caída de tensión (`V_drop`) y corriente real
- Añadir disipador térmico y/o ventilación
- Confirmar que el SSR sea adecuado para el tipo de carga (motor, luminaria, etc.)

### ⚡ Relés no conmutan con GPIO 3.3 V

- Medir corriente y tensión en la entrada del SSR
- Si es insuficiente, añadir driver (transistor u optoacoplador)

### 📶 Interferencias en radar por señales eléctricas

- Separar cables de señal de los conductores de potencia
- Usar apantallamiento si es necesario

---

## 📋 Checklist antes de PR / despliegue

- [ ] Compila localmente ambos módulos (`pio run`)
- [ ] Las señales de control del SSR han sido verificadas con osciloscopio o multímetro
- [ ] Cada SSR cuenta con protección (fusible o breaker) en el tablero
- [ ] Documentación de conexión subida a `docs/diagramas/`
- [ ] Tests unitarios básicos implementados
- [ ] Procedimiento de seguridad eléctrica documentado y revisado por técnico

---

## 📚 Recursos y referencias

- Datasheets de sensores PIR y radar (colocar enlaces en `docs/diagramas/`)
- Datasheet del SSR elegido (entrada de control, caída de tensión, corriente máxima, disipación)
- Documentación oficial de [NimBLE-Arduino](https://github.com/h2zero/NimBLE-Arduino) y ejemplos BLE GATT
- Normativa eléctrica local para dimensiones de conductor y protecciones

#include <SoftwareSerial.h>
// Código funcional para comunicarse con el medidor Eastron SDM630Modbus usando ESP32 y MAX485
// Configuración: baudrate 9600, paridad none, stop bits 1, dirección del dispositivo 001

#include <ModbusMaster.h>

// Configuración de pines del ESP32 para el módulo MAX485
#define MAX485_DE 18 // Pin DE del MAX485
#define RXD2 16 // RX2 del ESP32
#define TXD2 17 // TX2 del ESP32

// Crear instancia para el maestro Modbus
ModbusMaster node;

// Función para habilitar transmisión en MAX485
void preTransmission() {
  digitalWrite(MAX485_DE, 1);
}

// Función para habilitar recepción en MAX485
void postTransmission() {
  digitalWrite(MAX485_DE, 0);
}

// Estructura para almacenar las variables
struct ModbusVariable {
  const char* name;
  uint16_t address;
  float value;
};

// Lista de variables a leer
ModbusVariable variables[] = {
  {"V1", 0x0000, 0.0},
  {"V2", 0x0002, 0.0},
  {"V3", 0x0004, 0.0},

  {"I1", 0x0006, 0.0},
  {"I2", 0x0008, 0.0},
  {"I3", 0x000A, 0.0},
  {"IN", 0x00E0, 0.0},

  {"PA1", 0x000C, 0.0},
  {"PA2", 0x000E, 0.0},
  {"PA3", 0x0010, 0.0},
  {"PAT", 0x0034, 0.0},

  {"VA1", 0x0012, 0.0},
  {"VA2", 0x0014, 0.0},
  {"VA3", 0x0016, 0.0},
  {"VAT", 0x0038, 0.0},

  {"PR1", 0x0018, 0.0},
  {"PR2", 0x001A, 0.0},
  {"PR3", 0x001C, 0.0},
  {"PRT", 0x003C, 0.0},

  {"FP1", 0x001E, 0.0},
  {"FP2", 0x0020, 0.0},
  {"FP3", 0x0022, 0.0},
  {"FPT", 0x003E, 0.0},

  {"Prom_volts_L_N", 0x002A, 0.0},
  {"Prom_I_L", 0x002E, 0.0},
  {"Suma_I_L", 0x0030, 0.0},

  {"F", 0x0046, 0.0},

  {"ETI", 0x0048, 0.0},
  {"ETE", 0x004A, 0.0},
  {"kVArhTI", 0x004C, 0.0},
  {"kVArhTE", 0x004E, 0.0},

  {"T_KVAh", 0x0050, 0.0},
  {"T_Ah", 0x0052, 0.0},

  {"Demanda_PTS_W", 0x0054, 0.0},
  {"Demanda_Max_PTS_VA", 0x0056, 0.0},
  {"Demanda_TS_VA", 0x0064, 0.0},

  {"V_1_2", 0x00C8, 0.0},
  {"V_2_3", 0x00CA, 0.0},
  {"V_3_1", 0x00CC, 0.0},
  {"V_prom_L_L", 0x00CE, 0.0},

  {"VTHD_LN_1", 0x00EA, 0.0},
  {"VTHD_LN_2", 0x00EC, 0.0},
  {"VTHD_LN_3", 0x00EE, 0.0},
  {"Prom_VTHD_LN", 0x00F8, 0.0},

  {"ITHD_1", 0x00F0, 0.0},
  {"ITHD_2", 0x00F2, 0.0},
  {"ITHD_3", 0x00F4, 0.0},
  {"ITHD_Prom", 0x00FA, 0.0},

  {"Demanda_I1", 0x0102, 0.0},
  {"Demanda_I2", 0x0104, 0.0},
  {"Demanda_I3", 0x0106, 0.0},
  {"Demanda_Max_I1", 0x0108, 0.0},
  {"Demanda_Max_I2", 0x010A, 0.0},
  {"Demanda_Max_I3", 0x010C, 0.0},

  {"VTHD_1_2", 0x014E, 0.0},
  {"VTHD_2_3", 0x0150, 0.0},
  {"VTHD_3_1", 0x0152, 0.0},
  {"Prom_VTHD_L_L", 0x0154, 0.0},

  {"Tkwh", 0x0156, 0.0},
  {"Tkvarh", 0x0158, 0.0}
};

const int numVariables = sizeof(variables) / sizeof(variables[0]);

void setup() {
  // Configuración de los pines del MAX485
  pinMode(MAX485_DE, OUTPUT);

  // Habilitar recepción al inicio
  digitalWrite(MAX485_DE, 0);

  // Inicializar comunicación serial para el módulo MAX485
  Serial2.begin(9600, SERIAL_8N1, RXD2, TXD2);

  // Configuración del maestro Modbus
  node.begin(1, Serial2); // Dirección Modbus: 1
  node.preTransmission(preTransmission);
  node.postTransmission(postTransmission);

  // Inicializar monitor serial
  Serial.begin(9600);
  Serial.println("Iniciando comunicación con el medidor SDM630Modbus...");
}

void loop() {
  for (int i = 0; i < numVariables; i++) {
    uint8_t result = node.readInputRegisters(variables[i].address, 2); // Leer 2 registros (float IEEE 754)

    if (result == node.ku8MBSuccess) {
      uint32_t data = ((uint32_t)node.getResponseBuffer(0) << 16) |
                      (uint32_t)node.getResponseBuffer(1);
      variables[i].value = *(float*)&data;

      // Mostrar el resultado en el monitor serial
      Serial.print(variables[i].name);
      Serial.print(": ");
      Serial.print(variables[i].value);
      Serial.println();
    } else {
      Serial.print("Error leyendo ");
      Serial.print(variables[i].name);
      Serial.print(". Código: ");
      Serial.println(result);
    }

    delay(10); // Esperar 10 ms antes de la siguiente lectura
  }
  Serial.println("--------------------------------");
  delay(10000); // Esperar 1 segundo antes de repetir las lecturas
}


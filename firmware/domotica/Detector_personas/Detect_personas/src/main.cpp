#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEScan.h>
#include <BLEAdvertisedDevice.h>
#include <BLEClient.h>
#include <BLEAddress.h>

// UUIDs y nombre del receptor BLE
#define SERVICE_UUID        "12345678-1234-1234-1234-1234567890ab"
#define CHARACTERISTIC_UUID "12345678-1234-1234-1234-1234567890ab"
#define TARGET_NAME         "ESP32-BLE-Receptor"

#define SENSOR_1_PIN 34  // Infrarrojo
#define SENSOR_2_PIN 35  // RADAR digital


#define MUESTRAS 10
#define INTERVALO_MUESTRA 2000 // 2 segundos
#define INTERVALO_VERIFICACION 500 // ms entre verificaciones de sensor 1

bool estadoAnterior = false; // Guarda el estado anterior

// Variables globales para BLE
BLEAdvertisedDevice* myDevice = nullptr;
BLEClient* pClient = nullptr;
BLERemoteCharacteristic* pRemoteCharacteristic = nullptr;
bool connected = false;

// Clase para manejar los dispositivos anunciados durante el escaneo
class MyAdvertisedDeviceCallbacks : public BLEAdvertisedDeviceCallbacks {
  void onResult(BLEAdvertisedDevice advertisedDevice) {
    if (advertisedDevice.haveName() && advertisedDevice.getName() == TARGET_NAME) {
      Serial.println("Dispositivo BLE receptor encontrado, conectando...");
      myDevice = new BLEAdvertisedDevice(advertisedDevice);
      BLEDevice::getScan()->stop();
    }
  }
};

// Función para conectar al dispositivo BLE receptor
bool conectarBLE() {
  BLEDevice::init("");
  BLEScan* pScan = BLEDevice::getScan();
  pScan->setAdvertisedDeviceCallbacks(new MyAdvertisedDeviceCallbacks());
  pScan->setActiveScan(true);
  pScan->start(5, false); // Escanea por 5 segundos

  unsigned long startTime = millis();
  while (myDevice == nullptr && millis() - startTime < 6000) {
    delay(100);
  }

  if (myDevice != nullptr) {
    pClient = BLEDevice::createClient();
    if (pClient->connect(myDevice)) {
      Serial.println("Conectado al servidor BLE");
      BLERemoteService* pRemoteService = pClient->getService(SERVICE_UUID);
      if (pRemoteService) {
        pRemoteCharacteristic = pRemoteService->getCharacteristic(CHARACTERISTIC_UUID);
        if (pRemoteCharacteristic) {
          connected = true;
          return true;
        }
      }
      Serial.println("No se pudo obtener el servicio o la característica BLE");
      pClient->disconnect();
    } else {
      Serial.println("No se pudo conectar al servidor BLE");
    }
  } else {
    Serial.println("No se encontró el dispositivo BLE receptor");
  }
  connected = false;
  return false;
}

// Función para enviar datos por BLE
void enviarPorBLE(const char* valor) {
  if (!connected) {
    Serial.println("Intentando reconectar BLE...");
    if (!conectarBLE()) {
      Serial.println("No se pudo establecer conexión BLE para enviar datos.");
      return;
    }
  }
  if (pRemoteCharacteristic) {
    pRemoteCharacteristic->writeValue(valor);
    Serial.print("Valor enviado por BLE: ");
    Serial.println(valor);
  } else {
    Serial.println("Característica BLE no disponible.");
  }
}

// Inicialización del sistema
void setup() {
  Serial.begin(115200);

  pinMode(SENSOR_1_PIN, INPUT_PULLUP);
  pinMode(SENSOR_2_PIN, INPUT_PULLUP);

  Serial.println("Sistema iniciado. Intentando conectar BLE...");
  conectarBLE();
  Serial.println("Esperando activación del sensor infrarrojo...");
}

void loop() {
  // Espera a que el sensor 1 (PIR) se active en alto
  if (digitalRead(SENSOR_1_PIN) == HIGH) {
    Serial.println("Sensor 1 (PIR) activado.");
    for (int j = 0; j < 15; j++)
    {
      delay(1000);
      Serial.print(j);
    }
    
     Serial.println("Iniciando verificación RADAR...");
    int muestrasAltas = 0;
    for (int i = 0; i < MUESTRAS; i++) {
      int pir = digitalRead(SENSOR_2_PIN);
      Serial.print("Muestra ");
      Serial.print(i);
      Serial.print(": ");
      Serial.println(pir == HIGH ? "Presencia detectada" : "Sin presencia");
      if (pir == HIGH) { // Sensor RADAR detecta presencia (activo en alto)
        muestrasAltas++;
      }
      delay(INTERVALO_MUESTRA);
    }

    bool presenciaDetectada = (muestrasAltas >= 6);

    if (presenciaDetectada != estadoAnterior) {
      if (presenciaDetectada) {
        Serial.println("Presencia detectada, enviando 1 por BLE");
        enviarPorBLE("1");
      } else {
        Serial.println("Sin presencia, enviando 0 por BLE");
        enviarPorBLE("0");

      }
      estadoAnterior = presenciaDetectada;
    } else {
      Serial.println("Estado sin cambios, no se envía nada");
      Serial.println("Estado actual: " + String(presenciaDetectada ? "Presencia" : "Sin presencia"));
    }

    // Espera a que el sensor 1 se desactive antes de permitir una nueva verificación
    while (digitalRead(SENSOR_1_PIN) == HIGH) {
      delay(1000);
    }
    Serial.println("Esperando nueva activación del sensor PIR...");
  }

  // Si la conexión BLE se pierde, intenta reconectar
  if (connected && pClient && !pClient->isConnected()) {
    Serial.println("Conexión BLE perdida. Intentando reconectar...");
    connected = false;
    myDevice = nullptr;
    conectarBLE();
  }

  delay(INTERVALO_VERIFICACION); // Pequeño retardo para evitar lecturas continuas
}
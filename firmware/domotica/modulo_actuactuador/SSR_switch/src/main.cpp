#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

#define SERVICE_UUID        "12345678-1234-1234-1234-1234567890ab"
#define CHARACTERISTIC_UUID "12345678-1234-1234-1234-1234567890ab"

const int ssrPin = 5; // Pin para el SSR
const int manualPin = 34; // Pin para el switch manual

bool modoManual = false;
bool lastManualState = LOW;

// Variables globales para BLE
BLEServer *pServer = nullptr;
BLECharacteristic *pCharacteristic = nullptr;

// Callback para conexión y desconexión
class MyServerCallbacks : public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) {
    Serial.println("Conectado por BLE");
  }

  void onDisconnect(BLEServer* pServer) {
    Serial.println("Desconectado. Reiniciando...");
    delay(500);
    pServer->startAdvertising();
  }
};

// Callback para escritura BLE
class MyCallbacks : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pCharacteristic) {
    if (modoManual) {
      Serial.println("Modo manual activo: ignorando comandos BLE");
      return;
    }

    std::string value = pCharacteristic->getValue();
    if (value.length() > 0) {
      char c = value[0];
      Serial.print("Recibido por BLE: ");
      Serial.println(c);

      if (c == '1') {
        digitalWrite(ssrPin, HIGH);
        Serial.println("SSR encendido (BLE).");
      } else if (c == '0') {
        digitalWrite(ssrPin, LOW);
        Serial.println("SSR apagado (BLE).");
      } else {
        Serial.println("Valor no reconocido (esperado '0' o '1')");
      }
      delay(3000);
    }
  }
};

// Inicialización del sistema
void setup() {
  Serial.begin(115200);
  Serial.println("Iniciando BLE y configurando SSR...");

  pinMode(ssrPin, OUTPUT);// Configura el pin del SSR
  digitalWrite(ssrPin, LOW);// Asegura que el SSR esté apagado inicialmente

  pinMode(manualPin, INPUT); // Configura el pin del switch manual
  // Configura BLE
  BLEDevice::init("ESP32-BLE-Receptor");
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  BLEService *pService = pServer->createService(SERVICE_UUID);

  pCharacteristic = pService->createCharacteristic(
    CHARACTERISTIC_UUID,
    BLECharacteristic::PROPERTY_READ |
    BLECharacteristic::PROPERTY_WRITE |
    BLECharacteristic::PROPERTY_NOTIFY
  );

  pCharacteristic->addDescriptor(new BLE2902());
  pCharacteristic->setCallbacks(new MyCallbacks());

  pService->start();
  pServer->getAdvertising()->start();
  Serial.println("Esperando conexión BLE...");
}

void loop() {
  bool manualState = digitalRead(manualPin);// Lee el estado del switch manual

  // Detectar cambio de estado del pin 18
  if (manualState != lastManualState) {
    lastManualState = manualState;

    if (manualState == HIGH) {
      modoManual = true;
      digitalWrite(ssrPin, HIGH);  // Forzar encendido del SSR
      Serial.println("Modo MANUAL activado: SSR encendido");
    } else {
      modoManual = false;
      digitalWrite(ssrPin, LOW);   // Apaga el SSR al volver a modo BLE
      Serial.println("Modo MANUAL desactivado: vuelve control BLE");
    }
  }

  delay(50); // Pequeño delay para evitar rebotes y sobrecarga
}

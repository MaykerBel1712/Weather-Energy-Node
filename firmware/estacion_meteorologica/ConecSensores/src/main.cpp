//Librerías utilizadas

#include <Arduino.h>
#include <WiFi.h>
#include <FirebaseClient.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <SensirionI2CSen5x.h>
#include <Wire.h>

#define SSID "Redmi Note 11S"
#define PASS "Salome1712"
#define DB_URL "https://prueba-74889-default-rtdb.firebaseio.com"
#define SECRET_KEY "AIzaSyADKMpJWBlT8VtQbGcQ7II07ufsBrCLpl4"


#define MAXBUF_REQUIREMENT 48

#if (defined(I2C_BUFFER_LENGTH) &&                 \
     (I2C_BUFFER_LENGTH >= MAXBUF_REQUIREMENT)) || \
    (defined(BUFFER_LENGTH) && BUFFER_LENGTH >= MAXBUF_REQUIREMENT)
#define USE_PRODUCT_INFO
#endif

SensirionI2CSen5x sen5x;
WiFiClientSecure ssl;
DefaultNetwork network;
AsyncClientClass client(ssl, getNetwork(network));
FirebaseApp app;
RealtimeDatabase database;
AsyncResult result;
LegacyToken dbSecret(SECRET_KEY);
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "time.nist.gov", -5 * 3600, 60000); // Configuración del offset de la hora

void iniciar_wifi();
void print_error(int code, const String &msg);

void setup() {
  Serial.begin(115200);
  iniciar_wifi();

  Firebase.printf("Cliente Firebase v%s\n", FIREBASE_CLIENT_VERSION);
  ssl.setInsecure();

  initializeApp(client, app, getAuth(dbSecret));
  app.getApp<RealtimeDatabase>(database);
  database.url(DB_URL);
  client.setAsyncResult(result);
  randomSeed(analogRead(0));

  timeClient.begin();

  Wire.begin();
  sen5x.begin(Wire);

  uint16_t error;
  char errorMessage[256];
  error = sen5x.deviceReset();
  if (error) {
    Serial.print("Error trying to execute deviceReset(): ");
    errorToString(error, errorMessage, 256);
    Serial.println(errorMessage);
  }


  // offset de temperatura en grados celcius
  float tempOffset = 0.0;
  error = sen5x.setTemperatureOffsetSimple(tempOffset);
  if (error) {
    Serial.print("Error trying to execute setTemperatureOffsetSimple(): ");
    errorToString(error, errorMessage, 256);
    Serial.println(errorMessage);
  } else {
    Serial.print("Temperature Offset set to ");
    Serial.print(tempOffset);
    Serial.println(" deg. Celsius (SEN54/SEN55 only");
  }

  // Comenazar la medición
  error = sen5x.startMeasurement();
  if (error) {
    Serial.print("Error trying to execute startMeasurement(): ");
    errorToString(error, errorMessage, 256);
    Serial.println(errorMessage);
  }
}

void loop() {
  timeClient.update();

  if (!timeClient.forceUpdate()) {
    Serial.println("Error al obtener la hora del servidor NTP");
    delay(2000);
    return;
  }

  // Obtener la fecha y hora actual
  unsigned long epochTime = timeClient.getEpochTime();
  struct tm *ptm = gmtime((time_t *)&epochTime);
  
  int monthDay = ptm->tm_mday;
  int currentMonth = ptm->tm_mon + 1;
  int currentYear = ptm->tm_year + 1900;
  int currentHour = ptm->tm_hour;
  int currentMinute = ptm->tm_min;
  int currentSecond = ptm->tm_sec;

  // Imprime la fecha y hora obtenida para depuración
  Serial.printf("Fecha y hora obtenida: %04d-%02d-%02d %02d:%02d:%02d\n", currentYear, currentMonth, monthDay, currentHour, currentMinute, currentSecond);

  // Formatear la fecha y hora
  char formattedDate[20];
  sprintf(formattedDate, "%04d-%02d-%02d %02d:%02d:%02d", currentYear, currentMonth, monthDay, currentHour, currentMinute, currentSecond);
  
  int numeroAleatorio = random(0, 101); // Genera un número aleatorio entre 0 y 100
  Serial.println(numeroAleatorio); // Muestra el número generado

  // Crear un objeto JSON con el número aleatorio y la fecha y hora actual
  StaticJsonDocument<200> doc; //tamaño json
  doc["valor"] = numeroAleatorio; // "valor" como la clave con el valor aleatorio
  doc["timestamp"] = formattedDate; // "timestamp" como la clave con la fecha y hora

  // Serializar el objeto JSON a una cadena
  String json_str;
  serializeJson(doc, json_str); // Serializa el objeto JSON

  // Construir la ruta con la fecha y hora actuales para el número aleatorio
  String path = "/test/" + String(formattedDate).substring(0, 10) + "-" + String(formattedDate).substring(11, 19); // Usa "YYYY-MM-DD-HH:MM:SS"

  // Enviar el JSON del número aleatorio a Firebase
  bool status = database.set<object_t>(client, path.c_str(), object_t(json_str)); 
  if (status) {
    Serial.println("Documento json guardado en Firebase (test)");
    Serial.println(json_str); // Este json_str contendrá solo un único valor
  } else {
    print_error(client.lastError().code(), client.lastError().message());
  }

  // Leer los valores del sensor de material particulado
  float massConcentrationPm1p0;
  float massConcentrationPm2p5;
  float massConcentrationPm4p0;
  float massConcentrationPm10p0;
  float ambientHumidity;
  float ambientTemperature;
  float vocIndex;
  float noxIndex;

  uint16_t error = sen5x.readMeasuredValues(
    massConcentrationPm1p0, massConcentrationPm2p5, massConcentrationPm4p0,
    massConcentrationPm10p0, ambientHumidity, ambientTemperature, vocIndex,
    noxIndex);

  if (error) {
    Serial.print("Error trying to execute readMeasuredValues(): ");
    char errorMessage[256];
    errorToString(error, errorMessage, 256);
    Serial.println(errorMessage);
  } else {
    // Crear un objeto JSON con las lecturas del sensor y la fecha y hora actual
    StaticJsonDocument<512> sensorDoc; // Cambia el tamaño según tus necesidades
    sensorDoc["MassConcentrationPm1p0"] = massConcentrationPm1p0;
    sensorDoc["MassConcentrationPm2p5"] = massConcentrationPm2p5;
    sensorDoc["MassConcentrationPm4p0"] = massConcentrationPm4p0;
    sensorDoc["MassConcentrationPm10p0"] = massConcentrationPm10p0;
    sensorDoc["AmbientHumidity"] = isnan(ambientHumidity) ? "n/a" : String(ambientHumidity);
    sensorDoc["AmbientTemperature"] = isnan(ambientTemperature) ? "n/a" : String(ambientTemperature);
    sensorDoc["VocIndex"] = isnan(vocIndex) ? "n/a" : String(vocIndex);
    sensorDoc["NoxIndex"] = isnan(noxIndex) ? "n/a" : String(noxIndex);
    sensorDoc["timestamp"] = formattedDate;

    // Serializar el objeto JSON a una cadena
    String sensorJsonStr;
    serializeJson(sensorDoc, sensorJsonStr); // Serializa el objeto JSON

    // Construir la ruta con la fecha y hora actuales para las lecturas del sensor
    String sensorPath = "/Estacion_Meteorologica/" + String(formattedDate).substring(0, 10) + "-" + String(formattedDate).substring(11, 19); // Usa "YYYY-MM-DD-HH:MM:SS"

    // Enviar el JSON de las lecturas del sensor a Firebase
    bool sensorStatus = database.set<object_t>(client, sensorPath.c_str(), object_t(sensorJsonStr));
    if (sensorStatus) {
      Serial.println("Lecturas del sensor guardadas en Firebase (Estacion_Meteorologica)");
      Serial.println(sensorJsonStr); // Este sensorJsonStr contendrá todas las lecturas del sensor
    } else {
      print_error(client.lastError().code(), client.lastError().message());
    }
  }

  delay(3000);
}

void iniciar_wifi() {
  WiFi.begin(SSID, PASS);
  Serial.printf("Conectando a %s", SSID);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(200);
  }
  if (WiFi.status() == WL_CONNECTED) {
    Serial.printf("\n\nConexión exitosa!");
  }
  Serial.printf("\n\nDirección IP: %s\n", WiFi.localIP().toString());
}

void print_error(int code, const String &msg) {
  Firebase.printf("Error, msg: %s, code: %d\n", msg.c_str(), code);
}
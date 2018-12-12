#include <SoftwareSerial.h>
 
SoftwareSerial mySerial(10, 11); // RX, TX


//WiFi Module
#define  ESP_MODE "AT+CWMODE=3"
#define  ESP_TCP_CONNECT "AT+CWJAP=\"song\",\"14901490\""
//#define  ESP_TCP_CONNECT "AT+CWJAP=\"Triz\",\"wdzzy9113"
#define  ESP_IP_PORT "AT+CIPSTART=\"TCP\",\"192.168.1.123\",8080"

#define  ESP_simple  "AT+CIPMUX=0"
#define  ESP_start "AT+CIPMODE=1"
#define  ESP_start_trasmit "AT+CIPSEND"

 
void setup() {
  // Open serial communications and wait for port to open:
  Serial.begin(115200);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
 
 
  Serial.println("Goodnight moon!");
 
  // set the data rate for the SoftwareSerial port
  mySerial.begin(115200);
 mySerial.println("Hello, world?");
////  mySerial.println(ESP_MODE);
////  delay(300);
////  mySerial.println(ESP_TCP_CONNECT);
////  delay(3000);
//  mySerial.println(ESP_IP_PORT);
//  delay(300);
////  mySerial.println(ESP_start);
////    delay(100);
//   mySerial.println(ESP_start_trasmit);
//    delay(1000);

}


 
void loop() { // run over and over
  if (mySerial.available()) {
    Serial.write(mySerial.read());
  }
  
  if (Serial.available()) {
    mySerial.write(Serial.read());
  }
}

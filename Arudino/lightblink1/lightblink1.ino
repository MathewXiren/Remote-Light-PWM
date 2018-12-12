/*
    wifi control code

    @Xiren Ma
    mathewxiren@gmail.com
    2016
*/

#include <SoftwareSerial.h>
 
//SoftwareSerial mySerial(10, 11); // RX, TX
//WiFi Module
#define  ESP_MODE "AT+CWMODE=3"
#define  ESP_TCP_CONNECT "AT+CWJAP=\"ma\",\"12345678\""
//#define  ESP_TCP_CONNECT "AT+CWJAP=\"FAST_DDB4C4\",\"1234567890"
//#define  ESP_IP_PORT "AT+CIPSTART=\"TCP\",\"192.168.1.100\",50000"

#define  ESP_IP_PORT "AT+CIPSTART=\"TCP\",\"172.20.10.6\",8080"

#define  ESP_simple  "AT+CIPMUX=0"
#define  ESP_start "AT+CIPMODE=1"
#define  ESP_start_trasmit "AT+CIPSEND"

#define LED1  9
#define LED2  10


 
int startLED1;
int startLED2;

int T1;
int T2;

//byte buf_receive[2];

void setup() {
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  
  // Open serial communications and wait for port to open:
  Serial.begin(115200);
  
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
 
 
  Serial.println("Goodnight moon!");

    Serial.println(ESP_IP_PORT);
    delay(300);
    Serial.println(ESP_start);
    delay(300);
    Serial.println(ESP_start_trasmit);
    delay(300);

}

void light(){


  if(startLED1 == 0 && startLED2 == 0){
    analogWrite(LED1, 0); 
    analogWrite(LED2, 0);
  }else if(startLED1 == 1 && startLED2 == 0){
    analogWrite(LED1, T1); 
    analogWrite(LED2, 0);
  }else if(startLED1 == 0 && startLED2 == 1){
     analogWrite(LED1, 0); 
     analogWrite(LED2, T2);
  }else{
    analogWrite(LED1, T1); 
    analogWrite(LED2, T2);
  }

}
void receive(){
  String d="";
  if (Serial.available()>0) {
      d=Serial.readString();
//      Serial.print(d);

  }
  String  start1 = d.substring(0, 1);
  String  start2 = d.substring(1, 2);
  String  brightness1 = d.substring(2, 3);
  String  brightness2 = d.substring(3, 4);

  if(start1 == "0"){
    startLED1 = 0;
  }else if(start1 == "1"){
    startLED1 = 1;
  }

   if(start2 == "0"){
    startLED2 = 0;
  }else if(start2 == "1"){
    startLED2 = 1;
  }

  if(brightness1=="1"){
      T1=1;
  }else if(brightness1=="2"){
      T1=40;
  }else if(brightness1=="3"){
      T1=120;
  }else if(brightness1=="4"){
      T1=180;
  }else if(brightness1=="5"){
      T2=254;
  }

   if(brightness2=="1"){
      T2=1;
  }else if(brightness2=="2"){
      T2=40;
  }else if(brightness2=="3"){
      T2=120;
  }else if(brightness2=="4"){
      T2=180;
  }else if(brightness2=="5"){
      T2=254;
  }

  light();
  
}


void loop() { // run over and over
    receive(); 
}


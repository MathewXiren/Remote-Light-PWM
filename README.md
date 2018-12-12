#Remote Control LED Driver
##Demo

[![Demo](https://lh3.googleusercontent.com/-wl4zz6-XidU/XBFYsGAIcEI/AAAAAAAAFyU/RkftGjnru3cAHNsJOoHWhu9dgY3HZe4SgCHMYCw/I/demo.png)](https://www.youtube.com/watch?v=87pGs9bCheg&feature=youtu.be "demo")

##Set up
####1. Hardware related code in Arduino
 1. "lightblink1" is  wifi control code for Arduino
 
 2. "Serial ports tool" saves the debug code for ESP8266
 
 3. Download the code lightblink1.ino into Arduino
 
#### 2 Web code is in WebLighter
weblight is the web code, node.js is required.

###Start
```
1. open terminal cd to ./WebLighter/weblight
2. npm start 

3. cd to ./WebLighter/webSocket
4. run: node server.js

5. open localhost:3000
account name: maxiren
password: 1234567
```

If you want to test

```
cd to ./WebLighter/webSocket
run: node client3.js
```

The IP address of computer would change, so the IP address in server.js and client3.js should be matched.

#中文教程

##设置
1. 硬件相关软件存放在Arduino文件夹下
其中 Serial ports tool 文件夹下为串口调试程序
下为正式的硬件电路程序
使用Arduino开发平台，将其下载到板子上即可

2. 软件相关电路存放在 WebLighter 文件夹下
其中weblight为网页前端代码，运行此代码须首先安装node.js

##运行
以下为Mac OS 操作系统下的运行步骤
首先打开terminal，将路径转化到 weblight 文件夹下
使用时用 npm start 命令即可打开
（若未安装npm，则使用命令 npm install 安装npm）


websSocket 存放的是网页后端代码
以下为Mac OS 操作系统下的运行步骤
首先打开terminal，将路径转化到 webSocket 文件夹下
使用node server.js运行程序

同时运行两个文件夹下的程序，
然后打开浏览器输入 localhost:3000 看到网页
登录账号为maxiren
登录密码为1234567
（想要登录成功电脑必须联网）
登录成功后就可以看到控制面板。

若想要测试程序可以 继续打开terminal，将路径转化到 webSocket 文件夹下
输入node client3.js
（注意：因为每次联网电脑的IP地址都会改变，因此要改变代码内部监听的IP地址为当前的IP地址，服务器和客户端的都要改。）
随意点击控制面板即可看到传输的数据


##另一种打开方式
若使用了leancloud部署了程序，可以直接打开terminal，将路径转化到 maxiren 文件夹下使用lean up即可运行整个程序
部署介绍看https://leancloud.cn/docs/leanengine_webhosting_guide-node.html


/**
 * Created by ma on 2017-04-30.
 */
var net = require('net');
var serve = net.createServer();

var send = require("./SendMessage.js");
var socket;

var schedule= require('node-schedule');

var AV = require('leanengine');

serve.on('connection',function(_socket) {
    socket = _socket;
    _socket.on('data', function(data){
        console.log('Accept data from client '+data);

    })
});

serve.listen(8080, '172.20.10.6');
// serve.listen(8080, 'localhost');
console.log('create server successful');

// var date = new Date();
// var nowHour = date.getHours();43
// var nowMinute = date.getMinutes();
//
// var triggerOn=[2];
// var triggerCode=[2];
// console.log(nowHour,nowMinute);
//
// var rule = new schedule.RecurrenceRule();
// rule.hour=nowHour;
// rule.Minute=nowMinute+1;
//
// console.log(nowHour,nowMinute+1)
// var j = schedule.scheduleJob(rule, function(){`
//     console.log('The answer to life, the universe, and everything!');
// });

var http = require('http');
var url = require('url');
var util = require('util');

var code=[];
var id=[];
var on=[];
var brightness=[];
var trigger=[];
var enable=[];
var hour=[];
var minute = [];
var status = [];



var rule1 = new schedule.RecurrenceRule();
var rule2 = new schedule.RecurrenceRule();

// var express = require('express');
// var app = express();
// //设置跨域访问
// app.all('*', function(req, res, next) {
// res.header("Access-Control-Allow-Origin", "*");
// res.header("Access-Control-Allow-Headers", "X-Requested-With");
// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
// res.header("X-Powered-By",' 3.2.1');
// res.header("Content-Type", "application/json;charset=utf-8");
// next();
// });

var server = http.createServer(function(req, res) {
    // header(‘Access-Control-Allow-Origin :’.$origin); //允许的域名（ * 所有域）
    // header(‘Access-Control-Allow-Methods : POST’); //允许的方法
    // header(‘Access-Control-Allow-Headers : x-requested-with , content-type’); //服务器支持的头信息
    // var origin = (req.headers.origin || "*");
    // res.writeHead(
    //     206,
    //     {
    //         'Access-Control-Allow-Credentials': true,
    //         'Access-Control-Allow-Origin': origin,
    //     }
    // );

    res.writeHead(200, {"Access-Control-Allow-Origin": "http://localhost:3000" });
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // 解析 url 参数
    var params = url.parse(req.url, true).query;
    var data = JSON.parse(params.data || "[]");
    var i;

    for (i= 0; i < data.length; i++) {
        var bulb = data[i];
        id[i]=bulb.id;
        on[i]=bulb.on;
        brightness[i] = bulb.brightness;

        trigger[i] = bulb.trigger;
        console.log(trigger[i]);
        enable[i] = Boolean(trigger[i].enable);
        hour[i] = parseInt(trigger[i].hour);
        minute[i] = parseInt(trigger[i].minute);
        // status[i] = trigger[i].status === 'true';
        status[i] = trigger[i].status;
        // console.log(typeof trigger[i].status);
        // console.log(trigger[0].status, status[0]);
        // console.log("enable=",enable[i], "hour=",hour[i], "minute=",minute[i], "status=",status[i]);
        //
        console.log("id=", id[i], ",on=", on[i], ",brightness=", brightness[i]);
        code[i] = send['parseCode'](id[i], on[i], brightness[i]);
    }

    var buffer = send['sendMessage'](code);
    var triggerBuffer1;
    var triggerBuffer2;
    console.log("code is "+buffer);
    socket.write(buffer);

    // for(i=0; i<data.length; i++){
    //     triggerCode[0]=code[0];
    //     triggerCode[1]=code[1];
    //
    //     // console.log("i=",i,"hour=",rule.hour,"minute=",rule.minute,"status",status[i]);
    //     if(status[i]=="true"){
    //         triggerOn[i]=true;
    //     }else if(status[i]=="false"){
    //         triggerOn[i]=false;
    //     }
    //     // console.log(typeof status[i]);
    //     // console.log("on=",on[i], "status=",status[i]);
    //     // console.log("change i=",i,"hour=",rule.hour,"minute=",rule.minute,"status",status[i]);
    //
    //     triggerCode[i] = send['parseCode'](id[i], triggerOn[i], brightness[i]);
    //     // console.log(code[i]);
    //     if(i==0){
    //         triggerBuffer1=send['sendMessage'](triggerCode);
    //         console.log("triggerBuffer=", triggerBuffer1);
    //     }
    //     if(i==1){
    //         triggerBuffer2=send['sendMessage'](triggerCode);
    //         console.log("triggerBuffer=", triggerBuffer2);
    //     }
    //
    // }



    if(enable[0] && (rule1.hour != parseInt(hour[1]) || rule1.minute != parseInt(minute[1]))) {
        rule1.hour = hour[0];
        rule1.minute = minute[0];
        // console.log("hour1=", hour[0], "minute1=", minute[0], "status1=", status[0], "enable1=", enable[0]);
        // console.log("hour2=", hour[1], "minute2=", minute[1], "status2=", status[1], "enable2=", enable[1]);

        var k = schedule.scheduleJob(rule1, function () {
            // console.log("change i=",i,"hour=",rule.hour,"minute=",rule.minute,"status",status[i]);

            on[0] = status[0];
            // console.log(status[0], on[0]);
            code[0] = send['parseCode'](id[0], on[0], brightness[0]);
            triggerBuffer1 = send['sendMessage'](code);

            socket.write(triggerBuffer1);
            console.log('Time for tea! buffer is ', triggerBuffer1);
            // console.log("i=",i);
            var bulb = AV.Object.createWithoutData('Bulb', id[0]);
            bulb.set('on', on[0]).save();
        });



    }
    // if(!enable[0]){
    //     k.cancel();
    // }




    if(enable[1] && (rule2.hour != parseInt(hour[1]) || rule2.minute != parseInt(minute[1]))){

        rule2.hour = parseInt(hour[1]);
        rule2.minute = parseInt(minute[1]);

        var l = schedule.scheduleJob(rule2, function(){
            // console.log("change i=",i,"hour=",rule.hour,"minute=",rule.minute,"status",status[i]);
            on[1] = status[1];
            code[1] = send['parseCode'](id[1], on[1], brightness[1]);
            triggerBuffer2=send['sendMessage'](code);

            socket.write(triggerBuffer2);
            console.log('Time for tea! buffer is ',triggerBuffer2);
            // console.log("i=",i);
            var bulb = AV.Object.createWithoutData('Bulb', id[1]);
            bulb.set('on', on[1]).save();
        });
    }

    // if(!enable[1]){
    //     l.cancel();
    // }
    // var rule2 = new schedule2.RecurrenceRule();
    //
    // rule2.hour = parseInt(hour[1]);
    // rule2.minute = parseInt(minute[1]);
    // i=1
    // var l = schedule2.scheduleJob(rule2, function(){
    //     // console.log("change i=",i,"hour=",rule.hour,"minute=",rule.minute,"status",status[i]);
    //     socket.write(triggerBuffer2);
    //     console.log('Time for tea! buffer is ',triggerBuffer2);
    //     console.log("i=",i);
    // });

    //
    // for(var i = 0; i<buffer.length;i++){
    //     console.log("code is "+buffer[i]);
    // }
    res.end('ok');
});

server.listen(5000,'localhost');

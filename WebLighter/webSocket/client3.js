/**
 * Created by ma on 2017-04-28.
 */
var net =require('net');
var client = new net.Socket();

// client.connect(8080, 'localhost', function(){
client.connect(8080, '172.20.10.6', function(){
    console.log('connected');
    client.write('client send message1\n');
});

client.on('data', function(data){
    console.log('accept data from server '+data);
});

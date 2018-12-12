/**
 * Created by ma on 2017-04-28.
 */

module.exports = {
    
    parseCode: function (id, on, brightness) {
        // console.log(on);
        var status = '0';
        var l = '1';
        if (id == '58f2e99c44d904006cf7db5c') {

            if (on==true) {
                status = '1';
            } else {
                status = '0';
            }
            // console.log(status);


            if (0.01 < brightness && brightness < 0.3) {
                l = '1';
            } else if (0.3 < brightness && brightness < 0.5) {
                l = '2';
            } else if (0.5 < brightness && brightness < 0.7) {
                l = '3';
            } else if (0.7 < brightness && brightness < 0.9) {
                l = '4';
            } else if (0.9 < brightness && brightness < 1.1) {
                l = '5';
            }

        } else if (id == '58f2e9c0a22b9d006cf58576') {

            if (on==true) {
                status = '1';
            } else {
                status = '0';
            }
            // console.log(brightness);
            if (0.01 < brightness && brightness < 0.3) {
                l = '1';
            } else if (0.3 < brightness && brightness < 0.5) {
                l = '2';
            } else if (0.5 < brightness && brightness < 0.7) {
                l = '3';
            } else if (0.7 < brightness && brightness < 0.9) {
                l = '4';
            } else if (0.9 < brightness && brightness < 1.1) {
                l = '5';
            }

        }



        // console.log(status+l);
        return status + l;
    },
        
        
    sendMessage:function(code){

        var status1 = code[0].charAt(0);
        var brightness1= code[0].charAt(1);
        var status2 = code[1].charAt(0);
        var brightness2= code[1].charAt(1);
        // console.log('status1='+status1+',status2='+status2+'brightness1='+brightness1+'brightness2='+brightness2);
        
        var strCode;
        strCode = status1+status2+brightness1+brightness2;
        // // console.log(strCode);
        // // strCode = strCode.replace(" ", "");
        // if((strCode.length % 2) != 0) {
        //     strCode += " ";
        // }
        //
        // var hexCode = new Array();
        //
        // for(var i = 0 ; i < strCode.length; i++){
        //     var s = strCode.substr(i*2,2);
        //     var v = parseInt(s, 16);
        //     hexCode.push(v);
        // }
        // return hexCode;
        
        return strCode;
        }
}
        




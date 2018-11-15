const Port=require('serial-at');
const fs=require('fs');


setInterval(async function(){
const port=new Port('/dev/ttyS0');
await port.open().catch(err=>console.log(err));

await port.at('AT');
var result2=await port.at('AT+CGATT=1');

var result3=await port.at('AT+SAPBR=3,1,"CONTYPE","GPRS"');
var result4=await port.at('AT+SAPBR=3,1,"APN","internet"');
var result5=await port.at('AT+SAPBR=1,1')
var result6=await port.at('AT+SAPBR=2,1')
var result7=await port.at('AT+CIPGSMLOC=1,1');


if(result7.includes('+CIPGSMLOC: 601')==true)
console.log("Unable to locate");
else{
var result8=result7.split(",");
console.log('longitude= '+result8[2]);
console.log('lattitude= '+result8[3]);

la=result8[3];
lo=result8[2];

let location={
	'lattitude':la,
	'longitude':lo
	}
let data=JSON.stringify(location);
fs.writeFileSync('location.json',data);

//console.log(result7);
}
await port.close();
},600000)



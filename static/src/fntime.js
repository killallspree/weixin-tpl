var $  = require("./jquery.min.js");
var jQuery = require("./jquery.min.js");

var timer=function(){
	var t=3;
	function time(){
		var Hour=parseInt(t/3600);
		var Min=parseInt(t%3600/60);
		var Sec=t%60;
		oTxt.value=Hour+'时'+Min+'分'+Sec+'秒';	
			t--;
		if(t==-1){
			clearInterval(s);
			oTxt.value='已过期'
		}
	}
	var s=setInterval(time,1000);
}
module.exports=timer;
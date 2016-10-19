//window.onload = function(){}	
//var $  = require("./jquery.min.js");
//var jQuery = require("./jquery.min.js");

//var Change=
window.onload =function(){
	
	/*手机号码验证*/
	$(".tel").focus(function(){
		$(".tel").addClass("inputFocus");
	});
	$(".tel").blur(telp);
	function telp(){
		$(".tel").removeClass("inputFocus");

		var tel = $(".tel").val();
		var rel = /^[1][34578][0-9]{9}$/g;
		if(rel.test(tel)){
			$(".tishi").eq(0).text("");
			$(".tel").removeClass("inputBlur");
			return true;			
		}
		else{
			$(".tishi").eq(0).text("请输入正确的手机号");
			$(".tel").addClass("inputBlur");
			return false;
		}
		
	}
	/*密码验证*/
	$(".password").focus(function(){
		$(".password").addClass("inputFocus");
	});
	$(".password").blur(pawd);
	function pawd(){
		$(".password").removeClass("inputFocus");
		var password = $(".password").val();
		var rel = /.{6,16}/g;
		var rel2 = /^[0-9]+$/g;
		var rel3 = /^[0-9_a-zA-Z]{6,18}$/g;
		var a =0,b = 0,c=0;

		if(rel.test(password)){
			$(".tishi").eq(2).text("");
			a = 1;
		}
		else{
			$(".password").addClass("inputBlur");
			$(".tishi").eq(2).text("密码必须为6到16位");
			return false;
		}
		if(rel2.test(password)){
			$(".password").addClass("inputBlur");
			$(".tishi").eq(2).text("密码不能为纯数字");
			return false;
		}
		else{
			$(".tishi").eq(2).text("");
			b = 1;
		}
		if(rel3.test(password)){
			c = 1;
			$(".tishi").eq(2).text("");
		}
		else{
			$(".password").addClass("inputBlur");
			$(".tishi").eq(2).text("密码只能为数字字母下划线组成");
			return false;
		}
		if(a&b&c){
			$(".password").removeClass("inputBlur");
			return true;
		}
		
	}
	
	//发送验证码
	
	$("#sendCode").click();
	function sendCode(){
		var sText=$(".tel").val();
		if(sText==""){
			$(".tishi").eq(1).text("手机号不能为空");
			return false;
		}else{
			//telp();
		}//手机号已被注册，请直接登录；
		
	}
	/*验证码*/
	$("#getCode").focus(function(){
		$("#getCode").addClass("inputFocus");
	})
	$("#getCode").blur(getCode);
	function getCode(){

		$("#getCode").removeClass("inputFocus");

		var sCode=$("#getCode").val();
		if(sCode==""){
			 $("#getCode").addClass("inputBlur");
			 $(".tishi").eq(1).text("短信验证码不能为空");
			 return false;
		}else{
			$("#getCode").removeClass("inputBlur");
			 $(".tishi").eq(1).text("");
		}
		//验证码正确
	}




		//
	//公司
	//
	$(".comName").focus(function(){
		$(".comName").addClass("inputFocus");
	});
	$(".comName").blur(_test0);
	function _test0(){

		$(".comName").removeClass("inputFocus");
		var sName=$(".comName").val();
		
		if(sName==""){
			$(".tishi0").eq(0).text("请输入企业名称");
			$(".comName").addClass("inputBlur")
			return false;
		}else{
			$(".tishi0").eq(0).text("");
			$(".comName").removeClass("inputBlur");
			return true;
		}
	
	}

	/* 联系人*/
	$(".comCont").focus(function(){
		$(".comCont").addClass("inputFocus");
	});
	$(".comCont").blur(_test1);
	function _test1(){

		$(".comCont").removeClass("inputFocus");
		var sName=$(".comCont").val();
		
		if(sName==""){
			$(".tishi0").eq(1).text("请输入联系人");
			$(".comCont").addClass("inputBlur");
			return false;
		}else{
			$(".tishi0").eq(1).text("");
			$(".comCont").removeClass("inputBlur");
			return true;
		}
	
	}

	/*手机号*/

	$(".tel0").focus(function(){
		$(".tel0").addClass("inputFocus");
	});
	$(".tel0").blur(telp0);
	function telp0(){
		$(".tel0").removeClass("inputFocus");

		var tel = $(".tel0").val();
		var rel = /^[1][34578][0-9]{9}$/g
		if(rel.test(tel)){
			$(".tishi0").eq(2).text("");
			$(".tel0").removeClass("inputBlur");
			return true;			
		}
		else{
			$(".tel0").addClass("inputBlur");
			$(".tishi0").eq(2).text("请输入正确的手机号");
			return false;
		}
		
	}
	/*密码*/
	$(".password0").focus(function(){
		$(".password0").addClass("inputFocus");
	});
	$(".password0").blur(pawd0);
	function pawd0(){
		$(".password0").removeClass("inputFocus");

		var password = $(".password0").val();
		var rel = /.{6,16}/g;
		var rel2 = /^[0-9]+$/g;
		var rel3 = /^[0-9_a-zA-Z]{6,18}$/g;
		var a =0,b = 0,c=0;
		if(rel.test(password)){
			$(".password0").removeClass("inputBlur");
			a = 1;
		}
		else{
			$(".password0").addClass("inputBlur");
			$(".tishi0").eq(4).text("密码必须为6到16位");
			return false;
		}
		if(rel2.test(password)){
			$(".tishi0").eq(4).text("密码不能为纯数字");
			return false;
		}
		else{
			$(".password0").removeClass("inputBlur");
			b = 1;
		}
		if(rel3.test(password)){
			$(".password0").removeClass("inputBlur");
			c = 1;
			$(".tishi0").eq(4).text("");
		}
		else{
			$(".password0").addClass("inputBlur");
			$(".tishi0").eq(4).text("密码只能为数字字母下划线组成");
			return false;
		}
		if(a&b&c){
			return true;
		}
		
	}


	// $("#form").submit(function(){
	// 	function ajax(){
	// 		var tel = $(".tel").val();
	// 		var pawd = $(".password").val();
	// 		var nknm = $(".nickname").val();
			
	// 		$.ajax({
	// 		url:"http://localhost:8080/Proxy/FootBall/user/json/reg.do",
	// 		data:{"loginname":tel,"password":pawd,"nickname":nknm},
	// 		async:false,
	// 		success:function(str){
	// 			var obj = JSON.parse(str);
				
	// 			ecode = obj.ecode;
				
	// 			if(obj.ecode ==200){
	// 				$(".tishi").eq(3).attr("id","200");
	// 				console.log("ajax成功没重复")
	// 				$(".tishi").eq(3).text("");
	// 			}
	// 			else{
	// 				console.log("ajax没成功")
	// 				$(".tishi").eq(3).text("用户名已经注册");
	// 				$(".tishi").eq(3).attr("id","500");
	// 			}
			
	// 		}
	// 		})
			
	// 	}
	// 	ajax();
	// 	var num =$(".tishi").eq(3).attr("id");
	
	// 	if(telp()&&pawd()&&nknm()&&num==200){
	// 			console.log("已经成功")		
	// 			return true;
	// 			// window.open("login.html","_self");
	// 	}
	// 	else{
	// 		console.log(num)
	// 			return false;
			
	// 	}
	// })

	function ajax(){
			var tel = $(".tel").val();
			var pawd = $(".password").val();
			var ecode;
			$.ajax({
				url:"",
				data:{"loginname":tel,"password":pawd},
				async:false,
				success:function(str){
					var obj = JSON.parse(str);				
					if(obj.ecode ==200){
						ecode =200;
					}
					else{
						ecode =500;
					}			
				}
			})
			if(ecode == 200){
				return true;
			}else {
				return false;
			}
			
	}
	$("#must").click(mustTest);
	function mustTest(){
		if($("#must").checked){
			return true;
			
		}else{
			return false;
		}
	}
	$("#form1").submit(function(){
		if(telp()&&pawd()&&getcode()){
			//var oUserTel=$("#userCode");
			//var oPwd=$("#userCode");
			//setCookie('userTel',oUser.value,14);		
			//setCookie('userCode',oPwd.value,14);
			    var a  = ajax();
			    if (!a) {
			    	$(".tishi").eq(3).text("用户名已经注册");
			    	return false;
			    }
				
				// window.open("login.html","_self");
		}
		else{
				
			       return false;
		}
		
	})


	$("#form2").submit({

		//////////////////
	});


}

//module.exports=Change($);
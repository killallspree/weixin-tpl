window.onload =function(){

		/*手机号码验证*/
	$("#mytel").focus(function(){
		$(".tel").addClass("inputFocus");
	});
	$("#mytel").blur(telp);
	function telp(){
		$("#mytel").removeClass("inputFocus");

		var tel = $("#mytel").val();
		var rel = /^[1][34578][0-9]{9}$/g;
		if(rel.test(tel)){
			$(".tishi").eq(0).text("");
			$("#mytel").removeClass("inputBlur");
			return true;			
		}
		else{
			$(".tishi").eq(0).text("请输入正确的手机号");
			$("#mytel").addClass("inputBlur");
			return false;
		}
		
	}

	




}
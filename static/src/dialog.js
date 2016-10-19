(function($){
	/*
	 * 弹出框
	 */
	jQuery.dialog={
		
		//弹出框显示
		show:function(elem,mask){
			//init
			var _top=null;
			var nH=($(window).height()-$(elem).height())/2;
			//获取显示器窗口的宽度与高度
			var _width=$(window).width();
			var _height=$(window).height();

			//弹出框据页面顶部与左边距离
			var _left=(_width-$(elem).width())/2;
			if(nH<0){
				nH=0
			};			
			_top=nH;
			console.log(_top);
			$(mask).css({
				width:_width,
				height:_height
			});
			
			$(elem).css({
				top:_top,
				left:_left
			});

           
			$(mask).show();
			$(elem).show();
			
			//设置弹出层标题
			//$(elem).find(".titlebar>h1").text(tit);
			
		},
		
		//弹出框关闭
		close:function(elem,mask){
			//弹出框隐藏
			$(elem).hide();
			//遮罩层隐藏
			$(mask).hide();
           
		}


	};



})(jQuery);

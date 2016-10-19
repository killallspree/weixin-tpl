<!-- //初始化 -->

var len=$(".big li").length;<!-- //图片的个数 3 -->
var _width=$(".big li").width();
//console.log(len)
var $new=$(".big li:eq(0)").clone();
$(".big").append($new);
$(".big").width((len+1)*(_width));
console.log($(".big").width())
var myset;

<!-- //第一个模块 左右切换
$(".con p:eq(0)").click(rightfun);
$(".con p:eq(1)").click(leftfun); -->
var 指示牌=0;
function rightfun(){
	man("after");
	$(".big").stop(true).animate({'margin-left':-490*指示牌})
}
function leftfun(){
	man("before");
	$(".big").stop(true).animate({'margin-left':-490*指示牌})
}

<!-- //小秘书计算指示牌 -->
function man(str){
	<!-- //收到交警指示，来确定指示牌数值 -->
	if(str=="after"){指示牌++;}else{指示牌--;}
	<!-- //判断指示的数值是否超过范围，进行更新
	//到最后的时候 -->
	if(指示牌>len){
		$(".big").css({'margin-left':0});
		指示牌=1;
	}
	<!-- //到最前的时候 -->
	if(指示牌<0){
		$(".big").css({'margin-left':-490*len});
		指示牌=len-1;
	}
}

//-----------------------------------------
//焦点图
$(".sml li").mouseover(overfun);
function overfun(){
	指示牌=$(this).index();
	$(".big").animate({"margin-left":-490*指示牌})
}
//-------------------------------------
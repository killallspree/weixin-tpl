//倒计时到特定的日期或时间
//设置一个有效的结束日期。
//计算剩余时间。
//将时间转换成可用的格式。
//输出时钟数据作为一个可重用的对象。
//在页面上显示时钟，并在它到达0时停止。


function getTimeRemaining(endtime){
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );

  //输出时钟数据作为一个可重用的对象
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}


//将剩余时间输出到div
function initializeClock(id, endtime){
	var clock = document.getElementById(id);
	clock.style.display = 'block';

	var daysSpan = clock.querySelector('.days');
	var hoursSpan = clock.querySelector('.hours');
	var minutesSpan = clock.querySelector('.minutes');
	var secondsSpan = clock.querySelector('.seconds');

	updateClock();
    var timeinterval = setInterval(updateClock,1000);

  //移除初始加载的延迟 在setInterval外调用updateClock一次
	 function updateClock(){
		var t = getTimeRemaining(endtime);
		//.避免不断重建时钟 把每个数字嵌入到span标签内
	       	daysSpan.innerHTML = t.days+'天';
		    hoursSpan.innerHTML = t.hours+'时';
		    minutesSpan.innerHTML = t.minutes+'分';
		    secondsSpan.innerHTML = t.seconds+'秒';// ('0' + t.seconds).slice(-2);添加前导零
	    if(t<=0){
	      clearInterval(timeinterval);
	    }	
	}
}
//var deadline = '2015-12-31';
//initializeClock('clockdiv', deadline);
//html:
/*<div id="clockdiv">
    Days: <span class="days"></span><br>
    Hours: <span class="hours"></span><br>
    Minutes: <span class="minutes"></span><br>
    Seconds: <span class="seconds"></span>
</div>*/
/*//deadline
var schedule = [
    ['Jul 25 2015', 'Sept 20 2015'],
    ['Sept 21 2015', 'Jul 25 2016'],
    ['Jul 25 2016', 'Jul 25 2030']
]
//自动安排时钟
// iterate over each element in the schedule
for(var i=0; i<schedule.length; i++){
  var startDate = schedule[i][0];
  var endDate = schedule[i][1];
 
  // put dates in milliseconds for easy comparisons
  var startMs = Date.parse(startDate);
  var endMs = Date.parse(endDate);
  var currentMs = Date.parse(new Date());
 
  // if current date is between start and end dates, display clock
  if(endMs> currentMs && currentMs >= startMs ){
      initializeClock('clockdiv', endDate);
  }
}*/
//当用户到达倒计时 替换deadline
/*var timeInMinutes = 10;
var currentTime = Date.parse(new Date());
var deadline = new Date(currentTime + timeInMinutes*60*1000);*/

//跨页面保持时钟
//如果deadline记录在一个cookie中，使用deadline。
//如果cookie不存在，创建一个新的deadline并将它存储在一个cookie中


/*if(document.cookie && document.cookie.match('myClock')){
  // get deadline value from cookie
 	var deadline = document.cookie.match(/(^|;)myClock=([^;]+)/)[2];
}
 
// otherwise, set a deadline 10 minutes from now and 
// save it in a cookie with that name
else{
  // create deadline 10 minutes from now      从服务器获取时间后
  var timeInMinutes = 10;
  var currentTime = Date.parse(new Date());//客户端机器时间
  var deadline = new Date(currentTime + timeInMinutes*60*1000);

  // store deadline in cookie for future reference
  document.cookie = 'myClock=' + deadline + '; path=/; domain=.yourdomain.com';
}*/

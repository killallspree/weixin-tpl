var libTime = {
    show: function(timestamp){
        var currTime = new Date().getTime();
        var msec = timestamp * 1000 - currTime;
        if(msec < 0){
            return '已过期';
        }
        var oneHour = 3600 * 1000;
        if(msec < oneHour){
            return '即将到期';
        }
        var oneDay = oneHour * 24;
        var day = parseInt(msec / oneDay);
        var hour = parseInt((msec - oneDay * day) / oneHour);
        var showStr = '';
        if(day > 0){
            showStr += day + '天';
        }
        showStr += hour + '小时';
        return showStr;
    }
};
module.exports = libTime; 

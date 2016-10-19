module.exports = Widget.extend({
    el: '#widget_zoneHeader',
    events: {},
    channels: {
        'broadData username':'onReceiveBroadcast'
    },
    init: function (data) {
        var me=this;
        if(data.head){
            me.$dom.person_photo.append('<img src="'+data.head+'" alt="点击上传头像"/>');
        }else{
            me.$dom.person_photo.append('<img src="http://5a-user.img-cn-shanghai.aliyuncs.com/20161012/et8HTYt3Cy.jpg@65-34-151-151a" alt="点击上传头像"/>');
        }
        if(data.sex == 1){
            me.$dom.person_sex.addClass('male');
        }else{
            me.$dom.person_sex.addClass('female');
        }
    },
    onReceiveBroadcast:function(type,data){
        var me=this;
        me.$el.find('.person-name').text(data);
    }

});


<!--start zoneHeader-->
<div class="zoneHeader" id="widget_zoneHeader">
    <div class="zoneHeader-up"></div>
    <div class="zoneHeader-down"></div>
    <ul class="tab clearfix">
        <li class="tab-list"><a class="tab-resume" href="/user/resume/index">简历</a></li>
        <li class="tab-list"><a class="tab-album" href="/user/album/index">相册</a></li>
        <li class="tab-list"><a class="tab-essay" href="/user/essay/index">随笔</a></li>
    </ul>
    <div class="personInfo">
        <a class="person-photo" data-node="person_photo" href="javascript:;"></a>
        <p class="person-nickname"><span class="person-name">{%if $data.userInfo.name%}{%$data.userInfo.name%}{%else%}{%$data.userInfo.telphone%}{%/if%}</span><i data-node="person_sex" class="person-sex"></i></p>
    </div>
</div>
<!--end zoneHeader-->
{%script%}
    var head='{%$data.head%}';
    var nick='{%$data.name%}';
    var sex='{%$data.sex%}';
    var data={
        "head":head,
        "name":name,
        "sex":sex
    };
    require('/widget/zone_switch/zone_switch.js').createWidget(data);
{%/script%}

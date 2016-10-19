var libPage = {
    isParamsInited: false,
    getParams: function(){
        if(!this.isParamsInited){
            var search = $.trim(window.location.search);
            var markPos = search.indexOf('?');
            if(0 == markPos){
                search = search.substr(1);
            }
            var newSearch = {};
            if(search){
                var searchArr = search.split('&');
                for(var i in searchArr){
                    var seg = searchArr[i].split('=');
                    var key = seg[0];
                    var val = seg[1];
                    newSearch[key] = val;
                }
            }
            this._params = newSearch;
            this.isParamsInited = true;
        }
        return this._params;
    },
    buildUrl: function(page){
        var uri = window.location.pathname;
        var hash = window.location.hash;
        var newSearch = this.getParams();
        newSearch['page_num'] = page;
        var url = uri;
        if(newSearch){
            url += '?' + $.param(newSearch);
        }
        if(hash.length > 0){
            url += hash;
        }
        return url;
    },
    build: function(totalPage){
        var params = this.getParams();
        console.log(params);
        var currPage = parseInt(params['page_num']) || 1;
        if(totalPage == 0){
            currPage=0;
        }
        var num = parseInt(7/2);
        var startPage = currPage - num;
        var endPage = currPage + num;
        if(startPage < 0){
            var left = 0 - startPage;
            endPage += left;
            startPage = 1;
            if(endPage > totalPage){
                endPage = totalPage;
            }
        }
        if(endPage > totalPage){
            var left = endPage - totalPage;
            startPage -= left;
            endPage = totalPage;
            if(startPage < 1){
                startPage = 1;
            }
        }

        var html = '';
        if(0 == currPage){
            html += '<a href="javascript:void(0);" class="disabled">首页</a>';
            html += '<a href="javascript:void(0);" class="disabled">上一页</a>';
            html += '<a href="javascript:void(0);" class="disabled">下一页</a>';
            html += '<a href="javascript:void(0);" class="disabled">尾页</a>';
            return html;
        }
        if(1 == currPage){
            html += '<a href="javascript:void(0);" class="disabled">首页</a>';
            html += '<a href="javascript:void(0);" class="disabled">上一页</a>';
        }else{
            html += '<a href="' + this.buildUrl(1) + '">首页</a>';
            html += '<a href="' + this.buildUrl(currPage - 1) + '">上一页</a>';
        }
        for(var i = startPage; i <= endPage; i++){
            if(i == currPage){
                html += '<a href="' + this.buildUrl(i) + '" class="current">' + i + '</a>';
            }else{
                html += '<a href="' + this.buildUrl(i) + '">' + i + '</a>';
            }
        }
        if(currPage == totalPage){
            html += '<a href="javascript:void(0);" class="disabled">下一页</a>';
            html += '<a href="javascript:void(0);" class="disabled">尾页</a>';
        }else{
            html += '<a href="' + this.buildUrl(currPage + 1) + '">下一页</a>';
            html += '<a href="' + this.buildUrl(totalPage) + '">尾页</a>';
        }
        return html;
    }
};
module.exports = libPage;

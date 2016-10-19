/**
 * Created by Administrator on 2016/9/25.
 */

window.AliOssUpload = (function(obj){
    var serverUrl = obj.serverUrl;
    var accessid = '';
    var host = '';
    var policyBase64 = '';
    var signature = '';
    var filemap = new Array();
    var dir = '';
    var expire = 0;
    var g_object_name = '';
    var now = Date.parse(new Date()) / 1000;
    var timestamp = Date.parse(new Date()) / 1000;
    function initParam(){
        if (expire < now + 3)
        {
            var body = send_request(serverUrl);
            var obj = eval ("(" + body + ")");
            if(obj.errno != 0){
                alert('file signature system error');
            }
            var data = obj.data;
            host = data['host'];
            policyBase64 = data['policy'];
            accessid = data['accessid'];
            signature = data['signature'];
            expire = parseInt(data['expire']);
            dir = data['dir'];
            return true;
        }
        return false;
    }

    function send_request(url){
        var xmlhttp = null;
        if (window.XMLHttpRequest)
        {
            xmlhttp=new XMLHttpRequest();
        }
        else if (window.ActiveXObject)
        {
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xmlhttp!=null)
        {
            xmlhttp.open( "GET", url, false );
            xmlhttp.send( null );
            return xmlhttp.responseText
        }
        else
        {
            alert("Your browser does not support XMLHTTP.");
        }
    }

    function get_suffix(filename) {
        pos = filename.lastIndexOf('.');
        suffix = '';
        if (pos != -1) {
            suffix = filename.substring(pos)
        }
        return suffix;
    }

    function random_string(len)
    {
        len = len || 32;
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = chars.length;
        var pwd = '';
        for(i=0;i<len;i++){
            pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }

    function set_upload_param(up, filename, ret)
    {
        if (ret == false)
        {
            ret = initParam()
        }
        g_object_name = dir;
        if (filename != '') {
            var suffix = get_suffix(filename);
            g_object_name = dir + random_string(10) + suffix;
            filemap[filename] = g_object_name;
        }
        var new_multipart_params = {
            'key' : g_object_name,
            'policy': policyBase64,
            'OSSAccessKeyId': accessid,
            'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
            'signature': signature
        };

        up.setOption({
            'url': host,
            'multipart_params': new_multipart_params
        });

        up.start();
    }

    var uploader = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight,html4',
        browse_button : obj.upload_button,//'file_upload', //选择图片button
        multi_selection: obj.multi,
        //container: document.getElementById('img-add'),
        flash_swf_url : 'lib/Moxie.swf',
        silverlight_xap_url : 'lib/Moxie.xap',
        url : 'http://oss.aliyuncs.com',

        filters: {
            mime_types : [ //只允许上传图片和zip,rar文件
                { title : "files", extensions : obj.extensions },
            ],
            max_file_size : obj.max, //最大只能上传10mb的文件
            prevent_duplicates : false //允许选取重复文件
        },

        init: {
            PostInit: function() {
            },

            FilesAdded: function(up, files) {
                //初始化配置
                //initParam();
                set_upload_param(uploader, '', false);
                plupload.each(files, function(file) {
                });
            },

            BeforeUpload: function(up, file) {
                set_upload_param(up, file.name, true);
            },

            UploadProgress: function(up, file) {
                //console.log(file.name + ':' + file.percent);
            },

            FileUploaded: function(up, file, info) {
                if (info.status == 200)
                {
                    obj.success(host+'/'+filemap[file.name]);
                }
                else
                {
                    obj.error(info.response);
                }
            },

            Error: function(up, err) {
                if (err.code == -600) {
                    obj.error("选择的文件太大了,可以根据应用情况，在upload.js 设置一下上传的最大大小");
                }
                else if (err.code == -601) {
                    obj.error("选择的文件后缀不对,可以根据应用情况，在upload.js进行设置可允许的上传文件类型");
                }
                else if (err.code == -602) {
                    obj.error("这个文件已经上传过一遍了");
                }
                else
                {
                    obj.error("Error xml:" + err.response);
                }
            }
        }
    });
    uploader.init();
});
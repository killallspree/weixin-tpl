/**
 * fis3 config
 */
var deployConfig = require('./fis-conf/deploy-config.js');

// 模块命名空间配置
fis.set('namespace', 'weixin');
fis.set('project.static', '/static');

// 自定义 smarty 配置
var smarty = require('./fis-conf/smarty');
var deployMedia = [];
// 获取到所有 dev 的 media
for (var key in deployConfig) {
  deployMedia.push(key);
};

smarty(fis, 'prod', deployMedia);

// 不对 fis-conf 进行编译
fis.set('project.ignore', [
  'fis-conf.js',
  '/fis-conf/**',
  '/node_modules/**'
]);

// 暂时保留，完后删除
fis.match('/static/js/mod/**.js', {
  isMod: true
});

// swf 文件不用 hash 处理
fis.match('*.swf',{
  useHash: false
});

// js 的打包策略
fis.match('/static/lib/self/*.js', {
  packTo: '/static/pkg/aio.js'
});

fis.match('/static/lib/third/jquery.js', {
  packTo: '/static/pkg/aio.js'
});

fis.match('/static/lib/third/jsmod.js', {
  packTo: '/static/pkg/aio.js'
});

fis.match('/static/lib/third/swig.min.js', {
  packTo: '/static/pkg/aio.js'
});

fis.match('/static/lib/third/jsmod.extend.js', {
  packTo: '/static/pkg/aio.js'
});

fis.match('/static/lib/third/jsmod.extend/*.js', {
  packTo: '/static/pkg/aio.js'
});

// 部署 dev 环境
devDeploy();

function devDeploy() {
  function push(RD, to) {
    return fis.plugin('http-push', {
      receiver: RD.receiver,
      to: RD.root + to
    });
  }

  for (var k in deployConfig) {
    var RD = deployConfig[k];
    fis.media(k)
      // 这里不用总部署，需要时部署即可
      // .match('plugin/**', {
      //   deploy: push(RD, '/data/smarty')
      // })
      .match('*.tpl', {
        deploy: [
          push(RD, '')
        ]
      })
      .match('static/**', {
        deploy: [
          push(RD, '/webroot')
        ]
      })
      .match('pkg/**', {
        deploy: [
          push(RD, '/webroot'),
        ]
      })
      .match('widget/**', {
        deploy: [
          push(RD, '/webroot')
        ]
      })
      .match('widget/**.tpl', {
        deploy: [
          push(RD, '')
        ]
      })
      .match('${namespace}-map.json', {
        deploy: push(RD, '/data/smarty')
      })
  }
}

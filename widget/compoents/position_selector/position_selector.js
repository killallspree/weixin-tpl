/**
 * 职位选择器
 * @require ./position_selector.less
 */
var klass = require('jsmod/util/klass');
var event = require('jsmod/util/event');
var dialog = require('jsmod/ui/dialog');

var TPL_POSITION = __inline('./tmpls/position.tpl');
var TPL_POSITION_LIST = __inline('./tmpls/position_list.tpl');
var TPL_POSITION_NAV = __inline('./tmpls/position_nav.tpl');

var URL_POSITION = 'http://' + window.location.hostname + ':8020/user/position/getsubtypesbypid';
var URL_COMPANY = 'http://' + window.location.hostname + ':8020/user/company/getsubtypesbypid';


var URL_DETAIL_POSITION = 'http://' + window.location.hostname + ':8020/user/position/getdetailbyid';
var URL_DETAIL_COMPANY = 'http://' + window.location.hostname + ':8020/user/company/getdetailbyid';

var PositionSelector = klass({
  initialize: function (option) {
    this.option = option || {};
    this.createDg();
    this.positionList = [];
    this.initEvents();
    this.initDefault();
  },

  initDefault: function () {
    var self = this;

    if (self.option.initId === undefined) {
      return;
    }

    $.ajax({
      url: self.option.project ? URL_DETAIL_COMPANY : URL_DETAIL_POSITION,
      dataType: 'jsonp',
      jsonp: '_callback',
      data: {
        id: self.option.initId
      },
      success: function (json) {
        if (!json.errno && json.data) {
          self.createDefault(json.data);
        }
      }
    })
  },

  createDefault: function (data) {
    var self = this;

    var prefix = self.option.project ? 'industry' : 'type';
    var tmpSelect = [];

    // 遍历每一个
    for (var i = 0; i < 4; i++) {
      var item;

      // 如果有数据
      if (data[prefix + (i + 1) + '_name']) {
        item = {
          name: data[prefix + (i + 1) + '_name'],
          id: data[prefix + (i + 1) + '_id'],
          deep: i
        };

        tmpSelect.push(item);

        // 如果跟初始化id一致退出
        if (item.id == self.option.initId) {
          break;
        }
      }
    }

    self.positionList = tmpSelect;

    if (self.positionList.length) {
      self.trigger('selected', [self.positionList[self.positionList.length - 1], self.positionList, true]);
    }
  },

  createDg: function () {
    var self = this;

    self.dg = new dialog({
      html: TPL_POSITION,
      backgroundColor: null
    });

    self.$dgContainer = self.dg.getElement();
    self.getList();
  },

  show: function (option) {
    var self = this;

    self.cachePositionList = self.positionList.slice(0);

    if (option) {
      this.toDeep = option.toDeep;

      var deep;
      var id;

      // 最后一个选择的
      var lastSelect = self.positionList[self.positionList.length - 1];

      // 如果没有最后一个选择
      // 则为初始化的选择
      if (!lastSelect) {
        deep = 0;
        id = 0;
      } else {
        // 如果最后一个选择的深度小于当前深度
        // 则需要以最后一个选择的深度为准
        if (lastSelect.deep < option.deep || option.id === undefined) {
          deep = lastSelect.deep + 1;
          id = lastSelect.id;
        } else {
          deep = option.deep + 1;
          id = option.id;
        }
      }

      // 剪裁
      self.positionList.splice(deep);
      self.updataUI();

      this.getList(id, deep);
    } else {
      this.toDeep = undefined;
    }

    this.dg.show();
  },

  /**
   * 获取职位数据
   */
  getList: function (pid, deep) {
    var self = this;

    pid = pid || '0';
    deep = deep || 0;

    self.createSelectEl();

    self.$dgContainer.find('.position-error-wrap').hide();
    self.$dgContainer.find('.position-list-wrap').addClass('loading');

    $.ajax({
      url: self.option.project ? URL_COMPANY : URL_POSITION,
      dataType: 'jsonp',
      jsonp: '_callback',
      data: {
        pid: pid
      },
      success: function (json) {
        self.$dgContainer.find('.position-list-wrap').removeClass('loading');

        if (json.errno || !json.data) {
          self.$dgContainer.find('.position-list-wrap').html('');
          return;
        }

        var prefix = self.option.project ? 'industry' : 'type';

        json.data.forEach(function (item) {
          if (item.type != 'all') {
            item.name = item[prefix + (deep + 1) + '_name'];
          }
        });

        json.deep = deep;

        var html = swig.render(TPL_POSITION_LIST, {
          locals: json
        });

        self.$dgContainer.find('.position-list-wrap').html(html);
      }
    });
  },

  addPosition: function (position) {
    var self = this;

    self.positionList.push(position);

    self.updataUI();
  },

  updataUI: function () {
    var self = this;

    var html = swig.render(TPL_POSITION_NAV, {
      locals: {
        data: self.positionList
      }
    });

    self.$dgContainer.find('.position-nav-wrap').html(html);
  },

  setSelectEl: function (el) {
    var self = this;

    self.$selectEl && self.$selectEl.removeClass('position-item-active');

    self.$selectEl = $(el).addClass('position-item-active');
  },

  createSelectEl: function () {
    var self = this;

    self.$selectEl && self.$selectEl.removeClass('position-item-active');
    self.$selectEl = null;
  },

  initEvents: function () {
    var self = this;

    self.$dgContainer.delegate('.position-item', 'click', function () {
      var deep = $(this).data('deep');
      var id = $(this).data('id');
      var finalDeep = self.option.project ? 1 : 3;

      if (finalDeep == deep || (self.toDeep && self.toDeep == deep)) {
        self.setSelectEl(this);

        if (self.toDeep !== undefined) {
          if (self.positionList.length < self.toDeep + 1) {
            self.addPosition({
              name: $(this).text(),
              id: id,
              deep: deep
            });
          }
        } else {
          if (self.positionList.length < finalDeep + 1) {
            self.addPosition({
              name: $(this).text(),
              id: id,
              deep: deep
            });
          }
        }

        self.$dgContainer.find('.position-error-wrap').hide();
      } else {
        self.getList(id, deep + 1);
        self.addPosition({
          name: $(this).text(),
          id: id,
          deep: deep
        });
      }
    });

    self.$dgContainer.delegate('.position-item-all', 'click', function () {
      self.setSelectEl(this);
    });

    self.$dgContainer.delegate('.position-nav-item', 'click', function () {
      var idx = $(this).data('idx');

      if (idx - 1 >= 0) {
        var searchPoint = self.positionList[idx - 1];
        var id = searchPoint.id;
        var deep = searchPoint.deep;

        // 剪裁
        self.positionList.splice(idx);
        self.getList(id, deep + 1);
      } else {
        self.positionList = [];
        self.getList(0, 0);
      }

      self.updataUI();
    });

    self.$dgContainer.delegate('.position-action-submit', 'click', function () {
      if (!self.$selectEl) {
        self.$dgContainer.find('.position-error-wrap').html('必须选择一个行业').show();
      } else {
        var data = {};

        data.id = self.$selectEl.data('id');
        data.deep = self.$selectEl.data('deep');
        data.name = self.$selectEl.data('text');

        self.trigger('selected', [data, self.positionList]);
        self.cachePositionList = [];
        self.dg.hide();
      }
    });

    self.$dgContainer.delegate('.position-action-cancel', 'click', function () {
      self.positionList = self.cachePositionList.slice(0);
      self.dg.hide();
    });
  }


}, null, [event]);

module.exports = PositionSelector;

define(function (require) {
  'use strict';

  var Backbone             = require('backbone'),
      Handlebars           = require('handlebars'),
      SelectViewCollection = require('modules/SelectBox/collectionView'),
      SelectList           = require('modules/SelectBox/selectList'),
      SelectCollection     = require('modules/collection'),
      Popup                = require('modules/Popup/view'),
      Model                = require('modules/model'),
      tpl                  = require('hbs!templates/tpl');

  return Backbone.View.extend({
        el: $('.container'),
        template: tpl,
        events: {
            'click .findTires' : 'find'
        },
        url: '',
        find: function () {
            var url = $('.findTires').data('url'),
                model,
                popup;

            $.get(url, function(data) {
                model = new Model(data);
                popup = new Popup();
                $('body').append(popup.render(model).el);
            }.bind(this));

        },
        initialize: function () {
          this.render();
          this.renderViews();
        },
        renderViews: function () {
            var el = $('.main-wrapper'),
                selectBoxCollection = new SelectCollection(SelectList);

            this.selectView = new SelectViewCollection(el, selectBoxCollection);
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
});

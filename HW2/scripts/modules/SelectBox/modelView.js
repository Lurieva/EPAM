define(function (require) {
  'use strict';

  var Backbone   = require('backbone'),
      Handlebars = require('handlebars'),
      tpl        = require('hbs!modules/SelectBox/templates/tpl') ;

  return Backbone.View.extend({
        tagName: 'div',
        className: 'tire-finder__select-wrapper tire-finder__select-wrapper--wide',
        template: tpl,
        initialize: function () {
            this.model.bind('change', this.render, this);
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});

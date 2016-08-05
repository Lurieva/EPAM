define(function (require) {
  'use strict';

  var Backbone = require('backbone');

  return Backbone.Model.extend({
    urlRoot: 'http://www.canadiantire.ca/dss/services/v2/tires/vehicle/years',
    getParam: function (url) {
        this.fetch({url: url}).done(function (res) {
            this.set({'arr': res});
        }.bind(this));
    }
  });
})

define(function (require) {
   'use strict';

  var Backbone = require('backbone'),
      Model    = require('modules/model');

  return Backbone.Collection.extend({
      model: Model,
   });
})

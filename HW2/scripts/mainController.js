define (function (require) {
  'use strict';

  var Controller = require('controller'),
      MainView   = require('mainView');

  return Controller.extend({
    initialize: function () {
      var mainView = new MainView();
    }
  })
});

define(function (require) {
  'use strict';

  var Backbone  = require('backbone'),
      ModelView = require('modules/SelectBox/modelView'),
              _ = require('underscore');

  return Backbone.View.extend({
        url: '',
        initialize: function (el, collection) {
            this.el = el;
            this.collection = collection;
            this.basicUrl = 'http://www.canadiantire.ca/dss/services/v2/tires/vehicle/';
            this.initializeFirstModel();
            this.render();
        },
        initializeFirstModel: function () {
            var url,
                model = this.collection.models[0];

            url = this.basicUrl + model.get('url');
            model.set({'urlRoot': url, disabled: false});
            model.getParam(url);
        },
        render: function () {
            this.collection.each(function (item) {
              this.el.append(new ModelView({
                    model: item
                }).render().el);
            }.bind(this), this);

        },
        returnUrl: function() {
          console.log(true)
        }
    });
})

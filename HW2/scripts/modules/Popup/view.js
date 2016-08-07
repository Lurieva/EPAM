define(function (require) {
  'use strict';

  var Backbone             = require('backbone'),
      Handlebars           = require('handlebars'),
      Model                = require('modules/model'),
      tpl                  = require('hbs!modules/Popup/templates/tpl');

  return Backbone.View.extend({
        className: 'popup',
        template: tpl,
        events: {
            'click .popup-close': 'close',
            'click .findTires' : 'findTires',
            'click .cancel': 'close'
        },
        initialize: function () {
            var widthPopup = 550;
            $(this.el).css({
                'width': widthPopup + 'px',
                'height': '400px',
                'top': '100px',
                'left': ($(window).width() - widthPopup)/2 + 'px',
                'position': 'absolute',
            });
        },
        render: function (model) {
            this.model = model;
            this.$el.html(this.template(model.toJSON()));

            $('.popup-active').removeClass('popup-active');
            $(this.el).addClass('popup-active')
                      .css({ 'z-index': 1000 });

            return this;
        },
        close: function () {
            if (!$(this.el).hasClass('popup-active')) {
              $('.popup-active').removeClass('popup-active');
            }
            $(this.el).remove();
        },
        findTires: function () {
          this.getListTires();
          this.close();
        },
        getListTires: function () {
            var model,
                url = this.renderURL();

            $.get(url, function(data) {
                  model = new Model(data);
                  console.log(model.toJSON());
            }.bind(this));
        },
        renderURL: function () {
          var baseUrl =  'http://www.canadiantire.ca/dss/services/v2/tires/vehicle/tires?',
              queryString = {
                  'vehicleId': this.model.get('VehicleID'),
                  'year': this.model.get('Year'),
                  'oemSizeChosen': this.model.get('TireSize'),
                  'oemSizePlacement': 'Both',
                  'plusSizeChosen': 0,
                  'plusSizePlacement': '',
                  'minusSizeChosen': 0,
                  'searchType': 'tire'
              };

          return baseUrl + this.makeQueryString(queryString);
        },
        makeQueryString: function (queryData) {
            var arr = [],
                key;

            for (key in queryData) {
                arr.push(key + '=' + queryData[key]);
            }
            return arr.join('&');
        },
    })
});

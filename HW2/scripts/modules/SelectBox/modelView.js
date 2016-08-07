define(function (require) {
  'use strict';

  var Backbone   = require('backbone'),
      Handlebars = require('handlebars'),
      tpl        = require('hbs!modules/SelectBox/templates/tpl') ;

  return Backbone.View.extend({
        tagName: 'div',
        className: 'tire-finder__select-wrapper tire-finder__select-wrapper--wide',
        template: tpl,
        events: {
          'change': 'change',
        },
        url: '',
        obj: {},
        initialize: function () {
            this.model.bind('change', this.render, this);
            this.collection = this.model.collection;
            this.basicUrl = 'http://www.canadiantire.ca/dss/services/v2/tires/vehicle/';
        },
        change: function (event) {
            var newModel,
                basicURL = 'http://www.canadiantire.ca/dss/services/v2/tires/vehicle/',
                index = this.model.get('requires'),
                lengthCollection = this.collection.length,
                length = (index === undefined) ? 1 : index.length + 1;

            this.disabledSiblings(event);

            if (length < lengthCollection) {
                newModel = this.collection.at(length);

                this.url = basicURL + newModel.get('url') + this.makeQueryString(this.makeUrl(event));
                newModel.set({'urlRoot': this.url, disabled: false});
                newModel.getParam(this.url);

            } if (length === lengthCollection) {
                this.url = basicURL + 'profile?' + this.makeQueryString(this.makeUrl(event));
                $('.findTires').data('url', this.url);
                this.enableButton();
            }
        },
        enableButton: function () {
            if (!res($('select'))) {
                $('.findTires').removeAttr('disabled');
            }

            function res (col) {
                return _.every(col, function (item) {
                    return $(item).prop('disabled');
                });
            }
        },
        disabledSiblings: function (event) {
            $(event.target).parent().parent().nextAll()
                                    .find('select')
                                    .prop('disabled', 'disabled')
                                    .prop('selectedIndex', 0);
        },
        makeUrl: function (event) {
            var name = event.target.name.toLowerCase(),
                value = event.target.value;

            this.obj[name] = value;
            return this.obj
        },
        makeQueryString: function (queryData) {
            var arr = [],
                key;

            for (key in queryData) {
                arr.push(key + '=' + queryData[key]);
            }

            return arr.join('&');
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});

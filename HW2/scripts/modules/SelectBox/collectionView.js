define(function (require) {
  'use strict';

  var Backbone  = require('backbone'),
      ModelView = require('modules/SelectBox/modelView'),
              _ = require('underscore');

  return Backbone.View.extend({
        el: $('.main-wrapper'),
        events: {
            'change' : 'update'
        },
        url: '',
        initialize: function (collection) {
            this.obj = {};
            this.collection = collection;
            this.basicUrl = 'http://www.canadiantire.ca/dss/services/v2/tires/vehicle/';
            this.initializeFirstModel();
            _.bindAll(this, 'update');
            _.bindAll(this, 'find');
            this.render();
        },
        initializeFirstModel: function () {
            var url,
                model = this.collection.models[0];

            url = this.basicUrl + model.get('url');
            model.set({'urlRoot': url, disabled: false});
            model.getParam(url);
        },
        update: function (event) {
            var newModel,
                basicURL = 'http://www.canadiantire.ca/dss/services/v2/tires/vehicle/',
                model = this.collection.findWhere({name: event.target.name}),
                index = model.get('requires'),
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
        find: function () {
            return this.url;
        },
        makeUrl: function (event) {
            var name = event.target.name.toLowerCase(),
                value = event.target.value;

            if (name === 'body') {
              name = 'chassis';
            }
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
            _.each(this.collection.models, function (item) {
                this.renderItem(item);
            }.bind(this), this);
        },
        renderItem: function (item) {
            var selectView = new ModelView({
                model: item
            });

            this.$el.append(selectView.render().el);

            return this;
        }
    });
})

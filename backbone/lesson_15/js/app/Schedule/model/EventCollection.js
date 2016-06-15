'use strict';
(function (This)  {
    This.EventCollection = Backbone.Collection.extend({
        model: This.Event,
        localStorage: new Backbone.LocalStorage("EventsCollection"),
        filtered: function (start, end) {
            return this.models.filter(function (item) {
                return item.get('date') <= end && item.get('date') >= start;
            }, this);
        }
    });
})(App.Schedule);
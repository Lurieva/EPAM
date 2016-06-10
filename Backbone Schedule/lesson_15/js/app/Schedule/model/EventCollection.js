'use strict';
(function (This)  {
    This.EventCollection = Backbone.Collection.extend({
        model: This.Event,
       // url: '/events',
        localStorage: new Backbone.LocalStorage("EventsCollection")
    });
})(App.Schedule);
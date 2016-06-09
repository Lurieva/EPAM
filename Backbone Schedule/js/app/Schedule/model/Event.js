'use strict';
(function (This)  {
    This.Event = Backbone.Model.extend({
        //url: '/event',
        url: '#',
        defaults: {
            title: '',
            date: '',
            from: '',
            to: '',
            description: ''
        },
        initialize: function (params) {
            var key;
            for (key in params) {
                if (key in Object.keys(this)) {
                    this[key] = params[key];
                }
            }
        },
        formFromTime: function () {
            return this.get('from') + '-' + this.get('date');
        },
        formToTime: function () {
            return this.get('to') + '-' + this.get('date');
        },
        toString: function () {
            return this.get('title');
        }
    });
})(App.Schedule);
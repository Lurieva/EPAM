'use strict';
(function (This) {
    This.NavigationView = Backbone.View.extend({
        template: templates.navigationViewTpl,
        events: {
            'click .previous' : 'showPrevious',
            'click .current' : 'showCurrent',
            'click .next' : 'showNext'
        },
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(this.template());
            return this;
        },
        showNext: function () {
            cs.mediator.publish('showNext');
        },
        showPrevious: function () {
            cs.mediator.publish('showPrevious');
        },
        showCurrent: function () {
            cs.mediator.publish('showCurrent');
        }
    });
})(App.Schedule);
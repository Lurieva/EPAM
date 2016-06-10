'use strict';
(function (This) {
    This.EventsView = Backbone.View.extend({
        el: '#event-container',
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.empty();

            this.collection.each(function(model) {
                this.$el.append(new This.EventView({
                    model: model
                }).render().el);
            }, this);
        }

    });
})(App.Schedule);
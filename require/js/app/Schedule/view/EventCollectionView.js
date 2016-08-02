define(['backbone', 'jquery', 'app/Schedule/view/EventView'],
    function (Backbone, $, EventView) {
    return EventsView = Backbone.View.extend({
        el: '#event-container',
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.empty();

            this.collection.each(function(model) {
                this.$el.append(new EventView({
                    model: model
                }).render().el);
            }, this);
        }
    });
});

'use strict';
(function (This) {
    This.EventView = Backbone.View.extend({
        template: templates.eventTpl,
        events: {
            'dblclick': 'edit'
        },
        render: function (model) {
            this.model = model;
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        edit: function () {
            cs.mediator.publish('edit', this.model);
        }
    });
})(App.Schedule);
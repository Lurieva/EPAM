'use strict';
(function (This) {
    This.EventView = Backbone.View.extend({
        template: templates.eventTpl,
        events: {
            'dblclick': 'edit',
            'click .close' : 'remove'
        },
        render: function (model, settings) {
            this.model = model;
            this.$el.html(this.template(this.model.toJSON()))
                .css({
                    position: 'absolute',
                    top: settings.top,
                    left: settings.left,
                    width: settings.width,
                    height: settings.height
                })
                .addClass('event');
            return this;
        },
        edit: function () {
            cs.mediator.publish('edit', this.model);
        },
        remove: function () {
            this.$el.remove();
            this.model.destroy();
            cs.mediator.publish('add');
        }
    });
})(App.Schedule);
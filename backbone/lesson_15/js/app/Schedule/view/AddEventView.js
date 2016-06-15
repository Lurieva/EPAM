'use strict';
(function (This) {
    This.AddEventView = Backbone.View.extend({
        template: templates.addEventViewTpl,
        events: {
            'click #saveEvent': 'saveEvent'
        },
        initialize: function () {
            this.model = this.model || new This.Event();
        },
        render: function() {
            this.$el.html(this.template());
            setTimeout(function () {
                $('.datepicker').datepicker({
                    dateFormat: 'yy-mm-dd',
                    firstDay: 1
                });
            },0);

            return this;
        },
        setAttributesEvent: function () {
            return {
                title: this.$('input[name="title"]').val(),
                date: this.$('input[name="date"]').val(),
                from: this.$('input[name="from"]').val(),
                to: this.$('input[name="to"]').val(),
                description: this.$('textarea').val()
            };
        },
        saveEvent: function (e) {
            var newEvent;

            e.preventDefault();
            newEvent = new This.Event(this.setAttributesEvent());
            collections.events.create(newEvent);
            this.render();
            cs.mediator.publish('showCurrent');
        }
    });
})(App.Schedule);
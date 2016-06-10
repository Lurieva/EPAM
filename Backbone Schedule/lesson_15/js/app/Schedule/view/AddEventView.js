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
            var event = this;

            this.$el.html(this.template());
            setTimeout(function () {
                $('.datepicker').datepicker({
                    dateFormat: 'yy-mm-dd',
                    firstDay: 1
                })
            },0);
            return this;
        },
        setAttributesEvent: function () {
            return {
                title: this.$el.find('input[name="title"]').val(),
                date: this.$el.find('input[name="date"]').val(),
                from: this.$el.find('input[name="from"]').val(),
                to: this.$el.find('input[name="to"]').val(),
                description: this.$el.find('textarea').val()
            };
        },
        generateId : function (key) {
            return key + '-'  + Math.random().toString().substr(2,3);
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
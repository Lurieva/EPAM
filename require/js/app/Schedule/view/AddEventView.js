define(['backbone', 'jquery', 'app/Schedule/tpl/AddEventViewTpl',
        'app/Schedule/model/Event', '$UI'],
    function (Backbone, $, tpl, Event, $UI) {
      return AddEventView = Backbone.View.extend({
        template: tpl,
        events: {
            'click #saveEvent': 'saveEvent'
        },
        initialize: function (collection) {
            this.model = this.model || new Event();
            this.collection = collection;
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
            newEvent = new Event(this.setAttributesEvent());
            this.collection.create(newEvent);
            this.render();
            mediator.publish('showCurrent');
        }
    });
});

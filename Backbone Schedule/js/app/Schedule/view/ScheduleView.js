(function (This) {
    This.ScheduleView = Backbone.View.extend({
        template: templates.scheduleViewTpl,
        weekStart: moment().day('Monday'),
        initialize: function () {
            this.listenTo(collections.events, 'create', this.render);
            this.listenTo(collections.events, 'destroy', this.render);
            this.listenTo(collections.events, 'update', this.render);
        },
        render: function(weekStart) {
            if (weekStart) {
                this.weekStart = moment(weekStart, 'MM-DD-YYYY').day('Monday');
            }

            this.$el.empty().append(this.template({
                width: 8,
                height: 26,
                start: this.weekStart
            }));

            collections.events.forEach(remakeSchedule.bind(this));
            function remakeSchedule (event) {
                var rowSpan, duration;
                setTimeout(function() {
                    duration = parseFloat((event.get('to'))) - parseFloat((event.get('from')));
                    if ( duration === 0) {
                        rowSpan = 1;
                    }
                    rowSpan = duration * 2;

                    console.log(parseFloat((event.get('to'))) - parseFloat((event.get('from'))));
                    var ev = new This.EventView();
                    $("td[data-time='" + event.formFromTime() +"']")
                        //.attr('rowSpan', rowSpan)
                        .addClass('schedule-event')
                        .append(ev.render(event).el);
                }, 0);
            }

            return this;
        }
    });
})(App.Schedule);
(function (This) {
    This.ScheduleView = Backbone.View.extend({
        template: templates.scheduleViewTpl,
        weekStart: moment().day('Monday'),
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
            function remakeSchedule (item) {
                var eventView, colRowSpan, duration;
                setTimeout(function() {
                    duration = parseFloat((item.get('to'))) - parseFloat((item.get('from')));
                    colRowSpan = duration === 0 ? 1 : duration * 2;
                    eventView = new This.EventView();
                    $("td[data-time='" + item.formFromTime() +"']")
                        //.attr('rowSpan', colRowSpan)
                        //.addClass('schedule-event')
                        .append(eventView.render(item).el);
                }, 0);
            }

            return this;
        }
    });
})(App.Schedule);
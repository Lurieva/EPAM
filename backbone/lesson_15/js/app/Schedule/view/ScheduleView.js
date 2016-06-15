(function (This) {
    This.ScheduleView = Backbone.View.extend({
        template: templates.scheduleViewTpl,
        weekStart: moment().day('Monday'),
        initialize: function () {
            $(window).resize(function (){this.render()}.bind(this));
        },
        render: function(weekStart) {
            var start, end, events;
            if (weekStart) {
                this.weekStart = moment(weekStart, 'MM-DD-YYYY').day('Monday');
            }

            this.$el.empty().append(this.template({
                width: 8,
                height: 26,
                start: this.weekStart
            }));

            start = this.weekStart.format('YYYY-MM-DD');
            end = this.weekStart.add(6, 'd').format('YYYY-MM-DD');
            events = collections.events.filtered(start, end);
            //this.changeAttributesCol(events);
            events.forEach(this.remakeSchedule.bind(this));
            
            return this;
        },
        getCellsCol: function (time1, time2) {
            var duration,
                fraction,
                colCells = 0;

            duration = parseFloat(time2) - parseFloat(time1);
            fraction = (this.getDecimal(time2.replace(':','.'))) - this.getDecimal((time1.replace(':','.')));
            colCells = duration * 2 + (fraction.toFixed(2) == 0.3 ? 1 : 0) - (fraction.toFixed(2) == -0.3 ? 1 : 0);

            return colCells;
        },
        getDecimal: function (num) {
            return num > 0 ? num - Math.floor(num) : Math.ceil(num) - num;
        },
        remakeSchedule: function (item) {
            var eventView,
                el,
                col,
                settingEvent;

            setTimeout(function() {
                el = $("td[data-time='" + item.formFromTime() +"']");
                col = $('th')[el.index()];
                var width = $(col).outerWidth();
                var count = $(col).data('width');
                if (count) {
                    $(col).css({width: width*(count+1)});
                    $(col).data('width', 0);
                }

                settingEvent = {
                    top : function () {if (el.position()) return el.position().top},
                    left: function () {if (el.position()) return el.position().left},
                    width :  el.outerWidth(),
                    height : el.outerHeight()*this.getCellsCol(item.get('from'), item.get('to'))
                };

                eventView = new This.EventView();
                el.append(eventView.render(item, settingEvent).el);
            }.bind(this), 0);
        },
        changeAttributesCol: function (events) {
            var obj = {};

            events.forEach(function (item) {
                obj[item.get('date')] = [];
            });

            events.forEach(function (item) {
                comp(item);
            });

            function comp(item) {
                Object.keys(obj).forEach(function (i) {
                    if (i === item.get('date')) {
                        obj[i].push(item);
                    }
                });
            }

            setTimeout(function() {
                var col, count, from, to, from1, to1;

                Object.keys(obj).forEach(function (item) {
                    for (var i = 0; i < obj[item].length; i += 1) {
                        count = 0;
                        from = obj[item][i].get('from');
                        to = obj[item][i].get('to');
                        for (var j = 1; j < obj[item].length; j += 1) {
                            from1 = obj[item][j].get('from');
                            to1 = obj[item][j].get('to');
                            if (!(from1 >= to || to1 <= from)) {
                                count += 1;
                            }
                        }
                    }

                    col = this.$('th')[$("td[data-time='08:00-" + item +"']").index()];
                    $(col).data('width', count);
                }, this);
            }.bind(this),0);
        }
    });
})(App.Schedule);
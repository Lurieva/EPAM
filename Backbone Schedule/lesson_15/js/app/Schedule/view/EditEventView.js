'use strict';
(function (This) {
    This.EditEventView = Backbone.View.extend({
        template: templates.editEventViewTpl,
        events: {
            'click .save': 'updateEvent',
            'click .cancel' : 'cancelEvent',
            'click .remove' : 'removeEvent'
        },
        render: function(model) {
            this.model = model;
            var cloneModel = model.clone();

            this.$el.html(this.template());
            this.fillForm(model.toJSON());
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
        fillForm: function (model) {
            this.$el.find('input[name="title"]').val(model.title);
            this.$el.find('input[name="date"]').val(model.date);
            this.$el.find('input[name="from"]').val(model.from);
            this.$el.find('input[name="to"]').val(model.to);
            this.$el.find('textarea').val(model.description);
        },

        updateEvent: function (e) {
            e.preventDefault();

            this.model.set(this.setAttributesEvent());
            this.model.save();
            
            this.hideView();
        },
        cancelEvent: function () {
            this.hideView();
        },
        removeEvent: function () {
            this.model.destroy({success: function () {
               console.info('The event was remove');
            }});
            this.$el.remove();
        },
        hideView: function () {
            this.$el.hide();
            cs.mediator.publish('add');
            cs.mediator.publish('showCurrent');
        }
    });
})(App.Schedule);
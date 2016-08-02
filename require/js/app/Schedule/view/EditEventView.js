define(['backbone', 'jquery', 'app/Schedule/tpl/EditEventViewTpl', '$UI'],
    function (Backbone, $, tpl, $UI) {
     return EditEventView = Backbone.View.extend({
        template: tpl,
        events: {
            'click .save': 'updateEvent',
            'click .cancel' : 'cancelEvent',
            'click .remove' : 'removeEvent'
        },
        render: function(model) {
            this.model = model;

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
                title: this.$('input[name="title"]').val(),
                date: this.$('input[name="date"]').val(),
                from: this.$('input[name="from"]').val(),
                to: this.$('input[name="to"]').val(),
                description: this.$('textarea').val()
            };
        },
        fillForm: function (model) {
            this.$('input[name="title"]').val(model.title);
            this.$('input[name="date"]').val(model.date);
            this.$('input[name="from"]').val(model.from);
            this.$('input[name="to"]').val(model.to);
            this.$('textarea').val(model.description);
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
        },
        hideView: function () {
            this.$el.hide();
            cs.mediator.publish('add');
            cs.mediator.publish('showCurrent');
        }
    });
});

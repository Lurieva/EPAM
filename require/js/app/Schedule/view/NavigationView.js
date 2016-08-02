define(['backbone', 'jquery', 'app/Schedule/tpl/NavigationViewTpl'],
    function (Backbone, $, tpl) {
      return NavigationView = Backbone.View.extend({
          template: tpl,
          events: {
              'click .previous' : 'showPrevious',
              'click .current' : 'showCurrent',
              'click .next' : 'showNext'
          },
          initialize: function() {
              this.render();
          },
          render: function() {
            console.log(this.template)
              this.$el.html(this.template());
              return this;
          },
          showNext: function () {
              cs.mediator.publish('showNext');
          },
          showPrevious: function () {
              cs.mediator.publish('showPrevious');
          },
          showCurrent: function () {
              cs.mediator.publish('showCurrent');
          }
      });
    }
);

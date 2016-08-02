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
              this.$el.html(this.template());
              return this;
          },
          showNext: function () {
              mediator.publish('showNext');
          },
          showPrevious: function () {
              mediator.publish('showPrevious');
          },
          showCurrent: function () {
              mediator.publish('showCurrent');
          }
      });
    }
);

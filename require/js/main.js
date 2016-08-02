requirejs.config({
    paths: {
        jquery: 'https://code.jquery.com/jquery-2.2.4.min',
        underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
        backbone: 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min',
        'backbone.localStorage': 'lib/backbone.localStorage',
        mediator: 'lib/mediator.min'
    },
    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'Bootstrap'
        },
        'backbone.localStorage': {
            deps: ['backbone'],
            exports: 'Backbone'
        }
    }
});

require(
    ['backbone', 'app/Schedule/model/EventCollection', 'app/Schedule/Controller', 'mediator'],
    function (backbone, EventCollection, Controller, Mediator){
      console.log(EventCollection)
          var App = {
              Schedule: {}
          },
          collections = {},
          cs = {},
          templates = {};

      $(function () {
          /*collections.events = new EventCollection();
          collections.events.fetch({
              success: main
          });*/
      main();
          function main () {
              cs.mediator = new Mediator();
              cs.schedule = new Controller();
          }
    });
  }
);

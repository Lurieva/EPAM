requirejs.config({
    paths: {
        jquery: 'https://code.jquery.com/jquery-2.2.4.min',
        underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
        backbone: 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min',
        'backbone.localStorage': 'https://cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.1.16/backbone.localStorage'
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
        }
    }
});


require(
    ['backbone', 'app/Schedule/model/EventCollection', 'app/Schedule/Controller'],
    function (backbone, EventCollection, Controller){
          var App = {
              Schedule: {}
          },
          cs = {},
          collections = {},
          templates = {};

      $(function () {
          collections.events = new EventCollection();
          collections.events.fetch({
              success: main
          });

          function main () {
              //cs.mediator = new Mediator();
              console.log(collections.events)
              cs.schedule = new Controller(collections.events);
          }
    });
  }
);

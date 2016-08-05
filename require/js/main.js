requirejs.config({
    paths: {
        jquery: 'lib/jquery',//'https://code.jquery.com/jquery-2.2.4.min',
        mediator: 'lib/mediator.min',
        underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
        backbone: 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min',
        'backbone.localStorage': 'https://cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.1.16/backbone.localStorage',
        '$UI': 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/jquery-ui'
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
    ['backbone', 'app/Schedule/model/EventCollection', 'app/Schedule/Controller', 'mediator'],
    function (backbone, EventCollection, Controller, Mediator){
      $(function () {
          var events = new EventCollection();
          events.fetch({
              success: main
          });

          function main () {
              //mediator = new Mediator();
              console.log(events)
              var schedule = new Controller(events);
          }
    });
  }
);

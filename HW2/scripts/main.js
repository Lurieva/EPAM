requirejs.config({
   baseUrl : 'scripts',
   urlArgs: 'bust=' +  Date.now(),
    paths: {
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        domReady: 'lib/dom-loaded',
        controller: 'lib/backbone.controller',
        handlebars: 'lib/handlebars',
        hbs: 'lib/require-handlebars-plugin-master/hbs'
    },
    hbs: {
       helpers: true,
       templateExtension: 'hbs',
       partialsUrl: ''
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
        controller: {
          deps: ['underscore', 'backbone'],
          exports: 'Controller'
        }
    }
});


require(['domReady', 'mainController'], function (domReady, Controller) {
    domReady(function () {
      var controller = new Controller();
    })
});

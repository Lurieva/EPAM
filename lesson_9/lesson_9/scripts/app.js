'use strict';

var app = {

    initialize: function () {
    	var container, 
    	    manager;

        _.templateSettings = {
          interpolate: /\{\{(.+?)\}\}/g
        };

        container = document.querySelector('tbody');
        manager = new app.Manager(container);
        manager.initialize();
    }

};

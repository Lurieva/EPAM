'use strict';
var App = {
        Schedule: {}
    },
    collections = {},
    cs = {},
    templates = {};

$(function () {
    collections.events = new App.Schedule.EventCollection();
    collections.events.fetch({
        success: main
    });

    function main () {
        cs.mediator = new Mediator();
        cs.schedule = new App.Schedule.Controller();
    }
});
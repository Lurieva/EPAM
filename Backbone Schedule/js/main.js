'use strict';
var App = {
        Schedule: {}
    },
    collections = {},
    cs = {},
    templates = {};

$(function () {
    collections.events =  new App.Schedule.EventCollection();

    /******  FIRST INIT for LOCALSTORAGE   *******/
   /* collections.events.create({
        'title': 'Event1',
        'date' : '2016-06-09',
        'from' : '08:00',
        'to' : '09:00',
        'description' : 'Event1'
    });
    collections.events.create({
        'title': 'Event2',
        'date' : '2016-06-11',
        'from' : '08:00',
        'to' : '12:00',
        'description' : 'Event1'
    });
    collections.events.create({
        'title': 'Event3',
        'date' : '2016-06-10',
        'from' : '08:00',
        'to' : '09:00',
        'description' : 'Event1'
    });*/
    collections.events.fetch({
        success: main
    });

    function main () {
        cs.mediator = new Mediator();
        cs.schedule = new App.Schedule.Controller();
    }
});
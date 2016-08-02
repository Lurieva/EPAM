define(
    'EventCollection',
    ['backbone', 'Event'],
    function(Backbone, Event){
      var EventCollection = Backbone.Collection.extend({
          model: Event,
          localStorage: new Backbone.LocalStorage("EventsCollection"),
          filtered: function (start, end) {
              return this.models.filter(function (item) {
                  return item.get('date') <= end && item.get('date') >= start;
              }, this);
          }
      });
      return EventCollection;
    }
);

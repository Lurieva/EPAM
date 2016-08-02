define(['backbone', 'app/Schedule/model/Event', 'backbone.localStorage'],
    function(Backbone, Event, LocalStorage){
      var EventCollection = Backbone.Collection.extend({
          model: Event,
          localStorage: new LocalStorage("EventsCollection"),
          filtered: function (start, end) {
              return this.models.filter(function (item) {
                  return item.get('date') <= end && item.get('date') >= start;
              }, this);
          }
      });
      return EventCollection;
    }
);

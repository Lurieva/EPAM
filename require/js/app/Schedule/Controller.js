define(['backbone', 'jquery', 'app/Schedule/view/NavigationView',
        'app/Schedule/view/ScheduleView', 'lib/moment.min',
        'app/Schedule/view/AddEventView', 'app/Schedule/view/EditEventView'],
    function (Backbone, $, NavigationView, ScheduleView, moment,
              AddEventView, EditEventView) {
      var Controller = function (events) {
          var $event = $('#event-container'),
              $nav = $('.nav-container'),
              $schedule = $('.content-container');
          this.collection = events;

          start(this.collection);

          function start (collection) {
              setupMediator();
              render(collection);
          }

          function setupMediator () {
              mediator.subscribe('showPrevious', showPreviousWeek);
              mediator.subscribe('showCurrent', showCurrentWeek);
              mediator.subscribe('showNext', showNextWeek);
              mediator.subscribe('add', renderAddEventView);
              mediator.subscribe('edit', renderEditEventView);
          }

          function renderAddEventView (collection) {
              var addEventView = new AddEventView(collection);
              $event.empty().append(addEventView.render().el);
          }

          function renderEditEventView (model) {
              var editEventView = new EditEventView();
              $event.empty().append(editEventView.render(model).el);
          }

          function showPreviousWeek () {
              var scheduleView = new ScheduleView();
              $schedule.empty().append(scheduleView.render(scheduleView.weekStart.subtract(7, 'd')).el);
          }

          function showCurrentWeek (collection) {
              var scheduleView = new ScheduleView();
              $schedule.empty().append(scheduleView.render(moment().day('Monday'), collection).el);
          }

          function showNextWeek () {
              var scheduleView = new ScheduleView();
              $schedule.empty().append(scheduleView.render(scheduleView.weekStart.add(7, 'd')).el);
          }

          function render (collection) {
              var navView;

              navView = new NavigationView();
              $nav.append(navView.render().el);

              showCurrentWeek(collection);
              renderAddEventView(collection);
          }
      }
      return Controller;
    }
);

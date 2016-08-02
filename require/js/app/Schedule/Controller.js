define(['backbone', 'jquery', 'app/Schedule/view/NavigationView'],
    function (Backbone, $, NavigationView) {
      var Controller = function (events) {
          var $event = $('#event-container'),
              $nav = $('.nav-container'),
              $schedule = $('.content-container');
          this.collection = events;

          start();

          function start () {
            //  setupMediator();
              render();
              console.log(1)
          }

          function setupMediator () {
              cs.mediator.subscribe('showPrevious', showPreviousWeek);
              cs.mediator.subscribe('showCurrent', showCurrentWeek);
              cs.mediator.subscribe('showNext', showNextWeek);
              cs.mediator.subscribe('add', renderAddEventView);
              cs.mediator.subscribe('edit', renderEditEventView);
          }

          function renderAddEventView () {
              var addEventView = new This.AddEventView();
              $event.empty().append(addEventView.render().el);
          }

          function renderEditEventView (model) {
              var editEventView = new This.EditEventView();
              $event.empty().append(editEventView.render(model).el);
          }

          function showPreviousWeek () {
              var scheduleView = new This.ScheduleView();
              $schedule.empty().append(scheduleView.render(scheduleView.weekStart.subtract(7, 'd')).el);
          }

          function showCurrentWeek () {
              var scheduleView = new App.Schedule.ScheduleView();
              $schedule.empty().append(scheduleView.render(moment().day('Monday')).el);
          }

          function showNextWeek () {
              var scheduleView = new This.ScheduleView();
              $schedule.empty().append(scheduleView.render(scheduleView.weekStart.add(7, 'd')).el);
          }

          function render (){
              var navView;

              navView = new NavigationView();
              $nav.append(navView.render().el);

              //showCurrentWeek();
            //  renderAddEventView();
          }
      }
      return Controller;
    }
);

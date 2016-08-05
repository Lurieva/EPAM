define (function (require) {
  return [{ind: 1, name: 'Year', disabled: false, arr: [], url: 'years'},
          {ind: 2, name: 'Make', disabled: true, arr: [], requires: [1], url: 'makes?'},
          {ind: 3, name: 'Model', disabled: true, arr: [], requires: [1, 2], url: 'models?'},
          {ind: 4, name: 'Body', disabled: true, arr: [], requires: [1, 2, 3], url: 'chassis?'},
          {ind: 5, name: 'Option', disabled: true, arr: [], requires: [1, 2, 3, 4], url: 'options?'}
        ];
});

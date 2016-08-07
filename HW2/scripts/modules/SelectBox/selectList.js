define (function (require) {
  return [{ind: 1, value: 'Year', name: 'year', disabled: false, arr: [], url: 'years'},
          {ind: 2, value: 'Make', name: 'make', disabled: true, arr: [], requires: [1], url: 'makes?'},
          {ind: 3, value: 'Model', name: 'model', disabled: true, arr: [], requires: [1, 2], url: 'models?'},
          {ind: 4, value: 'Body', name: 'chassis', disabled: true, arr: [], requires: [1, 2, 3], url: 'chassis?'},
          {ind: 5, value: 'Option', name: 'option', disabled: true, arr: [], requires: [1, 2, 3, 4], url: 'options?'}
        ];
});

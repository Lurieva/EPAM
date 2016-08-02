define(['underscore'], function (_) {
  return _.template([
    '<div>',
        '<form id="form-edit">',
            '<fieldset>',
                '<legend>Edit event</legend>',
                '<p><span class="title">Title</span><span><input type="text" name="title"/></span></p>',
                '<p><span class="title">Date</span><span><input type="text" name="date" class="datepicker" "/></span></p>',
                '<p><span class="title">Time from</span><span><input type="time" name="from" /></span></p>',
                '<p><span class="title">Time to</span><span><input type="time" name="to" /></span></p>',
                '<p><span class="title">Description</span><span><textarea name="description"></textarea></span></p>',
                '<p><button class="save btn btn-info" type="submit">Save</button></p>',
                '<p><button class="cancel btn btn-warning" type="submit">Cancel</button></p>',
                '<p><button class="remove btn btn-danger" type="submit">Remove</button></p>',
            '</fieldset>',
        '</form>',
    '</div>'
].join(''));
});

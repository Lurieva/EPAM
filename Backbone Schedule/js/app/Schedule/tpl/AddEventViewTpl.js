templates.addEventViewTpl = _.template([
    '<div>',
        '<form id="form-add">',
            '<fieldset>',
                '<legend>Add event</legend>',
                '<p><span class="title">Title</span><span><input type="text" name="title" required /></span></p>',
                '<p><span class="title">Date</span><span><input type="text" name="date" class="datepicker" "/></span></p>',
                '<p><span class="title">Time from</span><span><input type="time" name="from" required /></span></p>',
                '<p><span class="title">Time to</span><span><input type="time" name="to" required /></span></p>',
                '<p><span class="title">Description</span><span><textarea name="description"></textarea></span></p>',
                '<p><button class="btn btn-info" type="submit" id="saveEvent">Save</button></p>',
            '</fieldset>',
        '</form>',
    '</div>'
].join(''));
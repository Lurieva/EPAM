templates.eventTpl = _.template([
    '<div class="myPanel myPanel-primary">',
        '<div class="myPanel-heading">',
            '<%= title%>',
            '<button class="close">',
                '<span>&times;</span>',
            '</button>',
        '</div>',
        ' <div class="myPanel-body">',
             '<%= description%>',
         '</div>',
    '</div>'
].join(''));
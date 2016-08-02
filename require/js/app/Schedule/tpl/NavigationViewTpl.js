templates.navigationViewTpl = _.template([
    '<div>',
        '<ul class="pager">',
            '<li class="previous"><a href="#">&#9668 Previous</a></li>',
            '<li class="current"><a href="#">Current</a></li>',
            '<li class="next"><a href="#">Next &#9658</a></li>',
        '</ul>',
    '</div>'
].join(''));
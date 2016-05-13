'use strict';

function filter (value, table, column) {
    var i, j, 
        cells, 
        displayStyle,
        column = findColumn(column);

    if (!value) return;

    for (i = 1; i < table.rows.length; i++) {
        cells = table.rows[i].cells[column].innerHTML.replace(/<[^>]+>/g,"");
        displayStyle = (value.toLowerCase() === cells.toLowerCase()) ? '' : 'none';
        table.rows[i].style.display = displayStyle;
    }
}

function findColumn (name) {
    if (!name) { return 1; }
    switch (name.toLowerCase()) {
        case 'lastname' : 
            return 1;
        case 'firstname' : 
            return 2;
        case 'age' : 
            return 3;
        default: break;
    };
}
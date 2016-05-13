'use strict';

function sortColumn (table, columnNum, type, flag) {
    var tbody = table.getElementsByTagName('tbody')[0], 
        rows = [].slice.call(tbody.rows),
        compare, i;

    switch (type) {
        case 'number':
            compare = function (a, b) {
                if (flag) {
                    return a.cells[columnNum].innerHTML - b.cells[columnNum].innerHTML;
                } else {
                    return b.cells[columnNum].innerHTML - a.cells[columnNum].innerHTML;
                }
            };
        break;
        case 'string':
            compare = function (a, b) {
                if (flag) {
                    return a.cells[columnNum].innerHTML > b.cells[columnNum].innerHTML ? 1 : -1;
                } else {
                    return a.cells[columnNum].innerHTML > b.cells[columnNum].innerHTML ? -1 : 1;
                }
            };
        break;
    }

    rows.sort(compare);
    table.removeChild(tbody);

    for (i = 0; i < rows.length; i++) {
        tbody.appendChild(rows[i]);
    }

    table.appendChild(tbody);
}
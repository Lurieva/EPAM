$(function () {
    $('#btnShow1').on('click', function () {
        $('#popup-1').popup({
            animation: 'type1',
            keyboard: true         
        });
    });

    $('#btnShow2').on('click', function () {
        $('#popup-2').popup({
            keyboard: false,
            background: false,
            animation: 'type2'           
        });
    });
});
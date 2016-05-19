$(function () {
    $('#btnShow1').popup();

    $('#btnShow2').popup({
        animation: 'slide',
        keyboard: true         
    });

    $('#btnShow3').popup({
        keyboard: true,
        background: false,
        animation: 'slideDown'           
    });
});
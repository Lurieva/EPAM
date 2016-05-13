var uri = '/api/products';

$(function () {   
    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };

    getData(init);
});

function getData(callback) {
    var jqxhr = $.get(uri, function () {
        console.info('success');
    })
        .done(function (res) {
            callback(res);
        })
        .fail(function () {
            showErrorMessage($('.footer'), {message: 'Services unavailable'});
        });
}

function showErrorMessage (el, err) {
    var template = initTemplate($('#templateError'));
    el.html(template(err));
}

function init (res) {
    renderHeader(res.searchVehicle);
    renderItems(res.products);
    addEvents();
}

function addEvents () {
    $('.btn-buy').click(function () {
        getData(validateBeforeBuying); 
    });
}

function validateBeforeBuying (res) {
    $.each(res.products, function (i, item) {
        validateItem(item, $('.info-sku:contains("'+ item['pSku'] +'")').parents('.container'))
    }); 

    if (!isEmpty($('.error-container'))) {
        return false;
    }
    showSuccessMessage();
}

function isEmpty (el) {
    var result = true;

    el.each(function(i, item){
        if ($.trim($(item).html()) !== '') {
            result = false;
        }
    });

    return result;
}

function showSuccessMessage () {
    $('.success')
        .show({duration: 0, queue: true})
        .delay(1000)
        .hide({duration: 0, queue: true});
}

function addListeners (item, el) {
    var elem, 
        num;

    $('.remove-item').click(function () {
        elem = $(this).parent('.container');

        $('.popup').show();
        $('.ok-btn').click(function () {
            $('.popup').hide();
            elem.remove();
        });
        $('.cancel-btn').click(function () {
            $('.popup').hide();
        });
    });

    $('.btn-update').click(function () {
        validateItem(item, el);

        if (isEmpty($('.error-container')) && !el.find('.qty').hasClass('error')) {
            el.find('.total-quantity').html((el.find('.qty').val() * el.find('.price').html()).toFixed(2));
        }
    });

    $('.qty').change(function () {
        num = $(this).val();
        isNum(num) ? $(this).addClass('error') : $(this).removeClass('error');
    });
}

function isNum (num, el) {
	return isFloat(num) || num <= 0 || !$.isNumeric(num);
}

function isFloat (num) { 
    return parseInt(num) !== parseFloat(num);
}

function renderItems (res) {
    var el,
        template = initTemplate($('#templateContent'));
 
    $.each(res, function (i, item) {
        el = $(template(item)).appendTo($('.content'));
        validateItem(item, el);
        addListeners(item, el);
    });
}

function validateItem (item, el) {
    var total,
        MAX_QUANTITY = 99,
        quantity = el.find('#qty'),
        error = el.find('.error-container');
    
    total = item.isInStoreOnly ? item.totalProduct.stock : (item.totalProduct.stock + item.totalProduct.sklad);

    if (quantity.val() > MAX_QUANTITY && total > MAX_QUANTITY) {
        quantity.addClass('error');
        showErrorMessage(error, {message: 'Sorry, the maximum quantity you can order is ' + MAX_QUANTITY});
    } else if (quantity.val() > total && total < MAX_QUANTITY && total !== 0) {
        quantity.addClass('error');
        showErrorMessage(error, {message: 'Sorry, the maximum quantity you can order is ' + total});
    } else if (total === 0) {
        showErrorMessage(error, {message: 'The product out of stock'});
    } else {
        if (!isEmpty(error)) {
            error.empty();
        }
    } 
}

function initTemplate (el) {
    return _.template(el.html());
}

function renderHeader (info) {
    var template = initTemplate($('#templateHeader'));
    $('.header-container').append(template(info));
}
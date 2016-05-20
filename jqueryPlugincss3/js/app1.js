;(function ($) {

    'use strict';

    var pluginName = 'popup',
        defaults = {
            background: true,
            keyboard: false,
            animation: 'type2'
        };


    function Plugin (element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);     
        this.overlay = $('.overlay');
        
        this.initPopup();
    }

    Plugin.prototype.initPopup = function () {
        this.element.className = 'popup';
        this.setAnimation();
        this.showPopup();
        this.centeredPopup();
        this.addListeners();
    };

    Plugin.prototype.setAnimation = function () {
        switch (this.options.animation) {
            case 'type1':
                $(this.element).addClass('type1');
                break;
            case 'type2':
                $(this.element).addClass('type2');
                break; 
            default: break;
        }
    };

    Plugin.prototype.centeredPopup = function () {
        $(this.element).css({
            'position': 'fixed',
            'top': parseInt(($(window).height() / 2) - ($(this.element).height() / 2), 10),
            'left': parseInt(($(window).width() / 2) - ($(this.element).width() / 2), 10)
        }).show();
    };

    Plugin.prototype.showPopup = function () {
        if (this.options.background) {
            this.overlay.addClass('show');
        }
        $(this.element).removeClass('fade')
                       .addClass('in');
    };

    Plugin.prototype.closePopup = function () {
        $(this.element).addClass('fade')
                       .delay(350)
                       .queue(function () {
                       	    $(this).hide(); 
                       	    $(this).dequeue()
                       	});

        this.overlay.removeClass('show');
        $(this.element).removeData('plugin_' + pluginName);          
    };

    Plugin.prototype.addListeners = function () {
        var ESC_KEY = 27;

        $(window).resize($.proxy(this.centeredPopup, this));

        $('.close, .btn-close, .overlay').click($.proxy(this.closePopup, this));

        $(document).unbind('keydown')
                   .keydown($.proxy(function (e) {
                        if (e.keyCode === ESC_KEY) {
                            if (this.options.keyboard) {
                                $('.close').click();   
                            }
                            return;  
                        }
                    }, this));
    }


    $.fn[pluginName] = function (options) {
    	if (typeof options === "object" || !options) {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                }
            });
        }
    }

})(jQuery);
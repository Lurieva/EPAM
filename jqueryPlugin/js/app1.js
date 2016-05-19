;(function ($) {

    'use strict';

    var pluginName = 'popup',
        defaults = {
            background: true,
            keyboard: false,
            animation: 'auto'
        };


    function Plugin (element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);     
        this.popup = $('.popup')
        this.overlay = $('.overlay');
        
        this.initPopup();
    }

    Plugin.prototype.initPopup = function () {
        $(this.element).bind('click', $.proxy(this.openPopup, this));      
    };

    Plugin.prototype.openPopup = function () {
        this.setAnimation();
        this.centeredPopup();
        this.addListeners();
    };

    Plugin.prototype.setAnimation = function () {
        switch (this.options.animation) {
            case 'auto':
                this.showPopup();
                break;
            case 'slide':
                this.popup.css('left', '150%');
                this.showPopup();
                break;
            case 'slideDown':
                this.popup.css('top', '-150%');
                this.showPopup();
                break;  
            default: break;
        }
    };

    Plugin.prototype.centeredPopup = function () {
        this.popup.css({
            'position': 'fixed',
            'top': parseInt(($(window).height() / 2) - (this.popup.height() / 2), 10),
            'left': parseInt(($(window).width() / 2) - (this.popup.width() / 2), 10)
        });
    };

    Plugin.prototype.showPopup = function () {
        if (this.options.background) {
            this.overlay.addClass('show');
        }
        this.popup.addClass('show')
    };

    Plugin.prototype.closePopup = function () {
        this.popup.removeClass('show')
                  .css({'position':'', 'left':'', 'top':''});
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
'use strict';

var HorizontalMenuView = (function (MainMenuView) {

    function HorizontalMenuView (parent) {
        MainMenuView.call(this);
        this.parentEl = parent;
        return this;
    }
    
    helper.inherit(HorizontalMenuView, MainMenuView);
    
    _.extend(HorizontalMenuView.prototype, MainMenuView.prototype, {
        handlerShowMenu : function (e, el) {
            var element, target;

            e.preventDefault();
            target = e.target;

            while (target !== el) {
                if (target.tagName === 'LI') {
                    element = target.querySelector('.submenu');
                    mediator.publish('showVerticalMenu', element);
                    this.showMenu(element, el.querySelectorAll('.submenu'));  
                    return;
                }
            target = target.parentNode;
            }  
        },
        addMediatorListeners : function () {
            mediator.subscribe('showHorizontalMenu', this.showSubMenu.bind(this));
        }
    });

    return HorizontalMenuView;
    
})(MainMenuView);
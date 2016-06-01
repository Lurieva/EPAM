'use strict';

var VerticalMenuView = (function (MainMenuView) {
    
    function VerticalMenuView (parent) {
        MainMenuView.call(this);
        this.parentEl = parent;
        return this;
    }
    
    helper.inherit(VerticalMenuView, MainMenuView);

    _.extend(VerticalMenuView.prototype, MainMenuView.prototype, {
        handlerShowMenu : function (e, el) {
            var element, target;

            e.preventDefault();
            target = e.target;

            while (target !== el) {
                if (target.tagName === 'LI') {
                    element = target.querySelector('.submenu');
                    mediator.publish('showHorizontalMenu', element);
                    this.showMenu(element, el.querySelectorAll('.submenu'));  
                    return;
                }
            target = target.parentNode;
            }  
        },
        addMediatorListeners : function () {
            mediator.subscribe('showVerticalMenu', this.showSubMenu.bind(this));
        }
    });

    return VerticalMenuView;

})(MainMenuView);
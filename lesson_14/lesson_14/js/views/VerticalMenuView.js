'use strict';

var VerticalMenuView = (function (MainMenuView) {
    
    function VerticalMenuView (parent) {
        MainMenuView.call(this);
        this.parentEl = parent;
        this.parentEl.classList.add('menu-vertical');
        return this;
    }
    
    helper.inherit(VerticalMenuView, MainMenuView);

    return VerticalMenuView;

})(MainMenuView);
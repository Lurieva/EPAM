'use strict';

var HorizontalMenuView = (function (MainMenuView) {

    function HorizontalMenuView (parent) {
        MainMenuView.call(this);
        this.parentEl = parent;
        return this;
    }
    
    helper.inherit(HorizontalMenuView, MainMenuView);

    return HorizontalMenuView;
    
})(MainMenuView);
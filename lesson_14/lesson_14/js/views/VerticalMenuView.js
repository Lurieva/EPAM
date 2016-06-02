'use strict';

var VerticalMenuView = (function (MainMenuView) {
    
    function VerticalMenuView (parent) {
        MainMenuView.call(this);
        this.parentEl = parent;
        return this;
    }
    
    helper.inherit(VerticalMenuView, MainMenuView);

    return VerticalMenuView;

})(MainMenuView);
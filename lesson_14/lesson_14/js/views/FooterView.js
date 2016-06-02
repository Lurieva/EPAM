'use strict';
var FooterView = (function () {

    function FooterView (parent) {
        this.parentEl = parent;
        return this;
    }

    FooterView.prototype = {
        init: function () {
            this.render();
        },
        
        render: function () {
            var el = document.createElement('div');
            el.innerHTML += footerData;
            this.parentEl.innerHTML = el.innerHTML;
        }
    };

    return FooterView;
    
})();

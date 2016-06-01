'use strict';
var FooterView = (function () {
    function FooterView () {
        this.parentEl = document.querySelector('.footer');
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
    }

    return FooterView;
})();
